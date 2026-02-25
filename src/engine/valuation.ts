/**
 * Core Valuation Engine — 8-step sponsorship inventory valuation.
 * Zero React imports — pure TypeScript calculation.
 *
 * Steps:
 *  1. Per-asset unplugged value (SEE/ENGAGE/TRY/ACT)
 *  2. Total unplugged value
 *  3. Plugged value (stub for MVP)
 *  4. Base Event Value
 *  5. Market expansion (DMA multiplier)
 *  6. Signal Boost™
 *  7. Final valuation
 *  8. Rights Cascade™ (stub for MVP)
 */

import { getSignalBoost, type SignalBoostResult } from './signalBoost';
import { calculateIQI } from './iqi';
import { calculateCPHA } from './cpha';
import { EXPOSURE_TIERS, type ExposureTierId } from '@/constants/exposureTiers';
import { UNPLUGGED_ASSETS, type UnpluggedAssetId, type PurposeType } from '@/constants/assets';
import { DMA_MULTIPLIERS } from '@/constants/markets';

/* ─── Input types ─── */
export interface EventInputs {
  name: string;
  venueType: string;
  capacity: number;
  attendance: number;
  durationHours: number;
  eventDays: number;
  editionNumber: number;
  totalSponsors: number;
  hasWaitlist: boolean;
}

export interface MarketInput {
  dma: string;
}

export interface AssetSelection {
  assetId: UnpluggedAssetId;
  quantity: number;
  exposureTier: ExposureTierId;
}

export interface ValuationInputs {
  event: EventInputs;
  market: MarketInput;
  assets: AssetSelection[];
}

/* ─── Output types ─── */
export interface AssetBreakdown {
  assetId: UnpluggedAssetId;
  name: string;
  purpose: PurposeType;
  quantity: number;
  impressions: number;
  value: number;
  exposureSeconds: number;
}

export interface ValuationResult {
  baseEventValue: number;
  signalBoost: SignalBoostResult;
  finalValue: number;
  unpluggedTotal: number;
  pluggedTotal: number;
  ticketsTotal: number;
  rightsTotal: number;
  dmaMultiplier: number;
  iqi: number;
  cpha: number;
  totalAttentionHours: number;
  totalImpressions: number;
  assetBreakdowns: AssetBreakdown[];
  purposeTotals: Record<PurposeType, number>;
  purposeCount: number;
  fillRate: number;
}

/* ─── Engine ─── */
export function valuationEngine(inputs: ValuationInputs): ValuationResult {
  const { event, market, assets } = inputs;
  const fillRate = event.capacity > 0 ? event.attendance / event.capacity : 0;

  // Step 1-2: Unplugged value
  const assetBreakdowns: AssetBreakdown[] = [];
  let unpluggedTotal = 0;
  let totalExposureSeconds = 0;
  let totalImpressions = 0;

  const purposeTotals: Record<PurposeType, number> = {
    see: 0,
    engage: 0,
    try: 0,
    act: 0,
  };

  const activePurposes = new Set<PurposeType>();

  for (const sel of assets) {
    const asset = UNPLUGGED_ASSETS.find((a) => a.id === sel.assetId);
    if (!asset) continue;

    const tier = EXPOSURE_TIERS.find((t) => t.id === sel.exposureTier);
    if (!tier) continue;

    // Base impressions
    const baseImpressions = event.attendance * asset.audiencePct * sel.quantity;

    // Capacity check for flow-based assets
    let impressions = baseImpressions;
    if (asset.brandExposurePerHour) {
      const totalHours = event.durationHours * event.eventDays;
      const maxCapacity = asset.brandExposurePerHour * totalHours * sel.quantity;
      impressions = Math.min(impressions, maxCapacity);
    }

    // Value = (impressions / 1000) * CPM * exposure multiplier
    const value = (impressions / 1000) * asset.cpm * tier.multiplier;

    // Exposure in seconds for attention hours
    const exposureSeconds = impressions * tier.avgSeconds;

    assetBreakdowns.push({
      assetId: sel.assetId,
      name: asset.name,
      purpose: asset.purpose,
      quantity: sel.quantity,
      impressions: Math.round(impressions),
      value: Math.round(value),
      exposureSeconds,
    });

    unpluggedTotal += value;
    totalExposureSeconds += exposureSeconds;
    totalImpressions += impressions;
    purposeTotals[asset.purpose] += value;
    activePurposes.add(asset.purpose);
  }

  // Step 3: Plugged value (stub — will expand in future sessions)
  const pluggedTotal = 0;

  // Step 4: Base Event Value
  const baseEventValue = unpluggedTotal + pluggedTotal;

  // Step 5: Market expansion
  const dmaMultiplier = DMA_MULTIPLIERS[market.dma] ?? 1.0;
  const marketAdjusted = baseEventValue * dmaMultiplier;

  // Step 6: Signal Boost™
  const purposeCount = activePurposes.size;
  const signalBoost = getSignalBoost(
    fillRate,
    event.hasWaitlist,
    event.editionNumber,
    false, // hasCategoryExclusive — will come from Rights step
    false, // hasTitlePresenting — will come from Rights step
    event.totalSponsors,
    purposeCount,
    pluggedTotal,
    unpluggedTotal,
    false, // hasEarnedMedia — will come from Plugged step
  );

  // Step 7: Final valuation
  const finalValue = Math.round(marketAdjusted * signalBoost.total);

  // Attention metrics
  const totalAttentionHours = totalExposureSeconds / 3600;
  const avgExposureSeconds =
    totalImpressions > 0 ? totalExposureSeconds / totalImpressions : 0;
  const iqi = calculateIQI(avgExposureSeconds);
  const cpha = calculateCPHA(finalValue, totalAttentionHours);

  return {
    baseEventValue: Math.round(baseEventValue),
    signalBoost,
    finalValue,
    unpluggedTotal: Math.round(unpluggedTotal),
    pluggedTotal,
    ticketsTotal: 0,
    rightsTotal: 0,
    dmaMultiplier,
    iqi,
    cpha: Math.round(cpha * 100) / 100,
    totalAttentionHours: Math.round(totalAttentionHours * 10) / 10,
    totalImpressions: Math.round(totalImpressions),
    assetBreakdowns,
    purposeTotals: {
      see: Math.round(purposeTotals.see),
      engage: Math.round(purposeTotals.engage),
      try: Math.round(purposeTotals.try),
      act: Math.round(purposeTotals.act),
    },
    purposeCount,
    fillRate: Math.round(fillRate * 1000) / 10,
  };
}

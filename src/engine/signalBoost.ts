/**
 * Signal Boost™ Framework
 * Data-inferred premium multiplier (0.85x to 1.45x).
 * Reads factual signals from event data — no subjective scoring.
 *
 * Five signals: Demand, Maturity, Exclusivity, Depth, Amplification.
 * Zero React imports — pure calculation.
 */

export interface SignalBoostResult {
  demand: number;
  maturity: number;
  exclusivity: number;
  depth: number;
  amplification: number;
  total: number;
  demandLabel: string;
  maturityLabel: string;
  exclusivityLabel: string;
  depthLabel: string;
  amplificationLabel: string;
}

/** Signal 1: Demand — fill rate + waitlist */
export function getDemandBoost(fillRate: number, hasWaitlist: boolean): number {
  if (hasWaitlist) return 0.15;
  if (fillRate >= 0.95) return 0.12;
  if (fillRate >= 0.90) return 0.08;
  if (fillRate >= 0.75) return 0.04;
  if (fillRate >= 0.50) return 0.00;
  return -0.05;
}

export function getDemandLabel(fillRate: number, hasWaitlist: boolean): string {
  if (hasWaitlist) return 'Scarcity';
  if (fillRate >= 0.95) return 'Sold Out';
  if (fillRate >= 0.90) return 'High';
  if (fillRate >= 0.75) return 'Strong';
  if (fillRate >= 0.50) return 'Moderate';
  return 'Weak';
}

/** Signal 2: Maturity — event edition number */
export function getMaturityBoost(editionNumber: number): number {
  if (editionNumber >= 15) return 0.10;
  if (editionNumber >= 8) return 0.07;
  if (editionNumber >= 4) return 0.04;
  if (editionNumber >= 2) return 0.00;
  return -0.03;
}

export function getMaturityLabel(editionNumber: number): string {
  if (editionNumber >= 15) return 'Legacy';
  if (editionNumber >= 8) return 'Proven';
  if (editionNumber >= 4) return 'Established';
  if (editionNumber >= 2) return 'Emerging';
  return 'Inaugural';
}

/** Signal 3: Exclusivity — category exclusiveness + sponsor count */
export function getExclusivityBoost(
  hasCategoryExclusive: boolean,
  hasTitlePresenting: boolean,
  totalSponsors: number,
): number {
  if (hasTitlePresenting && hasCategoryExclusive) return 0.10;
  if (hasCategoryExclusive) return 0.06;
  if (totalSponsors <= 4) return 0.04;
  if (totalSponsors <= 7) return 0.00;
  if (totalSponsors <= 14) return -0.02;
  return -0.06;
}

export function getExclusivityLabel(
  hasCategoryExclusive: boolean,
  hasTitlePresenting: boolean,
  totalSponsors: number,
): string {
  if (hasTitlePresenting && hasCategoryExclusive) return 'Fortress';
  if (hasCategoryExclusive) return 'Cat Lock';
  if (totalSponsors <= 4) return 'Select';
  if (totalSponsors <= 7) return 'Shared';
  if (totalSponsors <= 14) return 'Crowded';
  return 'Cluttered';
}

/** Signal 4: Depth — number of distinct purposes active */
export function getDepthBoost(purposeCount: number): number {
  if (purposeCount >= 4) return 0.10;
  if (purposeCount >= 3) return 0.06;
  if (purposeCount >= 2) return 0.02;
  return -0.03;
}

export function getDepthLabel(purposeCount: number): string {
  if (purposeCount >= 4) return 'Full Funnel';
  if (purposeCount >= 3) return 'Strategic';
  if (purposeCount >= 2) return 'Moderate';
  return 'Surface';
}

/** Signal 5: Amplification — plugged/unplugged ratio + earned media */
export function getAmplificationBoost(
  pluggedTotal: number,
  unpluggedTotal: number,
  hasEarnedMedia: boolean,
): number {
  const total = pluggedTotal + unpluggedTotal;
  if (total === 0) return 0;

  const pluggedRatio = pluggedTotal / total;
  const earnedBonus = hasEarnedMedia ? 0.02 : 0;

  if (pluggedTotal === 0) return -0.02;
  if (pluggedRatio < 0.15) return 0.00 + earnedBonus;
  if (pluggedRatio <= 0.30) return 0.03 + earnedBonus;
  return 0.06 + earnedBonus;
}

export function getAmplificationLabel(
  pluggedTotal: number,
  unpluggedTotal: number,
  hasEarnedMedia: boolean,
): string {
  const total = pluggedTotal + unpluggedTotal;
  if (total === 0) return 'None';

  const pluggedRatio = pluggedTotal / total;
  if (pluggedTotal === 0) return 'Silent';
  if (pluggedRatio < 0.15) return hasEarnedMedia ? 'Organic' : 'Minimal';
  if (pluggedRatio <= 0.30) return hasEarnedMedia ? 'Amplified' : 'Moderate';
  return hasEarnedMedia ? 'Full Blast' : 'Strong';
}

/** Composite Signal Boost — clamped to 0.85x–1.45x */
export function getSignalBoost(
  fillRate: number,
  hasWaitlist: boolean,
  editionNumber: number,
  hasCategoryExclusive: boolean,
  hasTitlePresenting: boolean,
  totalSponsors: number,
  purposeCount: number,
  pluggedTotal: number,
  unpluggedTotal: number,
  hasEarnedMedia: boolean,
): SignalBoostResult {
  const demand = getDemandBoost(fillRate, hasWaitlist);
  const maturity = getMaturityBoost(editionNumber);
  const exclusivity = getExclusivityBoost(hasCategoryExclusive, hasTitlePresenting, totalSponsors);
  const depth = getDepthBoost(purposeCount);
  const amplification = getAmplificationBoost(pluggedTotal, unpluggedTotal, hasEarnedMedia);

  const rawBoost = demand + maturity + exclusivity + depth + amplification;
  const clampedBoost = Math.max(-0.15, Math.min(0.45, rawBoost));

  return {
    demand,
    maturity,
    exclusivity,
    depth,
    amplification,
    total: 1.0 + clampedBoost,
    demandLabel: getDemandLabel(fillRate, hasWaitlist),
    maturityLabel: getMaturityLabel(editionNumber),
    exclusivityLabel: getExclusivityLabel(hasCategoryExclusive, hasTitlePresenting, totalSponsors),
    depthLabel: getDepthLabel(purposeCount),
    amplificationLabel: getAmplificationLabel(pluggedTotal, unpluggedTotal, hasEarnedMedia),
  };
}

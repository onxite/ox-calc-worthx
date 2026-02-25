import { useState } from 'react';
import type { AssetSelection } from '@/engine/valuation';
import {
  UNPLUGGED_ASSETS,
  PURPOSE_CONFIG,
  type PurposeType,
  type UnpluggedAssetId,
} from '@/constants/assets';
import { EXPOSURE_TIERS, type ExposureTierId } from '@/constants/exposureTiers';

interface Props {
  assets: AssetSelection[];
  onChange: (assets: AssetSelection[]) => void;
  durationHours: number;
  attendance: number;
}

const PURPOSES: PurposeType[] = ['see', 'engage', 'try', 'act'];

export function UnpluggedAssetsStep({ assets, onChange, durationHours, attendance }: Props) {
  const [openSections, setOpenSections] = useState<Set<PurposeType>>(new Set(['see']));

  const toggleSection = (purpose: PurposeType) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(purpose)) {
        next.delete(purpose);
      } else {
        next.add(purpose);
      }
      return next;
    });
  };

  const isSelected = (id: UnpluggedAssetId): boolean =>
    assets.some((a) => a.assetId === id);

  const getAsset = (id: UnpluggedAssetId): AssetSelection | undefined =>
    assets.find((a) => a.assetId === id);

  const toggleAsset = (id: UnpluggedAssetId) => {
    if (isSelected(id)) {
      onChange(assets.filter((a) => a.assetId !== id));
    } else {
      const asset = UNPLUGGED_ASSETS.find((a) => a.id === id);
      if (!asset) return;
      onChange([
        ...assets,
        {
          assetId: id,
          quantity: 1,
          exposureTier: asset.defaultExposure as ExposureTierId,
        },
      ]);
    }
  };

  const updateAsset = (id: UnpluggedAssetId, partial: Partial<AssetSelection>) => {
    onChange(
      assets.map((a) =>
        a.assetId === id ? { ...a, ...partial } : a,
      ),
    );
  };

  // Count selected per purpose
  const countByPurpose = (purpose: PurposeType): number => {
    const purposeAssetIds = UNPLUGGED_ASSETS.filter((a) => a.purpose === purpose).map((a) => a.id);
    return assets.filter((a) => purposeAssetIds.includes(a.assetId)).length;
  };

  // Capacity warning check
  const getCapacityWarning = (
    assetId: UnpluggedAssetId,
    qty: number,
  ): string | null => {
    const asset = UNPLUGGED_ASSETS.find((a) => a.id === assetId);
    if (!asset?.brandExposurePerHour) return null;

    const maxCapacity = asset.brandExposurePerHour * durationHours * qty;
    const expectedInteractions = attendance * asset.audiencePct * qty;

    if (maxCapacity < expectedInteractions * 0.5) {
      return `Capacity: ${maxCapacity.toLocaleString()} max vs ${Math.round(expectedInteractions).toLocaleString()} expected`;
    }
    return null;
  };

  return (
    <div className="card" style={{ marginBottom: 24, animation: 'fadeInUp 0.4s ease' }}>
      <div className="step-header">
        <div className="step-header__number">Step 3</div>
        <h2 className="step-header__title">Unplugged Assets</h2>
        <p className="step-header__desc">
          Select your on-site sponsorship assets organized by purpose: SEE &rarr; ENGAGE &rarr; TRY &rarr; ACT.
        </p>
      </div>

      {PURPOSES.map((purpose) => {
        const cfg = PURPOSE_CONFIG[purpose];
        const isOpen = openSections.has(purpose);
        const count = countByPurpose(purpose);
        const purposeAssets = UNPLUGGED_ASSETS.filter((a) => a.purpose === purpose);

        return (
          <div key={purpose} className={`purpose-section${isOpen ? ' purpose-section--open' : ''}`}>
            <div
              className="purpose-section__header"
              onClick={() => toggleSection(purpose)}
              style={{ borderLeft: `3px solid ${cfg.color}` }}
            >
              <span className="purpose-section__icon">{cfg.icon}</span>
              <div style={{ flex: 1 }}>
                <span className="purpose-section__label" style={{ color: cfg.color }}>
                  {cfg.label}
                  {count > 0 && (
                    <span style={{ fontSize: '0.625rem', color: 'var(--oxco-gray-400)', marginLeft: 8 }}>
                      ({count} selected)
                    </span>
                  )}
                </span>
                <div className="purpose-section__question">{cfg.question}</div>
              </div>
              <span className="purpose-section__chevron">
                {isOpen ? '\u2212' : '+'}
              </span>
            </div>

            {isOpen && (
              <div className="asset-list">
                {purposeAssets.map((asset) => {
                  const sel = getAsset(asset.id);
                  const active = !!sel;
                  const warning = sel ? getCapacityWarning(asset.id, sel.quantity) : null;

                  return (
                    <div key={asset.id}>
                      <div className={`asset-row${active ? ' asset-row--active' : ''}`}>
                        <input
                          type="checkbox"
                          className="asset-row__checkbox"
                          checked={active}
                          onChange={() => toggleAsset(asset.id)}
                        />
                        <span className="asset-row__name">{asset.name}</span>

                        {active && (
                          <>
                            <input
                              type="number"
                              className="asset-row__qty"
                              min={1}
                              max={100}
                              value={sel!.quantity}
                              onChange={(e) =>
                                updateAsset(asset.id, { quantity: Math.max(1, Number(e.target.value) || 1) })
                              }
                              title="Quantity"
                            />
                            <select
                              className="asset-row__exposure"
                              value={sel!.exposureTier}
                              onChange={(e) =>
                                updateAsset(asset.id, { exposureTier: e.target.value as ExposureTierId })
                              }
                              title="Exposure time"
                            >
                              {EXPOSURE_TIERS.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.label} ({t.range})
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                      </div>

                      {warning && (
                        <div className="callout callout--warn" style={{ marginTop: 4, padding: '6px 12px', fontSize: '0.6875rem' }}>
                          &#9888;&#65039; {warning}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {assets.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.75rem', color: 'var(--oxco-teal)' }}>
          {assets.length} asset{assets.length !== 1 ? 's' : ''} selected &mdash; results updating live
        </div>
      )}
    </div>
  );
}

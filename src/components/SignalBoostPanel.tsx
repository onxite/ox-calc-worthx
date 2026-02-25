import type { SignalBoostResult } from '@/engine/signalBoost';

interface Props {
  signalBoost: SignalBoostResult;
  baseValue: number;
  finalValue: number;
}

const SIGNAL_CONFIG = [
  { key: 'demand' as const, label: 'Demand', color: 'var(--signal-demand)', labelKey: 'demandLabel' as const },
  { key: 'maturity' as const, label: 'Maturity', color: 'var(--signal-maturity)', labelKey: 'maturityLabel' as const },
  { key: 'exclusivity' as const, label: 'Exclusivity', color: 'var(--signal-exclusivity)', labelKey: 'exclusivityLabel' as const },
  { key: 'depth' as const, label: 'Depth', color: 'var(--signal-depth)', labelKey: 'depthLabel' as const },
  { key: 'amplification' as const, label: 'Amplification', color: 'var(--signal-amplification)', labelKey: 'amplificationLabel' as const },
];

function boostToWidth(boost: number): number {
  // Map -0.06 to +0.15 range to 0-100% width
  // Center at 50% (0.00 boost)
  const normalized = ((boost + 0.06) / 0.21) * 100;
  return Math.max(5, Math.min(100, normalized));
}

export function SignalBoostPanel({ signalBoost, baseValue, finalValue }: Props) {
  const totalPct = Math.round((signalBoost.total - 1) * 100);
  const dollarImpact = finalValue - baseValue;

  return (
    <div className="signal-panel">
      <div className="signal-panel__header">
        <div className="signal-panel__title">Signal Boost&trade;</div>
        <div className="signal-panel__total">
          {totalPct >= 0 ? '+' : ''}{totalPct}% boost
        </div>
      </div>

      {SIGNAL_CONFIG.map((cfg) => {
        const value = signalBoost[cfg.key];
        const label = signalBoost[cfg.labelKey];
        const pct = Math.round(value * 100);

        return (
          <div key={cfg.key} className="signal-bar">
            <span className="signal-bar__label">{cfg.label}</span>
            <div className="signal-bar__track">
              <div
                className="signal-bar__fill"
                style={{
                  width: `${boostToWidth(value)}%`,
                  background: cfg.color,
                }}
              />
            </div>
            <span className="signal-bar__emoji" style={{ fontSize: '0.6875rem', color: cfg.color }}>
              {label}
            </span>
            <span className="signal-bar__value">
              {pct >= 0 ? '+' : ''}{pct}%
            </span>
          </div>
        );
      })}

      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid var(--dark-border)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8125rem',
        }}
      >
        <span style={{ color: 'var(--dark-muted)' }}>
          Base: ${baseValue.toLocaleString()}
        </span>
        <span style={{ color: 'var(--oxco-teal)', fontWeight: 700 }}>
          Boosted: ${finalValue.toLocaleString()} ({dollarImpact >= 0 ? '+' : ''}${dollarImpact.toLocaleString()})
        </span>
      </div>
    </div>
  );
}

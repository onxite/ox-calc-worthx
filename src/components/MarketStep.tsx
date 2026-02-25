import type { MarketInput } from '@/engine/valuation';
import { MARKET_OPTIONS } from '@/constants/markets';

interface Props {
  market: MarketInput;
  onChange: (market: MarketInput) => void;
  onComplete: () => void;
  isComplete: boolean;
}

export function MarketStep({ market, onChange, onComplete, isComplete }: Props) {
  return (
    <div className="card" style={{ marginBottom: 24, animation: 'fadeInUp 0.4s ease' }}>
      <div className="step-header">
        <div className="step-header__number">Step 2</div>
        <h2 className="step-header__title">Market &amp; Geography</h2>
        <p className="step-header__desc">
          Major media markets command higher CPMs. Select your event&rsquo;s DMA.
        </p>
      </div>

      <div className="form-group">
        <label className="input-label">DMA Market</label>
        <select
          className="select-field"
          value={market.dma}
          onChange={(e) => onChange({ dma: e.target.value })}
        >
          {MARKET_OPTIONS.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name} ({m.multiplier}x)
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(92, 254, 228, 0.06)',
          fontSize: '0.75rem',
          color: 'var(--oxco-gray-400)',
        }}
      >
        DMA Multiplier:{' '}
        <span className="mono" style={{ color: 'var(--oxco-teal)', fontWeight: 700 }}>
          {MARKET_OPTIONS.find((m) => m.name === market.dma)?.multiplier ?? 1.0}x
        </span>
      </div>

      {!isComplete && (
        <button
          className="btn btn--primary"
          style={{ width: '100%', marginTop: 16 }}
          onClick={onComplete}
        >
          Continue &rarr;
        </button>
      )}

      {isComplete && (
        <div style={{ fontSize: '0.75rem', color: 'var(--oxco-teal)', textAlign: 'center', marginTop: 12 }}>
          &#10003; Market selected
        </div>
      )}
    </div>
  );
}

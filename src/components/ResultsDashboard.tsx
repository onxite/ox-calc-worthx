import type { ValuationResult } from '@/engine/valuation';
import type { UserPath } from '@/constants/paths';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { SignalBoostPanel } from './SignalBoostPanel';
import { AtlediCard } from './AtlediCard';

interface Props {
  results: ValuationResult;
  path: UserPath;
}

export function ResultsDashboard({ results, path }: Props) {
  const animatedValue = useAnimatedNumber(results.finalValue, 800);
  const animatedBase = useAnimatedNumber(results.baseEventValue, 600);
  const animatedCpha = useAnimatedNumber(results.cpha, 500, 2);

  const boostPct = Math.round((results.signalBoost.total - 1) * 100);

  return (
    <div className="results" style={{ animation: 'fadeInUp 0.5s ease' }}>
      {/* Hero value */}
      <div className="results__hero">
        <div className="results__hero-label">Your Sponsorship Valuation</div>
        <div className="results__hero-value" style={{ animation: 'scoreReveal 0.6s ease' }}>
          ${animatedValue.toLocaleString()}
        </div>
        <div className="results__hero-boost">
          Signal Boost&trade;: {boostPct >= 0 ? '+' : ''}{boostPct}%
        </div>
        <div className="results__disclaimer">
          This is a directional estimate &mdash; a projected valuation based on industry benchmarks.
        </div>
      </div>

      {/* Signal Boost panel */}
      <SignalBoostPanel
        signalBoost={results.signalBoost}
        baseValue={results.baseEventValue}
        finalValue={results.finalValue}
      />

      {/* Atledi consultant insight */}
      <AtlediCard results={results} path={path} />

      {/* Breakdown grid */}
      <div className="breakdown-grid">
        <div className="breakdown-card">
          <div className="breakdown-card__label">Base Event Value</div>
          <div className="breakdown-card__value">${animatedBase.toLocaleString()}</div>
          <div className="breakdown-card__sub">Before Signal Boost&trade;</div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-card__label">DMA Multiplier</div>
          <div className="breakdown-card__value">{results.dmaMultiplier}x</div>
          <div className="breakdown-card__sub">Market adjustment</div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-card__label">CPHA</div>
          <div className="breakdown-card__value">${animatedCpha.toLocaleString()}</div>
          <div className="breakdown-card__sub">Cost Per Hour of Attention</div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-card__label">IQI</div>
          <div className="breakdown-card__value">{results.iqi.toLocaleString()}x</div>
          <div className="breakdown-card__sub">vs. digital standard</div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-card__label">Attention Hours</div>
          <div className="breakdown-card__value">{results.totalAttentionHours.toLocaleString()}</div>
          <div className="breakdown-card__sub">Total projected</div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-card__label">Impressions</div>
          <div className="breakdown-card__value">{results.totalImpressions.toLocaleString()}</div>
          <div className="breakdown-card__sub">Total weighted</div>
        </div>
      </div>

      {/* Purpose breakdown (dark island) */}
      <div className="purpose-breakdown">
        <div className="purpose-breakdown__title">Value by Purpose</div>
        {(['see', 'engage', 'try', 'act'] as const).map((purpose) => {
          const value = results.purposeTotals[purpose];
          const pct = results.unpluggedTotal > 0 ? (value / results.unpluggedTotal) * 100 : 0;
          const colors: Record<string, string> = {
            see: 'var(--oxco-see)',
            engage: 'var(--oxco-engage)',
            try: 'var(--oxco-try)',
            act: 'var(--oxco-act)',
          };

          return (
            <div key={purpose} className="purpose-breakdown__row">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="purpose-breakdown__label" style={{ color: colors[purpose] }}>
                  {purpose}
                </span>
                <span className="purpose-breakdown__value">
                  ${value.toLocaleString()} ({Math.round(pct)}%)
                </span>
              </div>
              <div className="purpose-breakdown__bar">
                <div
                  className="purpose-breakdown__fill"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: colors[purpose],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* OX-Collective CTA */}
      <div className="cta-block">
        <div className="cta-block__title">
          {path === 'property'
            ? 'Ready to turn this valuation into a pitch?'
            : 'Need help evaluating this deal?'}
        </div>
        <div className="cta-block__desc">
          OX-Collective helps you build presentation-ready sponsorship packages, negotiate
          with confidence, and validate performance through measurement.
        </div>
        <a
          href="https://www.onxite.com/connect"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Work with OX-Collective &rarr;
        </a>
      </div>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { buildConsultantInsight } from '@/engine/consultantInsight';
import type { ValuationResult } from '@/engine/valuation';
import type { UserPath } from '@/constants/paths';

interface Props {
  results: ValuationResult;
  path: UserPath;
}

export function AtlediCard({ results, path }: Props) {
  const [copied, setCopied] = useState(false);
  const accentColor = 'var(--oxco-teal)';

  const insightText = useMemo(
    () => buildConsultantInsight(results, path),
    [results, path],
  );

  const { displayedText, isThinking, isTyping, isComplete } = useTypewriter(insightText, 18, 1500);

  const handleCopy = () => {
    const copyText =
      `${displayedText}\n\n` +
      `\u2014 Atledi \u00B7 OX-Collective Valuator\n` +
      `Powered by onxite\u2122 \u00B7 https://calc-worthx.onxite.com`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="atledi-card container">
      {/* Top gradient line */}
      <div
        className="atledi-card__gradient-line"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
      />

      <div className="atledi-card__header">
        <div className="atledi-card__avatar-wrap">
          <span className="atledi-card__avatar-dot" />
        </div>
        <div className="atledi-card__identity">
          <span className="atledi-card__name mono">Atledi</span>
          <span className="atledi-card__subtitle">OX-COLLECTIVE AI CONSULTANT</span>
        </div>
        {isThinking && <span className="atledi-card__thinking">thinking&hellip;</span>}
        {isTyping && (
          <span className="atledi-card__thinking" style={{ animation: 'none', opacity: 0.5 }}>
            typing&hellip;
          </span>
        )}
        {isComplete && (
          <button className="atledi-card__copy" onClick={handleCopy} aria-label="Copy insight">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      <p className="atledi-card__text">
        {isThinking && (
          <span style={{ color: 'var(--dark-muted)' }}>
            <span className="atledi-card__cursor">|</span>
          </span>
        )}
        {displayedText}
        {isTyping && <span className="atledi-card__cursor">|</span>}
      </p>

      {isComplete && (
        <div className="atledi-card__footer">
          Copy this insight to share with your team &middot; Powered by onxite&trade;
        </div>
      )}
    </div>
  );
}

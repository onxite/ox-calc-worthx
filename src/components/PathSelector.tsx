import type { UserPath } from '@/constants/paths';
import { PATH_CONFIG } from '@/constants/paths';
import { CrossSell } from './CrossSell';
import { Footer } from './Footer';

interface PathSelectorProps {
  onSelect: (path: UserPath) => void;
}

const PATHS: UserPath[] = ['property', 'brand'];

export function PathSelector({ onSelect }: PathSelectorProps) {
  return (
    <div className="container">
      <div className="hero">
        <img
          src="/logos/ox-collective.svg"
          alt="OX-Collective"
          className="hero__logo"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="hero__tagline">Your AI Sponsorship Consultant</div>
        <h1 className="hero__title">
          What is my sponsorship inventory worth?
        </h1>
        <p className="hero__subtitle">
          Value your current inventory in 5 minutes &mdash; then discover how to
          make it worth 2&ndash;3x more. The same methodology OX-Collective uses
          with Fortune&nbsp;500 clients.
        </p>

        <div className="path-selector">
          {PATHS.map((p) => {
            const cfg = PATH_CONFIG[p];
            return (
              <div
                key={p}
                className="path-card"
                onClick={() => onSelect(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelect(p)}
              >
                <div className="path-card__icon">{cfg.icon}</div>
                <div className="path-card__title">{cfg.title}</div>
                <div className="path-card__desc">{cfg.description}</div>
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--oxco-gray-500)', maxWidth: 480, margin: '0 auto' }}>
          Powered by the Onxite&trade; methodology &middot; Signal Boost&trade; &middot; MENT&trade; framework
        </p>
      </div>

      <CrossSell />
      <Footer />
    </div>
  );
}

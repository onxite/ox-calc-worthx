const TOOLS = [
  {
    icon: '/icons/flow-people.png',
    name: 'Event Flow Predictor',
    desc: 'How many people flow through',
    href: 'https://calc-flow.onxite.com',
  },
  {
    icon: '/icons/sampling-liquid-to-lips.png',
    name: 'Sampling Planner',
    desc: 'How many cups to a bottle per event',
    href: 'https://calc.xamplin.com',
  },
  {
    icon: '/icons/sunglasses-branded-premium.png',
    name: 'Branded Merch Planner',
    desc: 'How many tchotchkes to an event',
    href: 'https://calc.xotski.com',
  },
  {
    icon: '/icons/statistics-neon.png',
    name: 'Survey Statixtical',
    desc: 'Truth and rigor from event surveys',
    href: 'https://calc-statixtical.onxite.com',
  },
  {
    icon: '/icons/ment-atomic.png',
    name: 'MENT Calculator',
    desc: 'How did your event actually perform?',
    href: 'https://calc-ment.onxite.com/',
  },
  {
    icon: '/icons/calculator.png',
    name: 'Budget Ballpark',
    desc: 'What does this really cost?',
    comingSoon: true,
  },
];

export function CrossSell() {
  return (
    <div className="cross-sell container">
      <h3 className="cross-sell__title">Other OX Planning Tools</h3>
      <p className="cross-sell__subtitle">
        Free calculators for every stage of event planning.
      </p>

      <div className="cross-sell__grid">
        {TOOLS.map((tool) => {
          const isSoon = 'comingSoon' in tool && tool.comingSoon;
          const href = 'href' in tool ? tool.href : undefined;
          const isClickable = !isSoon && href;

          const card = (
            <div
              key={tool.name}
              className={`cross-sell-card${isSoon ? ' cross-sell-card--soon' : ''}`}
            >
              <img
                src={tool.icon}
                alt={tool.name}
                width={28}
                height={28}
                style={{ flexShrink: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <div className="cross-sell-card__name">{tool.name}</div>
                <div className="cross-sell-card__desc">{tool.desc}</div>
                {isSoon && (
                  <span className="cross-sell-card__badge cross-sell-card__badge--soon">Soon</span>
                )}
              </div>
            </div>
          );

          if (isClickable) {
            return (
              <a
                key={tool.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', height: '100%' }}
              >
                {card}
              </a>
            );
          }

          return <div key={tool.name} style={{ height: '100%' }}>{card}</div>;
        })}
      </div>

      {/* Work With Us CTA */}
      <div className="cta-block" style={{ marginTop: 24 }}>
        <div className="cta-block__title">Need a measurement partner for your events?</div>
        <div className="cta-block__desc">
          onxite&trade; is the third-party measurement layer that brings standardized metrics,
          statistical rigor, and cross-event benchmarking to experiential marketing.
        </div>
        <a
          href="https://www.onxite.com/connect"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          Work With Us &rarr;
        </a>
      </div>
    </div>
  );
}

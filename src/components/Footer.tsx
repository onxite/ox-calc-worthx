export function Footer() {
  return (
    <footer className="footer container">
      <img
        src="/logos/ox-collective.svg"
        alt="OX-Collective"
        className="footer__brand-logo"
        style={{ height: 32, width: 'auto', marginBottom: 8 }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="footer__tagline">Your AI Sponsorship Consultant.</div>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--oxco-gray-300)',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        Part of the{' '}
        <span className="footer__onxite">onxite&trade;</span> ecosystem.
      </p>

      {/* Product Suite Logos */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <p
          className="mono"
          style={{
            fontSize: '0.5625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--oxco-gray-500)',
            marginBottom: 16,
          }}
        >
          The onxite&trade; Product Suite
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            { logo: '/logos/ox-collective.svg', alt: 'OX Collective', href: 'https://ox-co.onxite.com/', height: 26 },
            { logo: '/logos/onxite-05-white.png', alt: 'Onxite', href: 'https://onxite.com', height: 36 },
            { logo: '/logos/xamplin.svg', alt: 'Xamplin', href: 'https://xamplin.com', height: 36 },
            { logo: '/logos/xotski.svg', alt: 'Xotski', href: 'https://xotski.com', height: 26 },
          ].map((product) => (
            <a
              key={product.alt}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                opacity: 0.5,
                transition: 'opacity 0.2s ease',
                height: 42,
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; }}
            >
              <img
                src={product.logo}
                alt={product.alt}
                style={{ height: product.height, width: 'auto', display: 'block', filter: 'brightness(0)' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </a>
          ))}
        </div>
      </div>

      <a
        href="https://www.onxite.com/connect"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__connect"
      >
        Connect with us &rarr;
      </a>

      <div className="footer__trademark">
        Signal Boost&trade;, Rights Cascade&trade;, CPHA&trade;, and MENT&trade; are trademarks of Onxite Inc.
        &nbsp;|&nbsp; Methodology patent pending.
      </div>

      <div className="footer__links">
        {[
          { label: 'Privacy Policy', href: 'https://onxite.com/privacy' },
          { label: 'Terms of Use', href: 'https://onxite.com/terms' },
          { label: 'Cookie Policy', href: 'https://onxite.com/cookies' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} Onxite Inc. All rights reserved.
      </div>
    </footer>
  );
}

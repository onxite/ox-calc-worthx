import { useState, type ReactNode } from 'react';

interface CollapsibleSectionProps {
  id?: string;
  sectionNumber?: string;
  title: string;
  teaser: string;
  accentColor?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function CollapsibleSection({
  id,
  sectionNumber,
  title,
  teaser,
  accentColor = 'var(--oxco-teal)',
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={`collapsible-section${isOpen ? ' collapsible-section--open' : ''}`}
      style={{ '--cs-accent': accentColor } as React.CSSProperties}
    >
      <button
        className="collapsible-section__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
      >
        <div className="collapsible-section__header">
          {sectionNumber && (
            <span className="collapsible-section__number" style={{ color: accentColor }}>
              {sectionNumber}
            </span>
          )}
          <div>
            <span className="collapsible-section__title">// {title}</span>
            {!isOpen && <span className="collapsible-section__teaser">{teaser}</span>}
          </div>
        </div>
        <span
          className="collapsible-section__chevron"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-base)',
          }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="collapsible-section__content">
          {children}
        </div>
      )}
    </div>
  );
}

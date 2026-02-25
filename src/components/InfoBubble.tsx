interface InfoBubbleProps {
  example: string;
  informs: string;
  matters: string;
}

export function InfoBubble({ example, informs, matters }: InfoBubbleProps) {
  return (
    <span className="info-wrap">
      <span className="info-icon" tabIndex={0} role="button" aria-label="More info">
        ?
      </span>
      <span className="info-bubble" role="tooltip">
        <span className="info-bubble__section">
          <span className="info-bubble__title">Example</span>
          <span className="info-bubble__text">&ldquo;{example}&rdquo;</span>
        </span>
        <span className="info-bubble__section">
          <span className="info-bubble__title">What it informs</span>
          <span className="info-bubble__text">{informs}</span>
        </span>
        <span className="info-bubble__section">
          <span className="info-bubble__title">Why it matters</span>
          <span className="info-bubble__text">{matters}</span>
        </span>
      </span>
    </span>
  );
}

import type { EventInputs } from '@/engine/valuation';

interface Props {
  event: EventInputs;
  onChange: (event: EventInputs) => void;
  onComplete: () => void;
  isComplete: boolean;
}

const VENUE_TYPES = [
  { value: 'stadium', label: 'Stadium / Arena' },
  { value: 'outdoor_festival', label: 'Outdoor Festival' },
  { value: 'convention', label: 'Convention Center' },
  { value: 'concert_venue', label: 'Concert Venue' },
  { value: 'hotel_ballroom', label: 'Hotel / Ballroom' },
  { value: 'street_fair', label: 'Street Fair / Block Party' },
  { value: 'retail', label: 'Retail / Pop-Up' },
  { value: 'other', label: 'Other' },
];

function getFillRateClass(rate: number): string {
  if (rate >= 0.95) return 'fill-rate--soldout';
  if (rate >= 0.90) return 'fill-rate--high';
  if (rate >= 0.75) return 'fill-rate--strong';
  if (rate >= 0.50) return 'fill-rate--moderate';
  return 'fill-rate--weak';
}

function getFillRateLabel(rate: number): string {
  if (rate >= 0.95) return 'Sold Out';
  if (rate >= 0.90) return 'High Demand';
  if (rate >= 0.75) return 'Strong';
  if (rate >= 0.50) return 'Moderate';
  return 'Weak';
}

export function EventBasicsStep({ event, onChange, onComplete, isComplete }: Props) {
  const fillRate = event.capacity > 0 ? event.attendance / event.capacity : 0;

  const update = (partial: Partial<EventInputs>) => {
    onChange({ ...event, ...partial });
  };

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="step-header">
        <div className="step-header__number">Step 1</div>
        <h2 className="step-header__title">Event Basics</h2>
        <p className="step-header__desc">
          Tell us about your event. These details power the valuation engine and Signal Boost&trade; signals.
        </p>
      </div>

      <div className="form-grid" style={{ marginBottom: 16 }}>
        <div className="form-group form-group--full">
          <label className="input-label">Event Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="e.g. Summer Music Festival 2026"
            value={event.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Venue Type</label>
          <select
            className="select-field"
            value={event.venueType}
            onChange={(e) => update({ venueType: e.target.value })}
          >
            {VENUE_TYPES.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="input-label">Duration (hours)</label>
          <input
            className="input-field"
            type="number"
            min={1}
            max={72}
            value={event.durationHours}
            onChange={(e) => update({ durationHours: Number(e.target.value) || 1 })}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Venue Capacity</label>
          <input
            className="input-field"
            type="number"
            min={100}
            value={event.capacity}
            onChange={(e) => update({ capacity: Number(e.target.value) || 100 })}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Expected Attendance</label>
          <input
            className="input-field"
            type="number"
            min={50}
            value={event.attendance}
            onChange={(e) => update({ attendance: Number(e.target.value) || 50 })}
          />
        </div>
      </div>

      {/* Fill rate indicator */}
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--oxco-gray-400)' }}>Fill Rate:</span>
        <span className={`fill-rate ${getFillRateClass(fillRate)}`}>
          {Math.round(fillRate * 100)}% &mdash; {getFillRateLabel(fillRate)}
        </span>
      </div>

      {/* Signal Boost inputs */}
      <div style={{ borderTop: '1px solid var(--oxco-gray-700)', paddingTop: 16, marginBottom: 16 }}>
        <div
          className="mono"
          style={{
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--oxco-teal)',
            marginBottom: 12,
          }}
        >
          Signal Boost&trade; Inputs
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="input-label">Edition Number</label>
            <input
              className="input-field"
              type="number"
              min={1}
              value={event.editionNumber}
              onChange={(e) => update({ editionNumber: Number(e.target.value) || 1 })}
            />
            <span style={{ fontSize: '0.6875rem', color: 'var(--oxco-gray-500)', marginTop: 4 }}>
              How many years has this event run?
            </span>
          </div>

          <div className="form-group">
            <label className="input-label">Total Sponsors</label>
            <input
              className="input-field"
              type="number"
              min={0}
              value={event.totalSponsors}
              onChange={(e) => update({ totalSponsors: Number(e.target.value) || 0 })}
            />
            <span style={{ fontSize: '0.6875rem', color: 'var(--oxco-gray-500)', marginTop: 4 }}>
              More sponsors = more clutter
            </span>
          </div>
        </div>

        <div className="toggle-wrap" style={{ marginTop: 16 }} onClick={() => update({ hasWaitlist: !event.hasWaitlist })}>
          <div className={`toggle${event.hasWaitlist ? ' toggle--active' : ''}`}>
            <div className="toggle__knob" />
          </div>
          <span className="toggle-label">
            Waitlist active? {event.hasWaitlist && <span style={{ color: 'var(--oxco-teal)' }}>&mdash; Maximum demand signal</span>}
          </span>
        </div>
      </div>

      {/* Complete button */}
      {!isComplete && (
        <button
          className="btn btn--primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={onComplete}
        >
          Continue &rarr;
        </button>
      )}

      {isComplete && (
        <div style={{ fontSize: '0.75rem', color: 'var(--oxco-teal)', textAlign: 'center', marginTop: 8 }}>
          &#10003; Event basics captured
        </div>
      )}
    </div>
  );
}

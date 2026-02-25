import type { EventInputs } from '@/engine/valuation';
import { ConsoleFader } from './ConsoleFader';

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

const DURATION_FADER_MARKERS = [
  { value: 1, label: '1h' },
  { value: 2, label: '2h' },
  { value: 4, label: '4h' },
  { value: 6, label: '6h' },
  { value: 8, label: '8h' },
];

const ATTENDANCE_FADER_MARKERS = [
  { value: 10, label: '10%' },
  { value: 25, label: '25%' },
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 100, label: '100%' },
];

function getFillRateColor(rate: number): string {
  if (rate >= 0.90) return 'var(--oxco-teal)';
  if (rate >= 0.70) return 'var(--oxco-green)';
  if (rate >= 0.50) return 'var(--oxco-yellow)';
  return 'var(--oxco-red)';
}

function getFillRateHex(rate: number): string {
  if (rate >= 0.90) return '#5CFEE4';
  if (rate >= 0.70) return '#22C55E';
  if (rate >= 0.50) return '#EAB308';
  return '#EF4444';
}

function getFillRateLabel(rate: number): string {
  if (rate >= 0.95) return 'Sold Out';
  if (rate >= 0.90) return 'High Demand';
  if (rate >= 0.75) return 'Strong';
  if (rate >= 0.50) return 'Moderate';
  return 'Weak';
}

function getFillRateClass(rate: number): string {
  if (rate >= 0.95) return 'fill-rate--soldout';
  if (rate >= 0.90) return 'fill-rate--high';
  if (rate >= 0.75) return 'fill-rate--strong';
  if (rate >= 0.50) return 'fill-rate--moderate';
  return 'fill-rate--weak';
}

export function EventBasicsStep({ event, onChange, onComplete, isComplete }: Props) {
  const fillRate = event.capacity > 0 ? event.attendance / event.capacity : 0;
  const fillPct = Math.min(Math.round(fillRate * 100), 100);

  const update = (partial: Partial<EventInputs>) => {
    onChange({ ...event, ...partial });
  };

  const handleFillPctChange = (pct: number) => {
    const attendance = Math.round(event.capacity * (pct / 100));
    update({ attendance: Math.max(50, attendance) });
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

      <div className="form-grid" style={{ marginBottom: 24 }}>
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
          <label className="input-label">Venue Capacity</label>
          <input
            className="input-field"
            type="number"
            min={100}
            value={event.capacity}
            onChange={(e) => update({ capacity: Number(e.target.value) || 100 })}
          />
        </div>
      </div>

      {/* ── Mixing Console ── */}
      <div className="console-panel">
        <div className="console-panel__title">&#9670; Mixing Console</div>
        <div className="console-panel__faders">
          <ConsoleFader
            label="Duration"
            value={event.durationHours}
            min={1}
            max={8}
            step={1}
            color="#5CFEE4"
            valueDisplay={`${event.durationHours}h`}
            markers={DURATION_FADER_MARKERS}
            onChange={(v) => update({ durationHours: v })}
          />
          <ConsoleFader
            label="Attendance"
            value={fillPct}
            min={10}
            max={100}
            step={5}
            color={getFillRateHex(fillRate)}
            valueDisplay={`${fillPct}%`}
            subDisplay={`${event.attendance.toLocaleString()} people`}
            markers={ATTENDANCE_FADER_MARKERS}
            onChange={handleFillPctChange}
          />
        </div>

        {/* Event Days */}
        <div className="console-panel__days">
          <span className="console-panel__days-label">Event Days</span>
          <div className="console-panel__days-pills">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                className={`console-panel__day-pill${event.eventDays === d ? ' console-panel__day-pill--active' : ''}`}
                onClick={() => update({ eventDays: d })}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="console-panel__total-hours">
          {event.durationHours}h &times; {event.eventDays} day{event.eventDays > 1 ? 's' : ''} = {event.durationHours * event.eventDays}h total
        </div>

        {/* Venue fill + status badge */}
        <div className="console-panel__status">
          <div className="venue-fill__bar" style={{ flex: 1, background: 'var(--dark-border)' }}>
            <div
              className="venue-fill__progress"
              style={{
                width: `${Math.min(fillPct, 100)}%`,
                background: getFillRateColor(fillRate),
              }}
            />
          </div>
          <span className={`fill-rate ${getFillRateClass(fillRate)}`} style={{ whiteSpace: 'nowrap' }}>
            {getFillRateLabel(fillRate)}
          </span>
        </div>
      </div>

      {/* ── Signal Boost inputs ── */}
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

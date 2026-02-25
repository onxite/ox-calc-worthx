import { useRef, useState, useCallback } from 'react';

interface ConsoleFaderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  color: string;
  label: string;
  valueDisplay: string;
  subDisplay?: string;
  markers: { value: number; label: string }[];
  onChange: (value: number) => void;
}

function valueToPct(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

function snap(raw: number, min: number, max: number, step: number): number {
  const clamped = Math.max(min, Math.min(max, raw));
  return Math.round(clamped / step) * step;
}

export function ConsoleFader({
  value, min, max, step, color, label,
  valueDisplay, subDisplay, markers, onChange,
}: ConsoleFaderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const pct = Math.max(2, Math.min(98, valueToPct(value, min, max)));

  const updateFromPointer = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const relY = rect.bottom - clientY;
    const ratio = relY / rect.height;
    const raw = min + ratio * (max - min);
    onChange(snap(raw, min, max, step));
  }, [min, max, step, onChange]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromPointer(e.clientY);
  }, [updateFromPointer]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromPointer(e.clientY);
  }, [dragging, updateFromPointer]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newValue = value;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      newValue = Math.min(max, value + step);
      e.preventDefault();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      newValue = Math.max(min, value - step);
      e.preventDefault();
    } else if (e.key === 'Home') {
      newValue = max;
      e.preventDefault();
    } else if (e.key === 'End') {
      newValue = min;
      e.preventDefault();
    }
    if (newValue !== value) onChange(newValue);
  }, [value, min, max, step, onChange]);

  return (
    <div className="console-fader">
      <div className="console-fader__label" style={{ color }}>{label}</div>
      <div className="console-fader__value">{valueDisplay}</div>
      {subDisplay && <div className="console-fader__sub">{subDisplay}</div>}

      <div className="console-fader__body">
        <div
          ref={trackRef}
          className="console-fader__track"
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={handleKeyDown}
          style={{ touchAction: 'none' }}
        >
          {/* Center line at 50% mark */}
          <div className="console-fader__center-line" />

          {/* Fill from bottom */}
          <div
            className="console-fader__fill"
            style={{
              height: `${pct}%`,
              background: `linear-gradient(to top, ${color}22, ${color}55)`,
              borderTop: `2px solid ${color}`,
              transition: dragging ? 'none' : 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />

          {/* Rectangular knob */}
          <div
            className={`console-fader__knob${dragging ? ' console-fader__knob--active' : ''}`}
            style={{
              bottom: `calc(${pct}% - 7px)`,
              background: color,
              boxShadow: `0 0 ${dragging ? 20 : 12}px ${color}${dragging ? '66' : '44'}`,
              transition: dragging ? 'none' : 'bottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="console-fader__knob-groove" />
          </div>
        </div>

        {/* Tick markers */}
        <div className="console-fader__ticks">
          {markers.map((m) => (
            <div
              key={m.value}
              className="console-fader__tick"
              style={{ bottom: `${valueToPct(m.value, min, max)}%` }}
            >
              <span className="console-fader__tick-line" />
              <span className="console-fader__tick-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

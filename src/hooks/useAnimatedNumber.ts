import { useEffect, useRef, useState } from 'react';

/**
 * Smooth number counter animation using requestAnimationFrame.
 * Cubic ease-out easing for natural deceleration.
 *
 * @param target - The number to animate towards
 * @param duration - Animation duration in ms (default 500)
 * @param decimals - Number of decimal places to preserve (default 0 = integers)
 */
export function useAnimatedNumber(target: number, duration = 500, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  const [display, setDisplay] = useState(target);
  const startRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const start = startRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round((start + diff * easeOut) * factor) / factor;

      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        startRef.current = target;
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, factor]);

  return display;
}

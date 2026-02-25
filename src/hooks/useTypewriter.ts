import { useEffect, useRef, useState } from 'react';

/**
 * Character-by-character text animation hook.
 * Used for Atledi AI consultant insight text reveal.
 *
 * Returns three phases:
 *   1. isThinking = true  -> "thinking..." pause before text starts
 *   2. isTyping   = true  -> characters appearing one by one
 *   3. isComplete = true  -> all characters shown
 */
export function useTypewriter(
  text: string,
  speed = 18,
  delay = 1500,
): {
  displayedText: string;
  isThinking: boolean;
  isTyping: boolean;
  isComplete: boolean;
} {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIndex(0);
    setStarted(false);

    timeoutRef.current = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [started, text, speed]);

  return {
    displayedText: text.slice(0, index),
    isThinking: !started && text.length > 0,
    isTyping: started && index < text.length,
    isComplete: index >= text.length,
  };
}

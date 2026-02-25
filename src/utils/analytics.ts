declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

let debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export function trackEventDebounced(
  eventName: string,
  params?: Record<string, string | number | boolean>,
  delay = 500,
) {
  clearTimeout(debounceTimers[eventName]);
  debounceTimers[eventName] = setTimeout(() => {
    trackEvent(eventName, params);
  }, delay);
}

/**
 * Impression Quality Index (IQI)
 * Measures how many times higher quality event impressions
 * are compared to the digital standard (50ms viewability).
 *
 * IQI = (Avg Event Exposure in seconds) / 0.05
 */

export function calculateIQI(avgExposureSeconds: number): number {
  if (avgExposureSeconds <= 0) return 0;
  return Math.round(avgExposureSeconds / 0.05);
}

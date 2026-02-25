/**
 * CPHA — Cost Per Hour of Attention
 * Onxite's canonical metric for quantifying what events sell: time.
 *
 * CPHA = Sponsorship Investment / Total Attention Hours
 */

export function calculateCPHA(value: number, totalAttentionHours: number): number {
  if (totalAttentionHours <= 0) return 0;
  return value / totalAttentionHours;
}

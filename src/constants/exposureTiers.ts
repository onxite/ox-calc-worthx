/**
 * Exposure Time Tiers — from PRD 8.2
 * Each tier maps to a dwell-time multiplier and average seconds.
 */

export type ExposureTierId = 'glance' | 'notice' | 'engage' | 'interact' | 'experience' | 'immerse';

export interface ExposureTier {
  id: ExposureTierId;
  label: string;
  range: string;
  multiplier: number;
  avgSeconds: number;
}

export const EXPOSURE_TIERS: ExposureTier[] = [
  { id: 'glance', label: 'Glance', range: '1\u20135 sec', multiplier: 1.0, avgSeconds: 3 },
  { id: 'notice', label: 'Notice', range: '5\u201315 sec', multiplier: 1.5, avgSeconds: 10 },
  { id: 'engage', label: 'Engage', range: '15\u201360 sec', multiplier: 2.5, avgSeconds: 37 },
  { id: 'interact', label: 'Interact', range: '1\u20133 min', multiplier: 5.0, avgSeconds: 120 },
  { id: 'experience', label: 'Experience', range: '3\u201310 min', multiplier: 10.0, avgSeconds: 390 },
  { id: 'immerse', label: 'Immerse', range: '10+ min', multiplier: 15.0, avgSeconds: 900 },
];

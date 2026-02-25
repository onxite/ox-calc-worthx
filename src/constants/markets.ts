/**
 * DMA Market Multipliers — from PRD 8.3
 */

export const DMA_MULTIPLIERS: Record<string, number> = {
  'New York': 1.50,
  'Los Angeles': 1.40,
  'San Francisco': 1.35,
  'Chicago': 1.25,
  'Washington DC': 1.25,
  'Dallas-Fort Worth': 1.20,
  'Boston': 1.20,
  'Miami': 1.20,
  'Houston': 1.15,
  'Philadelphia': 1.15,
  'Seattle': 1.15,
  'Atlanta': 1.10,
  'Denver': 1.10,
  'Phoenix': 1.05,
  'Minneapolis': 1.05,
  'Other': 1.00,
};

export const MARKET_OPTIONS = Object.entries(DMA_MULTIPLIERS).map(([name, multiplier]) => ({
  name,
  multiplier,
}));

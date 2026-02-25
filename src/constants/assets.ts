/**
 * Unplugged Asset Catalog — from PRD 8.4
 * Organized by SEE / ENGAGE / TRY / ACT purpose.
 */

export type PurposeType = 'see' | 'engage' | 'try' | 'act';

export type UnpluggedAssetId =
  // SEE
  | 'banner_exclusive'
  | 'banner_rotation'
  | 'stage_branding'
  | 'entrance_gate'
  | 'perimeter_boards'
  | 'concourse_signage'
  | 'jersey_uniform'
  | 'jumbotron_led'
  | 'digital_signage'
  // ENGAGE
  | 'activation_10x10'
  | 'activation_20x20'
  | 'activation_30x30'
  | 'photo_booth'
  | 'games_interactive'
  | 'branded_lounge'
  // TRY
  | 'product_sampling'
  | 'merch_giveaways'
  | 'demo_trial'
  | 'tasting_station'
  // ACT
  | 'lead_capture'
  | 'dj_mc_mentions'
  | 'pa_announcements'
  | 'branded_moment'
  | 'qr_code_signage'
  | 'point_of_sale';

export interface UnpluggedAsset {
  id: UnpluggedAssetId;
  name: string;
  purpose: PurposeType;
  cpm: number;
  audiencePct: number;
  defaultExposure: string;
  brandExposurePerHour?: number;
}

export const UNPLUGGED_ASSETS: UnpluggedAsset[] = [
  // ─── SEE ───
  { id: 'banner_exclusive', name: 'Banner (Exclusive)', purpose: 'see', cpm: 100, audiencePct: 0.60, defaultExposure: 'glance' },
  { id: 'banner_rotation', name: 'Banner (Rotation)', purpose: 'see', cpm: 25, audiencePct: 0.40, defaultExposure: 'glance' },
  { id: 'stage_branding', name: 'Stage Branding', purpose: 'see', cpm: 1500, audiencePct: 0.80, defaultExposure: 'notice' },
  { id: 'entrance_gate', name: 'Entrance/Gate', purpose: 'see', cpm: 120, audiencePct: 0.95, defaultExposure: 'notice' },
  { id: 'perimeter_boards', name: 'Perimeter Boards', purpose: 'see', cpm: 50, audiencePct: 0.40, defaultExposure: 'glance' },
  { id: 'concourse_signage', name: 'Concourse Signage', purpose: 'see', cpm: 75, audiencePct: 0.60, defaultExposure: 'glance' },
  { id: 'jersey_uniform', name: 'Jersey/Uniform', purpose: 'see', cpm: 500, audiencePct: 0.50, defaultExposure: 'notice' },
  { id: 'jumbotron_led', name: 'Jumbotron/LED', purpose: 'see', cpm: 200, audiencePct: 0.90, defaultExposure: 'notice' },
  { id: 'digital_signage', name: 'Digital Signage', purpose: 'see', cpm: 150, audiencePct: 0.50, defaultExposure: 'glance' },

  // ─── ENGAGE ───
  { id: 'activation_10x10', name: 'Activation (10\u00D710)', purpose: 'engage', cpm: 600, audiencePct: 0.15, defaultExposure: 'interact', brandExposurePerHour: 80 },
  { id: 'activation_20x20', name: 'Activation (20\u00D720)', purpose: 'engage', cpm: 1000, audiencePct: 0.25, defaultExposure: 'experience', brandExposurePerHour: 150 },
  { id: 'activation_30x30', name: 'Activation (30\u00D730+)', purpose: 'engage', cpm: 1500, audiencePct: 0.35, defaultExposure: 'experience', brandExposurePerHour: 250 },
  { id: 'photo_booth', name: 'Photo Booth', purpose: 'engage', cpm: 800, audiencePct: 0.20, defaultExposure: 'interact', brandExposurePerHour: 60 },
  { id: 'games_interactive', name: 'Games/Interactive', purpose: 'engage', cpm: 400, audiencePct: 0.18, defaultExposure: 'interact', brandExposurePerHour: 100 },
  { id: 'branded_lounge', name: 'Branded Lounge', purpose: 'engage', cpm: 600, audiencePct: 0.10, defaultExposure: 'immerse', brandExposurePerHour: 40 },

  // ─── TRY ───
  { id: 'product_sampling', name: 'Product Sampling', purpose: 'try', cpm: 300, audiencePct: 0.25, defaultExposure: 'engage', brandExposurePerHour: 200 },
  { id: 'merch_giveaways', name: 'Merch/Giveaways', purpose: 'try', cpm: 200, audiencePct: 0.30, defaultExposure: 'engage', brandExposurePerHour: 300 },
  { id: 'demo_trial', name: 'Demo/Trial Station', purpose: 'try', cpm: 500, audiencePct: 0.10, defaultExposure: 'experience', brandExposurePerHour: 50 },
  { id: 'tasting_station', name: 'Tasting Station', purpose: 'try', cpm: 350, audiencePct: 0.20, defaultExposure: 'engage', brandExposurePerHour: 150 },

  // ─── ACT ───
  { id: 'lead_capture', name: 'Lead Capture', purpose: 'act', cpm: 400, audiencePct: 0.08, defaultExposure: 'engage', brandExposurePerHour: 120 },
  { id: 'dj_mc_mentions', name: 'DJ/MC Mentions', purpose: 'act', cpm: 100, audiencePct: 0.85, defaultExposure: 'notice' },
  { id: 'pa_announcements', name: 'PA Announcements', purpose: 'act', cpm: 75, audiencePct: 0.75, defaultExposure: 'notice' },
  { id: 'branded_moment', name: 'Branded Moment', purpose: 'act', cpm: 150, audiencePct: 0.60, defaultExposure: 'notice' },
  { id: 'qr_code_signage', name: 'QR Code Signage', purpose: 'act', cpm: 50, audiencePct: 0.15, defaultExposure: 'engage' },
  { id: 'point_of_sale', name: 'Point of Sale', purpose: 'act', cpm: 500, audiencePct: 0.05, defaultExposure: 'experience', brandExposurePerHour: 80 },
];

export const PURPOSE_CONFIG: Record<PurposeType, { icon: string; label: string; question: string; color: string }> = {
  see: {
    icon: '\uD83D\uDC41\uFE0F',
    label: 'SEE',
    question: 'Will people SEE this without stopping?',
    color: 'var(--oxco-see)',
  },
  engage: {
    icon: '\uD83E\uDD1D',
    label: 'ENGAGE',
    question: 'Will people STOP and interact?',
    color: 'var(--oxco-engage)',
  },
  try: {
    icon: '\uD83E\uDDEA',
    label: 'TRY',
    question: 'Will people SAMPLE or TEST something?',
    color: 'var(--oxco-try)',
  },
  act: {
    icon: '\uD83D\uDCE3',
    label: 'ACT',
    question: 'Will people TAKE a specific action?',
    color: 'var(--oxco-act)',
  },
};

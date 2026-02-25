/**
 * User path configuration — Property vs Brand
 */

export type UserPath = 'property' | 'brand';

export const PATH_CONFIG: Record<UserPath, { icon: string; title: string; description: string; cta: string }> = {
  property: {
    icon: '\uD83C\uDFDF\uFE0F',
    title: 'Property',
    description: 'I have inventory to SELL. Value my assets and create premium packages.',
    cta: 'Work with OX-Collective to create premium inventory',
  },
  brand: {
    icon: '\uD83C\uDFAF',
    title: 'Brand',
    description: 'I\u2019m EVALUATING a sponsorship opportunity. Know if the ask is fair.',
    cta: 'Get OX-Collective to audit this deal',
  },
};

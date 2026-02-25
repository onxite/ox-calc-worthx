/**
 * Atledi Consultant Insight Builder
 * Generates an 8-segment paragraph from valuation results.
 * Zero React imports — pure string construction.
 */

import type { ValuationResult } from './valuation';

type UserPath = 'property' | 'brand';

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtCurrency(n: number): string {
  return '$' + fmt(n);
}

function fmtPercent(n: number): string {
  return (n >= 0 ? '+' : '') + Math.round(n * 100) + '%';
}

function getStrongestSignal(sb: ValuationResult['signalBoost']): string {
  const signals = [
    { name: 'demand', value: sb.demand },
    { name: 'maturity', value: sb.maturity },
    { name: 'exclusivity', value: sb.exclusivity },
    { name: 'depth', value: sb.depth },
    { name: 'amplification', value: sb.amplification },
  ];
  signals.sort((a, b) => b.value - a.value);
  return signals[0].name;
}

function getWeakestSignal(sb: ValuationResult['signalBoost']): string {
  const signals = [
    { name: 'demand', value: sb.demand },
    { name: 'maturity', value: sb.maturity },
    { name: 'exclusivity', value: sb.exclusivity },
    { name: 'depth', value: sb.depth },
    { name: 'amplification', value: sb.amplification },
  ];
  signals.sort((a, b) => a.value - b.value);
  return signals[0].name;
}

function buildWeakestSignalAdvice(weakest: string): string {
  switch (weakest) {
    case 'demand':
      return 'To improve: focus on driving higher attendance or creating a waitlist — scarcity signals command premium pricing.';
    case 'maturity':
      return 'As your event builds history, the maturity signal will naturally strengthen. Each edition adds brand equity.';
    case 'exclusivity':
      return 'Consider reducing the sponsor count or offering category exclusivity — fewer sponsors means less clutter and higher individual value.';
    case 'depth':
      return 'Your biggest opportunity is adding interactive elements. Move beyond SEE assets into ENGAGE, TRY, and ACT to create a full-funnel experience.';
    case 'amplification':
      return 'Adding a media amplification strategy — even earned press coverage — would significantly boost your valuation.';
    default:
      return '';
  }
}

export function buildConsultantInsight(
  results: ValuationResult,
  path: UserPath,
): string {
  const segments: string[] = [];

  // 1. OPENING
  segments.push(
    `Based on the information you\u2019ve provided, I\u2019ve valued your sponsorship inventory at ${fmtCurrency(results.finalValue)}.`,
  );

  // 2. SIGNAL BOOST CONTEXT
  if (results.signalBoost.total > 1.15) {
    segments.push(
      `Your event carries a ${fmtPercent(results.signalBoost.total - 1)} Signal Boost\u2122 premium \u2014 driven primarily by ${getStrongestSignal(results.signalBoost)}.`,
    );
  } else if (results.signalBoost.total < 1.0) {
    segments.push(
      `I should note that your event signals are pulling the valuation down by ${fmtPercent(1 - results.signalBoost.total)}. Let me show you which levers to pull.`,
    );
  } else {
    segments.push(
      `Your Signal Boost\u2122 is ${fmtPercent(results.signalBoost.total - 1)} \u2014 close to neutral, with room to grow.`,
    );
  }

  // 3. GAP ANALYSIS
  const total = results.unpluggedTotal || 1;
  const seePct = results.purposeTotals.see / total;
  if (seePct > 0.6 && results.purposeCount < 4) {
    segments.push(
      `Here\u2019s what stands out: ${Math.round(seePct * 100)}% of your inventory is SEE assets. These are valuable, but they\u2019re the most commoditized.`,
    );
  }

  // 4. OPPORTUNITY (path-dependent)
  if (path === 'property' && results.purposeCount < 3) {
    segments.push(
      'Adding ENGAGE, TRY, or ACT elements could increase your package value by 50\u2013100% without adding more signage.',
    );
  } else if (path === 'brand') {
    segments.push(
      `For context, the base value before Signal Boost\u2122 was ${fmtCurrency(results.baseEventValue)}. The premium reflects the quality signals your event sends to sponsors.`,
    );
  }

  // 5. IQI + CPHA
  if (results.iqi > 0) {
    segments.push(
      `Your event impressions are ${fmt(results.iqi)}x higher quality than digital ads, at a projected CPHA of ${fmtCurrency(results.cpha)}/hour of attention.`,
    );
  }

  // 6. RIGHTS CASCADE (stub — will activate with Rights step)

  // 7. SIGNAL-SPECIFIC ADVICE
  const weakest = getWeakestSignal(results.signalBoost);
  segments.push(buildWeakestSignalAdvice(weakest));

  // 8. CREATIVE OPPORTUNITIES
  if (path === 'property') {
    segments.push(
      'Ready to turn this valuation into a pitch? OX-Collective can help you build presentation-ready packages that defend these numbers.',
    );
  } else {
    segments.push(
      'Remember: this is a projected valuation based on industry benchmarks. To validate these numbers, run the activation through Onxite\u2019s measurement scaffolding.',
    );
  }

  return segments.join(' ');
}

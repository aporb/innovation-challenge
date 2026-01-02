// src/services/riskCalculator.ts
// Risk classification algorithm using category-based rollup

import type { Answer, RiskLevel, RiskResult, Category } from '../types';

const RISK_PRIORITY: RiskLevel[] = ['red', 'orange', 'yellow', 'green'];

/**
 * Get the worst (highest severity) risk level from an array of risks
 */
export function getWorstRisk(risks: RiskLevel[]): RiskLevel {
  for (const level of RISK_PRIORITY) {
    if (risks.includes(level)) {
      return level;
    }
  }
  return 'green';
}

/**
 * Calculate the overall risk result from screening answers
 * Uses category-based rollup: worst risk per category, then worst category = overall
 */
export function calculateRiskResult(answers: Answer[]): RiskResult {
  // Group answers by category
  const byCategory: Record<Category, Answer[]> = {
    health: answers.filter((a) => a.category === 'health'),
    development: answers.filter((a) => a.category === 'development'),
    nutrition: answers.filter((a) => a.category === 'nutrition'),
  };

  // Calculate worst risk per category
  const categoryRisks: Record<Category, RiskLevel> = {
    health: getWorstRisk(byCategory.health.map((a) => a.selectedRisk)),
    development: getWorstRisk(byCategory.development.map((a) => a.selectedRisk)),
    nutrition: getWorstRisk(byCategory.nutrition.map((a) => a.selectedRisk)),
  };

  // Overall risk = worst category risk
  const overall = getWorstRisk(Object.values(categoryRisks));

  // Identify red flags (questions with red answers)
  const redFlags = answers
    .filter((a) => a.selectedRisk === 'red')
    .map((a) => a.questionId);

  // Identify areas of concern (questions with yellow or orange answers)
  const areasOfConcern = answers
    .filter((a) => ['yellow', 'orange'].includes(a.selectedRisk))
    .map((a) => a.questionId);

  return {
    overall,
    categories: categoryRisks,
    redFlags,
    areasOfConcern,
  };
}

/**
 * Get the recommended action based on risk level
 */
export function getRecommendedAction(risk: RiskLevel): {
  en: string;
  sw: string;
  urgency: 'routine' | 'follow-up' | 'urgent' | 'emergency';
} {
  switch (risk) {
    case 'green':
      return {
        en: 'Continue routine care. Schedule next screening in 1 month.',
        sw: 'Endelea na huduma ya kawaida. Panga uchunguzi ujao baada ya mwezi 1.',
        urgency: 'routine',
      };
    case 'yellow':
      return {
        en: 'Provide coaching. Follow up in 2 weeks.',
        sw: 'Toa ushauri. Fuatilia baada ya wiki 2.',
        urgency: 'follow-up',
      };
    case 'orange':
      return {
        en: 'Refer to health facility within 24-48 hours.',
        sw: 'Peleka kituo cha afya ndani ya saa 24-48.',
        urgency: 'urgent',
      };
    case 'red':
      return {
        en: 'EMERGENCY: Take to health facility immediately.',
        sw: 'DHARURA: Peleka kituo cha afya mara moja.',
        urgency: 'emergency',
      };
  }
}

/**
 * Check if any answer indicates an emergency requiring immediate action
 */
export function hasEmergency(answers: Answer[]): boolean {
  return answers.some((a) => a.selectedRisk === 'red');
}

/**
 * Get risk level numeric value for comparison
 */
export function getRiskValue(risk: RiskLevel): number {
  const values: Record<RiskLevel, number> = {
    green: 0,
    yellow: 1,
    orange: 2,
    red: 3,
  };
  return values[risk];
}

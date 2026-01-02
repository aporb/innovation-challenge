// src/types/index.ts
// Core type definitions for Toto Gemma

export type AgeGroup = '0-6m' | '6-24m' | '2-5y';
export type Category = 'health' | 'development' | 'nutrition';
export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';
export type Sex = 'male' | 'female';
export type Language = 'en' | 'sw';

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string; // ISO date string
  ageInMonths?: number; // Alternative to DOB
  sex: Sex;
  village: string;
  caregiverPhone?: string;
  caregiverName?: string;
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

export interface LocalizedText {
  en: string;
  sw: string;
}

export interface Question {
  id: string;
  ageGroup: AgeGroup;
  category: Category;
  orderIndex: number;
  text: LocalizedText;
  answers: {
    green: LocalizedText;
    yellow: LocalizedText;
    orange: LocalizedText;
    red: LocalizedText;
  };
  guidance: {
    chw: string;
    parent: LocalizedText;
    prevention: LocalizedText;
    whenToRefer: LocalizedText;
  };
}

export interface Answer {
  questionId: string;
  category: Category;
  selectedRisk: RiskLevel;
}

export interface RiskResult {
  overall: RiskLevel;
  categories: {
    health: RiskLevel;
    development: RiskLevel;
    nutrition: RiskLevel;
  };
  redFlags: string[]; // Question IDs with red answers
  areasOfConcern: string[]; // Question IDs with yellow/orange
}

export interface Screening {
  id: string;
  childId: string;
  ageGroup: AgeGroup;
  answers: Answer[];
  riskResult: RiskResult | null;
  isComplete: boolean;
  currentQuestionIndex: number;
  createdAt: string;
  completedAt?: string;
  synced: boolean;
}

export interface DashboardStats {
  totalScreenings: number;
  screeningsToday: number;
  riskDistribution: Record<RiskLevel, number>;
  pendingReferrals: number;
  pendingSync: number;
  recentScreenings: (Screening & { childName: string })[];
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  ChildSearch: undefined;
  RegisterChild: { childId?: string };
  Screening: { childId: string; screeningId?: string };
  Results: { screeningId: string };
  Guidance: { screeningId: string };
  Dashboard: undefined;
  History: undefined;
};

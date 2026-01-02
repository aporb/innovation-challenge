// src/store/useScreeningStore.ts
// Screening session state management

import { create } from 'zustand';
import type { Answer, AgeGroup, Category, Screening, RiskResult, Child } from '../types';

interface ScreeningState {
  // Current screening session
  currentScreening: Screening | null;
  currentChild: Child | null;

  // Initialize a new screening
  initScreening: (screening: Screening, child: Child) => void;

  // Answer management
  setAnswer: (questionId: string, category: Category, risk: Answer['selectedRisk']) => void;
  getAnswer: (questionId: string) => Answer | undefined;

  // Navigation
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;

  // Category navigation
  currentCategory: Category;
  setCurrentCategory: (category: Category) => void;

  // Complete screening
  completeScreening: (riskResult: RiskResult) => void;

  // Reset
  resetScreening: () => void;

  // Check if question is answered
  isQuestionAnswered: (questionId: string) => boolean;

  // Get progress
  getProgress: () => { answered: number; total: number; percentage: number };

  // Check for red flags
  hasRedFlags: () => boolean;
  getRedFlagCount: () => number;
}

const QUESTIONS_PER_AGE_GROUP = 15;

export const useScreeningStore = create<ScreeningState>((set, get) => ({
  currentScreening: null,
  currentChild: null,
  currentQuestionIndex: 0,
  currentCategory: 'health',

  initScreening: (screening, child) => {
    set({
      currentScreening: screening,
      currentChild: child,
      currentQuestionIndex: screening.currentQuestionIndex,
      currentCategory: 'health',
    });
  },

  setAnswer: (questionId, category, risk) => {
    const { currentScreening } = get();
    if (!currentScreening) return;

    const existingIndex = currentScreening.answers.findIndex(
      (a) => a.questionId === questionId
    );

    const newAnswer: Answer = { questionId, category, selectedRisk: risk };
    let newAnswers: Answer[];

    if (existingIndex >= 0) {
      newAnswers = [...currentScreening.answers];
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers = [...currentScreening.answers, newAnswer];
    }

    set({
      currentScreening: {
        ...currentScreening,
        answers: newAnswers,
      },
    });
  },

  getAnswer: (questionId) => {
    const { currentScreening } = get();
    return currentScreening?.answers.find((a) => a.questionId === questionId);
  },

  setCurrentQuestionIndex: (index) => {
    const { currentScreening } = get();
    if (!currentScreening) return;

    set({
      currentQuestionIndex: index,
      currentScreening: {
        ...currentScreening,
        currentQuestionIndex: index,
      },
    });
  },

  goToNextQuestion: () => {
    const { currentQuestionIndex, currentScreening } = get();
    if (!currentScreening) return;

    const maxIndex = QUESTIONS_PER_AGE_GROUP - 1;
    if (currentQuestionIndex < maxIndex) {
      const newIndex = currentQuestionIndex + 1;
      set({
        currentQuestionIndex: newIndex,
        currentScreening: {
          ...currentScreening,
          currentQuestionIndex: newIndex,
        },
      });

      // Update category based on question index
      if (newIndex < 5) {
        set({ currentCategory: 'health' });
      } else if (newIndex < 10) {
        set({ currentCategory: 'development' });
      } else {
        set({ currentCategory: 'nutrition' });
      }
    }
  },

  goToPreviousQuestion: () => {
    const { currentQuestionIndex, currentScreening } = get();
    if (!currentScreening) return;

    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      set({
        currentQuestionIndex: newIndex,
        currentScreening: {
          ...currentScreening,
          currentQuestionIndex: newIndex,
        },
      });

      // Update category based on question index
      if (newIndex < 5) {
        set({ currentCategory: 'health' });
      } else if (newIndex < 10) {
        set({ currentCategory: 'development' });
      } else {
        set({ currentCategory: 'nutrition' });
      }
    }
  },

  setCurrentCategory: (category) => {
    const { currentScreening } = get();
    if (!currentScreening) return;

    // Jump to first question of category
    let newIndex: number;
    switch (category) {
      case 'health':
        newIndex = 0;
        break;
      case 'development':
        newIndex = 5;
        break;
      case 'nutrition':
        newIndex = 10;
        break;
    }

    set({
      currentCategory: category,
      currentQuestionIndex: newIndex,
      currentScreening: {
        ...currentScreening,
        currentQuestionIndex: newIndex,
      },
    });
  },

  completeScreening: (riskResult) => {
    const { currentScreening } = get();
    if (!currentScreening) return;

    set({
      currentScreening: {
        ...currentScreening,
        riskResult,
        isComplete: true,
        completedAt: new Date().toISOString(),
      },
    });
  },

  resetScreening: () => {
    set({
      currentScreening: null,
      currentChild: null,
      currentQuestionIndex: 0,
      currentCategory: 'health',
    });
  },

  isQuestionAnswered: (questionId) => {
    const { currentScreening } = get();
    return currentScreening?.answers.some((a) => a.questionId === questionId) ?? false;
  },

  getProgress: () => {
    const { currentScreening } = get();
    const answered = currentScreening?.answers.length ?? 0;
    const total = QUESTIONS_PER_AGE_GROUP;
    return {
      answered,
      total,
      percentage: Math.round((answered / total) * 100),
    };
  },

  hasRedFlags: () => {
    const { currentScreening } = get();
    return currentScreening?.answers.some((a) => a.selectedRisk === 'red') ?? false;
  },

  getRedFlagCount: () => {
    const { currentScreening } = get();
    return currentScreening?.answers.filter((a) => a.selectedRisk === 'red').length ?? 0;
  },
}));

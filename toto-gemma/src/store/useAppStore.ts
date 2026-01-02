// src/store/useAppStore.ts
// Global app state using Zustand

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language, Child, DashboardStats } from '../types';

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Current child being screened
  currentChildId: string | null;
  setCurrentChildId: (id: string | null) => void;

  // Database initialization status
  isDbInitialized: boolean;
  setDbInitialized: (value: boolean) => void;

  // Sync status
  pendingSyncCount: number;
  setPendingSyncCount: (count: number) => void;

  // Recent children cache (for quick access)
  recentChildren: Child[];
  setRecentChildren: (children: Child[]) => void;
  addRecentChild: (child: Child) => void;

  // Dashboard stats cache
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats) => void;

  // App loading state
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language - default to English as per PRD decision
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Current child
      currentChildId: null,
      setCurrentChildId: (id) => set({ currentChildId: id }),

      // Database
      isDbInitialized: false,
      setDbInitialized: (value) => set({ isDbInitialized: value }),

      // Sync
      pendingSyncCount: 0,
      setPendingSyncCount: (count) => set({ pendingSyncCount: count }),

      // Recent children
      recentChildren: [],
      setRecentChildren: (children) => set({ recentChildren: children }),
      addRecentChild: (child) => {
        const current = get().recentChildren;
        const filtered = current.filter((c) => c.id !== child.id);
        set({ recentChildren: [child, ...filtered].slice(0, 10) });
      },

      // Dashboard
      dashboardStats: null,
      setDashboardStats: (stats) => set({ dashboardStats: stats }),

      // Loading
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: 'toto-gemma-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        recentChildren: state.recentChildren,
      }),
    }
  )
);

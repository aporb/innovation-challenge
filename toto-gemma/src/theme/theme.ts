// src/theme/theme.ts
// Material Design 3 theme configuration for Toto Gemma

import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// Color palette from cultural context analysis
export const COLORS = {
  // Primary colors
  primaryBlue: '#1565C0',
  secondaryPink: '#E91E63',

  // Risk level colors (MUAC-aligned)
  riskGreen: '#4CAF50',
  riskYellow: '#FFC107',
  riskOrange: '#FF9800',
  riskRed: '#F44336',

  // Background and text
  background: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textOnPrimary: '#FFFFFF',

  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // Borders and dividers
  border: '#E0E0E0',
  divider: '#EEEEEE',
};

// Risk level color mapping
export const RISK_COLORS: Record<string, string> = {
  green: COLORS.riskGreen,
  yellow: COLORS.riskYellow,
  orange: COLORS.riskOrange,
  red: COLORS.riskRed,
};

// Risk level labels
export const RISK_LABELS: Record<string, { en: string; sw: string }> = {
  green: { en: 'Low Risk', sw: 'Hatari ya Chini' },
  yellow: { en: 'Moderate Risk', sw: 'Hatari ya Wastani' },
  orange: { en: 'High Risk', sw: 'Hatari ya Juu' },
  red: { en: 'Critical Risk', sw: 'Hatari Kubwa' },
};

// Category icons (emoji for simplicity in demo)
export const CATEGORY_ICONS: Record<string, string> = {
  health: '🫀',
  development: '🧒',
  nutrition: '🍎',
};

// Category labels
export const CATEGORY_LABELS: Record<string, { en: string; sw: string }> = {
  health: { en: 'Health', sw: 'Afya' },
  development: { en: 'Development', sw: 'Maendeleo' },
  nutrition: { en: 'Nutrition', sw: 'Lishe' },
};

// Font configuration - using system fonts for smaller bundle
const fontConfig = {
  displayLarge: { fontFamily: 'System', fontSize: 57, fontWeight: '400' as const },
  displayMedium: { fontFamily: 'System', fontSize: 45, fontWeight: '400' as const },
  displaySmall: { fontFamily: 'System', fontSize: 36, fontWeight: '400' as const },
  headlineLarge: { fontFamily: 'System', fontSize: 32, fontWeight: '400' as const },
  headlineMedium: { fontFamily: 'System', fontSize: 28, fontWeight: '400' as const },
  headlineSmall: { fontFamily: 'System', fontSize: 24, fontWeight: '400' as const },
  titleLarge: { fontFamily: 'System', fontSize: 22, fontWeight: '500' as const },
  titleMedium: { fontFamily: 'System', fontSize: 16, fontWeight: '500' as const },
  titleSmall: { fontFamily: 'System', fontSize: 14, fontWeight: '500' as const },
  labelLarge: { fontFamily: 'System', fontSize: 14, fontWeight: '500' as const },
  labelMedium: { fontFamily: 'System', fontSize: 12, fontWeight: '500' as const },
  labelSmall: { fontFamily: 'System', fontSize: 11, fontWeight: '500' as const },
  bodyLarge: { fontFamily: 'System', fontSize: 16, fontWeight: '400' as const },
  bodyMedium: { fontFamily: 'System', fontSize: 14, fontWeight: '400' as const },
  bodySmall: { fontFamily: 'System', fontSize: 12, fontWeight: '400' as const },
};

// Main theme configuration
export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primaryBlue,
    onPrimary: COLORS.textOnPrimary,
    primaryContainer: '#E3F2FD',
    onPrimaryContainer: '#0D47A1',
    secondary: COLORS.secondaryPink,
    onSecondary: COLORS.textOnPrimary,
    secondaryContainer: '#FCE4EC',
    onSecondaryContainer: '#880E4F',
    background: COLORS.background,
    onBackground: COLORS.textPrimary,
    surface: COLORS.surface,
    onSurface: COLORS.textPrimary,
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: COLORS.textSecondary,
    error: COLORS.error,
    onError: COLORS.textOnPrimary,
    outline: COLORS.border,
    outlineVariant: COLORS.divider,
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Spacing scale (8px base)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Touch target sizes (accessibility)
export const TOUCH_TARGET = {
  min: 44, // Minimum touch target size
  button: 48,
  large: 56,
};

export default theme;

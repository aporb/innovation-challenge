// App.tsx
// Root component for Toto Gemma app

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Initialize i18n
import './src/i18n';

import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/theme/theme';

// Customize the Material Design 3 theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primaryBlue,
    secondary: COLORS.riskGreen,
    background: COLORS.background,
    surface: COLORS.surface,
    error: COLORS.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: COLORS.textPrimary,
    onSurface: COLORS.textPrimary,
    surfaceVariant: COLORS.surface,
    outline: COLORS.border,
  },
  roundness: 12,
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

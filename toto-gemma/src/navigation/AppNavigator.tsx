// src/navigation/AppNavigator.tsx
// Main navigation structure using React Navigation

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import type { RootStackParamList } from '../types';
import { COLORS } from '../theme/theme';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ChildSearchScreen from '../screens/ChildSearchScreen';
import RegisterChildScreen from '../screens/RegisterChildScreen';
import ScreeningScreen from '../screens/ScreeningScreen';
import ResultsScreen from '../screens/ResultsScreen';
import GuidanceScreen from '../screens/GuidanceScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primaryBlue,
          },
          headerTintColor: COLORS.textOnPrimary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChildSearch"
          component={ChildSearchScreen}
          options={{
            title: t('childSearch.title'),
          }}
        />
        <Stack.Screen
          name="RegisterChild"
          component={RegisterChildScreen}
          options={{
            title: t('register.title'),
          }}
        />
        <Stack.Screen
          name="Screening"
          component={ScreeningScreen}
          options={{
            title: t('screening.title'),
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            title: t('results.title'),
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Guidance"
          component={GuidanceScreen}
          options={{
            title: t('guidance.title'),
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: t('dashboard.title'),
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: t('history.title'),
          }}
        />
      </Stack.Navigator>
  );
}

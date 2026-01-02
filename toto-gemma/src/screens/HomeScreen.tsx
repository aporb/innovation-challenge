// src/screens/HomeScreen.tsx
// Main home screen with primary actions

import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Button, Surface, IconButton, SegmentedButtons, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../types';
import { useAppStore } from '../store/useAppStore';
import { initDatabase, seedDemoData, getDashboardStats } from '../services/database';
import { COLORS, SPACING } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const {
    language,
    setLanguage,
    isDbInitialized,
    setDbInitialized,
    pendingSyncCount,
    setPendingSyncCount,
    setDashboardStats,
  } = useAppStore();

  // Initialize database on first load
  useEffect(() => {
    async function init() {
      if (!isDbInitialized) {
        try {
          await initDatabase();
          await seedDemoData();
          setDbInitialized(true);

          // Load initial stats
          const stats = await getDashboardStats();
          setDashboardStats(stats);
          setPendingSyncCount(stats.pendingSync);
        } catch (error) {
          console.error('Failed to initialize database:', error);
        }
      }
    }
    init();
  }, [isDbInitialized]);

  // Sync language with i18n
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'sw');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlue} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.menuPlaceholder} />
          <SegmentedButtons
            value={language}
            onValueChange={handleLanguageChange}
            buttons={[
              { value: 'en', label: 'EN' },
              { value: 'sw', label: 'SW' },
            ]}
            style={styles.languageToggle}
            density="small"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text variant="displaySmall" style={styles.title}>
            🏥 {t('app.name')}
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            {t('app.tagline')}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Primary Action */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ChildSearch')}
          style={styles.primaryButton}
          contentStyle={styles.primaryButtonContent}
          labelStyle={styles.primaryButtonLabel}
          icon="plus"
        >
          {t('home.newScreening')}
        </Button>

        {/* Secondary Actions */}
        <View style={styles.secondaryActions}>
          <Surface style={styles.actionCard} elevation={2}>
            <IconButton
              icon="clipboard-text-outline"
              size={32}
              iconColor={COLORS.primaryBlue}
              onPress={() => navigation.navigate('History')}
            />
            <Text variant="labelLarge" style={styles.actionLabel}>
              {t('home.history')}
            </Text>
          </Surface>

          <Surface style={styles.actionCard} elevation={2}>
            <IconButton
              icon="chart-bar"
              size={32}
              iconColor={COLORS.primaryBlue}
              onPress={() => navigation.navigate('Dashboard')}
            />
            <Text variant="labelLarge" style={styles.actionLabel}>
              {t('home.dashboard')}
            </Text>
          </Surface>
        </View>

        {/* Status Bar */}
        <Surface style={styles.statusBar} elevation={1}>
          <View style={styles.statusRow}>
            <Chip icon="check-circle" textStyle={styles.statusChipText}>
              {t('home.offlineReady')}
            </Chip>
          </View>
          <View style={styles.statusDetails}>
            <Text variant="bodySmall" style={styles.statusText}>
              {t('home.lastSync')}: {t('home.today')} 8:30 AM
            </Text>
            {pendingSyncCount > 0 && (
              <Text variant="bodySmall" style={styles.pendingText}>
                {t('home.pendingSync', { count: pendingSyncCount })}
              </Text>
            )}
          </View>
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  menuPlaceholder: {
    width: 48,
  },
  languageToggle: {
    maxWidth: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  title: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textOnPrimary,
    opacity: 0.9,
    marginTop: SPACING.xs,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: SPACING.lg,
  },
  primaryButtonContent: {
    paddingVertical: SPACING.md,
  },
  primaryButtonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  actionLabel: {
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  statusBar: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginTop: 'auto',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statusChipText: {
    color: COLORS.riskGreen,
  },
  statusDetails: {
    paddingLeft: SPACING.xs,
  },
  statusText: {
    color: COLORS.textSecondary,
  },
  pendingText: {
    color: COLORS.riskOrange,
    marginTop: SPACING.xs,
  },
});

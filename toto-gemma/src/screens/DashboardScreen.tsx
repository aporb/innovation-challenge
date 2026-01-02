// src/screens/DashboardScreen.tsx
// Supervisor dashboard with statistics

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Surface, Divider, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList, DashboardStats, RiskLevel } from '../types';
import { getDashboardStats } from '../services/database';
import { useAppStore } from '../store/useAppStore';
import { COLORS, SPACING, RISK_COLORS } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const RISK_EMOJI: Record<RiskLevel, string> = {
  green: '🟢',
  yellow: '🟡',
  orange: '🟠',
  red: '🔴',
};

export default function DashboardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { dashboardStats, setDashboardStats, pendingSyncCount } = useAppStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(dashboardStats);

  const loadStats = async () => {
    try {
      const newStats = await getDashboardStats();
      setStats(newStats);
      setDashboardStats(newStats);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadStats();
    setIsRefreshing(false);
  };

  if (!stats) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  const totalRisk = stats.riskDistribution.green +
    stats.riskDistribution.yellow +
    stats.riskDistribution.orange +
    stats.riskDistribution.red;

  const getPercentage = (count: number) => {
    if (totalRisk === 0) return 0;
    return Math.round((count / totalRisk) * 100);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <Surface style={styles.summaryCard} elevation={2}>
          <Text variant="displaySmall" style={styles.summaryNumber}>
            {stats.totalScreenings}
          </Text>
          <Text variant="labelMedium" style={styles.summaryLabel}>
            {t('dashboard.totalScreenings')}
          </Text>
        </Surface>

        <Surface style={styles.summaryCard} elevation={2}>
          <Text variant="displaySmall" style={styles.summaryNumber}>
            {stats.screeningsToday}
          </Text>
          <Text variant="labelMedium" style={styles.summaryLabel}>
            {t('dashboard.today')}
          </Text>
        </Surface>
      </View>

      {/* Risk Distribution */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t('dashboard.riskDistribution')}
      </Text>
      <Surface style={styles.riskCard} elevation={1}>
        {(Object.keys(stats.riskDistribution) as RiskLevel[]).map((level) => {
          const count = stats.riskDistribution[level];
          const percentage = getPercentage(count);
          return (
            <View key={level} style={styles.riskRow}>
              <View style={styles.riskLabel}>
                <Text style={styles.riskEmoji}>{RISK_EMOJI[level]}</Text>
                <Text variant="bodyLarge" style={styles.riskName}>
                  {t(`results.riskLevels.${level}`)}
                </Text>
              </View>
              <View style={styles.riskStats}>
                <View
                  style={[
                    styles.riskBar,
                    {
                      width: `${Math.max(percentage, 5)}%`,
                      backgroundColor: RISK_COLORS[level],
                    },
                  ]}
                />
                <Text variant="labelLarge" style={styles.riskCount}>
                  {count} ({percentage}%)
                </Text>
              </View>
            </View>
          );
        })}
      </Surface>

      {/* Pending Referrals */}
      {stats.pendingReferrals > 0 && (
        <Surface style={styles.alertCard} elevation={2}>
          <Text variant="titleMedium" style={styles.alertTitle}>
            ⚠️ {stats.pendingReferrals} {t('dashboard.pendingReferrals')}
          </Text>
          <Button mode="text" onPress={() => navigation.navigate('History')}>
            {t('dashboard.viewDetails')}
          </Button>
        </Surface>
      )}

      <Divider style={styles.divider} />

      {/* Sync Status */}
      <Surface style={styles.syncCard} elevation={1}>
        <Text variant="bodyMedium" style={styles.syncText}>
          {t('dashboard.pendingSync')}: {pendingSyncCount} {t('dashboard.screenings')}
        </Text>
      </Surface>

      {/* Recent Activity */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t('dashboard.recentActivity')}
      </Text>
      {stats.recentScreenings.length === 0 ? (
        <Surface style={styles.emptyCard} elevation={1}>
          <Text variant="bodyMedium" style={styles.emptyText}>
            {t('dashboard.noActivity')}
          </Text>
        </Surface>
      ) : (
        stats.recentScreenings.slice(0, 5).map((screening) => (
          <Surface key={screening.id} style={styles.activityCard} elevation={1}>
            <View style={styles.activityRow}>
              <View style={styles.activityInfo}>
                <Text variant="bodyLarge" style={styles.activityName}>
                  {screening.childName}
                </Text>
                <Text variant="bodySmall" style={styles.activityDate}>
                  {new Date(screening.completedAt || screening.createdAt).toLocaleDateString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <View style={styles.activityRisk}>
                <Text style={styles.activityEmoji}>
                  {RISK_EMOJI[screening.riskResult?.overall || 'green']}
                </Text>
              </View>
            </View>
          </Surface>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  summaryCard: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  summaryNumber: {
    color: COLORS.primaryBlue,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  riskCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  riskLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  riskEmoji: {
    marginRight: SPACING.sm,
  },
  riskName: {
    color: COLORS.textPrimary,
  },
  riskStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  riskBar: {
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  riskCount: {
    color: COLORS.textSecondary,
    minWidth: 60,
    textAlign: 'right',
  },
  alertCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertTitle: {
    color: COLORS.riskOrange,
    flex: 1,
  },
  divider: {
    marginVertical: SPACING.lg,
  },
  syncCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  syncText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptyCard: {
    padding: SPACING.lg,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
  },
  activityCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  activityDate: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  activityRisk: {
    marginLeft: SPACING.md,
  },
  activityEmoji: {
    fontSize: 24,
  },
});

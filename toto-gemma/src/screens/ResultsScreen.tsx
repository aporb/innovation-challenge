// src/screens/ResultsScreen.tsx
// Display screening results with risk classification

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import type { RootStackParamList, Screening, Child, Category, RiskLevel } from '../types';
import { getScreeningById, getChildById } from '../services/database';
import { getQuestionById } from '../data/questions';
import { getRecommendedAction } from '../services/riskCalculator';
import { useAppStore } from '../store/useAppStore';
import { COLORS, SPACING, RISK_COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;
type ResultsRouteProp = RouteProp<RootStackParamList, 'Results'>;

const RISK_EMOJI: Record<RiskLevel, string> = {
  green: '🟢',
  yellow: '🟡',
  orange: '🟠',
  red: '🔴',
};

export default function ResultsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultsRouteProp>();
  const language = useAppStore((state) => state.language);

  const [screening, setScreening] = useState<Screening | null>(null);
  const [child, setChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const s = await getScreeningById(route.params.screeningId);
        if (s) {
          setScreening(s);
          const c = await getChildById(s.childId);
          setChild(c);
        }
      } catch (error) {
        console.error('Failed to load results:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [route.params.screeningId]);

  if (isLoading || !screening || !child || !screening.riskResult) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  const { overall, categories, redFlags, areasOfConcern } = screening.riskResult;
  const action = getRecommendedAction(overall);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Child Info */}
      <Text variant="titleLarge" style={styles.childName}>
        {child.name}
      </Text>
      <Text variant="bodySmall" style={styles.dateText}>
        {new Date(screening.completedAt || screening.createdAt).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>

      {/* Overall Risk */}
      <Surface
        style={[styles.riskCard, { borderColor: RISK_COLORS[overall], borderWidth: 3 }]}
        elevation={3}
      >
        <Text style={[styles.riskEmoji]}>{RISK_EMOJI[overall]}</Text>
        <Text variant="headlineMedium" style={[styles.riskLevel, { color: RISK_COLORS[overall] }]}>
          {t(`results.riskLevels.${overall}`)}
        </Text>
        <Text variant="bodyLarge" style={styles.actionText}>
          {action[language]}
        </Text>
      </Surface>

      {/* Category Breakdown */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t('results.categoryBreakdown')}
      </Text>
      <Surface style={styles.categoriesCard} elevation={1}>
        {(Object.keys(categories) as Category[]).map((cat) => (
          <View key={cat} style={styles.categoryRow}>
            <Text variant="bodyLarge" style={styles.categoryLabel}>
              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat][language]}
            </Text>
            <View style={styles.categoryRisk}>
              <Text style={styles.categoryEmoji}>{RISK_EMOJI[categories[cat]]}</Text>
              <Text
                variant="labelLarge"
                style={[styles.categoryRiskText, { color: RISK_COLORS[categories[cat]] }]}
              >
                {t(`results.riskLevels.${categories[cat]}`)}
              </Text>
            </View>
          </View>
        ))}
      </Surface>

      {/* Areas of Concern */}
      {(redFlags.length > 0 || areasOfConcern.length > 0) && (
        <>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {t('results.areasOfConcern')}
          </Text>
          <Surface style={styles.concernsCard} elevation={1}>
            {redFlags.map((qId) => {
              const question = getQuestionById(qId);
              return question ? (
                <View key={qId} style={styles.concernItem}>
                  <Text style={styles.concernEmoji}>🔴</Text>
                  <Text variant="bodyMedium" style={styles.concernText}>
                    {question.text[language]}
                  </Text>
                </View>
              ) : null;
            })}
            {areasOfConcern.map((qId) => {
              const question = getQuestionById(qId);
              const answer = screening.answers.find((a) => a.questionId === qId);
              return question ? (
                <View key={qId} style={styles.concernItem}>
                  <Text style={styles.concernEmoji}>
                    {answer?.selectedRisk === 'orange' ? '🟠' : '🟡'}
                  </Text>
                  <Text variant="bodyMedium" style={styles.concernText}>
                    {question.text[language]}
                  </Text>
                </View>
              ) : null;
            })}
          </Surface>
        </>
      )}

      {areasOfConcern.length === 0 && redFlags.length === 0 && (
        <Surface style={styles.noIssuesCard} elevation={1}>
          <Text variant="bodyLarge" style={styles.noIssuesText}>
            ✅ {t('results.noIssues')}
          </Text>
        </Surface>
      )}

      <Divider style={styles.divider} />

      {/* Actions */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Guidance', { screeningId: screening.id })}
        style={styles.primaryButton}
        contentStyle={styles.buttonContent}
        icon="message-text"
      >
        {t('results.viewGuidance')}
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Home')}
        style={styles.secondaryButton}
        contentStyle={styles.buttonContent}
        icon="home"
      >
        {t('results.returnHome')}
      </Button>
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
  childName: {
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  dateText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  riskCard: {
    padding: SPACING.xl,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  riskEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  riskLevel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  actionText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  categoriesCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  categoryLabel: {
    color: COLORS.textPrimary,
  },
  categoryRisk: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    marginRight: SPACING.xs,
  },
  categoryRiskText: {
    fontWeight: '600',
  },
  concernsCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  concernItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  concernEmoji: {
    marginRight: SPACING.sm,
    fontSize: 16,
  },
  concernText: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  noIssuesCard: {
    padding: SPACING.lg,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  noIssuesText: {
    color: COLORS.riskGreen,
  },
  divider: {
    marginVertical: SPACING.lg,
  },
  primaryButton: {
    borderRadius: 12,
    marginBottom: SPACING.sm,
  },
  secondaryButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: SPACING.sm,
  },
});

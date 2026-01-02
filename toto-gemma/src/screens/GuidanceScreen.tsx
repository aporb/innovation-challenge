// src/screens/GuidanceScreen.tsx
// Display caregiver guidance with SMS/WhatsApp sharing

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Share } from 'react-native';
import { Text, Button, Surface, Divider, Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';

import type { RootStackParamList, Screening, Child, Category } from '../types';
import { getScreeningById, getChildById } from '../services/database';
import { getQuestionById } from '../data/questions';
import { getRecommendedAction } from '../services/riskCalculator';
import { useAppStore } from '../store/useAppStore';
import { COLORS, SPACING, CATEGORY_ICONS, CATEGORY_LABELS } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Guidance'>;
type GuidanceRouteProp = RouteProp<RootStackParamList, 'Guidance'>;

interface GuidanceItem {
  category: Category;
  text: string;
}

export default function GuidanceScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuidanceRouteProp>();
  const language = useAppStore((state) => state.language);

  const [screening, setScreening] = useState<Screening | null>(null);
  const [child, setChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
        console.error('Failed to load guidance:', error);
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

  // Gather guidance from areas of concern
  const guidanceItems: GuidanceItem[] = [];
  const { areasOfConcern, redFlags } = screening.riskResult;

  [...redFlags, ...areasOfConcern].forEach((qId) => {
    const question = getQuestionById(qId);
    if (question) {
      const parentGuidance = question.guidance.parent[language];
      if (parentGuidance && !guidanceItems.find((g) => g.text === parentGuidance)) {
        guidanceItems.push({
          category: question.category,
          text: parentGuidance,
        });
      }
    }
  });

  // If no specific concerns, show prevention reminders
  if (guidanceItems.length === 0) {
    screening.answers.forEach((answer) => {
      const question = getQuestionById(answer.questionId);
      if (question && answer.selectedRisk === 'green') {
        const prevention = question.guidance.prevention[language];
        if (prevention && !guidanceItems.find((g) => g.text === prevention)) {
          guidanceItems.push({
            category: question.category,
            text: prevention,
          });
        }
      }
    });
  }

  // Group by category
  const groupedGuidance: Record<Category, string[]> = {
    health: [],
    development: [],
    nutrition: [],
  };

  guidanceItems.forEach((item) => {
    groupedGuidance[item.category].push(item.text);
  });

  const action = getRecommendedAction(screening.riskResult.overall);

  // Generate message for sharing
  const generateMessage = (): string => {
    const lines: string[] = [
      `TOTO GEMMA - ${language === 'sw' ? 'Matokeo ya Uchunguzi wa Afya ya Mtoto' : 'Child Health Screening Result'}`,
      '',
      `${language === 'sw' ? 'Mtoto' : 'Child'}: ${child.name}`,
      `${language === 'sw' ? 'Kiwango cha Hatari' : 'Risk Level'}: ${t(`results.riskLevels.${screening.riskResult!.overall}`)}`,
      '',
      `${language === 'sw' ? 'Mapendekezo' : 'Recommendations'}:`,
    ];

    Object.entries(groupedGuidance).forEach(([cat, items]) => {
      if (items.length > 0) {
        lines.push(`\n${CATEGORY_ICONS[cat as Category]} ${CATEGORY_LABELS[cat as Category][language]}:`);
        items.slice(0, 2).forEach((item) => {
          lines.push(`• ${item}`);
        });
      }
    });

    lines.push('');
    lines.push(`${language === 'sw' ? 'Hatua Zifuatazo' : 'Next Steps'}: ${action[language]}`);
    lines.push('');
    lines.push(language === 'sw'
      ? 'Wasiliana na Mhudumu wako wa Afya ya Jamii kwa maswali.'
      : 'Contact your Community Health Worker for questions.');

    return lines.join('\n');
  };

  const handleSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(t('common.error'), 'SMS is not available on this device');
      return;
    }

    try {
      const message = generateMessage();
      const phone = child.caregiverPhone || '';
      const { result } = await SMS.sendSMSAsync(
        phone ? [phone] : [],
        message
      );

      if (result === 'sent') {
        setSnackbarMessage(t('guidance.sendSuccess'));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
      setSnackbarMessage(t('guidance.sendError'));
      setSnackbarVisible(true);
    }
  };

  const handleWhatsApp = async () => {
    try {
      const message = generateMessage();
      const phone = child.caregiverPhone?.replace(/[^0-9]/g, '') || '';
      const whatsappUrl = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback to web WhatsApp
        const webUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Failed to open WhatsApp:', error);
      setSnackbarMessage(t('guidance.sendError'));
      setSnackbarVisible(true);
    }
  };

  const handleComplete = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {t('guidance.subtitle')}
        </Text>

        {/* Guidance by Category */}
        {(Object.keys(groupedGuidance) as Category[]).map((category) => {
          const items = groupedGuidance[category];
          if (items.length === 0) return null;

          return (
            <Surface key={category} style={styles.categoryCard} elevation={1}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{CATEGORY_ICONS[category]}</Text>
                <Text variant="titleMedium" style={styles.categoryTitle}>
                  {CATEGORY_LABELS[category][language]}
                </Text>
              </View>
              {items.map((item, index) => (
                <Text key={index} variant="bodyMedium" style={styles.guidanceText}>
                  "{item}"
                </Text>
              ))}
            </Surface>
          );
        })}

        {/* Follow-up */}
        <Surface style={styles.followUpCard} elevation={1}>
          <Text variant="titleMedium" style={styles.followUpTitle}>
            📅 {t('guidance.followUp')}
          </Text>
          <Text variant="bodyMedium" style={styles.followUpText}>
            {action[language]}
          </Text>
        </Surface>

        <Divider style={styles.divider} />

        {/* Share Options */}
        <Text variant="titleMedium" style={styles.shareTitle}>
          {t('guidance.shareWith')}
        </Text>
        <View style={styles.shareButtons}>
          <Button
            mode="outlined"
            onPress={handleSMS}
            style={styles.shareButton}
            icon="message-text"
          >
            {t('guidance.sms')}
          </Button>
          <Button
            mode="outlined"
            onPress={handleWhatsApp}
            style={styles.shareButton}
            icon="whatsapp"
          >
            {t('guidance.whatsapp')}
          </Button>
        </View>
      </ScrollView>

      {/* Complete Button */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleComplete}
          style={styles.completeButton}
          contentStyle={styles.completeButtonContent}
          icon="check"
        >
          {t('guidance.complete')}
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
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
  subtitle: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  categoryCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  categoryTitle: {
    color: COLORS.primaryBlue,
    fontWeight: '600',
  },
  guidanceText: {
    color: COLORS.textPrimary,
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: SPACING.sm,
    paddingLeft: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primaryBlue,
  },
  followUpCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginTop: SPACING.sm,
  },
  followUpTitle: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  followUpText: {
    color: COLORS.textSecondary,
  },
  divider: {
    marginVertical: SPACING.lg,
  },
  shareTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  completeButton: {
    borderRadius: 12,
  },
  completeButtonContent: {
    paddingVertical: SPACING.sm,
  },
});

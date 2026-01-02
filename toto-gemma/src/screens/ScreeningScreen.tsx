// src/screens/ScreeningScreen.tsx
// Main screening questionnaire screen

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, BackHandler } from 'react-native';
import {
  Text,
  Button,
  Surface,
  ProgressBar,
  SegmentedButtons,
  Portal,
  Dialog,
  IconButton,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import type { RootStackParamList, AgeGroup, Category, RiskLevel, Screening } from '../types';
import { useScreeningStore } from '../store/useScreeningStore';
import { useAppStore } from '../store/useAppStore';
import {
  getChildById,
  getIncompleteScreening,
  insertScreening,
  updateScreening,
} from '../services/database';
import { getQuestionsForAgeGroup } from '../data/questions';
import { calculateRiskResult } from '../services/riskCalculator';
import { COLORS, SPACING, RISK_COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Screening'>;
type ScreeningRouteProp = RouteProp<RootStackParamList, 'Screening'>;

function calculateAgeGroup(dateOfBirth: string, ageInMonths?: number): AgeGroup {
  let months = ageInMonths ?? 0;
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  }
  if (months < 6) return '0-6m';
  if (months < 24) return '6-24m';
  return '2-5y';
}

export default function ScreeningScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreeningRouteProp>();
  const language = useAppStore((state) => state.language);

  const {
    currentScreening,
    currentChild,
    currentQuestionIndex,
    currentCategory,
    initScreening,
    setAnswer,
    getAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    setCurrentCategory,
    completeScreening,
    getProgress,
    hasRedFlags,
    resetScreening,
  } = useScreeningStore();

  const [isLoading, setIsLoading] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showRedAlert, setShowRedAlert] = useState(false);

  // Initialize screening
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const child = await getChildById(route.params.childId);
        if (!child) {
          navigation.goBack();
          return;
        }

        const ageGroup = calculateAgeGroup(child.dateOfBirth, child.ageInMonths);

        // Check for incomplete screening
        let screening = await getIncompleteScreening(child.id);

        if (!screening) {
          // Create new screening
          screening = {
            id: uuidv4(),
            childId: child.id,
            ageGroup,
            answers: [],
            riskResult: null,
            isComplete: false,
            currentQuestionIndex: 0,
            createdAt: new Date().toISOString(),
            synced: false,
          };
          await insertScreening(screening);
        }

        initScreening(screening, child);
      } catch (error) {
        console.error('Failed to initialize screening:', error);
      } finally {
        setIsLoading(false);
      }
    }
    init();

    return () => {
      // Don't reset on unmount - we want to preserve state for resume
    };
  }, [route.params.childId]);

  // Handle back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowExitDialog(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  // Auto-save on answer change
  useEffect(() => {
    async function autoSave() {
      if (currentScreening) {
        await updateScreening(currentScreening);
      }
    }
    autoSave();
  }, [currentScreening?.answers]);

  if (isLoading || !currentScreening || !currentChild) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t('common.loading')}</Text>
      </View>
    );
  }

  const questions = getQuestionsForAgeGroup(currentScreening.ageGroup);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = getProgress();

  const handleAnswerSelect = (risk: RiskLevel) => {
    setAnswer(currentQuestion.id, currentQuestion.category, risk);

    // Show red alert if red is selected
    if (risk === 'red') {
      setShowRedAlert(true);
    }
  };

  const handleComplete = async () => {
    if (progress.answered < progress.total) {
      Alert.alert(t('screening.title'), t('screening.allRequired'));
      return;
    }

    const riskResult = calculateRiskResult(currentScreening.answers);
    completeScreening(riskResult);

    // Update in database
    await updateScreening({
      ...currentScreening,
      riskResult,
      isComplete: true,
      completedAt: new Date().toISOString(),
    });

    navigation.replace('Results', { screeningId: currentScreening.id });
  };

  const handleExit = async () => {
    setShowExitDialog(false);
    await updateScreening(currentScreening);
    resetScreening();
    navigation.navigate('Home');
  };

  const currentAnswer = getAnswer(currentQuestion.id);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Get localized text
  const questionText = currentQuestion.text[language];
  const greenText = currentQuestion.answers.green[language];
  const yellowText = currentQuestion.answers.yellow[language];
  const orangeText = currentQuestion.answers.orange[language];
  const redText = currentQuestion.answers.red[language];

  return (
    <View style={styles.container}>
      {/* Header with child info */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton
            icon="close"
            onPress={() => setShowExitDialog(true)}
            iconColor={COLORS.textPrimary}
          />
          <Text variant="titleMedium" style={styles.childName}>
            {currentChild.name}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress.percentage / 100}
            color={COLORS.primaryBlue}
            style={styles.progressBar}
          />
          <Text variant="bodySmall" style={styles.progressText}>
            {progress.percentage}%
          </Text>
        </View>

        {/* Category tabs */}
        <SegmentedButtons
          value={currentCategory}
          onValueChange={(value) => setCurrentCategory(value as Category)}
          buttons={[
            {
              value: 'health',
              label: `${CATEGORY_ICONS.health} ${CATEGORY_LABELS.health[language]}`,
            },
            {
              value: 'development',
              label: `${CATEGORY_ICONS.development} ${CATEGORY_LABELS.development[language]}`,
            },
            {
              value: 'nutrition',
              label: `${CATEGORY_ICONS.nutrition} ${CATEGORY_LABELS.nutrition[language]}`,
            },
          ]}
          style={styles.categoryTabs}
          density="small"
        />
      </View>

      {/* Question */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text variant="labelMedium" style={styles.questionNumber}>
          {t('screening.question', { number: currentQuestionIndex + 1 })} {t('screening.progress', { current: currentQuestionIndex + 1, total: questions.length })}
        </Text>

        <Surface style={styles.questionCard} elevation={2}>
          <Text variant="bodyLarge" style={styles.questionText}>
            {questionText}
          </Text>
        </Surface>

        {/* Answer Options */}
        <View style={styles.answersContainer}>
          {greenText && (
            <AnswerOption
              color="green"
              text={greenText}
              selected={currentAnswer?.selectedRisk === 'green'}
              onSelect={() => handleAnswerSelect('green')}
            />
          )}
          {yellowText && (
            <AnswerOption
              color="yellow"
              text={yellowText}
              selected={currentAnswer?.selectedRisk === 'yellow'}
              onSelect={() => handleAnswerSelect('yellow')}
            />
          )}
          {orangeText && (
            <AnswerOption
              color="orange"
              text={orangeText}
              selected={currentAnswer?.selectedRisk === 'orange'}
              onSelect={() => handleAnswerSelect('orange')}
            />
          )}
          {redText && (
            <AnswerOption
              color="red"
              text={redText}
              selected={currentAnswer?.selectedRisk === 'red'}
              onSelect={() => handleAnswerSelect('red')}
            />
          )}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Button
          mode="outlined"
          onPress={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          style={styles.navButton}
        >
          {t('common.back')}
        </Button>

        {isLastQuestion ? (
          <Button
            mode="contained"
            onPress={handleComplete}
            disabled={progress.answered < progress.total}
            style={styles.navButton}
          >
            {t('screening.complete')}
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={goToNextQuestion}
            style={styles.navButton}
          >
            {t('common.next')}
          </Button>
        )}
      </View>

      {/* Exit Dialog */}
      <Portal>
        <Dialog visible={showExitDialog} onDismiss={() => setShowExitDialog(false)}>
          <Dialog.Title>{t('screening.exitConfirm')}</Dialog.Title>
          <Dialog.Content>
            <Text>{t('screening.exitMessage')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowExitDialog(false)}>{t('screening.continueButton')}</Button>
            <Button onPress={handleExit}>{t('screening.exitButton')}</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Red Alert Dialog */}
        <Dialog visible={showRedAlert} onDismiss={() => setShowRedAlert(false)}>
          <Dialog.Title>⚠️ {t('screening.redAlert.title')}</Dialog.Title>
          <Dialog.Content>
            <Text>{t('screening.redAlert.message')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowRedAlert(false)}>{t('common.ok')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

// Answer Option Component
interface AnswerOptionProps {
  color: RiskLevel;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

function AnswerOption({ color, text, selected, onSelect }: AnswerOptionProps) {
  const riskColor = RISK_COLORS[color];
  const emoji = color === 'green' ? '🟢' : color === 'yellow' ? '🟡' : color === 'orange' ? '🟠' : '🔴';

  return (
    <Surface
      style={[
        styles.answerOption,
        selected && { borderColor: riskColor, borderWidth: 3 },
      ]}
      elevation={selected ? 3 : 1}
    >
      <Button
        mode="text"
        onPress={onSelect}
        style={styles.answerButton}
        contentStyle={styles.answerButtonContent}
      >
        <View style={styles.answerContent}>
          <Text style={styles.answerEmoji}>{emoji}</Text>
          <Text variant="bodyMedium" style={styles.answerText}>
            {text}
          </Text>
        </View>
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childName: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 48,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginLeft: SPACING.sm,
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
  categoryTabs: {
    marginHorizontal: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  questionNumber: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  questionCard: {
    padding: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  questionText: {
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  answersContainer: {
    gap: SPACING.sm,
  },
  answerOption: {
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  answerButton: {
    width: '100%',
  },
  answerButtonContent: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    justifyContent: 'flex-start',
    minHeight: 56,
  },
  answerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  answerEmoji: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  answerText: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});

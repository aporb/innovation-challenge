// src/screens/RegisterChildScreen.tsx
// Register a new child or edit existing child

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
  Menu,
  Divider,
  Surface,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import type { RootStackParamList, Child, AgeGroup, Sex } from '../types';
import { useAppStore } from '../store/useAppStore';
import { insertChild, updateChild, getChildById } from '../services/database';
import { COLORS, SPACING } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterChild'>;
type RegisterChildRouteProp = RouteProp<RootStackParamList, 'RegisterChild'>;

// Villages list as per PRD
const VILLAGES = [
  'Kaloleni',
  'Rabai',
  'Mariakani',
  'Kinango',
  'Chonyi',
  'Ganze',
  'Malindi',
  'Kilifi',
  'Mombasa',
  'Likoni',
];

function calculateAgeGroup(months: number): AgeGroup {
  if (months < 6) return '0-6m';
  if (months < 24) return '6-24m';
  return '2-5y';
}

function calculateAgeInMonths(dateOfBirth: Date): number {
  const now = new Date();
  const months = (now.getFullYear() - dateOfBirth.getFullYear()) * 12 +
    (now.getMonth() - dateOfBirth.getMonth());
  return Math.max(0, months);
}

export default function RegisterChildScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterChildRouteProp>();
  const { setCurrentChildId, addRecentChild } = useAppStore();

  const isEditing = !!route.params?.childId;

  // Form state
  const [name, setName] = useState('');
  const [ageInputMethod, setAgeInputMethod] = useState<'dob' | 'age'>('dob');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ageInMonths, setAgeInMonths] = useState('');
  const [sex, setSex] = useState<Sex | ''>('');
  const [village, setVillage] = useState('');
  const [showVillageMenu, setShowVillageMenu] = useState(false);
  const [caregiverPhone, setCaregiverPhone] = useState('');
  const [caregiverName, setCaregiverName] = useState('');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing child if editing
  useEffect(() => {
    async function loadChild() {
      if (route.params?.childId) {
        const child = await getChildById(route.params.childId);
        if (child) {
          setName(child.name);
          if (child.dateOfBirth) {
            setDateOfBirth(new Date(child.dateOfBirth));
            setAgeInputMethod('dob');
          } else if (child.ageInMonths) {
            setAgeInMonths(child.ageInMonths.toString());
            setAgeInputMethod('age');
          }
          setSex(child.sex);
          setVillage(child.village);
          setCaregiverPhone(child.caregiverPhone || '');
          setCaregiverName(child.caregiverName || '');
        }
      }
    }
    loadChild();
  }, [route.params?.childId]);

  // Calculate derived values
  const calculatedMonths = ageInputMethod === 'dob' && dateOfBirth
    ? calculateAgeInMonths(dateOfBirth)
    : parseInt(ageInMonths) || 0;

  const ageGroup = calculateAgeGroup(calculatedMonths);

  const ageGroupLabels: Record<AgeGroup, string> = {
    '0-6m': t('register.ageGroups.0-6m'),
    '6-24m': t('register.ageGroups.6-24m'),
    '2-5y': t('register.ageGroups.2-5y'),
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    if (ageInputMethod === 'dob' && !dateOfBirth) {
      newErrors.age = t('validation.ageRequired');
    } else if (ageInputMethod === 'age' && !ageInMonths) {
      newErrors.age = t('validation.ageRequired');
    }

    if (!sex) {
      newErrors.sex = t('validation.sexRequired');
    }

    if (!village) {
      newErrors.village = t('validation.villageRequired');
    }

    if (caregiverPhone && !/^\+?[0-9]{10,13}$/.test(caregiverPhone.replace(/\s/g, ''))) {
      newErrors.phone = t('validation.invalidPhone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const now = new Date().toISOString();
      const childData: Child = {
        id: route.params?.childId || uuidv4(),
        name: name.trim(),
        dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '',
        ageInMonths: ageInputMethod === 'age' ? parseInt(ageInMonths) : undefined,
        sex: sex as Sex,
        village,
        caregiverPhone: caregiverPhone || undefined,
        caregiverName: caregiverName || undefined,
        createdAt: isEditing ? now : now,
        updatedAt: now,
        synced: false,
      };

      if (isEditing) {
        await updateChild(childData);
      } else {
        await insertChild(childData);
      }

      setCurrentChildId(childData.id);
      addRecentChild(childData);

      // Navigate to screening
      navigation.navigate('Screening', { childId: childData.id });
    } catch (error) {
      console.error('Failed to save child:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Child Name */}
        <View style={styles.field}>
          <TextInput
            label={`${t('register.childName')} *`}
            value={name}
            onChangeText={setName}
            mode="outlined"
            placeholder={t('register.namePlaceholder')}
            error={!!errors.name}
          />
          {errors.name && <HelperText type="error">{errors.name}</HelperText>}
        </View>

        {/* Age Input Method */}
        <View style={styles.field}>
          <Text variant="labelLarge" style={styles.fieldLabel}>
            {t('register.ageInputMethod')}
          </Text>
          <SegmentedButtons
            value={ageInputMethod}
            onValueChange={(value) => setAgeInputMethod(value as 'dob' | 'age')}
            buttons={[
              { value: 'dob', label: `📅 ${t('register.dateOfBirth')}` },
              { value: 'age', label: `🔢 ${t('register.ageInMonths')}` },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {/* Date of Birth */}
        {ageInputMethod === 'dob' && (
          <View style={styles.field}>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
              contentStyle={styles.dateButtonContent}
              icon="calendar"
            >
              {dateOfBirth
                ? dateOfBirth.toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : t('register.selectDate')}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5))}
              />
            )}
            {errors.age && <HelperText type="error">{errors.age}</HelperText>}
          </View>
        )}

        {/* Age in Months */}
        {ageInputMethod === 'age' && (
          <View style={styles.field}>
            <View style={styles.ageInputRow}>
              <TextInput
                value={ageInMonths}
                onChangeText={setAgeInMonths}
                mode="outlined"
                keyboardType="numeric"
                style={styles.ageInput}
                placeholder="0"
                error={!!errors.age}
              />
              <Text variant="bodyLarge" style={styles.ageLabel}>
                {t('register.monthsOld')}
              </Text>
            </View>
            {errors.age && <HelperText type="error">{errors.age}</HelperText>}
          </View>
        )}

        {/* Calculated Age Group */}
        {(dateOfBirth || ageInMonths) && (
          <Surface style={styles.ageGroupBadge} elevation={1}>
            <Text variant="bodySmall" style={styles.ageGroupLabel}>
              {t('register.ageGroup')}:
            </Text>
            <Text variant="titleMedium" style={styles.ageGroupValue}>
              {ageGroupLabels[ageGroup]}
            </Text>
            {ageInputMethod === 'dob' && (
              <Text variant="bodySmall" style={styles.calculatedAge}>
                ({t('register.calculatedAge')}: {calculatedMonths} {t('register.months')})
              </Text>
            )}
          </Surface>
        )}

        <Divider style={styles.divider} />

        {/* Sex */}
        <View style={styles.field}>
          <Text variant="labelLarge" style={styles.fieldLabel}>
            {t('register.sex')} *
          </Text>
          <SegmentedButtons
            value={sex}
            onValueChange={(value) => setSex(value as Sex)}
            buttons={[
              { value: 'male', label: t('register.male') },
              { value: 'female', label: t('register.female') },
            ]}
            style={styles.segmentedButtons}
          />
          {errors.sex && <HelperText type="error">{errors.sex}</HelperText>}
        </View>

        {/* Village */}
        <View style={styles.field}>
          <Menu
            visible={showVillageMenu}
            onDismiss={() => setShowVillageMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowVillageMenu(true)}
                style={[styles.villageButton, errors.village && styles.errorBorder]}
                contentStyle={styles.villageButtonContent}
                icon="chevron-down"
              >
                {village || t('register.selectVillage')}
              </Button>
            }
          >
            {VILLAGES.map((v) => (
              <Menu.Item
                key={v}
                onPress={() => {
                  setVillage(v);
                  setShowVillageMenu(false);
                }}
                title={v}
              />
            ))}
          </Menu>
          {errors.village && <HelperText type="error">{errors.village}</HelperText>}
        </View>

        <Divider style={styles.divider} />

        {/* Caregiver Phone (Optional) */}
        <View style={styles.field}>
          <TextInput
            label={`${t('register.caregiverPhone')} (${t('common.optional')})`}
            value={caregiverPhone}
            onChangeText={setCaregiverPhone}
            mode="outlined"
            placeholder={t('register.phonePlaceholder')}
            keyboardType="phone-pad"
            error={!!errors.phone}
          />
          {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}
        </View>

        {/* Caregiver Name (Optional) */}
        <View style={styles.field}>
          <TextInput
            label={`${t('register.caregiverName')} (${t('common.optional')})`}
            value={caregiverName}
            onChangeText={setCaregiverName}
            mode="outlined"
          />
        </View>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
          icon="arrow-right"
        >
          {t('register.startScreening')}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  field: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  segmentedButtons: {
    marginTop: SPACING.xs,
  },
  dateButton: {
    borderRadius: 8,
  },
  dateButtonContent: {
    paddingVertical: SPACING.sm,
    justifyContent: 'flex-start',
  },
  ageInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageInput: {
    width: 100,
  },
  ageLabel: {
    marginLeft: SPACING.md,
    color: COLORS.textSecondary,
  },
  ageGroupBadge: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  ageGroupLabel: {
    color: COLORS.textSecondary,
  },
  ageGroupValue: {
    color: COLORS.primaryBlue,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  calculatedAge: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    marginVertical: SPACING.md,
  },
  villageButton: {
    borderRadius: 8,
  },
  villageButtonContent: {
    paddingVertical: SPACING.sm,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  submitButton: {
    marginTop: SPACING.lg,
    borderRadius: 12,
  },
  submitButtonContent: {
    paddingVertical: SPACING.sm,
    flexDirection: 'row-reverse',
  },
});

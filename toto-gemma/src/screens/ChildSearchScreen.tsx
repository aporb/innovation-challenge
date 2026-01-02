// src/screens/ChildSearchScreen.tsx
// Search and select a child for screening

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Text, Surface, Button, Chip, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList, Child } from '../types';
import { useAppStore } from '../store/useAppStore';
import { searchChildren, getRecentChildren, getScreeningsForChild } from '../services/database';
import { COLORS, SPACING, TOUCH_TARGET } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChildSearch'>;

function calculateAgeInMonths(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const now = new Date();
  const months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  return Math.max(0, months);
}

function formatAge(dateOfBirth: string): string {
  const months = calculateAgeInMonths(dateOfBirth);
  if (months < 24) {
    return `${months} months`;
  }
  const years = Math.floor(months / 12);
  return `${years} years`;
}

interface ChildWithLastScreening extends Child {
  lastScreeningDate?: string;
}

export default function ChildSearchScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { setCurrentChildId, setRecentChildren } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [children, setChildren] = useState<ChildWithLastScreening[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load recent children on mount
  useEffect(() => {
    loadRecentChildren();
  }, []);

  const loadRecentChildren = async () => {
    setIsLoading(true);
    try {
      const recent = await getRecentChildren(10);
      const withScreenings = await Promise.all(
        recent.map(async (child) => {
          const screenings = await getScreeningsForChild(child.id);
          const lastComplete = screenings.find((s) => s.isComplete);
          return {
            ...child,
            lastScreeningDate: lastComplete?.completedAt,
          };
        })
      );
      setChildren(withScreenings);
      setRecentChildren(recent);
    } catch (error) {
      console.error('Failed to load children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Search as user types
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      loadRecentChildren();
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchChildren(query);
      const withScreenings = await Promise.all(
        results.map(async (child) => {
          const screenings = await getScreeningsForChild(child.id);
          const lastComplete = screenings.find((s) => s.isComplete);
          return {
            ...child,
            lastScreeningDate: lastComplete?.completedAt,
          };
        })
      );
      setChildren(withScreenings);
    } catch (error) {
      console.error('Failed to search children:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectChild = (child: Child) => {
    setCurrentChildId(child.id);
    navigation.navigate('Screening', { childId: child.id });
  };

  const handleAddNewChild = () => {
    navigation.navigate('RegisterChild', {});
  };

  const formatLastScreened = (date?: string): string => {
    if (!date) return t('childSearch.never');
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
  };

  const renderChildItem = ({ item }: { item: ChildWithLastScreening }) => (
    <Surface style={styles.childCard} elevation={1}>
      <Button
        mode="text"
        onPress={() => handleSelectChild(item)}
        style={styles.childButton}
        contentStyle={styles.childButtonContent}
      >
        <View style={styles.childInfo}>
          <View style={styles.childHeader}>
            <Text variant="titleMedium" style={styles.childName}>
              👶 {item.name}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.childDetails}>
            {formatAge(item.dateOfBirth)} • {item.village}
          </Text>
          <Text variant="bodySmall" style={styles.lastScreened}>
            {t('childSearch.lastScreened')}: {formatLastScreened(item.lastScreeningDate)}
          </Text>
        </View>
      </Button>
    </Surface>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('childSearch.searchPlaceholder')}
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* List Header */}
      <Text variant="titleSmall" style={styles.sectionHeader}>
        {searchQuery ? t('common.search') : t('childSearch.recentChildren')}
      </Text>

      {/* Children List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        </View>
      ) : children.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            {searchQuery ? t('childSearch.noResults') : t('childSearch.noChildren')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={children}
          renderItem={renderChildItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add New Child Button */}
      <View style={styles.addButtonContainer}>
        <Button
          mode="outlined"
          onPress={handleAddNewChild}
          icon="plus"
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
        >
          {t('childSearch.addNewChild')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  searchBar: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  childCard: {
    marginBottom: SPACING.sm,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  childButton: {
    width: '100%',
  },
  childButtonContent: {
    justifyContent: 'flex-start',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: TOUCH_TARGET.large,
  },
  childInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childName: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  childDetails: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  lastScreened: {
    color: COLORS.textSecondary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  addButtonContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addButton: {
    borderRadius: 12,
    borderColor: COLORS.primaryBlue,
    borderWidth: 2,
  },
  addButtonContent: {
    paddingVertical: SPACING.sm,
  },
});

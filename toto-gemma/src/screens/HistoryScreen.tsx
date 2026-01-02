// src/screens/HistoryScreen.tsx
// Screening history with filtering and detail view

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Text,
  Surface,
  Searchbar,
  Chip,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList, Screening, Child, RiskLevel } from '../types';
import { getAllScreenings, getChildById } from '../services/database';
import { useAppStore } from '../store/useAppStore';
import { COLORS, SPACING, RISK_COLORS } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

interface ScreeningWithChild extends Screening {
  child?: Child;
}

const RISK_EMOJI: Record<RiskLevel, string> = {
  green: '🟢',
  yellow: '🟡',
  orange: '🟠',
  red: '🔴',
};

type FilterOption = 'all' | RiskLevel;

export default function HistoryScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const language = useAppStore((state) => state.language);

  const [screenings, setScreenings] = useState<ScreeningWithChild[]>([]);
  const [filteredScreenings, setFilteredScreenings] = useState<ScreeningWithChild[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<FilterOption>('all');

  const loadScreenings = async () => {
    try {
      const allScreenings = await getAllScreenings();

      // Load child data for each screening
      const screeningsWithChildren: ScreeningWithChild[] = await Promise.all(
        allScreenings.map(async (s) => {
          const child = await getChildById(s.childId);
          return { ...s, child: child || undefined };
        })
      );

      setScreenings(screeningsWithChildren);
      applyFilters(screeningsWithChildren, searchQuery, riskFilter);
    } catch (error) {
      console.error('Failed to load screenings:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const applyFilters = (
    data: ScreeningWithChild[],
    query: string,
    risk: FilterOption
  ) => {
    let filtered = data;

    // Filter by search query (child name)
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((s) =>
        s.child?.name.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by risk level
    if (risk !== 'all') {
      filtered = filtered.filter((s) => s.riskResult?.overall === risk);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.completedAt || a.createdAt).getTime();
      const dateB = new Date(b.completedAt || b.createdAt).getTime();
      return dateB - dateA;
    });

    setFilteredScreenings(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      loadScreenings();
    }, [])
  );

  useEffect(() => {
    applyFilters(screenings, searchQuery, riskFilter);
  }, [searchQuery, riskFilter]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadScreenings();
  };

  const handleScreeningPress = (screening: ScreeningWithChild) => {
    if (screening.isComplete) {
      navigation.navigate('Results', { screeningId: screening.id });
    } else {
      navigation.navigate('Screening', { childId: screening.childId });
    }
  };

  const renderScreeningItem = ({ item }: { item: ScreeningWithChild }) => {
    const riskLevel = item.riskResult?.overall || 'green';
    const isComplete = item.isComplete;
    const date = new Date(item.completedAt || item.createdAt);

    return (
      <Surface
        style={[
          styles.screeningCard,
          !isComplete && styles.incompleteCard,
        ]}
        elevation={1}
        onTouchEnd={() => handleScreeningPress(item)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.childInfo}>
            <Text variant="titleMedium" style={styles.childName}>
              {item.child?.name || t('history.unknownChild')}
            </Text>
            <Text variant="bodySmall" style={styles.village}>
              {item.child?.village}
            </Text>
          </View>
          {isComplete ? (
            <View style={styles.riskBadge}>
              <Text style={styles.riskEmoji}>{RISK_EMOJI[riskLevel]}</Text>
              <Text
                variant="labelMedium"
                style={[styles.riskText, { color: RISK_COLORS[riskLevel] }]}
              >
                {t(`results.riskLevels.${riskLevel}`)}
              </Text>
            </View>
          ) : (
            <Chip mode="outlined" compact style={styles.draftChip}>
              {t('history.draft')}
            </Chip>
          )}
        </View>

        <Divider style={styles.cardDivider} />

        <View style={styles.cardFooter}>
          <Text variant="bodySmall" style={styles.dateText}>
            {date.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Text variant="bodySmall" style={styles.timeText}>
            {date.toLocaleTimeString(language === 'sw' ? 'sw-KE' : 'en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          {!item.synced && (
            <Chip
              mode="flat"
              compact
              style={styles.syncChip}
              textStyle={styles.syncChipText}
            >
              {t('history.pendingSync')}
            </Chip>
          )}
        </View>
      </Surface>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        placeholder={t('history.searchPlaceholder')}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />

      {/* Risk Filter Chips */}
      <View style={styles.filterContainer}>
        <Chip
          mode={riskFilter === 'all' ? 'flat' : 'outlined'}
          selected={riskFilter === 'all'}
          onPress={() => setRiskFilter('all')}
          style={styles.filterChip}
        >
          {t('history.filterAll')}
        </Chip>
        {(['red', 'orange', 'yellow', 'green'] as RiskLevel[]).map((level) => (
          <Chip
            key={level}
            mode={riskFilter === level ? 'flat' : 'outlined'}
            selected={riskFilter === level}
            onPress={() => setRiskFilter(level)}
            style={[
              styles.filterChip,
              riskFilter === level && { backgroundColor: RISK_COLORS[level] + '30' },
            ]}
          >
            {RISK_EMOJI[level]}
          </Chip>
        ))}
      </View>

      {/* Results Count */}
      <Text variant="bodySmall" style={styles.resultsCount}>
        {t('history.showing', { count: filteredScreenings.length })}
      </Text>

      {/* Screenings List */}
      {filteredScreenings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text variant="bodyLarge" style={styles.emptyText}>
            {searchQuery || riskFilter !== 'all'
              ? t('history.noResults')
              : t('history.noScreenings')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredScreenings}
          keyExtractor={(item) => item.id}
          renderItem={renderScreeningItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
  },
  searchbar: {
    margin: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  filterChip: {
    borderRadius: 20,
  },
  resultsCount: {
    paddingHorizontal: SPACING.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  screeningCard: {
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
  },
  incompleteCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  village: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  riskEmoji: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  riskText: {
    fontWeight: '600',
  },
  draftChip: {
    borderColor: COLORS.textSecondary,
  },
  cardDivider: {
    marginVertical: SPACING.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  dateText: {
    color: COLORS.textSecondary,
  },
  timeText: {
    color: COLORS.textSecondary,
  },
  syncChip: {
    backgroundColor: '#FFF3E0',
    marginLeft: 'auto',
  },
  syncChipText: {
    fontSize: 10,
    color: COLORS.riskOrange,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

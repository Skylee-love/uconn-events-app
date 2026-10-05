import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { EventCard } from '@/components/event-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { EVENTS } from '@/data/events';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EVENTS;
    return EVENTS.filter((event) =>
      [event.name, event.location, event.description].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <ThemedText style={styles.title}>UConn Events</ThemedText>
                <AppIcon name="bell" size={24} color={theme.text} />
              </View>
              <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                Discover upcoming events on campus
              </ThemedText>
              <View
                style={[
                  styles.search,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}>
                <AppIcon name="search" size={18} color={theme.textSecondary} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search events..."
                  placeholderTextColor={theme.textSecondary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Search events"
                  style={[styles.searchInput, { color: theme.text }]}
                />
              </View>
              <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
            </View>
          }
          ListEmptyComponent={
            <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
              {`No events match "${query.trim()}".`}
            </ThemedText>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const sharedWidth = {
  width: '100%',
  maxWidth: MaxContentWidth,
  alignSelf: 'center',
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    ...sharedWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.half,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: Spacing.half,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    height: 46,
    borderRadius: Spacing.three - Spacing.one, // 12
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.three,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: Spacing.four - Spacing.half,
  },
  listContent: {
    ...sharedWidth,
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: Spacing.four,
  },
});

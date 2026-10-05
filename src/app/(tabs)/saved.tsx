import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '@/components/app-icon';
import { SavedEventCard } from '@/components/saved-event-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { useTheme } from '@/hooks/use-theme';

export default function SavedEventsScreen() {
  const theme = useTheme();
  const { savedEvents, removeSaved, clearSaved } = useSavedEvents();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <FlatList
          data={savedEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SavedEventCard event={item} onRemove={() => removeSaved(item.id)} />
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <ThemedText style={styles.title}>Saved Events</ThemedText>
                {savedEvents.length > 0 && (
                  <Pressable
                    onPress={clearSaved}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Clear all saved events"
                    style={({ pressed }) => pressed && styles.pressed}>
                    <AppIcon name="trash" size={22} color={theme.text} />
                  </Pressable>
                )}
              </View>
              <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                Events you&apos;ve saved for later
              </ThemedText>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <AppIcon name="bookmark" size={40} color={theme.textSecondary} />
              <ThemedText style={styles.emptyTitle}>No saved events yet</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                Open an event and tap Save Event to keep it here.
              </ThemedText>
            </View>
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
  pressed: {
    opacity: 0.6,
  },
  listContent: {
    ...sharedWidth,
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  emptyTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: Spacing.two,
  },
  emptyText: {
    textAlign: 'center',
  },
});

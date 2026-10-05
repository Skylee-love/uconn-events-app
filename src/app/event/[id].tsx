import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon, type AppIconName } from '@/components/app-icon';
import { BottomNav } from '@/components/bottom-nav';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { EVENTS, formatEventDateFull } from '@/data/events';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { useTheme } from '@/hooks/use-theme';

function MetaRow({ icon, children }: { icon: AppIconName; children: string }) {
  const theme = useTheme();
  return (
    <View style={styles.metaRow}>
      <AppIcon name={icon} size={18} color={theme.accent} />
      <ThemedText style={styles.metaText}>{children}</ThemedText>
    </View>
  );
}

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { isSaved, toggleSaved } = useSavedEvents();

  const event = EVENTS.find((candidate) => candidate.id === id);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!event) {
    return (
      <ThemedViewScreen>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <View style={styles.topBar}>
            <Pressable
              onPress={goBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Go back">
              <AppIcon name="chevronLeft" size={24} color={theme.text} />
            </Pressable>
          </View>
          <View style={styles.notFound}>
            <ThemedText type="title" style={styles.notFoundTitle}>
              Event not found
            </ThemedText>
            <ThemedText themeColor="textSecondary">
              This event may have been removed or the link is no longer valid.
            </ThemedText>
          </View>
          <BottomNav />
        </SafeAreaView>
      </ThemedViewScreen>
    );
  }

  const saved = isSaved(event.id);

  return (
    <ThemedViewScreen>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.frame}>
          <View style={styles.topBar}>
            <Pressable
              onPress={goBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Go back">
              <AppIcon name="chevronLeft" size={24} color={theme.text} />
            </Pressable>
            <Pressable
              onPress={() => toggleSaved(event.id)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Remove from saved events' : 'Save event'}>
              <AppIcon
                name={saved ? 'heartFilled' : 'heart'}
                size={24}
                color={saved ? theme.danger : theme.text}
              />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image
              source={event.imageUrl}
              style={styles.heroImage}
              contentFit="cover"
              transition={200}
              accessibilityLabel={event.name}
            />
            <View style={styles.body}>
              <ThemedText style={styles.title}>{event.name}</ThemedText>
              <View style={styles.metaList}>
                <MetaRow icon="calendar">{formatEventDateFull(event.date)}</MetaRow>
                <MetaRow icon="clock">{event.time}</MetaRow>
                <MetaRow icon="location">{event.location}</MetaRow>
              </View>

              <ThemedText style={styles.sectionTitle}>About This Event</ThemedText>
              <ThemedText style={styles.paragraph}>{event.about}</ThemedText>

              <View style={[styles.callout, { backgroundColor: theme.primaryMuted }]}>
                <View style={styles.calloutHeader}>
                  <AppIcon name="info" size={18} color={theme.primary} />
                  <ThemedText style={styles.calloutTitle}>What to Bring</ThemedText>
                </View>
                <ThemedText style={styles.calloutText}>{event.whatToBring}</ThemedText>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              onPress={() => toggleSaved(event.id)}
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Remove from saved events' : 'Save event'}
              style={({ pressed }) => [
                styles.saveButton,
                { backgroundColor: theme.primary },
                pressed && styles.pressed,
              ]}>
              <AppIcon
                name={saved ? 'heartFilled' : 'heart'}
                size={20}
                color={theme.onPrimary}
              />
              <ThemedText themeColor="onPrimary" style={styles.saveButtonText}>
                {saved ? 'Saved' : 'Save Event'}
              </ThemedText>
            </Pressable>
          </View>
        </View>
        <BottomNav />
      </SafeAreaView>
    </ThemedViewScreen>
  );
}

/** Screen surface: white on light mode so the hero image and details read as one card. */
function ThemedViewScreen({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return <View style={[styles.container, { backgroundColor: theme.card }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  scrollContent: {
    paddingBottom: Spacing.four,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  body: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  metaList: {
    gap: Spacing.two,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + Spacing.half, // 10
  },
  metaText: {
    fontSize: 15,
    lineHeight: 20,
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: Spacing.two,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 25,
    marginTop: -Spacing.two,
  },
  callout: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one + Spacing.half, // 6
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  calloutTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  calloutText: {
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  saveButton: {
    height: 54,
    borderRadius: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  saveButtonText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
  notFound: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
    paddingTop: Spacing.five,
  },
  notFoundTitle: {
    fontSize: 28,
    lineHeight: 34,
  },
});

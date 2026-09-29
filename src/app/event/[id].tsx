import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { EVENTS, formatEventDate } from '@/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = EVENTS.find((candidate) => candidate.id === id);

  if (!event) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <ThemedText type="title">Event not found</ThemedText>
            <ThemedText themeColor="textSecondary">
              This event may have been removed or the link is no longer valid.
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image
            source={event.imageUrl}
            style={styles.heroImage}
            contentFit="cover"
            transition={200}
            accessibilityLabel={event.name}
          />
          <ThemedText type="smallBold" themeColor="accent">
            {formatEventDate(event.date)}
          </ThemedText>
          <ThemedText type="title" style={styles.title}>
            {event.name}
          </ThemedText>
          <View style={styles.meta}>
            <ThemedText themeColor="textSecondary">{event.time}</ThemedText>
            <ThemedText themeColor="textSecondary">{event.location}</ThemedText>
          </View>
          <ThemedText style={styles.description}>{event.description}</ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    paddingBottom: Spacing.five,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Spacing.two,
  },
  title: {
    marginTop: -Spacing.one,
  },
  meta: {
    gap: Spacing.one,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
  },
});
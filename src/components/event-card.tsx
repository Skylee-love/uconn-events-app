import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import { formatEventDate, type UConnEvent } from '@/data/events';

type EventCardProps = {
  event: UConnEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={{ pathname: '/event/[id]', params: { id: event.id } }}
      asChild>
      <Pressable
        accessibilityLabel={`View details for ${event.name}`}
        accessibilityRole="button"
        style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <Image
            source={event.imageUrl}
            style={styles.photo}
            contentFit="cover"
            transition={150}
            accessibilityLabel={event.name}
          />
          <View style={styles.details}>
            <ThemedText type="smallBold" themeColor="accent">
              {formatEventDate(event.date)}
            </ThemedText>
            <ThemedText style={styles.name}>{event.name}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {event.time}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {event.location}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {event.description}
            </ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.two + Spacing.one, // 12
  },
  pressed: {
    opacity: 0.8,
  },
  photo: {
    width: 88,
    height: 88,
    borderRadius: Spacing.two,
  },
  details: {
    flex: 1,
    gap: Spacing.half + Spacing.one, // 6
  },
  name: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
});

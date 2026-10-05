import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from './app-icon';
import { ThemedText } from './themed-text';

import { CardShadow, Spacing } from '@/constants/theme';
import { formatEventDateShort, type UConnEvent } from '@/data/events';
import { useTheme } from '@/hooks/use-theme';

type EventCardProps = {
  event: UConnEvent;
};

export function EventCard({ event }: EventCardProps) {
  const theme = useTheme();

  return (
    <Link
      href={{ pathname: '/event/[id]', params: { id: event.id } }}
      asChild>
      <Pressable
        accessibilityLabel={`View details for ${event.name}`}
        accessibilityRole="button"
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image
            source={event.imageUrl}
            style={styles.photo}
            contentFit="cover"
            transition={150}
            accessibilityLabel={event.name}
          />
          <View style={styles.details}>
            <View style={styles.metaRow}>
              <AppIcon name="calendar" size={15} color={theme.accent} />
              <ThemedText style={styles.date}>
                {`${formatEventDateShort(event.date).toUpperCase()}, ${event.time}`}
              </ThemedText>
            </View>
            <ThemedText style={styles.name}>{event.name}</ThemedText>
            <View style={styles.metaRow}>
              <AppIcon name="location" size={15} color={theme.accent} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.metaText}>
                {event.location}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
              {event.description}
            </ThemedText>
            <View style={styles.linkRow}>
              <ThemedText type="smallBold" themeColor="accent" style={styles.linkText}>
                View Details
              </ThemedText>
              <AppIcon name="chevronRight" size={15} color={theme.accent} />
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.two + Spacing.one, // 12
    borderRadius: Spacing.four - Spacing.one, // 20
    borderWidth: StyleSheet.hairlineWidth,
    ...CardShadow,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: Spacing.two + Spacing.one, // 12
  },
  details: {
    flex: 1,
    gap: Spacing.one + Spacing.half, // 6
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one + Spacing.half, // 6
  },
  date: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  metaText: {
    fontSize: 13,
    lineHeight: 18,
  },
  name: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
    marginTop: Spacing.half,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
});

import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from './app-icon';
import { ThemedText } from './themed-text';

import { CardShadow, Spacing } from '@/constants/theme';
import { formatEventDateShort, type UConnEvent } from '@/data/events';
import { useTheme } from '@/hooks/use-theme';

type SavedEventCardProps = {
  event: UConnEvent;
  onRemove: () => void;
};

export function SavedEventCard({ event, onRemove }: SavedEventCardProps) {
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
            <View style={styles.titleRow}>
              <ThemedText style={styles.name}>{event.name}</ThemedText>
              <AppIcon name="heartFilled" size={20} color={theme.danger} />
            </View>
            <View style={styles.metaRow}>
              <AppIcon name="calendar" size={15} color={theme.accent} />
              <ThemedText style={styles.metaText}>
                {`${formatEventDateShort(event.date)}, ${event.time}`}
              </ThemedText>
            </View>
            <View style={styles.metaRow}>
              <AppIcon name="location" size={15} color={theme.accent} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.metaText}>
                {event.location}
              </ThemedText>
            </View>
            <Pressable
              onPress={onRemove}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${event.name} from saved events`}
              style={({ pressed }) => [styles.remove, pressed && styles.pressed]}>
              <ThemedText themeColor="danger" style={styles.removeText}>
                Remove
              </ThemedText>
            </Pressable>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one + Spacing.half, // 6
  },
  metaText: {
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1,
  },
  name: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    flexShrink: 1,
  },
  remove: {
    alignSelf: 'flex-end',
    marginTop: Spacing.half,
  },
  removeText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
});

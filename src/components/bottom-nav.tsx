import { Link, usePathname } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon, type AppIconName } from './app-icon';
import { ThemedText } from './themed-text';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * The bottom bar surface: full-width, hairline top border, buttons centered up to
 * `MaxContentWidth`. Shared by the web tab bar (`app-tabs.web.tsx`) and by screens that
 * live outside the tab navigator (the event details page).
 */
export function BottomNavShell({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          paddingBottom: Math.max(insets.bottom, Spacing.two),
        },
      ]}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

export type BottomNavButtonProps = PressableProps & {
  icon: AppIconName;
  label: ReactNode;
  active?: boolean;
};

/** One icon-over-label button in the bottom bar. */
export function BottomNavButton({
  icon,
  label,
  active = false,
  style,
  ...props
}: BottomNavButtonProps) {
  const theme = useTheme();
  const color = active ? theme.accent : theme.textSecondary;

  return (
    <Pressable
      accessibilityRole="tab"
      {...props}
      style={(state) => [
        typeof style === 'function' ? style(state) : style,
        styles.button,
        state.pressed && styles.pressed,
      ]}>
      <AppIcon name={icon} size={24} color={color} />
      <ThemedText style={[styles.label, { color }]}>{label}</ThemedText>
    </Pressable>
  );
}

/**
 * Home / Saved Events bar for screens rendered outside the tab navigator, so the bottom
 * navigation is reachable from the event details page too.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <BottomNavShell>
      <Link href="/" asChild>
        <BottomNavButton icon="home" label="Home" active={pathname === '/'} />
      </Link>
      <Link href="/saved" asChild>
        <BottomNavButton
          icon="bookmark"
          label="Saved Events"
          active={pathname.startsWith('/saved')}
        />
      </Link>
    </BottomNavShell>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    alignSelf: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.two,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: Spacing.one,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
});

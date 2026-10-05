/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F6F7FB',
    /** Card / surface color. */
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E8EAF2',
    textSecondary: '#64748B',
    accent: '#4F46E5',
    card: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#4F46E5',
    primaryMuted: '#EEF2FF',
    onPrimary: '#FFFFFF',
    danger: '#EF4444',
  },
  dark: {
    text: '#F1F5F9',
    background: '#0B0D14',
    backgroundElement: '#161A23',
    backgroundSelected: '#232838',
    textSecondary: '#94A3B8',
    accent: '#818CF8',
    card: '#161A23',
    border: '#252B3A',
    primary: '#4F46E5',
    primaryMuted: '#1E1B4B',
    onPrimary: '#FFFFFF',
    danger: '#F87171',
  },
} as const;

/** Soft card shadow, works on iOS, Android and web. */
export const CardShadow = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { type StyleProp, type ViewStyle } from 'react-native';

/**
 * Cross-platform icon names. iOS renders SF Symbols, Android and web render Material Symbols
 * (see `expo-symbols`), so every icon needs a name for each side.
 */
const ICONS = {
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  calendar: { ios: 'calendar', android: 'event', web: 'event' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  location: { ios: 'mappin', android: 'location_on', web: 'location_on' },
  chevronLeft: { ios: 'chevron.left', android: 'arrow_back_ios_new', web: 'arrow_back_ios_new' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  heartFilled: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  bookmark: { ios: 'bookmark', android: 'bookmark_border', web: 'bookmark_border' },
  bookmarkFilled: { ios: 'bookmark.fill', android: 'bookmark', web: 'bookmark' },
  home: { ios: 'house', android: 'home', web: 'home' },
  trash: { ios: 'trash', android: 'delete', web: 'delete' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
} satisfies Record<string, { ios: SFSymbol; android: AndroidSymbol; web: AndroidSymbol }>;

export type AppIconName = keyof typeof ICONS;

type AppIconProps = {
  name: AppIconName;
  /** Rendered size in dp, defaults to 20. */
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppIcon({ name, size = 20, color, style }: AppIconProps) {
  const icon = ICONS[name];
  return (
    <SymbolView
      name={{ ios: icon.ios, android: icon.android, web: icon.web }}
      size={size}
      tintColor={color}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}

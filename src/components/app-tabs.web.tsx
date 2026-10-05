import { TabList, TabListProps, Tabs, TabSlot, TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { BottomNavButton, BottomNavShell } from './bottom-nav';

import type { AppIconName } from './app-icon';

export default function AppTabs() {
  return (
    <Tabs>
      {/*
        TabSlot's default container is `flexGrow: 1, flexShrink: 0` with an auto basis, so a
        screen taller than the viewport grows the container instead of scrolling, pushing the
        TabList below the fold (which `body { overflow: hidden }` then clips). Basis 0 makes the
        container depend only on the free space, so the screen is height-limited and its list
        scrolls internally.
      */}
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="saved" href="/saved" asChild>
            <TabButton icon="bookmark">Saved Events</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  icon: AppIconName;
};

/** Wraps the shared `BottomNavButton` so the tab bar matches `BottomNav` exactly. */
export function TabButton({ children, isFocused, icon, ...props }: TabButtonProps) {
  return (
    <BottomNavButton {...props} icon={icon} label={children} active={isFocused} />
  );
}

/** Shell (border, background, safe-area padding) + centered content, as a `TabList` slot. */
export function CustomTabList({ children }: TabListProps) {
  return <BottomNavShell>{children}</BottomNavShell>;
}

const styles = StyleSheet.create({
  slot: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
});

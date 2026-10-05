import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.accent } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md="home"
          selectedColor={colors.accent}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Label>Saved Events</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'bookmark', selected: 'bookmark.fill' }}
          md="bookmark"
          selectedColor={colors.accent}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

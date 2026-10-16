import { View } from 'react-native';

import { BottomTabBar } from './bottom';
import { DrawerNavigator } from './drawer';

export const RootNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerNavigator />
      </View>
      <BottomTabBar />
    </View>
  );
};

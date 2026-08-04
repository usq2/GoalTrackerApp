import { Text } from 'react-native';

import { createDrawerNavigator, createDrawerScreen } from '@react-navigation/drawer';

import { BottomTabs } from './bottom';

function Mission() {
  return <Text> Mission </Text>;
}

function Timetable() {
  return <Text> Timetable </Text>;
}

function ScoreCard() {
  return <Text> ScoreCard </Text>;
}

function Weekly() {
  return <Text> Weekly </Text>;
}

export const DrawerNavigator = createDrawerNavigator({
  screenOptions: {
    drawerPosition: 'left',
  },
  screens: {
    MainTabs: createDrawerScreen({
      screen: BottomTabs,
      options: {
        drawerLabel: 'Mission',
        headerShown: true,
      },
    }),
    Plan: createDrawerScreen({ screen: Mission }),
    Routine: createDrawerScreen({ screen: Timetable }),
    DailyStudyPlan: createDrawerScreen({ screen: Mission }),
    TopicsBreakdown: createDrawerScreen({ screen: ScoreCard }),
    Monthly: createDrawerScreen({ screen: Weekly }),
    Analytics: createDrawerScreen({ screen: Mission }),
  },
});

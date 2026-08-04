import { Text, View } from 'react-native';

import { createDrawerNavigator, createDrawerScreen } from '@react-navigation/drawer';

import { MissionScreen } from '../screens/Mission';

import { BottomTabs } from './bottom';

function BottomTabsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <BottomTabs />
    </View>
  );
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
    Plan: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <MissionScreen />
        </BottomTabsWrapper>
      ),
    }),
    Routine: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <Timetable />
        </BottomTabsWrapper>
      ),
    }),
    DailyStudyPlan: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <ScoreCard />
        </BottomTabsWrapper>
      ),
    }),
    TopicsBreakdown: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <MissionScreen />
        </BottomTabsWrapper>
      ),
    }),
    Monthly: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <Weekly />
        </BottomTabsWrapper>
      ),
    }),
    Analytics: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <Weekly />
        </BottomTabsWrapper>
      ),
    }),
  },
});

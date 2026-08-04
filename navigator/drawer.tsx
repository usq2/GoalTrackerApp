import { Text, View } from 'react-native';

import { createDrawerNavigator, createDrawerScreen } from '@react-navigation/drawer';

import { BottomTabs } from './bottom';

function BottomTabsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <BottomTabs />
    </View>
  );
}
function Mission() {
  return (
    <>
      <Text> Mission </Text>
    </>
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
    MainTabs: createDrawerScreen({
      screen: BottomTabs,
      options: {
        drawerLabel: 'Mission',
        headerShown: true,
      },
    }),
    Plan: createDrawerScreen({
      screen: () => (
        <BottomTabsWrapper>
          <Mission />
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
          <Mission />
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

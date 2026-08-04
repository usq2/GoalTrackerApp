import { Text } from 'react-native';

import { createBottomTabNavigator, createBottomTabScreen } from '@react-navigation/bottom-tabs';

import { MissionIcon } from '../ui/icons/Mission';
import { ProgressIcon } from '../ui/icons/Progress';
import { ScoreCardIcon } from '../ui/icons/ScoreCard';
import { TimetableIcon } from '../ui/icons/Timetable';

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

const BottomTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Mission: createBottomTabScreen({
      screen: Mission,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <MissionIcon size={size} color={color} testID="tabBar" />
        ),
      },
    }),
    Timetable: createBottomTabScreen({
      screen: Timetable,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <TimetableIcon size={size} color={color} testID="tabBar" />
        ),
      },
    }),
    Scorecard: createBottomTabScreen({
      screen: ScoreCard,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <ScoreCardIcon size={size} color={color} testID="tabBar" />
        ),
      },
    }),
    Weekly: createBottomTabScreen({
      screen: Weekly,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <ProgressIcon size={size} color={color} testID="tabBar" />
        ),
      },
    }),
  },
});

export { BottomTabs };

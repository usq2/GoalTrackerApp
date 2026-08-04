/* eslint-disable react/no-unstable-nested-components */
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Mission"
        component={Mission}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MissionIcon size={size} color={color} testID="tabBar" />
          ),
        }}
      />
      <Tab.Screen
        name="Timetable"
        component={Timetable}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TimetableIcon size={size} color={color} testID="tabBar" />
          ),
        }}
      />
      <Tab.Screen
        name="Scorecard"
        component={ScoreCard}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <ScoreCardIcon size={size} color={color} testID="tabBar" />
          ),
        }}
      />
      <Tab.Screen
        name="Weekly"
        component={Weekly}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <ProgressIcon size={size} color={color} testID="tabBar" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

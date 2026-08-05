import { Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from '../hooks/useTheme';
import { MissionScreen } from '../screens/Mission';

function Timetable() {
  return <Text> Timetable </Text>;
}

function ScoreCard() {
  return <Text> ScoreCard </Text>;
}

function Weekly() {
  return <Text> Weekly </Text>;
}

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Mission"
      screenOptions={{
        drawerPosition: 'left',
        headerStyle: {
          backgroundColor: colors.on_background,
        },
        headerTintColor: colors.inverse_primary,
        headerTitleStyle: {
          textTransform: 'uppercase',
          fontWeight: '900',
          flex: 1,
          textAlignVertical: 'center',
        },
      }}
    >
      <Drawer.Screen
        name="Plan"
        component={MissionScreen}
        options={{
          drawerLabel: 'Plan',
        }}
      />
      <Drawer.Screen
        name="Routine"
        component={Timetable}
        options={{
          drawerLabel: 'Routine',
        }}
      />
      <Drawer.Screen
        name="DailyStudyPlan"
        component={MissionScreen}
        options={{
          drawerLabel: 'Daily Study Plan',
        }}
      />
      <Drawer.Screen
        name="TopicsBreakdown"
        component={ScoreCard}
        options={{
          drawerLabel: 'Topics Breakdown',
        }}
      />
      <Drawer.Screen
        name="Monthly"
        component={Weekly}
        options={{
          drawerLabel: 'Monthly',
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={MissionScreen}
        options={{
          drawerLabel: 'Analytics',
        }}
      />
      <Drawer.Screen
        name="Mission"
        component={MissionScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Timetable"
        component={ScoreCard}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Scorecard"
        component={Weekly}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Weekly"
        component={MissionScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

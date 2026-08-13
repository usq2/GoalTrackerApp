import { Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from '../hooks/useTheme';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { DSPScreen } from '../screens/DailyStudyPlan';
import { MissionScreen } from '../screens/Mission';
import { ScoreCardScreen } from '../screens/ScoreCard';
import { TimetableScreen } from '../screens/Timetable';
import { WeeklyProgressScreen } from '../screens/WeeklyProgress';

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
        name="Daily Study Plan"
        component={DSPScreen}
        options={{
          drawerLabel: 'Daily Study Plan',
        }}
      />
      <Drawer.Screen
        name="Monthly Progress"
        component={Weekly}
        options={{
          drawerLabel: 'Monthly',
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
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
        component={TimetableScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Daily Tasks"
        component={ScoreCardScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Weekly Progress"
        component={WeeklyProgressScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

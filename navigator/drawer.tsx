import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from '../hooks/useTheme';
import { AnalyticsScreen, ExportProgress } from '../screens/AnalyticsScreen';
import { DSPScreen } from '../screens/DailyStudyPlan';
import { MissionScreen } from '../screens/Mission';
import { ScoreCardScreen } from '../screens/ScoreCard';
import { TimetableScreen } from '../screens/Timetable';
import { WeeklyProgressScreen } from '../screens/WeeklyProgress';

import { getDrawerOptions } from './drawer.options';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { colors } = useTheme();
  const options = getDrawerOptions(colors);
  return (
    <Drawer.Navigator
      initialRouteName="Mission"
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: options.drawerStyle,
        drawerLabelStyle: options.drawerLabelStyle,
        headerStyle: options.headerStyle,
        headerTintColor: options.headerTintColor,
        headerTitleStyle: options.headerTitleStyle,
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
        component={DSPScreen}
        options={{
          drawerLabel: 'Monthly',
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={ExportProgress}
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

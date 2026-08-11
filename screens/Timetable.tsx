import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Cache } from '../cache/cache.service';
import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { DailyQuestions } from '../ui/components/Questions';
import { TimetableCard } from '../ui/components/TimetableCard';

interface ScheduleItem {
  time: string;
  activity: string;
}
const Schedule = () => {
  const storedSchedule: ScheduleItem[] | undefined = Cache.getTimetable();
  if (storedSchedule) {
    return storedSchedule.map(({ time, activity }: { time: string; activity: string }, index) => {
      return <TimetableCard time={time} activity={activity} active={false} key={index} />;
    });
  } else {
    return <></>;
  }
};
export const TimetableScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Timetable</Text>
        <Text style={styles.emphasize}>{new Date().toDateString()}</Text>
        <DailyQuestions />
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <Schedule />
        </ScrollView>
      </View>
    </>
  );
};

const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    headingContainer: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: colors.background,
      justifyContent: 'flex-start',
      padding: 10,
    },
    bodyContainer: {
      flex: 4,
      backgroundColor: colors.background,
      gap: 10,
    },
    heading: {
      fontSize: 24,
      fontFamily: 'roboto',
      fontWeight: 'bold',
      color: colors.surface_bright,
      letterSpacing: 3,
    },
    goal: {
      fontSize: 24,
      fontWeight: '700',
      marginHorizontal: 10,
      color: colors.tertiary,
    },
    emphasize: {
      fontSize: 20,
      color: colors.inverse_primary,
      fontFamily: 'sans-serif',
    },
    spacing: { paddingStart: 10, marginBottom: 10 },
  });

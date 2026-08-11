import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Cache } from '../cache/cache.service';
import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { DSPCard } from '../ui/components/DSPCard';
import { DailyQuestions } from '../ui/components/Questions';

const Schedule = () => {
  const storedLearningPlan = Cache.getLearningPlan();
  if (storedLearningPlan) {
    return Object.entries(storedLearningPlan).map(entry => {
      return <DSPCard day={entry[0]} activity={entry[1] as string | string[]} key={entry[0]} />;
    });
  } else {
    return <></>;
  }
};
export const DSPScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Daily Study Plan</Text>
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
      color: colors.custom_blue,
      fontFamily: 'sans-serif',
    },
    spacing: { paddingStart: 10, marginBottom: 10 },
  });

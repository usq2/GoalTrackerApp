import { View, Text, StyleSheet } from 'react-native';

import { Cache } from '../cache/cache.service';
import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { GoalsCard } from '../ui/components/GoalsCard';
import { daysLeftInCurrMonth } from '../utils/date';

const Goals = () => {
  const storedGoals = Cache.getGoals();
  if (storedGoals) {
    const parsedStoredGoals = JSON.parse(storedGoals);
    return parsedStoredGoals.priorities.map((text: string, index: number) => {
      return <GoalsCard text={text} index={index} key={index} />;
    });
  } else {
    return <></>;
  }
};
export const MissionScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);
  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          For the next
          <Text style={[styles.heading, styles.emphasize]}> {daysLeftInCurrMonth()} days</Text>
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={[styles.heading, { paddingStart: 10, marginBottom: 10 }]}>Monthly Goals</Text>
        <Goals />
      </View>
    </>
  );
};

const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    headingContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
    bodyContainer: {
      flex: 2,
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
      fontSize: 30,
      color: colors.inverse_primary,
      fontFamily: 'sans-serif',
    },
  });

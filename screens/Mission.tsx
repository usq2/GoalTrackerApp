import { View, Text, StyleSheet } from 'react-native';

import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';

export const MissionScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>For the next 30 days, I have only two priorities:</Text>
      <Text style={styles.goal}>
        1. Reach 78 kg (long-term goal) by consistently losing weight.
      </Text>
      <Text style={styles.goal}>
        2. Become an exceptional software developer through deliberate practice.
      </Text>
    </View>
  );
};

const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
      gap: 10,
    },
    heading: {
      fontSize: 30,
      fontWeight: '700',
      margin: 10,
      color: colors.background,
      letterSpacing: 3,
    },
    goal: {
      fontSize: 24,
      fontWeight: '700',
      marginHorizontal: 10,
      color: colors.tertiary,
    },
  });

import { View, Text, StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';
import { HealthIcon } from '../icons/Health';
import { StudyIcon } from '../icons/Study';

export const GoalsCard = ({ index, text }: { index: number; text: string }) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing, index);
  return (
    <View style={styles.card}>
      <View style={styles.logoContainer}>{determineIcon(text, colors, index)}</View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{determineHeading(text)}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const getBorderColor = (colors: ColorPallete, index: number) => {
  if (index % 2) return colors.custom_blue;
  return colors.inverse_primary;
};
const determineHeading = (text: string) => {
  if (
    text.includes('weight') ||
    text.includes('exercise') ||
    text.includes('muscle') ||
    text.includes('diet') ||
    text.includes('losing weight')
  ) {
    return 'Physical Health';
  }
  return 'Growth';
};
const determineIcon = (text: string, colors: ColorPallete, index: number) => {
  const size = 36;
  if (
    text.includes('weight') ||
    text.includes('exercise') ||
    text.includes('muscle') ||
    text.includes('diet') ||
    text.includes('losing weight')
  ) {
    return <HealthIcon color={getBorderColor(colors, index)} size={size} />;
  }
  return <StudyIcon color={getBorderColor(colors, index)} size={size} />;
};
const applyStyles = (colors: ColorPallete, spacing: Spacing, index: number) => {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginHorizontal: 10,
      backgroundColor: colors.background,
      marginBottom: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.inverse_surface,
      borderRadius: 5,
    },
    logoContainer: {
      flex: 1,
      borderLeftWidth: 3,
      borderColor: getBorderColor(colors, index),
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: spacing.stack_md,
    },
    textContainer: { flex: 3, gap: 10, paddingVertical: spacing.stack_md },
    text: {
      color: getBorderColor(colors, index),
      fontSize: 16,
    },
    heading: {
      color: colors.surface,
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'Roboto',
    },
  });
};

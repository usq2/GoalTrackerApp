import { View, Text, StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';
import { BaseCard } from '../atoms/BaseCard';

function getStartTime(timeRange: string): string {
  const parts = timeRange.split('--');
  if (parts.length < 2) return timeRange.trim();

  const startPart = parts[0].trim();
  const upperStart = startPart.toUpperCase();

  // If start part already has AM or PM, return it as-is
  if (upperStart.endsWith('AM') || upperStart.endsWith('PM')) {
    return startPart;
  }

  // Otherwise, extract AM or PM from the end part
  const endPart = parts[1].trim().toUpperCase();
  const period = endPart.endsWith('PM') ? 'PM' : 'AM';

  return `${startPart} ${period}`;
}
export const TimetableCard = ({
  time,
  activity,
}: {
  time: string;
  activity: string;
  active: boolean;
}) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <View style={styles.outerCard}>
      <View style={styles.leftContainer}>
        <Text style={styles.time}>{getStartTime(time)}</Text>
      </View>
      <BaseCard
        cardStyles={styles.textContainer}
        Heading={<Text style={styles.heading}>{activity}</Text>}
      />
    </View>
  );
};

const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    outerCard: {
      flexDirection: 'row',
      marginBottom: spacing.container_margin,
    },
    textContainer: {
      flex: 3,
      gap: 10,
      paddingHorizontal: spacing.stack_sm,
      paddingVertical: spacing.stack_md,
      borderLeftWidth: 3,
      borderColor: colors.inverse_surface,
      borderStartColor: colors.inverse_primary,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 5,

      marginEnd: spacing.gutter,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginEnd: spacing.stack_md,
    },
    time: {
      fontSize: 16,
      color: colors.inverse_primary,
    },
    heading: {
      color: colors.surface,
      paddingVertical: spacing.gutter,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'Roboto',
    },
  });
};

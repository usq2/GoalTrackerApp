import { View, Text, StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';
import { BaseCard } from '../atoms/BaseCard';

function MapActivity(activity: string | Array<string>) {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  if (Array.isArray(activity)) {
    return activity.map((text: string) => {
      return <Text style={styles.heading}>{text}</Text>;
    });
  }
  return <Text style={styles.heading}>{activity}</Text>;
}
export const DSPCard = ({ day, activity }: { day: string; activity: string | Array<string> }) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <View style={styles.outerCard}>
      <View style={styles.leftContainer}>
        <Text style={styles.time}>{day}</Text>
      </View>
      <BaseCard
        cardStyles={styles.card}
        Heading={<View style={styles.textContainer}>{MapActivity(activity)}</View>}
      />
    </View>
  );
};

const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    outerCard: {
      flexDirection: 'row',
    },
    card: {
      flexDirection: 'row',
      marginHorizontal: 10,
      backgroundColor: colors.background,
      marginBottom: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.custom_blue,
      borderRadius: 5,
      flex: 3,
    },

    textContainer: {
      flex: 3,
      gap: 10,
      paddingHorizontal: spacing.stack_sm,
      paddingVertical: spacing.stack_md,
      borderLeftWidth: 3,
      borderColor: colors.custom_blue,
      borderRadius: 5,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    time: {
      fontSize: 16,
      color: colors.surface_bright,
    },
    heading: {
      color: colors.custom_blue,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'Roboto',
    },
  });
};

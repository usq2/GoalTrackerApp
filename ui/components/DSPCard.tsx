import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { BaseCard } from '../atoms/BaseCard';

import { applyStyles } from './DSPCard.styles';

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
export const DSPCard = ({
  day,
  activity,
  last,
}: {
  day: string;
  activity: string | Array<string>;
  last: boolean;
}) => {
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
        last={last}
      />
    </View>
  );
};

import { View, Text } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { BaseCard } from '../atoms/BaseCard';

import { applyStyles } from './Timetable.styles';

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
  last,
  active,
}: {
  time: string;
  activity: string;
  last: boolean;
  active: boolean;
}) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing, active);
  return (
    <View style={styles.outerCard}>
      <View style={styles.leftContainer}>
        <Text style={styles.time}>{getStartTime(time)}</Text>
        {active && <Text style={styles.now}>Now</Text>}
      </View>
      <BaseCard
        last={last}
        cardStyles={styles.textContainer}
        Heading={<Text style={styles.heading}>{activity}</Text>}
      />
    </View>
  );
};

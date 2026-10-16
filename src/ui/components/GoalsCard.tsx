import { View, Text } from 'react-native';

import { ColorPallete } from '@contexts/types';
import { BaseCard } from '@ui/atoms/BaseCard';
import { HealthIcon } from '@ui/icons/Health';
import { StudyIcon } from '@ui/icons/Study';

import { useTheme } from '@app/hooks/useTheme';

import { applyStyles } from './GoalsCard.styles';

export const GoalsCard = ({
  index,
  text,
  last,
}: {
  index: number;
  text: string;
  last: boolean;
}) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <BaseCard
      last={last}
      Logo={<View style={styles.logoContainer}>{determineIcon(text, colors, index)}</View>}
      Heading={
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{determineHeading(text)}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      }
    />
  );
};

const getIconColor = (colors: ColorPallete, index: number) => {
  if (index % 2) return colors.success;
  return colors.warning;
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
    return <HealthIcon color={getIconColor(colors, index)} size={size} />;
  }
  return <StudyIcon color={getIconColor(colors, index)} size={size} />;
};

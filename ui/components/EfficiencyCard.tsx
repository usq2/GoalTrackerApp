import { View, Text } from 'react-native';

import { PieChart } from 'react-native-gifted-charts';

import { useTheme } from '../../hooks/useTheme';

import { applyStyles } from './EfficiencyCard.styles';

const CenterLabelComponent = ({ score }: { score?: number }) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <View style={styles.centerLabel}>
      <Text style={styles.scoreText}>{score}%</Text>
    </View>
  );
};
const EfficiencyCard = ({ score = 0 }: { score?: number }) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  // Data array: Filled percentage vs remaining track percentage
  const pieData = [
    { value: score, color: colors.success },
    { value: 100 - score, color: colors.outline },
  ];

  return (
    <View style={styles.chartWrapper}>
      <PieChart
        data={pieData}
        donut
        radius={100}
        innerRadius={82}
        strokeWidth={0}
        strokeColor="transparent"
        innerCircleColor={colors.surface_container_high}
        endAngle={405}
        isAnimated={true}
        animationDuration={1200}
        // Custom center component for score & label
        centerLabelComponent={() => <CenterLabelComponent score={score} />}
      />
    </View>
  );
};

export default EfficiencyCard;

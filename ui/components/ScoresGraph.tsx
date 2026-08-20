import { View, Text } from 'react-native';

import { BarChart } from 'react-native-gifted-charts';

import { useTheme } from '../../hooks/useTheme';
import { ProgressService } from '../../service/ProgressMgr';
import { PrepBarChartData } from '../../utils/data';

import { applyStyles } from './Graph.styles';

export const ScoresGraph = () => {
  const scores = ProgressService.getLast7DailyProgress();
  const graphData = PrepBarChartData(scores);
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphHeader}>Scores</Text>
      <BarChart
        data={graphData}
        height={180}
        barWidth={24}
        spacing={16}
        initialSpacing={12}
        barBorderRadius={6}
        // Colors & Gradient
        frontColor={colors.info}
        gradientColor={colors.warning_heading} // Top gradient color
        showGradient
        // Axes & Grid
        rulesColor={'transparent'}
        rulesType="solid"
        xAxisColor={colors.surface_container_lowest}
        yAxisColor={colors.surface_container_lowest}
        // Text Styling
        xAxisLabelTextStyle={styles.graphLabels}
        yAxisTextStyle={styles.graphLabels}
      />
    </View>
  );
};

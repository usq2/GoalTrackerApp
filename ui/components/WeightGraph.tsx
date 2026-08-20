import { View, Text } from 'react-native';

import { LineChart } from 'react-native-gifted-charts';

import { useTheme } from '../../hooks/useTheme';
import { useWeightGraphPresenter } from '../../presenter/WeightGraph.presenter';

import { applyStyles } from './Graph.styles';

export const WeightGraph = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);

  const { graphData } = useWeightGraphPresenter();
  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphHeader}>Weight</Text>
      <LineChart
        data={graphData}
        height={180}
        curved
        color={colors.success}
        thickness={2}
        startFillColor="rgba(16, 185, 129, 0.3)"
        endFillColor="rgba(16, 185, 129, 0.01)"
        // Data Points / Dots
        dataPointsColor={colors.critical}
        dataPointsRadius={5}
        // Axes & Grid
        rulesColor={colors.surface_dim}
        xAxisColor={colors.surface_container_lowest}
        yAxisColor={colors.surface_container_lowest}
        // Axis Text
        xAxisLabelTextStyle={styles.graphLabels}
        yAxisTextStyle={styles.graphLabels}
        yAxisOffset={80}
        noOfSections={4}
      />
    </View>
  );
};

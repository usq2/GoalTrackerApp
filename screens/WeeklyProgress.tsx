import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { LineChart, BarChart } from 'react-native-gifted-charts';

import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { ProgressService } from '../service/ProgressMgr';
import { WeightService } from '../service/WeightMgr';
import { DailyQuestions } from '../ui/components/Questions';
import { PrepBarChartData, PrepLineChartData } from '../utils/data';

const Weight = () => {
  const weights = WeightService.getLast7Weight();
  const graphData = PrepLineChartData(weights);
  const { colors } = useTheme();

  return (
    <>
      <Text style={{ marginBottom: 10 }}>Weight</Text>
      <LineChart
        data={graphData}
        height={180}
        curved
        color={colors.custom_blue}
        thickness={2}
        startFillColor="rgba(16, 185, 129, 0.3)"
        endFillColor="rgba(16, 185, 129, 0.01)"
        // Data Points / Dots
        dataPointsColor={colors.primary}
        dataPointsRadius={4}
        // Axes & Grid
        rulesColor={colors.custom_blue}
        xAxisColor={colors.primary}
        yAxisColor={colors.primary}
        // Axis Text
        xAxisLabelTextStyle={{ color: colors.surface_bright, fontSize: 12 }}
        yAxisTextStyle={{ color: colors.surface_bright, fontSize: 12 }}
        yAxisOffset={80}
        noOfSections={4}
      />
    </>
  );
};

const Scores = () => {
  const scores = ProgressService.getLast7DailyProgress();
  const graphData = PrepBarChartData(scores);
  return (
    <>
      <Text style={{ marginBottom: 10 }}>Scores</Text>
      <BarChart
        data={graphData}
        height={180}
        barWidth={24}
        spacing={16}
        initialSpacing={12}
        barBorderRadius={6}
        // Colors & Gradient
        frontColor="#6366F1" // Primary bar color (Indigo)
        gradientColor="#A5B4FC" // Top gradient color
        showGradient
        // Axes & Grid
        rulesColor="#E5E7EB" // Soft grid line color
        rulesType="solid"
        xAxisColor="#9CA3AF"
        yAxisColor="transparent" // Hide harsh vertical axis line
        // Text Styling
        xAxisLabelTextStyle={{ color: '#4B5563', fontSize: 12 }}
        yAxisTextStyle={{ color: '#9CA3AF', fontSize: 10 }}
        // Target Line
        showReferenceLine1
        referenceLine1Position={85}
        referenceLine1Config={{
          color: '#EF4444', // Red goal line
          dashWidth: 4,
          dashGap: 4,
        }}
      />
    </>
  );
};
export const WeeklyProgressScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);

  //   Get last 7 daily goals entries and show them on screen
  // get last 7 weight and show them on screen, graph?????
  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Weekly Progress Report</Text>
        <DailyQuestions />
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <Weight />
          <Scores />
        </ScrollView>
      </View>
    </>
  );
};

const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    headingContainer: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: colors.background,
      justifyContent: 'flex-start',
      padding: 10,
    },
    bodyContainer: {
      flex: 4,
      backgroundColor: colors.background,
      gap: 10,
    },
    heading: {
      fontSize: 24,
      fontFamily: 'roboto',
      fontWeight: 'bold',
      color: colors.surface_bright,
      letterSpacing: 3,
    },
    goal: {
      fontSize: 24,
      fontWeight: '700',
      marginHorizontal: 10,
      color: colors.tertiary,
    },
    emphasize: {
      fontSize: 20,
      color: colors.inverse_primary,
      fontFamily: 'sans-serif',
    },
    spacing: { paddingStart: 10, marginBottom: 10 },
  });

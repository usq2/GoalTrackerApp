import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { DailyQuestions } from '../ui/components/Questions';
import { Schedule } from '../ui/components/StudyPlan';

import { applyStyles } from './DailyStudyPlan.styles';

export const DSPScreen = () => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.emphasize}>{new Date().toDateString()}</Text>
      <DailyQuestions />
      <View style={styles.bodyContainer}>
        <Schedule />
      </View>
    </ScrollView>
  );
};

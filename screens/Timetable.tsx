import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { DailyQuestions } from '../ui/components/Questions';
import { Schedule } from '../ui/components/Schedule';

import { applyStyles } from './Timetable.styles';

export const TimetableScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);

  return (
    <ScrollView style={styles.bodyContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.emphasize}>{new Date().toDateString()}</Text>
      </View>
      <DailyQuestions />
      <Schedule />
    </ScrollView>
  );
};

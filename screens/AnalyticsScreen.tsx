import { Pressable, ScrollView, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { useExportProgress } from '../presenter/ExportProgress.presenter';

import { applyStyles } from './AnalyticsScreen.styles';

export const ExportProgress = () => {
  const { prepareDataForLast7Days, clipboardText } = useExportProgress();
  const { colors, spacing } = useTheme();

  const styles = applyStyles(colors, spacing);
  return (
    <ScrollView style={styles.bodyContainer}>
      <Text style={{ color: '#fff' }}>{clipboardText}</Text>
      <Pressable style={styles.button} onPress={() => prepareDataForLast7Days()}>
        <Text style={styles.emphasize}>Export this week's data</Text>
      </Pressable>
    </ScrollView>
  );
};

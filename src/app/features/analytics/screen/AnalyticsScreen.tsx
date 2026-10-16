import { Pressable, ScrollView, Text } from 'react-native';

import { applyStyles } from '@features/analytics/screen/AnalyticsScreen.styles';

import { useExportProgress } from '@app/presenter/ExportProgress.presenter';

import { useTheme } from '@hooks/useTheme';

export const ExportProgress = () => {
  const { prepareDataForLast7Days, clipboardText } = useExportProgress();
  const { colors, spacing } = useTheme();

  const styles = applyStyles(colors, spacing);
  return (
    <ScrollView style={styles.bodyContainer}>
      <Text style={styles.white_text}>{clipboardText}</Text>
      <Pressable style={styles.button} onPress={() => prepareDataForLast7Days()}>
        <Text style={styles.emphasize}>Export this week's data</Text>
      </Pressable>
    </ScrollView>
  );
};

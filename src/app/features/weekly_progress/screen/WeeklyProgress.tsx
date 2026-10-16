import { View, ScrollView } from 'react-native';

import { ScoresGraph } from '@ui/components/ScoresGraph';
import { WeightGraph } from '@ui/components/WeightGraph';

import { useTheme } from '@hooks/useTheme';

import { applyStyles } from './WeeklyProgress.styles';

export const WeeklyProgressScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);

  return (
    <View style={styles.bodyContainer}>
      <ScrollView>
        <WeightGraph />
        <ScoresGraph />
      </ScrollView>
    </View>
  );
};

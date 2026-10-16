import { View, Text } from 'react-native';

import { useMissionPresenter } from '@features/mission/presenter/Mission.presenter';
import { applyStyles } from '@features/mission/screen/Mission.styles';
import { Cache } from '@modules/cache/cache.service';
import { GoalsCard } from '@ui/components/GoalsCard';

import { useTheme } from '@hooks/useTheme';

const Goals = () => {
  const storedGoals = Cache.getGoals();
  if (storedGoals) {
    return storedGoals.priorities.map((text: string, index: number) => {
      return (
        <GoalsCard
          text={text}
          index={index}
          key={index}
          last={index === storedGoals.priorities.length - 1}
        />
      );
    });
  } else {
    return <></>;
  }
};
export const MissionScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);

  const { daysLeft } = useMissionPresenter();
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>TIME REMAINING</Text>
        <Text style={[styles.heading, styles.emphasize]}> {daysLeft} Days Left</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.goalHeading}>Monthly Goals</Text>
        <Goals />
      </View>
    </View>
  );
};

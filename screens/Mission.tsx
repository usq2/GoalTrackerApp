import { View, Text } from 'react-native';

import { Cache } from '../cache/cache.service';
import { useTheme } from '../hooks/useTheme';
import { useMissionPresenter } from '../presenter/Mission.presenter';
import { GoalsCard } from '../ui/components/GoalsCard';

import { applyStyles } from './Mission.styles';

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

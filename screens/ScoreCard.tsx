import { View, Text, ScrollView, TextInput } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { useScoreCardPresenter } from '../presenter/ScoreCard.presenter';
import { BaseCard } from '../ui/atoms/BaseCard';
import { Checkbox } from '../ui/atoms/Checkbox';
import EfficiencyCard from '../ui/components/EfficiencyCard';
import { CheckboxProps } from '../ui/types/Checkbox.types';

import { applyStyles } from './ScoreCard.styles';

const CheckableCard = ({ label, value, onValueChange }: CheckboxProps) => {
  const { colors, spacing } = useTheme();
  return (
    <BaseCard
      last={false}
      cardStyles={{
        padding: spacing.gutter,
      }}
      Heading={
        <Checkbox
          label={label}
          value={value}
          onValueChange={val => onValueChange(val)}
          color={colors.primary}
        />
      }
    />
  );
};

export const ScoreCardScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);

  const { onCheck, goals, calories, weight, handleWeight, handleCalories, percentageScore } =
    useScoreCardPresenter();
  return (
    <ScrollView style={styles.bodyContainer}>
      <View style={styles.heading}>
        <EfficiencyCard score={percentageScore} />
      </View>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={handleWeight}
        placeholder="Enter today's weight..."
        placeholderTextColor={colors.on_background}
        keyboardType="numeric"
        key="weight"
      />
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={handleCalories}
        placeholder="Enter today's calories deficit..."
        placeholderTextColor={colors.on_background}
        keyboardType="numeric"
        key="calories"
      />
      {Object.keys(goals).map((dailyGoals, index) => {
        return (
          <View style={styles.sectionCard}>
            <Text key={index} style={styles.checkHeader}>
              {dailyGoals}
            </Text>
            {Object.keys(goals[dailyGoals]).map(label => {
              return (
                <CheckableCard
                  label={label}
                  value={goals[dailyGoals][label]}
                  onValueChange={value => onCheck(value, dailyGoals, label)}
                  key={`${dailyGoals}-${label}-${index}`}
                />
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

import { useMemo, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

import { Cache } from '../cache/cache.service';
import { ColorPallete, Spacing } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { BaseCard } from '../ui/atoms/BaseCard';
import { Checkbox } from '../ui/atoms/Checkbox';
import { TargetIcon } from '../ui/icons/Target';
import { CheckboxProps } from '../ui/types/Checkbox.types';
import { getScoreFromGoals } from '../utils/data';

const CheckableCard = ({ label, value, onValueChange }: CheckboxProps) => {
  const { colors, spacing } = useTheme();
  return (
    <BaseCard
      cardStyles={{
        padding: spacing.gutter,
      }}
      Heading={
        <Checkbox
          label={label}
          value={value}
          onValueChange={value => onValueChange(value)}
          color={colors.primary}
        />
      }
    />
  );
};
function flattenObjContainsArray(obj: object) {
  const flattendObj: { [key: string]: { [key: string]: boolean } } = {};
  for (const [key, value] of Object.entries(obj)) {
    flattendObj[key] = {};
    if (Array.isArray(value)) {
      value.forEach(val => {
        flattendObj[key][val] = false;
      });
    }
  }
  return flattendObj;
}

export const ScoreCardScreen = () => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  const [weight, setWeight] = useState<string>('');
  const [goals, setGoals] = useState<Record<string, Record<string, boolean>>>(() => {
    const todaysData = Cache.getTodaysProgress();
    if (todaysData) {
      return todaysData.report;
    }
    const goals = Cache.getDailyGoals();
    if (!goals) return {};
    return flattenObjContainsArray(goals);
  });

  const [score, setScore] = useState<string>(() => getScoreFromGoals(goals));

  function handleWeight(text: string) {
    setWeight(text);
    Cache.setDailyWeight(
      new Date().toDateString(),
      JSON.stringify({ date: new Date().toDateString(), weight: text }),
    );
  }
  return (
    <>
      <View style={styles.heading}>
        <TargetIcon color={colors.primary} size={32} />
        <Text style={styles.headerText}>{score}</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeight}
          placeholder="Enter today's weight..."
          keyboardType="numeric"
        />
        {Object.keys(goals).map((dailyGoals, index) => {
          return (
            <>
              <Text key={index} style={styles.checkHeader}>
                {dailyGoals}
              </Text>
              {Object.keys(goals[dailyGoals]).map((label, index) => {
                function onCheck(value: boolean) {
                  setGoals(prev => {
                    prev[dailyGoals][label] = value;
                    return {
                      ...prev,
                    };
                  });
                  setScore(prev => {
                    const score = prev.split('/')[0];
                    const total = prev.split('/')[1];
                    if (value) return `${Number(score) + 1}/${total}`;
                    else return `${Number(score) - 1}/${total}`;
                  });
                  Cache.setDailyProgress(
                    new Date().toDateString(),
                    JSON.stringify({
                      date: new Date().toDateString(),
                      report: goals,
                    }),
                  );
                }
                return (
                  <CheckableCard
                    label={label}
                    value={goals[dailyGoals][label]}
                    onValueChange={onCheck}
                    key={index}
                  />
                );
              })}
            </>
          );
        })}
      </ScrollView>
    </>
  );
};

const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    heading: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      alignItems: 'center',
      gap: spacing.gutter,
      padding: spacing.container_margin,
    },
    input: {
      marginHorizontal: spacing.stack_sm,
      backgroundColor: colors.on_primary_container,
      color: colors.inverse_primary,
    },
    headerText: {
      fontSize: 20,
      color: colors.primary,
    },
    bodyContainer: {
      flex: 2,
      backgroundColor: colors.background,
      gap: 10,
    },
    spacing: { paddingStart: 10, marginBottom: 10 },
    checkHeader: {
      color: colors.inverse_primary,
      textTransform: 'capitalize',
      margin: spacing.gutter,
      fontSize: 24,
    },
  });

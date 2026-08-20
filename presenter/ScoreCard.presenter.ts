import { useState, useMemo } from 'react';

import { Cache } from '../cache/cache.service';
import { CaloriesService } from '../service/CaloriesMgr';
import { ProgressService } from '../service/ProgressMgr';
import { WeightService } from '../service/WeightMgr';
import { getScoreFromGoals } from '../utils/data';

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
export const useScoreCardPresenter = () => {
  const [weight, setWeight] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [goals, setGoals] = useState<Record<string, Record<string, boolean>>>(() => {
    const todaysData = ProgressService.getTodaysProgress();
    if (todaysData) {
      return todaysData.report;
    }
    const cachedGoals = Cache.getDailyGoals();
    if (!cachedGoals) return {};
    return flattenObjContainsArray(cachedGoals);
  });

  const [score, setScore] = useState<string>(() => getScoreFromGoals(goals));

  function handleWeight(text: string) {
    setWeight(text);
    WeightService.setDailyWeight(
      new Date().toDateString(),
      JSON.stringify({ date: new Date().toDateString(), weight: text }),
    );
  }
  function handleCalories(text: string) {
    setCalories(text);
    CaloriesService.setDailyCaloriesDeficit(
      new Date().toDateString(),
      JSON.stringify({ date: new Date().toDateString(), caloriesDeficit: text }),
    );
  }
  const percentageScore = useMemo(() => {
    return (Number(score.split('/')[0]) / Number(score.split('/')[1])) * 100;
  }, [score]);

  function onCheck(value: boolean, dailyGoals: string, label: string) {
    setGoals(prev => {
      prev[dailyGoals][label] = value;
      return {
        ...prev,
      };
    });
    setScore(prev => {
      const localScore = prev.split('/')[0];
      const total = prev.split('/')[1];
      if (value) return `${Number(localScore) + 1}/${total}`;
      else return `${Number(localScore) - 1}/${total}`;
    });
    ProgressService.setDailyProgress(
      new Date().toDateString(),
      JSON.stringify({
        date: new Date().toDateString(),
        report: goals,
      }),
    );
  }
  return {
    goals,
    weight,
    calories,
    setGoals,
    setScore,
    handleWeight,
    handleCalories,
    percentageScore,
    onCheck,
  };
};

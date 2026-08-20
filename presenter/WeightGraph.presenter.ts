import { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { WeightService } from '../service/WeightMgr';
import { PrepLineChartData } from '../utils/data';

export const useWeightGraphPresenter = () => {
  const [graphData, setGraphData] = useState(PrepLineChartData(WeightService.getLast7Weight()));
  const refreshData = useCallback(() => {
    setGraphData(PrepLineChartData(WeightService.getLast7Weight()));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData]),
  );

  return {
    graphData,
    refreshData,
  };
};

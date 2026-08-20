import { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { ProgressService } from '../service/ProgressMgr';
import { PrepBarChartData } from '../utils/data';

export const useWeightGraphPresenter = () => {
  const [graphData, setGraphData] = useState(
    PrepBarChartData(ProgressService.getLast7DailyProgress()),
  );

  const refreshData = useCallback(() => {
    setGraphData(PrepBarChartData(ProgressService.getLast7DailyProgress()));
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

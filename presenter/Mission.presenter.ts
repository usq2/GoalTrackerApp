import { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { daysLeftInCurrMonth } from '../utils/date';

export const useMissionPresenter = () => {
  const [daysLeft, setDaysLeft] = useState(daysLeftInCurrMonth());

  const refreshData = useCallback(() => {
    setDaysLeft(daysLeftInCurrMonth());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData]),
  );

  return {
    daysLeft,
    refreshData,
  };
};

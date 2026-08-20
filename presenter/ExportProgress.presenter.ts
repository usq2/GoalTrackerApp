import { useState } from 'react';

import { Alert } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import { ProgressService } from '../service/ProgressMgr';
import { WeightService } from '../service/WeightMgr';

export const useExportProgress = () => {
  const [clipboardText, setClipboardText] = useState<string>('');
  const prepareDataForLast7Days = () => {
    const last7DaysProgress = ProgressService.getLast7DailyProgress();
    const last7DaysWeight = WeightService.getLast7Weight();

    const retVal = [];
    last7DaysProgress.forEach(day => {
      const daysWeight = last7DaysWeight.find(weight => weight.date === day.date);
      retVal.push({ date: day.date, report: { ...day.report, weight: daysWeight.weight } });
    });
    setClipboardText(JSON.stringify(retVal));
    Clipboard.setString(JSON.stringify(retVal));
    return retVal;
  };

  return {
    clipboardText,
    prepareDataForLast7Days,
  };
};

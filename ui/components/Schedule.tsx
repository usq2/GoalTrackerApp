import { useCallback } from 'react';

import { Cache } from '../../cache/cache.service';

import { TimetableCard } from './TimetableCard';

interface ScheduleItem {
  time: string;
  activity: string;
}
export const Schedule = () => {
  const storedSchedule: ScheduleItem[] | undefined = Cache.getTimetable();
  const isCurrentTimeInRange = useCallback((timeRange: string): boolean => {
    const parts = timeRange.split(/\s*--\s*/);
    if (parts.length !== 2) {
      return false;
    }

    let startStr = parts[0].trim();
    const endStr = parts[1].trim();

    // Extract modifier from end time if start time lacks AM/PM
    const amPmRegex = /(AM|PM)$/i;
    const startHasAmPm = amPmRegex.test(startStr);
    const endMatch = endStr.match(amPmRegex);

    if (!startHasAmPm && endMatch) {
      startStr = `${startStr} ${endMatch[0]}`;
    }

    const parseTimeString = (timeStr: string): number | false => {
      const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return false;

      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const modifier = match[3].toUpperCase();

      if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return false;

      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return hours * 60 + minutes;
    };

    const startMinutes = parseTimeString(startStr);
    const endMinutes = parseTimeString(endStr);

    if (startMinutes === false || endMinutes === false) {
      return false;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    } else {
      // Overnight range (e.g., "10:00 PM -- 4:00 AM")
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }
  }, []);
  if (storedSchedule) {
    return storedSchedule.map(({ time, activity }: { time: string; activity: string }, index) => {
      return (
        <TimetableCard
          time={time}
          activity={activity}
          active={isCurrentTimeInRange(time)}
          key={index}
          last={index === storedSchedule.length - 1}
        />
      );
    });
  } else {
    return <></>;
  }
};

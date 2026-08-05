import { Cache } from './cache.service';
import { seed } from './seed';

export const seedCache = () => {
  // check if cache already seeded
  const cacheSeeded = Cache.healthCheck();
  if (cacheSeeded) {
    return;
  }
  try {
    Cache.setGoals(JSON.stringify(seed.mission));
    Cache.setTimetable(JSON.stringify(seed.weekday_timetable));
    Cache.setDailyGoals(JSON.stringify(seed.daily_scorecard));
    Cache.setLearningPlan(JSON.stringify(seed.learning_plan));
    Cache.setMonthlySuccessCriteria(JSON.stringify(seed.monthly_success_criteria));
    Cache.setDailyRules(JSON.stringify(seed.rule_for_the_month));
    Cache.setWeeklyCheckIn(JSON.stringify(seed.weekly_checkin));
  } catch (cache_error) {
    return new Error('Failed to populate cache');
  }
};

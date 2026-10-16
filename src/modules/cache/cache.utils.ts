import { Cache } from './cache.service';
import { seed } from './seed';

export const seedCache = () => {
  // Check if cache key exists rather than checking storage instance existence
  if (Cache.isSeeded()) {
    console.log('Cache already seeded.');
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

    // Mark cache as successfully seeded
    Cache.markSeeded();
    console.log('Cache seeded successfully');
  } catch (error) {
    console.error('Failed to populate cache:', error);
  }
};

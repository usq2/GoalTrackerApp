import { createMMKV } from 'react-native-mmkv';

const STORAGE_ID = 'goal_tracker_storage';
const storage = createMMKV({
  id: STORAGE_ID,
});
class CacheService {
  isSeeded(): boolean {
    return storage.contains(this.IS_SEEDED_KEY);
  }

  markSeeded() {
    storage.set(this.IS_SEEDED_KEY, true);
  }
  setGoals(value: string) {
    storage.set(this.GOALS_KEY, value);
  }
  getGoals() {
    return storage.getString(this.GOALS_KEY);
  }
  deleteGoals() {
    storage.remove(this.GOALS_KEY);
  }
  setDailyGoals(value: string) {
    storage.set(this.DAILY_GOALS_KEY, value);
  }
  getDailyGoals() {
    return storage.getString(this.DAILY_GOALS_KEY);
  }
  deleteDailyGoals() {
    storage.remove(this.DAILY_GOALS_KEY);
  }
  setDailyRules(value: string) {
    storage.set(this.DAILY_RULES_KEY, value);
  }
  getDailyRules() {
    return storage.getString(this.DAILY_RULES_KEY);
  }
  deleteDailyRules() {
    storage.remove(this.DAILY_RULES_KEY);
  }
  setTimetable(value: string) {
    storage.set(this.TIMETABLE_KEY, value);
  }
  getTimetable() {
    return storage.getString(this.TIMETABLE_KEY);
  }
  deleteTimetable() {
    storage.remove(this.TIMETABLE_KEY);
  }
  setLearningPlan(value: string) {
    storage.set(this.LEARNING_PLAN_KEY, value);
  }
  getLearningPlan() {
    return storage.getString(this.LEARNING_PLAN_KEY);
  }
  deleteLearningPlan() {
    storage.remove(this.LEARNING_PLAN_KEY);
  }
  setMonthlySuccessCriteria(value: string) {
    storage.set(this.MONTHLY_SUCCESS_CRITERIA_KEY, value);
  }
  getMonthlySuccessCriteria() {
    return storage.getString(this.MONTHLY_SUCCESS_CRITERIA_KEY);
  }
  deleteMonthlySuccessCriteria() {
    storage.remove(this.MONTHLY_SUCCESS_CRITERIA_KEY);
  }
  setWeeklyCheckIn(value: string) {
    storage.set(this.WEEKLY_CHECKIN_KEY, value);
  }
  getWeeklyCheckIn() {
    return storage.getString(this.WEEKLY_CHECKIN_KEY);
  }
  deleteWeeklyCheckIn() {
    storage.remove(this.WEEKLY_CHECKIN_KEY);
  }
  deleteAll() {
    storage.clearAll();
  }

  private GOALS_KEY = 'goals';
  private DAILY_GOALS_KEY = 'daily_goals';
  private TIMETABLE_KEY = 'timetable';
  private LEARNING_PLAN_KEY = 'learning_plan';
  private DAILY_RULES_KEY = 'daily_rules';
  private MONTHLY_SUCCESS_CRITERIA_KEY = 'monthly_goals';
  private WEEKLY_CHECKIN_KEY = 'weekly_checkin';
  private IS_SEEDED_KEY = 'is_cache_seeded';
}

export const Cache = new CacheService();

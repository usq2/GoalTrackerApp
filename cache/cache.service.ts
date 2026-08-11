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
    const data = this.fetchStringFromStorage(this.GOALS_KEY);
    if (data) return JSON.parse(data);
  }
  deleteGoals() {
    storage.remove(this.GOALS_KEY);
  }
  setDailyGoals(value: string) {
    storage.set(this.DAILY_GOALS_KEY, value);
  }
  getDailyGoals() {
    const data = this.fetchStringFromStorage(this.DAILY_GOALS_KEY);
    if (data) return JSON.parse(data);
  }
  deleteDailyGoals() {
    storage.remove(this.DAILY_GOALS_KEY);
  }
  setDailyRules(value: string) {
    storage.set(this.DAILY_RULES_KEY, value);
  }
  getDailyRules() {
    const data = this.fetchStringFromStorage(this.DAILY_RULES_KEY);
    if (data) return JSON.parse(data);
  }
  deleteDailyRules() {
    storage.remove(this.DAILY_RULES_KEY);
  }
  setTimetable(value: string) {
    storage.set(this.TIMETABLE_KEY, value);
  }
  getTimetable() {
    const data = this.fetchStringFromStorage(this.TIMETABLE_KEY);
    if (data) return JSON.parse(data);
  }
  deleteTimetable() {
    storage.remove(this.TIMETABLE_KEY);
  }
  setLearningPlan(value: string) {
    storage.set(this.LEARNING_PLAN_KEY, value);
  }
  getLearningPlan() {
    const data = this.fetchStringFromStorage(this.LEARNING_PLAN_KEY);
    if (data) return JSON.parse(data);
  }
  deleteLearningPlan() {
    storage.remove(this.LEARNING_PLAN_KEY);
  }
  setMonthlySuccessCriteria(value: string) {
    storage.set(this.MONTHLY_SUCCESS_CRITERIA_KEY, value);
  }
  getMonthlySuccessCriteria() {
    const data = this.fetchStringFromStorage(this.MONTHLY_SUCCESS_CRITERIA_KEY);
    if (data) return JSON.parse(data);
  }
  deleteMonthlySuccessCriteria() {
    storage.remove(this.MONTHLY_SUCCESS_CRITERIA_KEY);
  }
  setWeeklyCheckIn(value: string) {
    storage.set(this.WEEKLY_CHECKIN_KEY, value);
  }
  getWeeklyCheckIn() {
    const data = this.fetchStringFromStorage(this.WEEKLY_CHECKIN_KEY);
    if (data) return JSON.parse(data);
  }
  deleteWeeklyCheckIn() {
    storage.remove(this.WEEKLY_CHECKIN_KEY);
  }
  deleteAll() {
    storage.clearAll();
  }
  setDailyProgress(date: string, value: string) {
    storage.set(this.DAILY_PROGRESS + '_' + date, value);
  }
  clearAllDailyProgress() {
    const all = this.fetchAllDailyProgress();
    all.forEach(key => storage.remove(key));
  }
  getLast7DailyProgress() {
    const all = this.fetchAllDailyProgress().slice(-7);
    return all.map(key => {
      const data = storage.getString(key);
      return JSON.parse(data!);
    });
  }
  getAllDailyProgress() {
    const all = this.fetchAllDailyProgress();
    return all.map(key => {
      const data = storage.getString(key);
      return JSON.parse(data!);
    });
  }
  getTodaysProgress() {
    const data = storage.getString(this.DAILY_PROGRESS + '_' + new Date().toDateString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  setDailyWeight(date: string, value: string) {
    storage.set(this.WEIGHT + '_' + date, value);
  }
  clearAllDailyWeight() {
    const all = this.fetchAllDailyWeight();
    all.forEach(key => storage.remove(key));
  }
  getAllDailyWeight() {
    const all = this.fetchAllDailyWeight();
    return all.map(key => {
      const data = storage.getString(key);
      return JSON.parse(data!);
    });
  }
  getLast7Weight() {
    const all = this.fetchAllDailyWeight().slice(-7);
    return all.map(key => {
      const data = storage.getString(key);
      return JSON.parse(data!);
    });
  }
  getTodaysWeight() {
    const data = storage.getString(this.WEIGHT + '_' + new Date().toDateString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  private fetchStringFromStorage(key: string) {
    const data = storage.getString(key);
    if (data) return data;
  }
  private fetchAllDailyProgress() {
    const all = storage.getAllKeys();
    return all.filter(key => key.startsWith(this.DAILY_PROGRESS));
  }
  private fetchAllDailyWeight() {
    const all = storage.getAllKeys();
    return all.filter(key => key.startsWith(this.WEIGHT));
  }
  private GOALS_KEY = 'goals';
  private DAILY_GOALS_KEY = 'daily_goals';
  private TIMETABLE_KEY = 'timetable';
  private LEARNING_PLAN_KEY = 'learning_plan';
  private DAILY_RULES_KEY = 'daily_rules';
  private MONTHLY_SUCCESS_CRITERIA_KEY = 'monthly_goals';
  private WEEKLY_CHECKIN_KEY = 'weekly_checkin';
  private IS_SEEDED_KEY = 'is_cache_seeded';

  private DAILY_PROGRESS = 'daily_progress';
  private WEIGHT = 'weight';
}

export const Cache = new CacheService();

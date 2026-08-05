import { createMMKV, existsMMKV, type MMKV } from 'react-native-mmkv';

class CacheService {
  constructor() {
    this._storage = createMMKV({
      id: this.STORAGE_ID,
    });
  }
  healthCheck() {
    return existsMMKV(this.STORAGE_ID);
  }
  setGoals(value: string) {
    this._storage.set(this.GOALS_KEY, value);
  }
  getGoals() {
    return this._storage.getString(this.GOALS_KEY);
  }
  deleteGoals() {
    this._storage.remove(this.GOALS_KEY);
  }
  setDailyGoals(value: string) {
    this._storage.set(this.DAILY_GOALS_KEY, value);
  }
  getDailyGoals() {
    return this._storage.getString(this.DAILY_GOALS_KEY);
  }
  deleteDailyGoals() {
    this._storage.remove(this.DAILY_GOALS_KEY);
  }
  setDailyRules(value: string) {
    this._storage.set(this.DAILY_RULES_KEY, value);
  }
  getDailyRules() {
    return this._storage.getString(this.DAILY_RULES_KEY);
  }
  deleteDailyRules() {
    this._storage.remove(this.DAILY_RULES_KEY);
  }
  setTimetable(value: string) {
    this._storage.set(this.TIMETABLE_KEY, value);
  }
  getTimetable() {
    return this._storage.getString(this.TIMETABLE_KEY);
  }
  deleteTimetable() {
    this._storage.remove(this.TIMETABLE_KEY);
  }
  setLearningPlan(value: string) {
    this._storage.set(this.LEARNING_PLAN_KEY, value);
  }
  getLearningPlan() {
    return this._storage.getString(this.LEARNING_PLAN_KEY);
  }
  deleteLearningPlan() {
    this._storage.remove(this.LEARNING_PLAN_KEY);
  }
  setMonthlySuccessCriteria(value: string) {
    this._storage.set(this.MONTHLY_SUCCESS_CRITERIA_KEY, value);
  }
  getMonthlySuccessCriteria() {
    return this._storage.getString(this.MONTHLY_SUCCESS_CRITERIA_KEY);
  }
  deleteMonthlySuccessCriteria() {
    this._storage.remove(this.MONTHLY_SUCCESS_CRITERIA_KEY);
  }
  setWeeklyCheckIn(value: string) {
    this._storage.set(this.WEEKLY_CHECKIN_KEY, value);
  }
  getWeeklyCheckIn() {
    return this._storage.getString(this.WEEKLY_CHECKIN_KEY);
  }
  deleteWeeklyCheckIn() {
    this._storage.remove(this.WEEKLY_CHECKIN_KEY);
  }
  deleteAll() {
    this._storage.clearAll();
  }
  private _storage: MMKV;
  private STORAGE_ID = 'goal_tracker_storage';
  private GOALS_KEY = 'goals';
  private DAILY_GOALS_KEY = 'daily_goals';
  private TIMETABLE_KEY = 'timetable';
  private LEARNING_PLAN_KEY = 'learning_plan';
  private DAILY_RULES_KEY = 'daily_rules';
  private MONTHLY_SUCCESS_CRITERIA_KEY = 'monthly_goals';
  private WEEKLY_CHECKIN_KEY = 'weekly_checkin';
}

export const Cache = new CacheService();

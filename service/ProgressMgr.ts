import { Cache } from '../cache/cache.service';

class ProgressMgr {
  setDailyProgress(date: string, value: string) {
    Cache.apis().set(this.DAILY_PROGRESS + '_' + date, value);
  }
  clearAllDailyProgress() {
    const all = this.fetchAllDailyProgress();
    all.forEach(key => Cache.apis().remove(key));
  }
  getLast7DailyProgress() {
    const all = this.fetchAllDailyProgress().slice(-7);
    return all
      .map(key => {
        const data = Cache.apis().getString(key);
        return JSON.parse(data!);
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  getAllDailyProgress() {
    const all = this.fetchAllDailyProgress();
    return all.map(key => {
      const data = Cache.apis().getString(key);
      return JSON.parse(data!);
    });
  }
  getTodaysProgress() {
    const data = Cache.apis().getString(this.DAILY_PROGRESS + '_' + new Date().toDateString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  private fetchAllDailyProgress() {
    const all = Cache.apis().getAllKeys();
    return all.filter(key => key.startsWith(this.DAILY_PROGRESS));
  }

  private DAILY_PROGRESS = 'daily_progress';
}
export const ProgressService = new ProgressMgr();

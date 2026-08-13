import { Cache } from '../cache/cache.service';

class CaloriesMgr {
  setDailyCaloriesDeficit(date: string, value: string) {
    Cache.apis().set(this.CALORIES + '_' + date, value);
  }
  clearAllDailyCaloriesDeficit() {
    const all = this.fetchAllCaloriesDeficit();
    all.forEach(key => Cache.apis().remove(key));
  }
  getAllCaloriesDeficit() {
    const all = this.fetchAllCaloriesDeficit();
    return all.map(key => {
      const data = Cache.apis().getString(key);
      return JSON.parse(data!);
    });
  }
  getLast7CaloriesDeficit() {
    const all = this.fetchAllCaloriesDeficit().slice(-7);
    return all.map(key => {
      const data = Cache.apis().getString(key);
      return JSON.parse(data!);
    });
  }
  getTodaysCaloriesDeficit() {
    const data = Cache.apis().getString(this.CALORIES + '_' + new Date().toDateString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  private fetchAllCaloriesDeficit() {
    const all = Cache.apis().getAllKeys();
    return all.filter(key => key.startsWith(this.CALORIES));
  }

  private CALORIES = 'calories_deficit';
}

export const CaloriesService = new CaloriesMgr();

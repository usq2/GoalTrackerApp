import { Cache } from '../cache/cache.service';

class WeightMgr {
  setDailyWeight(date: string, value: string) {
    Cache.apis().set(this.WEIGHT + '_' + date, value);
  }
  clearAllDailyWeight() {
    const all = this.fetchAllDailyWeight();
    all.forEach(key => Cache.apis().remove(key));
  }
  getAllDailyWeight() {
    const all = this.fetchAllDailyWeight();
    return all.map(key => {
      const data = Cache.apis().getString(key);
      return JSON.parse(data!);
    });
  }
  getLast7Weight() {
    const all = this.fetchAllDailyWeight().slice(-7);
    return all.map(key => {
      const data = Cache.apis().getString(key);
      return JSON.parse(data!);
    });
  }
  getTodaysWeight() {
    const data = Cache.apis().getString(this.WEIGHT + '_' + new Date().toDateString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  private fetchAllDailyWeight() {
    const all = Cache.apis().getAllKeys();
    return all.filter(key => key.startsWith(this.WEIGHT));
  }
  private WEIGHT = 'weight';
}

export const WeightService = new WeightMgr();

import { NitroSQLiteConnection, open } from 'react-native-nitro-sqlite';

export class DBMgr {
  static connect() {
    try {
      DBMgr.dbInstance = open({ name: this.DB_NAME });
    } catch (error) {
      console.log(error);
    }
  }

  static getInstance() {
    return DBMgr.dbInstance;
  }

  static async createTables() {
    const targets = await DBMgr.dbInstance.executeAsync(
      'CREATE TABLE targets (id TEXT PRIMARY KEY, title TEXT NOT NULL, goal_type TEXT NOT NULL, current_state TEXT NOT NULL, consecutive_passes INTEGER DEFAULT 0, consecutive_misses INTEGER DEFAULT 0, total_logged_days INTEGER DEFAULT 0, adherence_rate REAL DEFAULT 1.0, scale_multiplier REAL DEFAULT 1.0, current_syllabus_pointer INTEGER DEFAULT 1, static_rule_json TEXT, syllabus_json TEXT)',
    );
    const checkIns = await DBMgr.dbInstance.executeAsync(
      'CREATE TABLE check_ins (id TEXT PRIMARY KEY,target_id TEXT NOT NULL,logged_date TEXT NOT NULL,status TEXT NOT NULL,state_at_checkin TEXT NOT NULL,stress_level INTEGER,sleep_hours REAL,FOREIGN KEY(target_id) REFERENCES targets(id))',
    );
  }
  private static dbInstance: NitroSQLiteConnection;
  private static DB_NAME = 'goal_tracker';
}

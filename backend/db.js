import Database from "better-sqlite3";

const db = new Database("db.sqlite");

db.prepare(`
    CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL
  ) 


`).run();



export default db;
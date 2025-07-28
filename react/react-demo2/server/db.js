const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// 初始化用户表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER
    );
  `);

  // -- 主表：博客基本信息
  db.run(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
  
  // -- 附表：博客内容详情
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      blog_id INTEGER NOT NULL,
      content TEXT,
      FOREIGN KEY(blog_id) REFERENCES blogs(id) ON DELETE CASCADE
    );
  `)
});

module.exports = db;

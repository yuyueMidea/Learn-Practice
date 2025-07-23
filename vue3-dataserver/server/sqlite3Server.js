// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 初始化数据库
const db = new sqlite3.Database('./database.db');

// 创建表
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER
)`);

// 查询所有用户
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 添加用户
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;
  db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// 修改用户
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  db.run("UPDATE users SET name = ?, age = ? WHERE id = ?", [name, age, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// 插入随机用户数据
app.get('/api/init-data', (req, res) => {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen'];
  
  const insert = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
  for (let i = 0; i < 100; i++) {
    const name = names[Math.floor(Math.random() * names.length)] + '_' + i;
    const age = Math.floor(Math.random() * 60) + 18; // 年龄18~77
    insert.run(name, age);
  }
  insert.finalize();
  res.json({ message: '成功插入 100 条用户数据' });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

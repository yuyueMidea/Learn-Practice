const Router = require('koa-router');
const db = require('../db');
const router = new Router({ prefix: '/api/users' });

// 获取全部用户
router.get('/', async (ctx) => {
  ctx.body = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// 添加用户
router.post('/', async (ctx) => {
  const { name, age } = ctx.request.body;
  if (!name) {
    ctx.status = 400;
    ctx.body = { error: 'Name is required' };
    return;
  }
  const result = await new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
  ctx.body = result;
});

// 删除用户
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
  ctx.body = { success: true };
});

// 更新用户
router.put('/:id', async (ctx) => {
  const { id } = ctx.params;
  const { name, age } = ctx.request.body;
  await new Promise((resolve, reject) => {
    db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [name, age, id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
  ctx.body = { success: true };
});

module.exports = router;

const Router = require('koa-router');
const db = require('../db');

const router = new Router({ prefix: '/api/blogs' });

// 获取所有博客（仅主表）
router.get('/', async (ctx) => {
  ctx.body = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM blogs ORDER BY created_at DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// 获取博客详情（含主表 + 附表）
router.get('/:id', async (ctx) => {
  const blogId = ctx.params.id;
  const blog = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM blogs WHERE id = ?', [blogId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  const content = await new Promise((resolve, reject) => {
    db.get('SELECT content FROM blog_contents WHERE blog_id = ?', [blogId], (err, row) => {
      if (err) reject(err);
      else resolve(row ? row.content : '');
    });
  });
  ctx.body = { ...blog, content };
});

// 新增博客
router.post('/', async (ctx) => {
  const { title, summary, content } = ctx.request.body;
  const blogId = await new Promise((resolve, reject) => {
    db.run('INSERT INTO blogs (title, summary) VALUES (?, ?)', [title, summary], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
  await new Promise((resolve, reject) => {
    db.run('INSERT INTO blog_contents (blog_id, content) VALUES (?, ?)', [blogId, content], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  ctx.body = { id: blogId, message: 'Blog created' };
});

// 更新博客
router.put('/:id', async (ctx) => {
    const blogId = ctx.params.id;
    const { title, summary, content } = ctx.request.body;

    await new Promise((resolve, reject) => {
        db.run('UPDATE blogs SET title = ?, summary = ? WHERE id = ?', [title, summary, blogId], (err) => {
        if (err) reject(err);
        else resolve();
        });
    });

    await new Promise((resolve, reject) => {
        db.run('UPDATE blog_contents SET content = ? WHERE blog_id = ?', [content, blogId], (err) => {
        if (err) reject(err);
        else resolve();
        });
    });

    ctx.body = { message: 'Updated' };
});
  


// 删除博客
router.delete('/:id', async (ctx) => {
  const blogId = ctx.params.id;
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM blogs WHERE id = ?', [blogId], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  ctx.body = { message: 'Deleted' };
});

module.exports = router;

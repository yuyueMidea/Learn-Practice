require('dotenv').config(); // 确保这行在最前面
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// 初始化 Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// CRUD 路由
app.get('/api/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/api/todos', async (req, res) => {
  const { data, error } = await supabase
    .from('todos')
    .insert([req.body])
    .select();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// 更新路由
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const { data, error } = await supabase
    .from('todos')
    .update({ title })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// 删除路由
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

app.listen(process.env.PORT, () => {
  console.log(`Express server running on http://localhost:${process.env.PORT}`);
});
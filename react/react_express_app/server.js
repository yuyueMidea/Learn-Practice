const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库 - 主表（用户）
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138001', status: 'active', createTime: '2024-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138002', status: 'inactive', createTime: '2024-01-16' },
  { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138003', status: 'active', createTime: '2024-01-17' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', status: 'active', createTime: '2024-01-18' },
  { id: 5, name: '孙七', email: 'sunqi@example.com', phone: '13800138005', status: 'inactive', createTime: '2024-01-19' }
];

// 模拟数据库 - 从表（订单）
const orders = [
  { id: 1, userId: 1, orderNo: 'ORD001', amount: 299.99, status: 'completed', createTime: '2024-01-20', description: '购买商品A' },
  { id: 2, userId: 1, orderNo: 'ORD002', amount: 199.50, status: 'pending', createTime: '2024-01-21', description: '购买商品B' },
  { id: 3, userId: 2, orderNo: 'ORD003', amount: 599.00, status: 'completed', createTime: '2024-01-22', description: '购买商品C' },
  { id: 4, userId: 3, orderNo: 'ORD004', amount: 89.99, status: 'cancelled', createTime: '2024-01-23', description: '购买商品D' },
  { id: 5, userId: 1, orderNo: 'ORD005', amount: 399.99, status: 'completed', createTime: '2024-01-24', description: '购买商品E' },
  { id: 6, userId: 4, orderNo: 'ORD006', amount: 159.00, status: 'pending', createTime: '2024-01-25', description: '购买商品F' }
];

// API路由 - 用户相关
app.get('/api/users', (req, res) => {
  const { page = 1, pageSize = 10, search = '' } = req.query;
  
  let filteredUsers = users;
  if (search) {
    filteredUsers = users.filter(user => 
      user.name.includes(search) || user.email.includes(search)
    );
  }
  
  const start = (page - 1) * pageSize;
  const end = start + parseInt(pageSize);
  const paginatedUsers = filteredUsers.slice(start, end);
  
  res.json({
    data: paginatedUsers,
    total: filteredUsers.length,
    page: parseInt(page),
    pageSize: parseInt(pageSize)
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ message: '用户未找到' });
  }
  
  // 获取用户的订单
  const userOrders = orders.filter(order => order.userId === parseInt(id));
  
  res.json({
    ...user,
    orders: userOrders
  });
});

// API路由 - 订单相关
app.get('/api/orders', (req, res) => {
  const { page = 1, pageSize = 10, userId } = req.query;
  
  let filteredOrders = orders;
  if (userId) {
    filteredOrders = orders.filter(order => order.userId === parseInt(userId));
  }
  
  const start = (page - 1) * pageSize;
  const end = start + parseInt(pageSize);
  const paginatedOrders = filteredOrders.slice(start, end);
  
  // 关联用户信息
  const ordersWithUser = paginatedOrders.map(order => ({
    ...order,
    userName: users.find(u => u.id === order.userId)?.name || '未知用户'
  }));
  
  res.json({
    data: ordersWithUser,
    total: filteredOrders.length,
    page: parseInt(page),
    pageSize: parseInt(pageSize)
  });
});

app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === parseInt(id));
  
  if (!order) {
    return res.status(404).json({ message: '订单未找到' });
  }
  
  // 关联用户信息
  const user = users.find(u => u.id === order.userId);
  
  res.json({
    ...order,
    user: user || null
  });
});

// 统计接口
app.get('/api/stats', (req, res) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);
  
  res.json({
    totalUsers,
    activeUsers,
    totalOrders,
    completedOrders,
    totalRevenue: totalRevenue.toFixed(2)
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动在端口 ${PORT}`);
  console.log(`🌐 API地址: http://localhost:${PORT}/api`);
});
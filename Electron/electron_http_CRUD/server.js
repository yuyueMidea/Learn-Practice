// server.js
const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Mock 数据 - 简单的内存数据库
let mockDatabase = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  const query = querystring.parse(parsedUrl.query);
  
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 解析请求体 (用于 POST/PUT)
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      let responseData;
      
      // 路由处理
      if (path === '/api/users' && req.method === 'GET') {
        // 获取所有用户
        responseData = mockDatabase;
      } 
      else if (path === '/api/users' && req.method === 'POST') {
        // 创建新用户
        const newUser = JSON.parse(body);
        newUser.id = mockDatabase.length > 0 ? Math.max(...mockDatabase.map(u => u.id)) + 1 : 1;
        mockDatabase.push(newUser);
        responseData = newUser;
      }
      else if (path.startsWith('/api/users/') && req.method === 'GET') {
        // 获取单个用户
        const id = parseInt(path.split('/')[3]);
        const user = mockDatabase.find(u => u.id === id);
        if (user) {
          responseData = user;
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'User not found' }));
          return;
        }
      }
      else if (path.startsWith('/api/users/') && req.method === 'PUT') {
        // 更新用户
        const id = parseInt(path.split('/')[3]);
        const index = mockDatabase.findIndex(u => u.id === id);
        if (index !== -1) {
          const updatedUser = JSON.parse(body);
          mockDatabase[index] = { ...mockDatabase[index], ...updatedUser };
          responseData = mockDatabase[index];
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'User not found' }));
          return;
        }
      }
      else if (path.startsWith('/api/users/') && req.method === 'DELETE') {
        // 删除用户
        const id = parseInt(path.split('/')[3]);
        const index = mockDatabase.findIndex(u => u.id === id);
        if (index !== -1) {
          mockDatabase.splice(index, 1);
          responseData = { success: true };
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'User not found' }));
          return;
        }
      }
      else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseData));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

// 导出启动和停止服务器的方法
module.exports = {
  startServer: (port = 3000) => {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
    return server;
  },
  stopServer: () => {
    server.close();
    console.log('Server stopped');
  }
};
const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

// 创建Express应用
const app = express();
// app.use(cors());
// app.use(express.json()); // 替代原来的body-parser
// 在mock-server.js中
// app.use(cors({
//     origin: 'http://localhost:5500' // 你的前端地址
//   }));
// 允许所有来源（开发环境用，生产环境应指定具体域名）
app.use(cors({
    origin: true,          // 或指定 ['http://127.0.0.1:5500', 'http://localhost:5500']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true      // 如果需要跨域传递cookie
  }));
  
  // 显式处理预检请求（OPTIONS）
//   app.options('*', cors());

const PORT = 3001;

// 模拟设备数据库
const devices = {
  'compressor-001': {
    id: 'compressor-001',
    name: '主空压机',
    status: 'running',
    pressure: 6.8,
    temperature: 45.2,
    runningHours: 1245,
    lastUpdate: new Date().toISOString()
  },
  'compressor-002': {
    id: 'compressor-002',
    name: '备用空压机',
    status: 'standby',
    pressure: 0.2,
    temperature: 28.5,
    runningHours: 342,
    lastUpdate: new Date().toISOString()
  }
};

// HTTP接口
app.get('/api/devices', (req, res) => {
  res.json(Object.values(devices));
});

app.post('/api/command', (req, res) => {
    console.log('收到命令:', req.body); // 调试日志
  const { deviceId, command } = req.body;
  const device = devices[deviceId];
  
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  // 处理命令
  switch (command) {
    case 'start':
      device.status = 'running';
      break;
    case 'stop':
      device.status = 'standby';
      break;
    case 'reset':
      device.runningHours = 0;
      break;
  }

  device.lastUpdate = new Date().toISOString();
//   res.json({ success: true, device });
  // 返回更新后的设备数据
  res.json({ 
    success: true, 
    message: `Command ${command} executed`,
    device: { ...device } // 返回设备副本
  });
});

// 启动HTTP服务器
const server = app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

// WebSocket服务器
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // 发送初始设备数据
  ws.send(JSON.stringify({
    type: 'init',
    data: Object.values(devices)
  }));

  // 定时更新数据
  const interval = setInterval(() => {
    Object.values(devices).forEach(device => {
      if (device.status === 'running') {
        // 模拟数据变化
        device.pressure = (6.5 + Math.random()).toFixed(2);
        device.temperature = (40 + Math.random() * 10).toFixed(2);
        device.runningHours += 0.01;
        device.lastUpdate = new Date().toISOString();
      }
      
      // 发送更新
      ws.send(JSON.stringify({
        type: 'update',
        device
      }));
    });
  }, 3000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
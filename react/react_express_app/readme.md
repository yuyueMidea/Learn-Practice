# React Express 全栈应用，一个使用 React + TypeScript + MUI 前端和 Express 后端的全栈管理系统项目。

## 🚀 功能特性

### 前端特性
- **技术栈**: Vite + React 18 + TypeScript + MUI (Material-UI)
- **路由管理**: React Router v6
- **界面布局**: 顶部状态栏 + 左侧菜单 + 右侧内容区域
- **响应式设计**: 支持桌面和移动端
- **主题系统**: Material-UI 主题定制

### 后端特性
- **技术栈**: Express.js + Node.js
- **API设计**: RESTful API 架构
- **数据结构**: 主从表关系 (用户-订单)
- **CORS支持**: 跨域资源共享

### 页面功能
- **仪表板**: 系统统计数据展示
- **用户管理**: 用户列表、详情页面、搜索分页
- **订单管理**: 订单列表、详情页面、状态管理
- **数据关联**: 用户与订单的主从关系展示

## 📁 项目结构

```
react-express-app/
├── package.json          # 项目配置和依赖
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
├── server.js             # Express 后端服务
├── index.html            # HTML 入口
├── src/
│   ├── main.tsx          # React 应用入口
│   ├── App.tsx           # 主应用组件
│   └── pages/
│       ├── Dashboard.tsx     # 仪表板页面
│       ├── UserList.tsx      # 用户列表页面
│       ├── UserDetail.tsx    # 用户详情页面
│       ├── OrderList.tsx     # 订单列表页面
│       └── OrderDetail.tsx   # 订单详情页面
└── README.md
```

## 🛠️ 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm start
# 或者
npm run dev
```

这个命令会同时启动：
- 前端开发服务器 (端口 3000)
- 后端的 Express 服务 (端口 5000)

一个 React + MUI + React Router + Hooks 的完整 CRUD 示例，带路由菜单、添加/编辑/删除功能，
- 登录拦截：未登录访问 /users 会自动跳到 /login
- Zustand 保存用户信息、菜单状态、全局数据
- 菜单折叠/展开：点击左上角按钮即可切换
- 退出登录：点击右上角退出按钮，回到登录页

1. 安装依赖： `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom`
2. 启动项目: `npm start`
3. 打包: `npm run build`, 然后运行 `serve -s build` 启动静态服务.

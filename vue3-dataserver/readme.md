vue3路由项目中同时启动一个node的express服务，连接Supabase数据库来增删查改

前端使用 Vue 3，后端使用 Express 提供 API 操作 Supabase。

```
vue3-dataserver/
├── client/          # Vue 3 前端
├── server/          # Express 后端
├── package.json     # 根项目配置
```


启动项目：在项目根目录运行npm start；
- Express 后端服务（默认 http://localhost:3001）
- Vue 前端开发服务器（默认 http://localhost:5173）

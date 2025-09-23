一套**页面级“导航守卫 + 权限控制（RBAC）”**的可直接运行实现（React + react-router-dom v6，非 TS，配合 Tailwind）。包含：
- AuthProvider：保存 token、user(roles, permissions)，本地持久化。
- Guard 组件：路由级守卫（登录校验、角色校验、权限校验）。
- ROUTES 路由表 + meta：像 Vue 一样给路由写 requiresAuth / anyRoles / allPermissions。
- 动态菜单：自动根据当前角色/权限隐藏无权入口。
- 登录页：支持登录后跳回来源页。
- （可选）axios 拦截器写法，附在代码末尾注释中。

如果需要本地要落地，按这思路接后端接口即可：
- 登录：POST /api/login 返回 { token, user: { id, name, roles:[], permissions:[] } }， 成功后把 token + user 存在 AuthProvider（同时 localStorage 持久化）。
- 会话恢复：App 启动时用 token 请求 /api/me 拉取最新用户信息（或在登录接口已返回完备信息就无需再拉）。
- 路由守卫
   - 需要登录的路由写 meta:{ requiresAuth:true }；
   - 只允许某些角色访问：anyRoles:['admin']；
   - 需要具备全部权限：allPermissions:['reports.read']。
   - Guard 会在进入页面时做校验，不通过则 Navigate 到 /login 或 /403。

- 动态菜单：菜单项配置与路由类似，渲染时用 hasAnyRole / hasAllPermissions 过滤。

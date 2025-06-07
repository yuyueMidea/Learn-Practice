**Next.js + TypeScript 路由与菜单功能实现**

当前只包含src目录下所有代码，其余配置省略

说明：
一、项目结构

    ```
    app/
    ├── layout.tsx
    ├── page.tsx
    ├── global.css
    ├── (protected)/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── dashboard/
    │       └── page.tsx
    ├── goods/
    │   └── page.tsx
    ├── postList/
    │   └── page.tsx
    ├── taskList/
    │   └── page.tsx
    ├── login/
    │   └── page.tsx
    └── components/
        ├── Navbar/
        │   ├── index.tsx
        │   └── styles.module.css
        └── Sidebar/
            ├── index.tsx
            └── styles.module.css
    ```
文件目录说明：
1. 类型定义 (types/navigation.ts)
2. 全局样式 (app/globals.css)
3.  根布局 (app/layout.tsx)
4.  导航栏组件 (components/Navbar/index.tsx)
5.  导航栏样式 (components/Navbar/styles.module.css)
6.  受保护路由布局 (app/(protected)/layout.tsx)
7.  侧边栏组件 (components/Sidebar/index.tsx)
8.  侧边栏样式 (components/Sidebar/styles.module.css)
9.  页面示例：首页 (app/page.tsx)、仪表盘页面 (app/(protected)/dashboard/page.tsx)、登录页面 (app/login/page.tsx)

**配置说明**
1. CSS Modules：使用了CSS Modules 来组件化样式，避免类名冲突；
2. 类型安全：所有组件和导航项都有 Typescript类型定义；
3. 响应式设计：包含了基本的响应式布局；
4. 认证路由：实现了受保护的路由布局；
5. 活动菜单项：根据当前路由高亮显示对应的菜单项。






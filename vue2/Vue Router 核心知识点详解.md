## Vue Router 核心知识点详解

一、基础概念

1、 路由配置：
```
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 路由元信息
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    component: () => import('./views/About.vue'), // 懒加载
    children: [ // 嵌套路由
      { path: 'profile', component: Profile }
    ]
  }
]
```
2、路由模式：
- hash模式：默认模式，使用 URL hash (#)；`createRouter({ history: createWebHashHistory() })`;
- history模式：需要服务器支持：`createRouter({ history: createWebHistory() })`;
- abstract模式：非浏览器环境使用；

二、导航控制：
- 编程式导航：
```
// 字符串路径
router.push('/users')
// 带参数
router.push({ name: 'user', params: { id: '123' } })
// 带查询参数
router.push({ path: '/register', query: { plan: 'private' } })
// 替换当前路由
router.replace({ path: '/home' })
// 前进/后退
router.go(1)
router.go(-1)
```

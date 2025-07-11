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
- 导航守卫：
```
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// 路由独享守卫
{
  path: '/admin',
  beforeEnter: (to, from, next) => { /* ... */ }
}

// 组件内守卫
const User = {
  beforeRouteEnter(to, from, next) {
    // 不能访问组件实例 `this`
  },
  beforeRouteUpdate(to, from, next) {
    // 当前路由改变但组件被复用时调用
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开时调用
  }
}
```

三、高级特性
- 动态路由：`{ path: '/user/:id', component: User }`;访问参数：
```
this.$route.params.id
// 或使用组合式API
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)
```
- 路由传参：
```
{
  path: '/user/:id',
  component: User,
  props: true // 将params作为props传递
  // 或使用函数形式
  props: route => ({ id: route.params.id, query: route.query })
}
```
- 滚动行为：
```
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
```












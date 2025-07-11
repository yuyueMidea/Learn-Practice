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

四、使用技巧:
- 路由懒加载：`const User = () => import('./views/User.vue')`;
- 过渡动画：
```
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```
- 路由元信息：
```
{
  path: '/admin',
  meta: { requiresAdmin: true }
}
```

五、常见问题解决方案：
- 重复路由跳转报错：
```
// 在路由push时捕获异常
router.push('/path').catch(err => {
  if (err.name !== 'NavigationDuplicated') {
    console.error(err)
  }
})
```
- 动态添加路由：
```
router.addRoute({
  path: '/new-route',
  component: NewComponent
})
// 添加嵌套路由
router.addRoute('parentRoute', {
  path: 'child',
  component: ChildComponent
})
```
- 路由重定向和别名
```
{
  path: '/home',
  redirect: '/', // 重定向
  alias: '/welcome' // 别名
}
```

Vue Router 4.x (Vue3版本) 相比 Vue Router 3.x (Vue2版本) 主要变化：
- 创建方式改为 createRouter；
- 路由模式API变更；
- 移除了 * 通配路由，改为自定义正则；
- 导航守卫参数变化；
- 路由匹配算法优化；

Vue Router 中 hash 模式与 history 模式的区别：
- hash模式：使用URL中的 hash（#）部分来模拟完整URL；示例：`http://example.com/#/home`;实现原理：监听 window.onhashchange 事件；
- History模式： HTML5 History API（pushState/replaceState）；示例：`http://example.com/home`；需要服务器端支持；
- 选择建议：当不需要考虑SEO、需要兼容旧浏览器、无法控制服务器配置时，使用hash模式；当需要干净的URL、需要更好的SEO支持、能配置服务器支持的时候使用history模式；
- 大多数现代SPA项目推荐使用history模式，以获得更好的用户体验。













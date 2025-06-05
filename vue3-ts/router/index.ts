import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 设置页面标题
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Vue3 App`
  }
})

export default router
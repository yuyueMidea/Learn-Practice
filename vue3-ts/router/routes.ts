import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页',
      icon: 'home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于',
      icon: 'info'
    }
  },
  {
    path: '/userList',
    name: 'UserList',
    component: () => import('../views/UserList.vue'),
    meta: {
      title: '用户列表',
      icon: 'info'
    }
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: () => import('../views/TodoList.vue'),
    meta: {
      title: '待办事项',
      icon: 'info'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]
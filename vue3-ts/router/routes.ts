import type { RouteRecordRaw } from 'vue-router'

import {
  UserFilled,
  Document,
  Message,
  PieChart,
  Menu,
  HomeFilled,
} from '@element-plus/icons-vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页',
      icon: HomeFilled,
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginForm.vue'),
    meta: {
      title: '登录',
      icon: Menu,
      // hidden: true,
      requiresAuth: false
    }
  },
  {
    path: '/userList',
    name: 'UserList',
    component: () => import('../views/UserList.vue'),
    meta: {
      title: '用户列表',
      icon: UserFilled,
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于',
      icon: PieChart,
      requiresAuth: true
    }
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: () => import('../views/TodoList.vue'),
    meta: {
      title: '待办事项',
      icon: Message,
      requiresAuth: true
    }
  },
  {
    path: '/postList',
    name: 'PostList',
    component: () => import('../views/postList.vue'),
    meta: {
      title: '博客列表',
      icon: Document,
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404',
      hidden: true,
      requiresAuth: false
    }
  }
]
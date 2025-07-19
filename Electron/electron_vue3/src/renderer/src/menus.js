export const menuItems = [
    {
      path: '/',
      name: '首页',
      icon: '🏠',
      component: () => import('@renderer/views/Home.vue')
    },
    {path: '/login', name: '登录', icon: 'ℹ️', component: () => import('@renderer/views/LoginPage.vue')},
    {
      path: '/settings',
      name: '设置',
      icon: '⚙️',
      component: () => import('@renderer/views/Settings.vue')
    },
    {
      path: '/userList',
      name: '用户列表',
      icon: 'ℹ️',
      component: () => import('@renderer/views/UserList.vue')
    }
  ];
  
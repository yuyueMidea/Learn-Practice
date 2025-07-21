export const menuItems = [
  { name: '首页', path: '/', component: () => import('./views/Home.vue') },
  { name: '任务管理', path: '/tasklist', component: () => import('./views/TaskList.vue') },
    // 404页面处理 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    hidden: true,
    component: () => import('./views/NotFound.vue')
  }
]
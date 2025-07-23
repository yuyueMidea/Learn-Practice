export const menuItems = [
  { name: '首页', path: '/', component: () => import('./views/Home.vue') },
  { name: '任务管理', path: '/tasklist', component: () => import('./views/TaskList.vue') },
  { name: '自绘甘特图', path: '/lightGantt', component: () => import('./views/LightGantt.vue') },
  { name: '自制甘特图', path: '/customGantt', component: () => import('./views/CustomGantt.vue') },
  { name: '生产排程甘特图', path: '/productionScheduler', component: () => import('./views/ProductionScheduler.vue') },
  { name: '测试', path: '/test1', component: () => import('./views/Test1.vue') },
  { name: '测试2', path: '/test2', component: () => import('./views/Test2.vue') },
  { name: '博客列表', path: '/postList', component: () => import('./views/PostList.vue') },
  { name: '用户管理', path: '/userCrud', component: () => import('./views/UserCrud.vue') },
    // 404页面处理 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    hidden: true,
    component: () => import('./views/NotFound.vue')
  }
]
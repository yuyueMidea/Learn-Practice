export const menuItems = [
    {
      path: '/',
      name: '首页',
      icon: '🏠',
      component: () => import('@renderer/views/Home.vue')
    },
    {
      path:'/formdesigner',
      name:'表单设计器',
      component: ()=> import('@renderer/views/FormDesigner.vue')
    }
  ];
  
import { createRouter, createWebHashHistory } from 'vue-router';
import { menuItems } from '../menus.js';

const routes = menuItems.map(item => ({
  path: item.path,
  name: item.name,
  component: item.component
}));

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;

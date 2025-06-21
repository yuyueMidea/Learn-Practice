import React, { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
// import './index.css'
import { createRoot } from 'react-dom/client'
import AuthGuard from './components/authGuard.jsx'
// 定义菜单项
const menuItems = [
  { path: '/', name: '首页', componentName: lazy(() => import('./pages/Home.jsx')), title: 'home'},
  { path: '/login', name: '登录', componentName: lazy(() => import('./pages/Login.jsx')), title: 'loginpage'},
  { path: '/userinfo', name: '用户', componentName: lazy(() => import('./pages/UserInfo.jsx')), title: 'user-list'},
  { path: '/tableList', name: '数据列表', componentName: lazy(() => import('./pages/Tablelist.jsx')), title: 'table-list'},
  { path: '/postslist', name: '博客列表', componentName: lazy(() => import('./pages/Posts.jsx')), title: ''},
  { path: '/formGenerator', name: '表单设计', componentName: lazy(() => import('./pages/formGenerator.jsx')), title: ''},
  // { path: '/goodslist', name: '商品', componentName: lazy(() => import('./pages/GoodsList.jsx')), title: ''},
  // { path: '/siblingsParam', name: '兄弟组件传值', componentName: lazy(() => import('./pages/SiblingsParam.jsx')), title: ''},
  // { path: '/refDemo', name: 'Ref用法', componentName: lazy(() => import('./pages/Refdemo.jsx')), title: ''},
  // { path: '/signup', name: '注册', componentName: lazy(() => import('./pages/Signup.jsx')), title: ''},
  // { path: '/cacheDemo', name: '缓存测试', componentName: lazy(() => import('./pages/CacheDemo.jsx')), title: ''},
  // { path: '/toolbar', name: '事件冒泡', componentName: lazy(() => import('./pages/Toolbar.jsx')), title: ''},
  // { path: '/movingdot', name: 'Movingdot', componentName: lazy(() => import('./pages/Movingdot.jsx')), title: ''},
  // { path: '/GrandSon', name: 'GrandSon', componentName: lazy(() => import('./pages/GrandSon.jsx')), title: ''},
  // { path: '/checkedItems', name: 'CheckedItems', componentName: lazy(() => import('./pages/CheckedItems.jsx')), title: ''},
  // { path: '/taskList', name: '任务列表', componentName: lazy(() => import('./pages/TaskList.jsx')), title: ''},
  // { path: '/toggleSize', name: 'ToggleSize', componentName: lazy(() => import('./pages/ToggleSize.jsx')), title: ''},
  { path: '*', name: 'NotFound', componentName: lazy(() => import('./pages/NotFound.jsx')), title: ''},
]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCounterStore from './stores/counterStore.js'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分钟
      retry: 2, // 失败后重试2次
    },
  },
});

// 需要在 main.jsx 中访问 store（例如初始化一些全局状态），创建一个包装组件
function StoreInitializer() {
  const setMenuList = useCounterStore(state => state.setMenuList);
  useEffect(()=>{
    // console.log('========main======')
    setMenuList(menuItems)
  }, [])
  return <App />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StoreInitializer />}>
            {menuItems.map(item => (
              <Route path={item.path} element={
                <AuthGuard>
                  <item.componentName />
                </AuthGuard>
              } />
            ))}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
// import './index.css'
import { createRoot } from 'react-dom/client'
// 定义菜单项
const menuItems = [
  { path: '/', name: '首页', componentName: lazy(() => import('./pages/Home.jsx')), title: 'home'},
  { path: '/userinfo', name: '用户', componentName: lazy(() => import('./pages/UserInfo.jsx')), title: 'user-list'},
  { path: '/goodslist', name: '商品', componentName: lazy(() => import('./pages/GoodsList.jsx')), title: ''},
  { path: '/siblingsParam', name: '兄弟组件传值', componentName: lazy(() => import('./pages/SiblingsParam.jsx')), title: ''},
  { path: '/refDemo', name: 'Ref用法', componentName: lazy(() => import('./pages/Refdemo.jsx')), title: ''},
  { path: '/signup', name: '注册', componentName: lazy(() => import('./pages/Signup.jsx')), title: ''},
  { path: '/cacheDemo', name: '缓存测试', componentName: lazy(() => import('./pages/CacheDemo.jsx')), title: ''},
  { path: '/toolbar', name: '事件冒泡', componentName: lazy(() => import('./pages/Toolbar.jsx')), title: ''},
  { path: '/movingdot', name: 'Movingdot', componentName: lazy(() => import('./pages/Movingdot.jsx')), title: ''},
  { path: '/GrandSon', name: 'GrandSon', componentName: lazy(() => import('./pages/GrandSon.jsx')), title: ''},
  { path: '/checkedItems', name: 'CheckedItems', componentName: lazy(() => import('./pages/CheckedItems.jsx')), title: ''},
  { path: '/taskList', name: '任务列表', componentName: lazy(() => import('./pages/TaskList.jsx')), title: ''},
  { path: '/toggleSize', name: 'ToggleSize', componentName: lazy(() => import('./pages/ToggleSize.jsx')), title: ''},
  { path: '*', name: 'NotFound', componentName: lazy(() => import('./pages/NotFound.jsx')), title: ''},
]
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {menuItems.map(item => (
            <Route path={item.path} element={<item.componentName />} />
          ))}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
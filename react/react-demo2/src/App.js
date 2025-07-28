import { Button, Layout, Menu, notification } from 'antd';
import './index.css'
import {  Route, Routes, useLocation, useNavigate } from 'react-router';
import { lazy, startTransition, Suspense } from 'react';
import { setMenuName } from './store/counterSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './store/authSlice.js';

const { Header, Sider, Content } = Layout;

const routeList = [
  {path: '/',  name: '首页', componentName: lazy(() => import('./pages/Home.jsx'))},
  {path: '/login',  name: '登录', componentName: lazy(() => import('./pages/Loginpage.jsx'))},
  {path: '/buttonList',  name: '权限按钮', componentName: lazy(() => import('./pages/ButtonList.jsx'))},
  {path: '/formDesigner',  name: '表单设计', componentName: lazy(() => import('./pages/FormDesigner.jsx'))},
  {path: '/userlist', name: '用户管理', componentName: lazy(() => import('./pages/UserList.jsx'))},
  {path: '/dataList', name: '后端数据管理', componentName: lazy(() => import('./pages/DataList.jsx'))},
  {path: '/blogList', name: '博客数据管理', componentName: lazy(() => import('./pages/BlogList.jsx'))},
  {path: '*', name: 'NotFound', componentName: lazy(() => import('./pages/NotFound.jsx'))},
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentMenuName = useSelector(state => state.counter.menuName);
  const currentUserName = useSelector(state => state.auth.userName);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const handleLogout = ()=>{
    logOut();
    navigate('/login');    //退出来自动跳转到登录页面
    notification.open({ message: '提示', description: '已经退出登录了' });
  }

  const menuItems = routeList.filter(c=>c.name!=='NotFound').map(item => ({
    key: item.path,
    label: item.name,
    onClick: () => {
      startTransition(() => {
        dispatch( setMenuName(item.name));
        navigate(item.path);
      });
    }
  }))

  return (
    <Layout className='app-contanier'>
      <Sider>
        <Menu theme='dark' mode='inline' selectedKeys={[location.pathname]} items={menuItems}></Menu>
      </Sider>
      <Layout className='app-content-wrapper'>
        <Header className='app-header'>
          <div className='menu-name'>{currentMenuName}</div>
          {isAuthenticated && <div className='user-info'>Welcome, {currentUserName} <Button type="primary" onClick={handleLogout}>退出登录</Button></div>}
          
        </Header>
        <Content className='app-content'>
          <Suspense fallback={<div>加载中...</div>}>
            <Routes>
              {routeList.map(item =>(
                <Route key={item.path} path={item.path} element={<item.componentName />} />
              ))}
            </Routes>
          </Suspense>
        </Content>

      </Layout>
    </Layout>
  );
}

export default App;

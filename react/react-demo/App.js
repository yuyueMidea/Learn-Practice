import React, { lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  useParams,
  useNavigate,
  NavLink
} from 'react-router-dom';

import About from './pages/About';

// 样式对象
const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: '15px 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#555'
    }
  },
  content: {
    marginTop: '70px', // 给导航栏留出空间
    padding: '20px',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  pageContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minHeight: 'calc(100vh - 110px)'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '10px 0',
    ':hover': {
      backgroundColor: '#45a049'
    }
  }
};







function NavigationButton() {
  const navigate = useNavigate();
  return (
    <button 
      style={styles.button} 
      onClick={() => navigate('/about')}
    >
      关于我们 (编程式导航)
    </button>
  );
}

// 嵌套路由组件



const menuItems = [
  { name: '首页', path: '/', title: '', componentName: lazy(() => import('./pages/Home.jsx'))},
  { name: '关于', path: '/about', title: '', componentName: lazy(() => import('./pages/About.jsx'))},
  { name: '联系', path: '/contract', title: '', componentName: lazy(() => import('./pages/Contract.jsx'))},
  { name: '用户列表', path: '/userlist', title: '', componentName: lazy(() => import('./pages/UserList.jsx'))},
  { name: '用户详情', path: '/user/:id', title: '', componentName: lazy(() => import('./pages/User.jsx'))},
  { name: '监控界面', path: '/dashboard', title: '', componentName: lazy(() => import('./pages/Dashboard.jsx'))},
  { name: 'NotFound', path: '*', title: '', componentName: lazy(() => import('./pages/NotFound.jsx'))},
]

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* 顶部固定导航栏 */}
        <nav style={styles.navbar}>
            <ul style={styles.navLinks}>
              {menuItems.filter(v=>(v.name!=='NotFound' && v.name!=='用户详情')).map(item => (
                <li key={item.path}>
                  <NavLink style={styles.navLink} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to={item.path} title={item.title}>{ item.name }</NavLink>
                </li>
              ))}
            </ul>
        </nav>

        {/* 主要内容区域 */}
        <div style={styles.content}>
          {/* <NavigationButton /> */}
          
          {/* 路由配置 */}
          <Routes>
            {menuItems.map(item => (
                <Route path={item.path} element={<item.componentName />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
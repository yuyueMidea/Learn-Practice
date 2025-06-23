import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import SideMenu from './components/layout/SideMenu';
import AuthRoute from './components/layout/AuthRoute';
import { menuItems } from './config/menuConfig';
import { ROLES } from './config/roles';
import useAuthStore from './store/authStore';

// 页面组件
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import EquipmentListPage from './pages/EquipmentList';
import EquipmentMaintenancePage from './pages/EquipmentMaintenance';
import UserManagementPage from './pages/UserManagement';
import RoleManagementPage from './pages/RoleManagement';
import NotAuthorizedPage from './pages/NotAuthorized';
import NotFoundPage from './pages/NotFound';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom';

import AppHeader from './components/layout/HeaderBar';
const { Content, Sider } = Layout;

const App = () => {
  const { initialize, isAuthenticated } = useAuthStore();
  console.log( {initialize, isAuthenticated } )
  useEffect(() => {
    initialize();
  }, [initialize]);

  // 扁平化路由配置
  const getRoutes = () => {
    const routes = [];
    
    menuItems.forEach(item => {
      if (item.path) {
        routes.push({
          path: item.path,
          component: getComponentByKey(item.key),
          roles: item.roles
        });
      }
      
      if (item.subMenu) {
        item.subMenu.forEach(subItem => {
          routes.push({
            path: subItem.path,
            component: getComponentByKey(subItem.key),
            roles: subItem.roles
          });
        });
      }
    });
    
    return routes;
  };
  
  const getComponentByKey = (key) => {
    switch (key) {
      case 'dashboard': return DashboardPage;
      case 'equipment-list': return EquipmentListPage;
      case 'equipment-maintenance': return EquipmentMaintenancePage;
      case 'user-management': return UserManagementPage;
      case 'role-management': return RoleManagementPage;
      default: return NotFoundPage;
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        
        {!isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} theme="dark">
              <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255,255,255,0.3)' }} />
              <SideMenu />
            </Sider>
            
            <Layout>
              <AppHeader />
              <Content className="scrollable-content">
                <div style={{ padding: 24, background: '#fff' }}>
                  <Switch>
                    {getRoutes().map((route) => (
                      <AuthRoute
                        key={route.path}
                        path={route.path}
                        exact
                        component={route.component}
                        requiredRoles={route.roles}
                      />
                    ))}
                    
                    <AuthRoute 
                      path="/not-authorized" 
                      component={NotAuthorizedPage} 
                      requiredRoles={[ROLES.ADMIN, ROLES.OPERATOR, ROLES.GUEST]}
                    />
                    
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        )}
      </Switch>
    </Router>
  );
};

export default App;
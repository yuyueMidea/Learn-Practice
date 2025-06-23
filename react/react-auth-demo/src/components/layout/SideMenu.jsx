import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../config/menuConfig';
import { hasPermission } from '../../config/roles';
import useAuthStore from '../../store/authStore';

const { SubMenu } = Menu;

const SideMenu = () => {
  const location = useLocation();
  const { currentUser } = useAuthStore();
  
  // 递归生成菜单项
  const renderMenuItems = (items) => {
    return items
      .filter(item => hasPermission(item.roles, currentUser?.role))
      .map(item => {
        if (item.subMenu) {
          return (
            <SubMenu
              key={item.key}
              icon={item.icon && <item.icon />}
              title={item.title}
            >
              {renderMenuItems(item.subMenu)}
            </SubMenu>
          );
        }
        
        return (
          <Menu.Item key={item.key} icon={item.icon && <item.icon />}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      });
  };

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    return menuItems.reduce((keys, item) => {
      if (item.path === location.pathname) {
        keys.push(item.key);
      }
      
      if (item.subMenu) {
        const subItem = item.subMenu.find(sub => sub.path === location.pathname);
        if (subItem) {
          keys.push(subItem.key);
        }
      }
      
      return keys;
    }, []);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={getSelectedKeys()}
      defaultOpenKeys={menuItems
        .filter(item => item.subMenu)
        .map(item => item.key)
      }
    >
      {renderMenuItems(menuItems)}
    </Menu>
  );
};

export default SideMenu;
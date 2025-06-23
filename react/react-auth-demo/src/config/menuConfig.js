export const menuItems = [
    {
      key: 'dashboard',
      path: '/dashboard',
      title: '控制台',
      // icon: 'DashboardOutlined',
      roles: ['admin', 'operator', 'guest'] // 允许访问的角色
    },
    {
      key: 'equipment',
      title: '设备管理',
      // icon: 'ToolOutlined',
      roles: ['admin', 'operator'],
      subMenu: [
        {
          key: 'equipment-list',
          path: '/equipment/list',
          title: '设备列表',
          roles: ['admin', 'operator']
        },
        {
          key: 'equipment-maintenance',
          path: '/equipment/maintenance',
          title: '维护记录',
          roles: ['admin']
        }
      ]
    },
    {
      key: 'system',
      title: '系统设置',
      // icon: 'SettingOutlined',
      roles: ['admin'],
      subMenu: [
        {
          key: 'user-management',
          path: '/system/users',
          title: '用户管理',
          roles: ['admin']
        },
        {
          key: 'role-management',
          path: '/system/roles',
          title: '角色管理',
          roles: ['admin']
        }
      ]
    }
  ];
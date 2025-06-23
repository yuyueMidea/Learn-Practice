## React 项目中基于角色的菜单权限控制实现

下面是一个完整的基于角色的菜单权限控制解决方案，包含路由守卫、动态菜单生成和权限验证功能。

项目结构
```
/src
  /components
    /layout
      SideMenu.js       # 动态菜单组件
      AuthRoute.js      # 路由守卫组件
  /config
    menuConfig.js       # 菜单配置
    roles.js            # 角色权限配置
  /pages
    (...所有页面组件)
  /store
    authStore.js        # 权限状态管理
  App.js
```

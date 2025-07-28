import React from 'react';
import { AuthButton, AuthProvider, PermissionButton } from '../utils/AuthButton';
// import { AuthProvider, AuthButton, PermissionButton } from './auth';

const ButtonList = () => {
  return (
    <AuthProvider role="editor" permissions={['dashboard:view', 'user:create']}>
      <div>
        <h1>权限按钮示例</h1>
        
        {/* 只有admin可见的按钮 */}
        <AuthButton allowedRoles="admin">
          <button onClick={() => alert('管理员操作')}>管理员按钮</button>
        </AuthButton>
        
        {/* 多个角色可见的按钮 */}
        <AuthButton allowedRoles={['admin', 'editor']}>
          <button>编辑按钮</button>
        </AuthButton>
        
        {/* 无权限时禁用而非隐藏 */}
        <AuthButton 
          allowedRoles="admin" 
          fallback="disable"
          disabledTooltip="请联系管理员获取权限"
        >
          <button>受保护的按钮</button>
        </AuthButton>
        
        {/* 基于权限字符串的按钮 */}
        <PermissionButton requiredPermission="user:create">
          <button>创建用户</button>
        </PermissionButton>
      </div>
    </AuthProvider>
  );
};

export default ButtonList;
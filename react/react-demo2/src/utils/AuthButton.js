// AuthButton.js
// import React from 'react';
// import { useAuth } from './AuthContext';

// AuthContext.js
import React, { createContext, useContext } from 'react';

const AuthContext = createContext({
  role: 'guest', // 默认角色
  permissions: [], // 默认权限列表
});

export const AuthProvider = ({ role, permissions = [], children }) => {
  return (
    <AuthContext.Provider value={{ role, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/**
 * 权限控制按钮组件
 * @param {Object} props
 * @param {string|string[]} props.allowedRoles - 允许访问的角色列表
 * @param {'hide'|'disable'} [props.fallback='hide'] - 无权限时的行为
 * @param {string} [props.disabledTooltip] - 禁用时显示的提示文本
 * @param {React.ReactElement} props.children - 子组件（按钮）
 */
export const AuthButton = ({
  allowedRoles,
  fallback = 'hide',
  disabledTooltip,
  children,
}) => {
  const { role } = useAuth();
  
  // 检查是否有权限
  const hasPermission = Array.isArray(allowedRoles)
    ? allowedRoles.includes(role)
    : allowedRoles === role;

  if (hasPermission) {
    return children;
  }

  // 无权限时的处理
  if (fallback === 'hide') {
    return null;
  }

  // 禁用模式
  return React.cloneElement(children, {
    disabled: true,
    title: disabledTooltip || '您没有权限执行此操作',
    style: {
      ...children.props.style,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  });
};

/**
 * 基于权限字符串的权限按钮组件
 * @param {Object} props
 * @param {string} props.requiredPermission - 需要的权限字符串
 * @param {'hide'|'disable'} [props.fallback='hide'] - 无权限时的行为
 * @param {string} [props.disabledTooltip] - 禁用时显示的提示文本
 * @param {React.ReactElement} props.children - 子组件（按钮）
 */
export const PermissionButton = ({
  requiredPermission,
  fallback = 'hide',
  disabledTooltip,
  children,
}) => {
  const { permissions = [] } = useAuth();
  
  const hasPermission = permissions.includes(requiredPermission);

  if (hasPermission) {
    return children;
  }

  if (fallback === 'hide') {
    return null;
  }

  return React.cloneElement(children, {
    disabled: true,
    title: disabledTooltip || '您没有权限执行此操作',
    style: {
      ...children.props.style,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  });
};
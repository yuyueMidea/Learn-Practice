export const ROLES = {
    ADMIN: 'admin',
    OPERATOR: 'operator',
    GUEST: 'guest'
  };
  
  export const hasPermission = (requiredRoles = [], userRole) => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    if (!userRole) return false;
    return requiredRoles.includes(userRole);
  };
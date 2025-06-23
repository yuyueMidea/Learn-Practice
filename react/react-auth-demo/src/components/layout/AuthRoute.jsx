import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasPermission } from '../../config/roles';
import useAuthStore from '../../store/authStore';
// import { useAuthStore } from '../../store/authStore';

const AuthRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { currentUser, isAuthenticated } = useAuthStore();
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }
        
        if (!hasPermission(requiredRoles, currentUser?.role)) {
          return <Redirect to="/not-authorized" />;
        }
        
        return <Component {...props} />;
      }}
    />
  );
};

export default AuthRoute;
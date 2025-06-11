// components/AuthGuard.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user, token} = useAuthStore();
    // console.log(user,token, 99999, location)
    useEffect(() => {
        if (!token && (location.pathname!='/login')) {
                navigate('/login', {
                state: { from: location },
                replace: true
            });
        }
    }, [navigate, location]);
    return token||(location.pathname=='/login') ? children : null;
};

export default AuthGuard;
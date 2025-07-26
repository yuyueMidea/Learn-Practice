import { useSelector } from "react-redux"

const withAuth = (WrappedComponent, allowedRoles = [])=>{
    return props =>{
        const userRole = useSelector(state => state.login.userName);
        if(allowedRoles.length && !allowedRoles.includes(userRole)) {
            return <div className="text-red-600">暂无权限访问</div>;
        }
        return <WrappedComponent {...props} />
    }
}

export default withAuth;
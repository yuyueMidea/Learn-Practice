import { useSelector } from "react-redux";

/**
 * AuthButton - 权限控制按钮
 * @param {string[]} roles - 允许操作的角色列表（可选）
 * @param {boolean} hideWhenNoPermission - 没权限时是否隐藏（默认 true）
 */
const AuthButton = ({ roles = [], hideWhenNoPermission = true, children, ...rest }) => {
    const userName = useSelector(state => state.login.userName)
    const currentRole = userName;

    const hasRolesProp = roles && roles.length > 0;
    const hasPermission = hasRolesProp ? roles.includes(currentRole) : true;

    if (!hasPermission && hideWhenNoPermission) {
        return null;
    }
    const isDisabled = !hasPermission && !hideWhenNoPermission

    return (
        <button {...rest} disabled={isDisabled} className={`p-2 m-2 bg-blue-500 text-white rounded ${isDisabled ? 'cursor-not-allowed opacity-60' :'hover:bg-blue-600 transition'}`}>
            {children}
        </button>
    );
};

export default AuthButton;

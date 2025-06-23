import { Layout, Menu, Button } from 'antd';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import useAuthStore from '../../store/authStore';
const { Header } = Layout;

export default function AppHeader() {
    const { logout, isAuthenticated ,currentUser } = useAuthStore();
    const history = useHistory()
    const handleLog = ()=>{
        logout();
        setTimeout(() => {
            console.log('=========handleLog========', currentUser)
            // 跳转到登录界面
            history.push('/login');
        }, 500);
    }
  return (
    <Header className='header_wrapper'>
      {/* 左侧Logo */}
      <div className="logo" style={{ marginRight: 24 }}>
        系统名称
      </div>
      
      {/* 导航菜单 */}
      <div className="cmneu_wrapper">hello</div>
      
      {/* 右侧用户操作区 */}
      <div className="show_user">
        <div >{currentUser.username} | {currentUser.role}</div>
        <Button type="primary" onClick={handleLog}>退出登录</Button>
      </div>
    </Header>
  );
}
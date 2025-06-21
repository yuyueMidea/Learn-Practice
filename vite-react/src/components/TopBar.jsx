import { useLocation, useNavigate } from "react-router-dom"
import useCounterStore from "../stores/counterStore";
export default function TopBar({ sidebarOpen, setSidebarOpen, userInfo, quitEvent }) {
  const cmenuName = useCounterStore(state => state.menuName);
  const navigate = useNavigate();
  const location = useLocation();
    return (
      <header className="bg-white shadow-sm z-10 sticky top-0 yy3topbar">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 菜单切换按钮 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span>{sidebarOpen ? '收缩' :'展开' }</span>
            
          </button>
          <span>{ location.pathname }</span>
          {/* 标题 */}
          <h1 className="text-xl font-semibold text-gray-800">{ cmenuName }</h1>
          
          {/* 用户信息/通知等 */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-600" onClick={()=>{console.log('btnn')}}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {userInfo ? 
              <div className="flex items-center">
                <span className="text-gray-700 mr-2 border-b-2">Welcome, {userInfo}</span>
                <button onClick={()=> {quitEvent(); navigate('/login')}} className="border rounded p-1 m-2 hover:bg-red-600 transition">退出登录</button>
              </div>
              :<div>Please login</div>
            }
          </div>
        </div>
      </header>
    )
  }
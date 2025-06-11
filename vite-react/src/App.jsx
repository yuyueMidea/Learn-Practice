import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Sidebar from './components/SideBar.jsx'
import ContentArea from './components/ContentArea.jsx'

import './App.css'
import useCounterStore from './stores/counterStore.js'
import useAuthStore from './stores/authStore.js'
function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(true)
  const { sidebarOpen, setSidebarOpen } = useCounterStore();
  const { user,logOut } = useAuthStore();

  return (
    <div className="h-screen flex flex-col bg-gray-100" style={{width: '100vw'}}>
      {/* 顶部状态栏 */}
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userInfo={user} quitEvent={logOut} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧菜单栏 */}
        <Sidebar open={sidebarOpen} />
        
        {/* 右侧内容区域 */}
        <ContentArea />
      </div>
    </div>
  )
}

export default App
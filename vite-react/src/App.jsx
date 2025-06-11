import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Sidebar from './components/SideBar.jsx'
import ContentArea from './components/ContentArea.jsx'

import './App.css'
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-gray-100" style={{width: '100vw'}}>
      {/* 顶部状态栏 */}
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
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
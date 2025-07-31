import React, { useState, Suspense, lazy } from 'react'
import { Routes, Route, NavLink, useLocation, BrowserRouter, useNavigate } from 'react-router'
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Bell, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  ShoppingCart,
  Package,
  CreditCard,
  Shield,
  Database,
  Truck,
  MessageSquare,
  Calendar,
  Folder
} from 'lucide-react'
import useAuthStore from './store/authStore.js'


// 菜单配置 - 按照你要求的格式
const menuItems = [
  { 
    name: '首页', 
    path: '/', 
    icon: Home,
    componentName: lazy(() => import('./pages/HomePage.jsx'))
  },
  { 
    name: '用户管理', 
    path: '/users', 
    icon: Users,
    componentName: lazy(() => import('./pages/UsersPage.jsx'))
  },
  { 
    name: '登录界面', 
    path: '/loginPage', 
    icon: Users,
    componentName: lazy(() => import('./pages/LoginPage.jsx'))
  },
  { 
    name: '设置视图', 
    path: '/settingsView', 
    icon: Bell,
    componentName: lazy(() => import('./pages/SettingsView.jsx'))
  },
  { 
    name: '个人资料', 
    path: '/profileView', 
    icon: Users,
    componentName: lazy(() => import('./pages/ProfileView.jsx'))
  },
  { 
    name: '商品管理', 
    path: '/products', 
    icon: Package,
    componentName: lazy(() => import('./pages/ProductsPage.jsx'))
  },
  { 
    name: '订单管理', 
    path: '/orders', 
    icon: ShoppingCart,
    componentName: lazy(() => import('./pages/OrdersPage.jsx'))
  },
  { 
    name: '数据分析', 
    path: '/analytics', 
    icon: BarChart3,
    componentName: lazy(() => import('./pages/AnalyticsPage.jsx'))
  },
  { 
    name: '系统设置', 
    path: '/settings', 
    icon: Settings,
    componentName: lazy(() => import('./pages/SettingsPage.jsx'))
  }
]

// 加载中组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// 主布局组件（内部组件，已在Router内部）
const DashboardLayoutInner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications] = useState(5)
  const location = useLocation()
  const { logout, isAuthenticated ,currentUser, darkMode, toggleDarkMode } = useAuthStore();
  const navi = useNavigate()
  const handleLogout = ()=>{
    logout();
    console.log('logoutttttt')
    setTimeout(() => {
      navi('/loginPage');
    }, 300);
  }
  const toprofileView = ()=>{
    navi('/profileView');
  }
  const tosettingsView = ()=>{
    navi('/settingsView');
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkModeClick = () => {
    toggleDarkMode()
  }
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)


  // 生成面包屑
  const getBreadcrumbs = () => {
    let breadcrumbs = '首页'
    
    const currentItem = menuItems.find(item => item.path === location.pathname)
    if (currentItem && currentItem.path !== '/') {
      breadcrumbs = currentItem.name
    }
    
    return breadcrumbs
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* 侧边栏 */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          
          {/* Logo区域 */}
          <div className="flex items-center justify-between h-16 px-6 bg-blue-600 dark:bg-blue-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">R</span>
              </div>
              <span className="ml-3 text-white font-semibold text-lg">React Admin</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:bg-blue-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* 动态导航菜单 - 根据menuItems生成NavLink */}
          <nav className="mt-2 px-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)} // 移动端点击后关闭侧边栏
                    >
                      <IconComponent size={20} className="mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* 顶部状态栏 */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 h-16">
            <div className="flex items-center justify-between h-full px-6">
              {/* 左侧 */}
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-md"
                >
                  <Menu size={20} />
                </button>
                
                {/* 搜索框 */}
                <div className="hidden md:flex relative ml-4">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索功能..."
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {getBreadcrumbs()}
              </div>
              {/* 右侧 */}
              <div className="flex items-center space-x-4">
                {/* 主题切换 */}
                <button
                  onClick={toggleDarkModeClick}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-md"
                  title={darkMode ? '切换到亮色主题' : '切换到暗色主题'}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* 通知 */}
                <div className="relative">
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-md">
                    <Bell size={20} />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* 用户菜单 */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md"
                  >
                    <span>Welcome</span>
                    {isAuthenticated && <span className="hidden md:block font-medium">{currentUser.username}</span>}
                    
                    <ChevronDown size={16} />
                  </button>

                  {/* 用户下拉菜单 */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-50">
                      <div className="py-1">
                        <a href="#" onClick={toprofileView} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          个人资料
                        </a>
                        <a href="#" onClick={tosettingsView} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          账户设置
                        </a>
                        <hr className="my-1 border-gray-200 dark:border-gray-600" />
                        {isAuthenticated && <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                          <LogOut size={16} className="mr-2" />
                          退出登录
                        </button>}
                        
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* 主要内容区域 - 根据menuItems动态生成Route */}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {menuItems.map((item) => (
                    <Route 
                      key={item.path} 
                      path={item.path} 
                      element={<item.componentName />} 
                    />
                  ))}
                  {/* 404 页面 */}
                  <Route path="*" element={
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">抱歉，您访问的页面不存在</p>
                      <NavLink 
                        to="/" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        返回首页
                      </NavLink>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </div>

      {/* 移动端遮罩层 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  )
}

// 主布局组件（外部包装Router）
const DynamicDashboardLayout = () => {
  return (
    <BrowserRouter>
      <DashboardLayoutInner />
    </BrowserRouter>
  )
}

export default DynamicDashboardLayout
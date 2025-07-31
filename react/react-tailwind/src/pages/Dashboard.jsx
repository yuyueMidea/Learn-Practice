import React, { useState, useEffect } from 'react';
import { Search, Settings, User, HelpCircle, LogOut, Moon, Sun, Bell, Menu, X, Home, BookOpen, FileText, BarChart3, Shield, Globe, CreditCard, Mail, Phone, MapPin, Edit3, Save, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userProfile, setUserProfile] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138 0013 8000',
    location: '北京市',
    avatar: '',
    bio: '产品经理，专注于用户体验设计',
    joinDate: '2023年1月'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  // 搜索功能
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const mockResults = [
      { id: 1, title: '用户管理', type: '功能', description: '管理系统用户和权限' },
      { id: 2, title: '数据分析', type: '报表', description: '查看详细的数据分析报告' },
      { id: 3, title: '系统设置', type: '配置', description: '配置系统参数和选项' },
      { id: 4, title: '帮助文档', type: '文档', description: '查看系统使用帮助' },
      { id: 5, title: '订单管理', type: '功能', description: '管理所有订单信息' }
    ];
    
    const filtered = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  // 主题切换
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // 登录/登出
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setSearchQuery('');
    setSearchResults([]);
  };

  // 保存个人资料
  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

  // 登录页面
  const LoginPage = () => (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>欢迎登录</h2>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>请输入您的登录信息</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              邮箱地址
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="请输入邮箱"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              密码
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="请输入密码"
            />
          </div>
          
          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            登录
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={toggleTheme}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
          >
            {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {darkMode ? '浅色模式' : '深色模式'}
          </button>
        </div>
      </div>
    </div>
  );

  // 侧边栏
  const Sidebar = () => (
    <div className={`w-64 h-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>管理系统</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {[
          { id: 'dashboard', icon: Home, label: '仪表板' },
          { id: 'profile', icon: User, label: '个人资料' },
          { id: 'settings', icon: Settings, label: '账户设置' },
          { id: 'help', icon: HelpCircle, label: '帮助中心' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600')
                : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50')
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
            darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut className="w-5 h-5 mr-3" />
          退出登录
        </button>
      </div>
    </div>
  );

  // 顶部导航栏
  const Header = () => (
    <div className={`h-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-6`}>
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="搜索功能、文档、设置..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
          
          {searchResults.length > 0 && (
            <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border z-50 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {searchResults.map(result => (
                <div
                  key={result.id}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0 ${
                    darkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{result.title}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{result.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {result.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <div className="relative">
          <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</span>
        </div>
      </div>
    </div>
  );

  // 仪表板视图
  const DashboardView = () => (
    <div className="p-6 space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>仪表板</h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>欢迎回来，{userProfile.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: '总用户数', value: '1,234', icon: User, color: 'blue' },
          { title: '活跃用户', value: '856', icon: BarChart3, color: 'green' },
          { title: '新消息', value: '23', icon: Mail, color: 'yellow' },
          { title: '系统状态', value: '正常', icon: Shield, color: 'purple' }
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>最近活动</h3>
          <div className="space-y-3">
            {[
              { action: '用户登录', time: '2分钟前', user: '李四' },
              { action: '创建新文档', time: '5分钟前', user: '王五' },
              { action: '更新配置', time: '10分钟前', user: '赵六' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.user}</p>
                </div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>快速操作</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '新建用户', icon: User },
              { label: '查看报表', icon: BarChart3 },
              { label: '系统设置', icon: Settings },
              { label: '帮助文档', icon: HelpCircle }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-gray-300' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <action.icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 个人资料视图
  const ProfileView = () => (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>个人资料</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isEditing 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
          {isEditing ? '取消编辑' : '编辑资料'}
        </button>
      </div>
      
      <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className={`text-2xl font-bold mb-2 px-3 py-1 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              ) : (
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</h3>
              )}
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className={`w-full px-3 py-1 rounded border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-300 text-gray-600'
                  }`}
                  rows="2"
                />
              ) : (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userProfile.bio}</p>
              )}
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>加入时间：{userProfile.joinDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Mail, label: '邮箱', field: 'email' },
              { icon: Phone, label: '电话', field: 'phone' },
              { icon: MapPin, label: '地址', field: 'location' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm[item.field]}
                      onChange={(e) => setEditForm({...editForm, [item.field]: e.target.value})}
                      className={`w-full px-2 py-1 rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  ) : (
                    <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile[item.field]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveProfile}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                保存更改
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 设置视图
  const SettingsView = () => (
    <div className="p-6 max-w-4xl">
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>账户设置</h2>
      
      <div className="space-y-6">
        {[
          {
            title: '外观设置',
            items: [
              {
                icon: darkMode ? Sun : Moon,
                label: '主题模式',
                description: '切换浅色/深色主题',
                action: (
                  <button
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    {darkMode ? '切换到浅色' : '切换到深色'}
                  </button>
                )
              }
            ]
          },
          {
            title: '通知设置',
            items: [
              {
                icon: Bell,
                label: '推送通知',
                description: '接收系统和应用通知',
                action: (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                )
              }
            ]
          },
          {
            title: '安全设置',
            items: [
              {
                icon: Shield,
                label: '修改密码',
                description: '更新您的登录密码',
                action: (
                  <button className={`px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}>
                    修改密码
                  </button>
                )
              },
              {
                icon: Globe,
                label: '两步验证',
                description: '为账户添加额外安全保护',
                action: (
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    启用
                  </button>
                )
              }
            ]
          },
          {
            title: '账单设置',
            items: [
              {
                icon: CreditCard,
                label: '付款方式',
                description: '管理支付方式和账单信息',
                action: (
                  <button className={`px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}>
                    管理
                  </button>
                )
              }
            ]
          }
        ].map((section, sectionIndex) => (
          <div key={sectionIndex} className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                      </div>
                    </div>
                    {item.action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 帮助中心视图
  const HelpView = () => (
    <div className="p-6 max-w-4xl">
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>帮助中心</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          {
            icon: BookOpen,
            title: '用户指南',
            description: '学习如何使用系统的各项功能',
            articles: ['快速入门', '基础操作', '高级功能']
          },
          {
            icon: FileText,
            title: 'API 文档',
            description: '开发者接口文档和示例代码',
            articles: ['接口概览', '认证授权', '错误代码']
          },
          {
            icon: HelpCircle,
            title: '常见问题',
            description: '快速找到常见问题的解决方案',
            articles: ['登录问题', '功能异常', '性能优化']
          },
          {
            icon: Mail,
            title: '联系支持',
            description: '获取技术支持和客户服务',
            articles: ['提交工单', '在线客服', '电话支持']
          }
        ].map((category, index) => (
          <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center mb-4">
              <category.icon className={`w-8 h-8 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{category.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{category.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              {category.articles.map((article, articleIndex) => (
                <button
                  key={articleIndex}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{article}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>联系我们</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: '邮箱支持', value: 'support@example.com', color: 'blue' },
            { icon: Phone, label: '电话支持', value: '400-123-4567', color: 'green' },
            { icon: Globe, label: '在线客服', value: '工作日 9:00-18:00', color: 'purple' }
          ].map((contact, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 border-dashed ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <contact.icon className={`w-6 h-6 mb-2 text-${contact.color}-600`} />
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.label}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{contact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'profile' && <ProfileView />}
            {currentView === 'settings' && <SettingsView />}
            {currentView === 'help' && <HelpView />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { NavLink } from 'react-router-dom'

export default function Sidebar({ open }) {
    // 定义菜单项
    const menuItems = [
        { path: '/', name: '首页' },
        { path: '/userinfo', name: '用户' },
        // { path: '/login', name: '登录' },
        { path: '/goodslist', name: '商品' },
        { path: '/siblingsParam', name: '兄弟组件传值' },
        { path: '/refDemo', name: 'Ref用法' },
        { path: '/cacheDemo', name: '缓存测试' },
        { path: '/toolbar', name: '事件冒泡' },
        {path: '/signup', name: '注册'},
        { path: '/movingdot', name: 'Movingdot' },
        { path: '/GrandSon', name: 'GrandSon' },
        { path: '/checkedItems', name: 'CheckedItems' },
        { path: '/taskList', name: '任务列表' },
        { path: '/toggleSize', name: 'ToggleSize' },
        { path: '*', name: 'NotFound' },
    ]
  /* const menuItems = [
    { path: '/', name: '首页', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/dashboard', name: '仪表盘', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { path: '/settings', name: '设置', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ] */

  return (
    <aside className={`bg-gray-800 text-white ${open ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex-shrink-0 overflow-y-auto yy3aside`}>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="px-2 py-1">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 border' : ''}`
                }
              >
                <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className={`ml-3 ${open ? 'block' : 'hidden'}`}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
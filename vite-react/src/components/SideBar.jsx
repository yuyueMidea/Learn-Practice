import { NavLink, useLocation } from 'react-router-dom'
import useCounterStore from '../stores/counterStore'
import { useEffect } from 'react';

export default function Sidebar({ open }) {
  const menuList = useCounterStore(state => state.menuNameList)
  const setcMenuName = useCounterStore(state => state.setMenuName)
  // console.log('sidebar_menuList_: ', menuList )
  const location = useLocation();
  
  useEffect(() => {
    const cname =( menuList.find(v => v.path ===location.pathname) || {}).name
    console.log("Route changed to:", location.pathname, cname);
    setcMenuName(cname)
  }, [location]);

  return (
    <aside className={`bg-gray-800 text-white ${open ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex-shrink-0 overflow-y-auto yy3aside`}>
      <nav className="mt-4">
        <ul>
          {menuList.map((item) => (
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
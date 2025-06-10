import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Link,
    NavLink,
    Navigate 
} from 'react-router-dom';
import {KeepAlive,AliveScope } from 'react-activation';

import './App.css'
import UserInfo from './pages/UserInfo.jsx';
import GoodsList from './pages/GoodsList.jsx'
// import Signup from './pages/pages/Signup.jsx'
import CacheDemo from './pages/CacheDemo.jsx'
import SiblingsParam from './pages/SiblingsParam.jsx'
import Refdemo from './pages/Refdemo.jsx'
// import Score from "./pages/Score.jsx";
import Toolbar from "./pages/Toolbar.jsx";
import Movingdot from './pages/Movingdot'
import CheckedItems from './pages/CheckedItems.jsx'
import TaskList from './pages/TaskList.jsx'
import GrandSon from './pages/GrandSon.jsx'
import ToggleSize from './pages/ToggleSize.jsx'
import NotFound from './pages/NotFound'

// 定义菜单项
const menuItems = [
    { path: '/', name: '首页', componentName: Home, title: 'home'},
    { path: '/userinfo', name: '用户', componentName: UserInfo, title: 'user-list'},
    { path: '/goodslist', name: '商品', componentName: GoodsList, title: ''},
    { path: '/siblingsParam', name: '兄弟组件传值', componentName: SiblingsParam, title: ''},
    { path: '/refDemo', name: 'Ref用法', componentName: Refdemo, title: ''},
    // { path: '/signup', name: '注册', componentName: Signup, title: ''},
    { path: '/cacheDemo', name: '缓存测试', componentName: CacheDemo, title: ''},
    { path: '/toolbar', name: '事件冒泡', componentName: Toolbar, title: ''},
    { path: '/movingdot', name: 'Movingdot', componentName: Movingdot, title: ''},
    { path: '/GrandSon', name: 'GrandSon', componentName: GrandSon, title: ''},
    { path: '/checkedItems', name: 'CheckedItems', componentName: CheckedItems, title: ''},
    { path: '/taskList', name: '任务列表', componentName: TaskList, title: ''},
    { path: '/toggleSize', name: 'ToggleSize', componentName: ToggleSize, title: ''},
    { path: '*', name: 'NotFound', componentName: NotFound, title: ''},
]
export default function AppCopy() {
    return(
        <BrowserRouter>
            <div className="app-container out_route_wrapper">
                <AliveScope>
                    <nav className='navbar status-bar'>
                        {menuItems.map(item => (
                            <NavLink key={item.path} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to={item.path} title={item.title}>{ item.name }</NavLink>
                        ))}
                    </nav>
                    <div className="innerroute_wrapper content-area">
                        <Routes>
                            {menuItems.map(item => (
                                <Route path={item.path} element={<item.componentName />} />
                            ))}
                        </Routes>
                    </div>
                </AliveScope>
            </div>
        </BrowserRouter>
    )
}

function Home() {
    return(
        <h1>home</h1>
    )
}
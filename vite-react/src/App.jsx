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
import UserInfo from './UserInfo.jsx';
import GoodsList from './GoodsList.jsx'
import Signup from './Signup.jsx'
import SiblingsParam from './SiblingsParam.jsx'
import Refdemo from './Refdemo.jsx'
import Score from "./Score.jsx";
import Toolbar from "./Toolbar.jsx";
import Movingdot from './Movingdot'
import CheckedItems from './CheckedItems.jsx'
import TaskList from './TaskList.jsx'
import GrandSon from './GrandSon.jsx'
import ToggleSize from './ToggleSize.jsx'
export default function AppCopy() {
    return(
        <BrowserRouter>
            <AliveScope>
                <nav className='navbar'>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/" title='home'>首页</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/userinfo" title='渲染用户'>用户</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/goodslist" title='渲染商品列表'>商品</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/siblingsParam" title='兄弟组件传值'>SiblingsParam</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/refDemo" title='Ref用法'>Refdemo</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/signup">signup</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/score">測試渲染</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/toolbar" title='事件冒泡'>事件傳播</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/movingdot" title='设置对象state'>Movingdot</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/checkedItems">CheckedItems</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/tasklist">TaskList</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/grandson">GrandSon</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/toggleSize">ToggleSize</NavLink>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userinfo" element={ <UserInfo /> } />
                    <Route path="/goodslist" element={ <GoodsList /> } />
                    <Route path="/siblingsParam" element={<SiblingsParam />} />
                    <Route path="/refDemo" element={<Refdemo />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/score" element={<Score />} />
                    <Route path="/toolbar" element={<Toolbar />} />
                    <Route path="/movingdot" element={<Movingdot />} />
                    <Route path="/checkedItems" element={<CheckedItems />} />
                    <Route path="/tasklist" element={<TaskList />} />
                    <Route path="/grandson" element={<GrandSon />} />
                    <Route path="/toggleSize" element={<ToggleSize />} />
                </Routes>
            </AliveScope>
        </BrowserRouter>
    )
}

function Home() {
    return(
        <h1>home</h1>
    )
}
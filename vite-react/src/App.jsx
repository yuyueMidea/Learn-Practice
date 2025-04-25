import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Link,
    NavLink,
    Navigate 
} from 'react-router-dom';
import './App.css'
import UserInfo from './UserInfo.jsx';
import GoodsList from './GoodsList.jsx'
import Signup from './Signup.jsx'
import Test from './Test.jsx'
import Test2 from './Test2.jsx'
import Score from "./Score.jsx";
import Toolbar from "./Toolbar.jsx";
export default function AppCopy() {
    return(
        <BrowserRouter>
            <nav className='navbar'>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/">首页</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/userinfo">用户</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/goodslist">商品</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/test">Test</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/test2">Test2</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/signup">signup</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/score">測試渲染</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} to="/toolbar">事件傳播</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userinfo" element={<UserInfo />} />
                <Route path="/goodslist" element={<GoodsList />} />
                <Route path="/test" element={<Test />} />
                <Route path="/test2" element={<Test2 />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/score" element={<Score />} />
                <Route path="/toolbar" element={<Toolbar />} />
            </Routes>
        </BrowserRouter>
    )
}

function Home() {
    return(
        <h1>home</h1>
    )
}
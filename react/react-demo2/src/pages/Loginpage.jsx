import { Button, Input, message, Space } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router";

export default function Loginpage() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [username, setusername] = useState('');
    const handleLogin = () =>{
        if(username === '') return message.warning('请输入用户名!');
        dispatch(login(username));
        navi('/');      //登录成功自动跳转到首页
    }
    return (
        <div className="login-wrapper">
            <Space direction="vertical">
                <Input value={username} onChange={e => setusername(e.target.value)} placeholder="请输入名称" name="cname" className="log-uname" />
                <Button type="primary" onClick={handleLogin} className="log-btn">登录</Button>
            </Space>
        </div>
    )
}
import { Button } from "antd"
import { useNavigate } from "react-router"

export default function NotFound() {
    const navi = useNavigate()
    return <h1 style={{color: 'red'}}>404 <Button type="primary" onClick={() => navi('/')}>返回首页</Button></h1>
}
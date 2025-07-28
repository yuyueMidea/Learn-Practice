import { Button, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, reset } from "../store/counterSlice";

export default function Home() {
    const count = useSelector(state => state.counter.countValue);
    const dispatch = useDispatch();
    return (
        <div className="home-wrapper">
            <h2>home</h2>
            <h2>Redux 计数器示例</h2>
            <p>当前计数：{count}</p>
            <Space>
                <Button type="primary" onClick={() => dispatch(increment())}>Add</Button>
                <Button type="primary" onClick={() => dispatch(reset())}>Reset</Button>
            </Space>
        </div>
    )
}
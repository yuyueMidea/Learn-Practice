import { useDispatch, useSelector } from "react-redux"
import { increment, incrementByAmount, reset } from "../stores/counterSlice"
import BaseList from "./BaseList";
import AuthButton from "./AuthButton";

export default function Home() {
    // const count = useSelector(state => state.count1.value);
    const cnt = useSelector(state=>state.counter.value);
    const dispatch = useDispatch();
    
    const handleAdd = ()=>{
        dispatch(increment());
    }
    
    const handleAdd3 = ()=>{
        dispatch(incrementByAmount(3));
    }
    const handleReset = ()=>{
        dispatch(reset());
    }
    const datalist = [
        {name: 'zhanfsna', age: 33},
        {name: 'lisi', age: 24},
        {name: 'wangwu', age: 35},
    ]
    
    return (
        <div className="border p-1 m-2">
            <h1>homeeeeeeeee</h1>
            <p className="border p-2 m-2">
                权限按钮区域:
                <AuthButton roles={['admin', 'manager']}>管理员和经理才能看到该按钮</AuthButton>
                <AuthButton roles={['admin']} onClick={()=>{console.log('admin_only')}}>管理员按钮</AuthButton>
                <AuthButton roles={['admin']} hideWhenNoPermission={false} onClick={()=>{console.log('admin_only2')}}>管理员按钮</AuthButton>
                <AuthButton roles={['guest']} onClick={()=>{console.log('guest_click')}}>普通访客按钮</AuthButton>
                
                <AuthButton onClick={()=>{console.log('everyone_click')}}>无限制按钮（所有人都能看到）</AuthButton>
            </p>
            <p>
                <span>count_: { cnt }</span>
                <button className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleAdd}>add</button>
                <button className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleAdd3}>add3</button>
                <button className="p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleReset}>reset</button>
            </p>
            <BaseList items={datalist} renderItem={item =>(<div>{item.name}---{item.age}</div>)}/>
            <p>divide-line</p>
            <BaseList items={['12', 'asdd', '暗暗说道发生']} />
        </div>
    )
}
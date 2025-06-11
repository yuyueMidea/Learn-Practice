import { memo, useCallback, useState } from "react"

// 使用memo将组件变为记忆组件，这样旧不会在每次父组件更新的时候触发子组件更新了
const SonButton = memo(function ({onClick}) {
    console.log('按钮渲染了' + new Date().toLocaleTimeString())
    return <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={onClick}>子组件按钮</button>
})

export default function CacheDemo() {
    const [count, setcount] = useState(0);
    function handleUpdate() {
        setcount( count + 1)
    }
    const btnClick = useCallback(()=> {
        console.log('子组件 按钮点击了')
    }, [])
    return (
        <div className="perWrapper">
            <p>缓存测试（useMemo/useCallback）</p>
            <SonButton onClick={btnClick}></SonButton>
            <p>
                <span style={{padding: 11}}>Count: {count}</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={handleUpdate}>addOne</button>
            </p>
            
        </div>
    )
}
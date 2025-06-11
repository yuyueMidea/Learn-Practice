import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

function Child1() {
    const [count, setcount] = useState(0)
    const prevCount = useRef()
    function addPlusone() {
        prevCount.current = count
        setcount(c=>c+1)
    }
    function focusOne() {
        inputref.current.focus();           //点击的时候设置，输入框自动聚焦
    }
    const inputref = useRef(null);
    const [inputval, setinputval] = useState('')
    return (
        <div className="perWrapper">
            <span>子组件1， 测试专用的输入框: </span>
            <input className="border p-1 m-2 rounded shadow" type="text" ref={inputref} value={inputval} onChange={e=>setinputval(e.target.value)} />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={focusOne} style={{minWidth:222}}>输入框聚焦: {inputval}</button>
            <hr />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={addPlusone}>加一</button>
            <span style={{display:'inline-block',minWidth:222}}>current_count: {count}</span>
            <span>prev_count: {prevCount.current}</span>
        </div>
    )
}

const Child2 = forwardRef(function(props, ref) {
    const [cnt, setcnt] = useState(0);
    useImperativeHandle(ref, ()=>({
        // 暴露给父组件的方法
        myFn: ()=>{
            console.warn('===这是子组件2,被调用的方法, 子组件2当前cnt: ', cnt)
            setcnt(v=>v+3)
        }
    }) )
    return (
        <div className="perWrapper">
            <h2>这是子组件2</h2>
            <p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={()=> setcnt(v=>v+1)}>加一</button>
                <span>cnt: {cnt}</span>
            </p>
        </div>
    )
})
export default function Parent() {
    const [count, setcount] = useState(0)
    function countClick() {
        setcount(count+1)
    }
    useEffect(()=>{
        console.log(333,'useeffect')
    }, [count])
    const ref1 = useRef();
    function handleClick() {
        ref1.current.myFn()
    }
    return (
        <>
            <h2>父组件
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={handleClick}>获取调用子组件2</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={countClick}>自增:{count}</button>
            </h2>
            <Child2 ref={ref1}></Child2>
            <Child1 ></Child1>
        </>
    )
}
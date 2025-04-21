import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

function Child1() {
    const [count, setcount] = useState(0)
    const prevCount = useRef()
    function addPlusone() {
        prevCount.current = count
        setcount( count+1)
        console.log('inputref_; ', inputref.current)
        inputref.current.focus();           //点击的时候设置，输入框自动聚焦
    }
    const inputref = useRef(null);
    const [inputval, setinputval] = useState('')
    function handleinputval(vvv) {
        let val = vvv.target.value
        setinputval(val)
        console.warn('vvv: ', val)
    }
    return (
        <>
            <span>组件1，输入框: </span>
            <input type="text" ref={inputref} value={inputval} onChange={handleinputval} />
            <hr />
            <button onClick={addPlusone}>addOne</button>
            <hr />
            <p>current_count: {count}</p>
            <p>prev_count: {prevCount.current}</p>
        </>
    )
}

const Child2 = forwardRef(function(props, ref) {
    useImperativeHandle(ref, ()=>({
        // 暴露给父组件的方法
        myFn: ()=>{
            console.warn('===child2, myFn===')
        }
    }) )
    return (
        <>
            <p>字组件2</p>
        </>
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
            <button onClick={handleClick}>获取调用子组件</button>
            <button onClick={countClick}>count:{count}</button>
            <h2>父组件
            </h2>
            <Child1 ></Child1>
            <hr />
            <Child2 ref={ref1}></Child2>
        </>
    )
}
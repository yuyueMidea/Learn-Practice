import { useState } from "react"

function Child1({ onValueChange }) {
    const [inputValue, setinputValue] = useState('')
    function handleValuechange(e) {
        let newValue = e.target.value
        setinputValue(newValue)
        onValueChange(newValue); // 将新值传给父组件
    }
    return (
        <>
            <span>子组件1，输入框</span>
            <input type="text" value={inputValue} onChange={handleValuechange} />
        </>
    )
}
function Child2({content}) {
    return (
        <>
            <span>子组件2，接收到了值：{content}</span>
        </>
    )
}
function Parent() {
    const [child1val, setchild1val] = useState('')
    function receiveChildVal(vvv) {
        console.warn('rece: ', vvv);
        setchild1val(vvv);
    }
    return (
        <>
            <h1>父组件</h1>
            <Child1 onValueChange={receiveChildVal} />
            <hr />
            <Child2 content={child1val} />
        </>
    )
}

export default Parent
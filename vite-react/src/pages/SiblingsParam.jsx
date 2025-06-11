import { useState } from "react"

function Child1({ onValueChange }) {
    const [inputValue, setinputValue] = useState('')
    function handleValuechange(e) {
        let newValue = e.target.value
        setinputValue(newValue)
        onValueChange(newValue); // 将新值传给父组件
    }
    return (
        <div className="perWrapper">
            <span>子组件1, 输入框</span>
            <input className="border p-1 m-2 shadow rounded" type="text" value={inputValue} onChange={handleValuechange} />
        </div>
    )
}
function Child2({content}) {
    return (
        <div className="perWrapper">子组件2，接收到了值：{content}</div>
    )
}
export default function Parent() {
    const [child1val, setchild1val] = useState('')
    function receiveChildVal(vvv) {
        // console.warn('rece: ', vvv);
        setchild1val(vvv);
    }
    return (
        <>
            <h1>父组件</h1>
            <Child1 onValueChange={receiveChildVal} />
            <Child2 content={child1val} />
            <p>每次你点击按钮，输入框的 state 都会消失！这是因为每次 MyComponent 渲染时都会创建一个 不同 的 MyTextField 函数。<br />
                你在相同位置渲染的是 不同 的组件，所以 React 将其下所有的 state 都重置了。这样会导致 bug 以及性能问题。<br />
                为了避免这个问题， 永远要将组件定义在最上层并且不要把它们的定义嵌套起来。</p>
            <Mycomponent/>
        </>
    )
}

function Mycomponent() {
    function Mytext() {
        const [text,settext] = useState('');
        return(
            <>
                <input type="text" className="border p-1 m-2 rounded" value={text} onChange={e=>settext(e.target.value)} />
            </>
        )
    }
    const [counter, setcount] = useState(0);
    return(
        <div className="perWrapper">
            <Mytext/>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={()=>{
                setcount(c=>c+1)
            }}>点击了 {counter} 次</button>
        </div>
    )
}
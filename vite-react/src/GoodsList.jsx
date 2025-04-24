import { useState } from "react";

//   读取 从父组件传递来的 prop：
/**
 * 当你点击按钮时，onClick 处理程序会启动。每个按钮的 btnClick prop 会被设置为 ShoopingList 内的 handleClick 函数，所以函数内的代码会被执行。
 * 该代码会调用 setCount(count + 1)，使得 state 变量 count 递增。新的 count 值会被作为 prop 传递给每个按钮，因此它们每次展示的都是最新的值。
 * 这被称为“状态提升”。通过向上移动 state，我们实现了在组件间共享它。
 */
function MyButton({btncount, btnClick}) {
    return (
        <button onClick={btnClick}>点了 {btncount} 次</button>
    )
}
import PersonObj from "./PersonInfo";
function ShoopingList() {
    const products = [
        { title: '卷心菜', isFruit: false, id: 1 },
        { title: '大蒜', isFruit: false, id: 2 },
        { title: '苹果', isFruit: true, id: 3 },
    ];
    const perList = [
        {name: 'zhangsna', age: 33, gender:'male'},
        {name: 'lili', age: 44, gender:'female'},
        {name: 'wangwu', age: 25, gender:'male'},
        {name: 'rohanna', age: 54, gender:'female'},
    ]
    const [perFilterList, setperFilterList] = useState(perList);
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count+1)
    }
    function handleClick2() {
        setCount(count-1)
    }
    function handleChkChange(val) {
        let chked =  val.target.checked
        let tmep = chked ? perList.filter(v=>v.gender=='male') : perList
        console.warn('chked: ', chked, 'listt: ', tmep)
        setperFilterList(tmep)
    }
    return (
        <>
            <p>商品列表</p>
            <ul>
                {products.map(item=>
                    <li title={item.id} key={item.id} style={{ color: item.isFruit ?'pink':'green' }}>{item.title}</li>
                )}
            </ul>
            <hr />
            <h4>独立更新的计数器:{count}</h4>
            <p>(+)<MyButton btncount={count} btnClick={handleClick}></MyButton></p>
            <p>(-)<MyButton btncount={count} btnClick={handleClick2}></MyButton></p>
            <h4>开始引用子组件，人物信息, <input type="checkbox" onChange={handleChkChange} />male</h4>
            {perFilterList.map(it=>
                <PersonObj name={it.name} age={it.age} gender={it.gender} key={it.age}></PersonObj>
            )}
            
        </>
    )
}

export default ShoopingList
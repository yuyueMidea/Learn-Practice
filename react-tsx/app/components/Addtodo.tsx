import { useState } from "react"

interface AddTodoProps {
    addTodo: (text: string) =>void
}
export default function AddTodo({addTodo}: AddTodoProps) {
    const [text, setText] = useState('')
    //onChange只要内容一变化，就把dom元素的值取出来，用setText设置给我们的text状态
    const handleSubmit =()=>{
        if(text.trim()==='') {
            console.error('input is empty!')
            return
        }
        console.log('inputValue: ', text)
        addTodo(text)
        setText('')      //可以设置清空输入框，方便下次输入
    }
    return (
        <div className="addWrapper">
            <input type="text" value={text}
            onChange={(e) => setText(e.target.value) }
            className="formInput1"/>
            <button onClick={handleSubmit} className="formbtn1">新建事项</button>
        </div>
    )
}
import { useState } from "react"
const initialTask = [
    {id:0, text:'task0', done: true, isEditing: false},
    {id:1, text:'task1', done: false, isEditing: false},
    {id:2, text:'task2', done: false, isEditing: false},
]
let nextid = 3;
export default function TaskList() {
    const [showFlag, setshowFlag] = useState(false);
    const [inputtext, settext] = useState('');
    const [task, settask] = useState(initialTask);
    function handleChangeItem(item, newVal) {
        console.warn('changeText: ', newVal, ', item: ',item)
        settask(task.map(v=>{
            if(v.id == item.id) {
                v.text = newVal
            }
            return v
        }))
    }
    function handleDeleteItem(cid) {
        const filteredTask = task.filter(v=>v.id!==cid)
        settask(filteredTask)
    }
    function handleSaveItem(cid) {
        console.warn(cid, 'saveeee: ', task)
        settask(task.map(v=>{
            if(v.id == cid) {
                v.isEditing = false
            }
            return v
        }))
    }
    function handleEditItem(cid) {
        console.warn('editttt: ', cid)
        settask(task.map(v=>{
            if(v.id == cid) {
                v.isEditing = true
            }
            return v
        }))
    }
    function addOneTask() {
        console.warn('addOneTask--', inputtext)
        settask([
            ...task,
            {id:nextid++, text: inputtext, done: false, isEditing: false}
        ])
    }
    function generateTask() {
        console.log('taskkkk: ', task)
        setshowFlag(true);
        setTimeout(() => {
            setshowFlag(false);
        }, 3000);
    }
    function handleChkChange(cid, e) {
        console.warn(cid, ', chked: ', e.target.checked )
        settask(task.map(v=>{
            if(v.id == cid) {
                v.done = e.target.checked
            }
            return v
        }))
    }
    return(
        <div className="perWrapper">
            <h2>To do list</h2>
            <p style={{margin:5,padding:5}}>
                <input className="input showInput" type="text" value={inputtext} onChange={e=>settext(e.target.value)} />
                <button onClick={addOneTask} disabled={inputtext===''}>添加任务</button>
                <button className="btn" onClick={generateTask} disabled={task.length==0}>生成已经勾选的任务</button>
                <span className="showTxt">{showFlag ? task.filter(v=>v.done).map(v=>v.text).join(', ') :''}</span>
            </p>
            <ul className="listWrapper perWrapper">
                {task.map(item=>
                    <li key={item.id}>
                        <input type="checkbox" id={item.id} checked={item.done} onChange={e=>handleChkChange(item.id, e)} />
                        {item.isEditing ? <input className="input showInput" type="text" value={item.text} onChange={e=>handleChangeItem(item, e.target.value)} /> : <label htmlFor={item.id} className="showTxt">{item.text}</label> }
                        {item.isEditing ? <button className="btn" onClick={()=>{handleSaveItem(item.id)}}>保存({item.id})</button>: <button className="btn" onClick={()=>{handleEditItem(item.id)}}>编辑({item.id})</button>}
                        <button className="btn" onClick={()=>{handleDeleteItem(item.id)}}>删除({item.id})</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
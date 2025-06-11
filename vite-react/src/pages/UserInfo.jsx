import { useState } from "react"
import PersonObj from "./PersonInfo";
let nextid=0;           //设置一个全局的自增量，用于计数
export default function UserInfo() {
    const [person,setperson] = useState({
        firstName:'John',
        lastName:'Snow',
        email: 'jSnow@163.com'
    })
    const fullName = person.firstName+' '+person.lastName;
    function handleFirstNameChange(e) {
        setperson({
            ...person, // 复制上一个 person 中的所有字段
            firstName: e.target.value // 但是覆盖 firstName 字段 
        })
    }
    function handleLastNameChange(e) {
        setperson({
            ...person,
            lastName: e.target.value,
        })
    }
    function handleEmailChange(e) {
        setperson({
            ...person,
            email: e.target.value,
        })
    }
    // 添加用户数组的输入框的字段和它的方法
    const [uname, setname] = useState('')
    const [namelist, setnamelist] = useState([])
    function handleAddone() {
        setnamelist([
            ...namelist,
            {id: nextid++, name: uname}
        ])
        console.log(uname, 'namelist_: ', namelist)
    }
    function handleAddone2() {
        setnamelist([
            {id: nextid++, name: uname},
            ...namelist,
        ])
        console.log(uname, 'namelist222_: ', namelist)
    }
    const perList = [
        {name: 'zhangsna', age: 33, gender:'male'},
        {name: 'lili', age: 44, gender:'female'},
        {name: 'wangwu', age: 25, gender:'male'},
        {name: 'rohanna', age: 54, gender:'female'},
    ]
    const [perFilterList, setperFilterList] = useState(perList);
    function handleChkChange(val) {
        let chked =  val.target.checked
        let tmep = chked ? perList.filter(v=>v.gender=='male') : perList
        console.warn('chked: ', chked, 'listt: ', tmep)
        setperFilterList(tmep)
    }
    return(
        <div className="perWrapper">
            <div className="perWrapper">
                <label htmlFor="name">
                    firstName:
                    <input className="border p-1 m-2 rounded shadow" type="text" id="name" value={person.firstName} onChange={handleFirstNameChange}/>
                </label>
                <label htmlFor="name2">
                    lastName:
                    <input className="border p-1 m-2 rounded shadow" type="text" id="name2" value={person.lastName} onChange={handleLastNameChange}/>
                </label>
                <label htmlFor="email">
                    email:
                    <input className="border p-1 m-2 rounded shadow" type="text" id="email" value={person.email} onChange={handleEmailChange}/>
                </label>
                <p>{person.firstName}--{person.lastName}---{person.email}</p>
                <p>fullName: {fullName}</p>
            </div>
            <div className="perWrapper">
                <input className="border p-1 m-2 rounded shadow" type="text" value={uname} onChange={e=>setname(e.target.value)} />
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={handleAddone}>pushOne</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={handleAddone2}>unshiftOne</button>
                <ul>
                    {namelist.map(item=>(
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
            <div className="perWrapper">
                <h4>开始引用子组件，人物信息,
                    <label htmlFor="chk1">
                        <input type="checkbox" id="chk1" onChange={handleChkChange} />male
                    </label>
                    </h4>
                {perFilterList.map(it=>
                    <PersonObj name={it.name} age={it.age} gender={it.gender} key={it.age}></PersonObj>
                )}
            </div>
        </div>
    )
}
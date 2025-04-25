import { useState } from "react"

export default function CheckedItems() {
    const initialItems = [
        {id:0, title:'China'},
        {id:1, title:'Japan'},
        {id:2, title:'America'},
    ]
    const [items, setitems] = useState(initialItems)
    const [selectedId, setselectedId] = useState(0);
    const selectedItem = items.find(v=>v.id==selectedId)
    function handleChange(cid, e) {
        let changedItems = items.map(v=>{
            if(v.id==cid) {
                return {...v, title:e.target.value}
            } else {
                return v
            }
        })
        setitems(changedItems)
        console.log(e.target.value, 666,changedItems)
    }
    function setSelectid(cid) {
        console.log(666, {cid})
        setselectedId(cid);
    }
    return(
        <div className="perWrapper">
            <p>What's your travel place?</p>
            <ul>
                {items.map(it=>
                    <li key={it.id}>
                        <input type="text" value={it.title} onChange={e=>handleChange(it.id, e)}/>
                        <button onClick={()=>setSelectid(it.id)}>choose</button>
                    </li>
                )}
            </ul>
            <p>you picked: <span style={{textDecoration:'underline',color:'grey',fontSize:20}}>{selectedItem.title}</span></p>
        </div>
    )
}
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
                        <input type="text" value={it.title} onChange={e=>handleChange(it.id, e)} className="border p-1 m-2 rounded shadow" />
                        <button onClick={()=>setSelectid(it.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">choose</button>
                    </li>
                )}
            </ul>
            <p>you picked: <span style={{textDecoration:'underline',color:'grey',fontSize:20}}>{selectedItem.title}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-200 p-4">项目1</div>
                <div className="bg-gray-200 p-4">项目2</div>
                <div className="bg-gray-200 p-4">项目3</div>
                <div className="bg-gray-200 p-4">项目4</div>
                <div className="bg-gray-200 p-4">项目5</div>
                <div className="bg-gray-200 p-4">项目6</div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">点击我</button>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 p-4 bg-blue-100">侧边栏</div>
                <div className="w-full sm:w-2/3 p-4 bg-green-100">主内容</div>
            </div>
            <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Click Me
              </button>
            </div>
          </div>
        </div>
      </main>
        </div>
    )
}
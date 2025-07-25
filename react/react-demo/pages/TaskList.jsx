import { useState } from "react"
import BaseTable from "./BaseTable"
import BaseModal from "./BaseModal";

const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

export default function TaskList() {
    const columnlist = [
        {key: 'id', title: 'ID'},
        {key: 'task', title: '任务'},
        {key: 'status', title: '状态'},
        {key: 'datetime', title: '时间'},
    ]
    const [taskList, settasklist] = useState([
        {id: 'Nl18ppTptqMbDup4', task: 'eat', status: 'done',  datetime:'2025-07-08'},
        {id: 'Jg4QF4an1mtYIprv', task: 'braekfast', status: 'done',  datetime:'2025-08-01'},
        {id: 'BtH8TqxSktPpW1Sl', task: 'sleep', status: 'not',  datetime:'2025-08-10'},
    ])
    const [showModal, setshowModal] = useState(false);
    const [itemid, setitemid] = useState('');
    const [itemname, setitemname] = useState('');
    const [itemstatus, setitemstatus] = useState('');
    const [itemdate, setitemdate] = useState('');

    const handleAddClick = ()=>{
        setitemid(generateRandomString(16));
        setitemname('');
        setitemstatus('');
        setitemdate('');
        setshowModal(true);
    }
    const handleConfirmClick = ()=>{
        if(!itemname) {
            alert('请输入必填项!')
            return
        }
        const cidx = taskList.findIndex(c=>c.id===itemid);      //从之前的任务列表中寻找有无ID，没有旧判断是新增的，否则为更改模式；
        if(cidx=== -1) {
            settasklist(tlist => tlist.concat({id: itemid, task: itemname, status: itemstatus, datetime: itemdate}))
        } else {
            settasklist(prevList =>
                prevList.map(task =>
                    task.id === itemid ? {id: itemid, task: itemname, status: itemstatus, datetime: itemdate} : task
                )
            )
        }
        setshowModal(false)
    }
    const handleRowClick = (row)=>{
        setitemid(row.id);
        setitemname(row.task);
        setitemstatus(row.status);
        setitemdate(row.datetime);
        setshowModal(true);
    }
    const handleSelectChange = (ids)=>{
        console.log( 'idlist: ', ids )
    }
    
    return (
        <div className="task_list_wrapper">
            <p>
                <span>任务列表，双击表格行可以编辑,点击表头可排序</span>
                <button onClick={handleAddClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">addTask</button>
            </p>
            <BaseModal visible={showModal} title="任务编辑" onClose={() => setshowModal(false)}>
                <div className="form_wrapper border p-6">
                    <p className="text-right">
                        <label htmlFor="cid">TaskID: 
                            <input id="cid" type="text" value={itemid} disabled className='border p-2 m-2 rounded shadow-2xs w-[300px]'  />
                        </label>
                    </p>
                    <p className="text-right">
                        <label htmlFor="cname">TaskName(required): 
                            <input id="cname" type="text" value={itemname} onChange={e=> setitemname(e.target.value)} className='border p-2 m-2 rounded shadow-2xs w-[300px]'  />
                        </label>
                    </p>
                    <p className="text-right">
                        <label htmlFor="cemail">TaskStatus: 
                            <input id="cemail" type="text" value={itemstatus} onChange={e=> setitemstatus(e.target.value)} className='border p-2 m-2 rounded shadow-2xs w-[300px]'  />
                        </label>
                    </p>
                    <p className="text-right">
                        <label htmlFor="cage">TaskTime: 
                            <input id="cage" type="date" value={itemdate} onChange={e=> setitemdate(e.target.value)} className='border p-2 m-2 rounded shadow-2xs w-[300px]'  />
                        </label>
                    </p>
                    <p className="text-right">
                        <button onClick={handleConfirmClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">Confirm</button>
                    </p>
                </div>
            </BaseModal>
            <BaseTable columns={columnlist} dataSource={taskList} onRowClick={handleRowClick} onSelectChange={handleSelectChange}></BaseTable>
        </div>
    )
}
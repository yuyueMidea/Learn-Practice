import { useState } from "react"
import BaseList from "./BaseList";
import { useDispatch, useSelector } from "react-redux";
import { addToUserList, deleteUserByID, updateUser } from "../store/counterSlice";
import { Button, Input, message, Modal, notification, Space } from "antd";

// 生成随机ID的方法，入参是位数，比如16位ID
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

export default function UserList() {
    const [uid, setuid] = useState('')
    const [uname, setuname] = useState('');
    const [uage, setuage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const userlist = useSelector(state => state.counter.userlist);
    const handleAdd = ()=>{
        setuid('');
        setIsModalOpen(true);
    }
    const handleUpdate = (item)=>{
        setuid(item.id);
        setuname(item.name);
        setuage(item.age);
        setIsModalOpen(true)
    }
    
    const handleDelete = (item)=>{
        if (window.confirm('确定要删除这个用户吗？' + item.id)) {
            dispatch(deleteUserByID(item.id))
            setIsModalOpen(false)
            notification.open({ message: '提示', description: 'deleteone' });
        }
    }
    const handleOk = ()=>{
        if(uname==='') return message.warning('请输入用户名!'); 
        if(!uid) {
            dispatch(addToUserList({id: generateRandomString(16), name: uname, age: uage}));
        } else {
            dispatch(updateUser({id: uid, name: uname, age: uage}))
        }
        setIsModalOpen(false)
    }
    
    return (
        <div className="user-list-wrapper">
            <h2>用户管理 <Button type="primary" onClick={handleAdd}>新增</Button></h2>
            <Modal title="用户信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={300}>
                <Space direction="vertical">
                    <Input value={uid} disabled addonBefore='ID'/>
                    <Input value={uname} onChange={e=>setuname(e.target.value)} id="cname" addonBefore='Name'/>
                    <Input value={uage} onChange={e=>setuage(e.target.value)} addonBefore='Age'/>
                </Space>
            </Modal>
            <BaseList items={userlist} renderItem={item =>(
                <div>
                    <div>{item.id}---{item.name}---{item.age}</div>
                    <div className="btn-list">
                        <Button type="primary" size='small' onClick={()=>handleUpdate(item)}>更新</Button>
                        <Button type="dashed" size='small' danger onClick={()=>handleDelete(item)}>删除</Button>
                    </div>
                </div>
            )}/>

        </div>
    )
}
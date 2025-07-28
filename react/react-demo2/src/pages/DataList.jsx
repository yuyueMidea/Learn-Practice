import { Button, Input, message, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

// const generateRandomString = (length) => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return Array.from(crypto.getRandomValues(new Uint8Array(length)))
//     .map(byte => chars[byte % chars.length])
//     .join('');
// }

export default function DataList() {
  const [users, setUsers] = useState([]);
  const API_URL = 'http://localhost:3001/api/users';

  // 获取所有用户
  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
    const handleAddOne = ()=>{
        setuid('');
        setIsModalOpen(true);
    }
    const handleEdit = (item) => {
        setuid(item.id);
        setuname(item.name);
        setuage(item.age);
        setIsModalOpen(true)
    };

    const handleDelete = async (id) => {
        if (window.confirm('确定要删除这个用户吗？' + id)) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchUsers();
        }
    };
    const [uid, setuid] = useState('')
    const [uname, setuname] = useState('');
    const [uage, setuage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const handleOk = async()=>{
        if(uname==='') return message.warning('请输入!'); 
        if(!uid) {
            // 添加用户
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: uname, age: uage}),
            });
        } else {
            // 更新用户
            await fetch(`${API_URL}/${uid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: uname, age: uage}),
            });
        }
        setIsModalOpen(false);
        fetchUsers();
    }

    const dataHeaders = [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '年龄', dataIndex: 'age', key: 'age'},
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space>
                <Button type="link" size='small' onClick={() => handleEdit(record)}>编辑</Button>
                <Button type="link" size='small' danger onClick={() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

  return (
    <div className="data-list-wrapper">
        <h2>数据管理 <Button type="primary" onClick={handleAddOne}>新增</Button></h2>
        <Modal title="用户信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={300}>
            <Space direction="vertical">
                <Input value={uid} disabled addonBefore='ID'/>
                <Input value={uname} onChange={e=>setuname(e.target.value)} addonBefore='Name'/>
                <Input value={uage} onChange={e=>setuage(e.target.value)} addonBefore='Age'/>
            </Space>
        </Modal>
        <Table columns={dataHeaders} dataSource={users} rowKey="id"  size='small'/>
    </div>
  );
}

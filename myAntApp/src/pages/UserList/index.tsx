import React, { useEffect, useState } from "react"
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table } from "antd";
import { render } from "@testing-library/react";
import { useUserStore } from "@/stores/useUserStore";

const { Option } = Select;

interface User {
    id: string
    username: string
    role: string
}

function generateRandomString(length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

const roleMap:Object = {
    admin: '管理员',
    user: '普通用户',
    guest: '访客'
}
const roleMapList = Object.entries(roleMap).map(([key, value]) => ({
    value: key,
    label: value
}));
const value2label = (value: string) =>{
    return roleMap[value];
}
const UserModal = ({children, record,  onOkevent })=>{
    const [vflag, setVisible] = useState(false);
    const [uname, setUname] = useState('')
    const [urole, setUrole] = useState('')
    const handleOk = ()=>{
        if (record) {
            onOkevent({id: record.id, username: uname, role: urole})
        }
        else {
            onOkevent({id: generateRandomString(16), username: uname, role: urole})
        }
        setVisible(false)
    }
    useEffect(()=>{
        if(record) {
            console.log('rrr: ', record)
            setUname(record.username)
            setUrole(record.role)
        } else {
            console.log('newadddd')
        }
    }, [true])
    return (
        <>
            <div onClick={() => setVisible(true)}>{children}</div>
            <Modal title={record ? '编辑用户' : '新建用户'} open={vflag}
                onOk={handleOk}
                onCancel={() => setVisible(false)}>
                    <div className="form-line">
                        <label htmlFor="uname">姓名</label>
                        <Input id="uname" value={uname} onChange={(e) => setUname(e.target.value)}/>
                    </div>
                    <div className="form-line">
                        <label htmlFor="urole">角色</label>
                        <Select value={urole} options={roleMapList} onChange={(e) => setUrole(e)}></Select>
                        {/* <Input id="urole" value={urole} onChange={(e) => setUrole(e.target.value)}/> */}
                    </div>
            </Modal>
        </>
    )
}
const UserList: React.FC = ()=>{
    const { users, addUser, updateUser, deleteUser, getUsersByRole } = useUserStore();
    console.log('userrr: ', users)
    const [filterRole, setFilterrole] = useState('');
    const handleSearch = () =>{
        if (filterRole) {
            const res = getUsersByRole(filterRole);
            setDataList(res)
        } else {
            setDataList(users)
        }
    }
    const handleClearFilter = ()=>{
        setDataList(users)
    }
    const [dataList, setDataList] = useState<User[]>([])
    useEffect(()=>{
        setDataList(users)
    }, [])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '角色',
          dataIndex: 'role',
          key: 'role',
          render: (value: string) => value2label(value) || 'notKnown'
        },
        {
            title: '操作',
            key: 'action',
            render: (_:any, record:User) => (
              <Space size="middle">
                <UserModal record={record} onOkevent={ handleUpdate }>
                    <Button >编辑</Button>
                </UserModal>
                <Popconfirm
                  title="确定删除吗?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <a>删除</a>
                </Popconfirm>
              </Space>
            ),
          },
    ]
    const handleAdd = (newItem: User)=>{
        // setDataList([...dataList, newItem])
        addUser(newItem);
    }
    const handleUpdate = (upItem: User)=>{
        /* let updateList = dataList.map(v=>{
            if(v.id === upItem.id) {
                return upItem
            } else {
                return v
            }
        })
        console.log('handleUpdateNew: ', upItem, updateList)
        setDataList(updateList) */
        updateUser(upItem);
    }
    const handleDelete = (cid: string)=>{
        console.log('handleDelete: ', cid)
        // setDataList(dataList.filter(v=>v.id!==cid))
        deleteUser(cid);
    }
    
    return (
        <>
            <div className="headr_line">
                <UserModal record={''} onOkevent={handleAdd} >
                    <Button type="primary" >新建用户</Button>
                </UserModal>
                <div className="search_wrapper">
                    <span className="role_label">role</span>
                    <Select value={filterRole} options={roleMapList} onChange={(e) => setFilterrole(e)} allowClear onClear={handleClearFilter}></Select>
                    <Button type="primary" onClick={handleSearch}>查询</Button>
                </div>
            </div>
            <Table 
                columns={columns}
                rowKey="id"
                dataSource={dataList}/>
        </>
    )
}

export default UserList;
'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Modal, ConfirmModal } from '@/components/ui/modal'
import { Form, FormField } from '@/components/ui/form'
import { User } from '@/types'
import { useUserStore } from '../stores/userStore'
const API_BASE = 'http://localhost:3000/api';

export default function UsersPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState({id:'', name: '', age:'', email:''})
    const [loading, setLoading] = useState(false)
    const [ulist, setulist] = useState([])
    useEffect(()=>{
      handlefetchUser()
    }, [])

  const columns = [
    { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
    { key: 'age', title: '年龄', dataIndex: 'age' },
    { key: 'email', title: '邮箱', dataIndex: 'email' },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      key: 'updated_at',
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
    {
      key: 'actions',
      title: '操作',
      dataIndex: 'actions',
      render: (_: any, record:any) => (
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedUser(record)
              setShowEditModal(true)
            }}
          >
            编辑
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => deleteUser(record.id)}
          >
            删除
          </Button>
        </div>
      )
    }
  ]

  const handlefetchUser = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/users`)
      const data = await res.json()
      setulist(data)
      console.log("resss: ", data)
    } finally {
      setLoading(false)
    }
  }
  const handleAddUser = async (data: any) => {
    setLoading(true)
    try {
      let body = {name: uname, email: uemail, age: uage}
      const res = await fetch(`${API_BASE}/users`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(await res.text());
      console.log('add_res: ',await res.json() )
      setShowAddModal(false)
      handlefetchUser()
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async (data: any) => {
    if (!selectedUser) return
    setLoading(true)
    try {
      let uid = selectedUser.id
      let body = {name: selectedUser.name, email: selectedUser.email, age: selectedUser.age}
      const res = await fetch(`${API_BASE}/users/${uid}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(await res.text());
      setShowEditModal(false)
      setSelectedUser({id:'',name: '', age:'', email:''})
      handlefetchUser()
    } finally {
      setLoading(false)
    }
  }
  const deleteUser = async(uid: string)=>{
    try{
      setLoading(true)
      console.warn("delete_uid: ", uid )
      const res = await fetch(`${API_BASE}/users/${uid}`, { method:'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      console.log('delete_res: ',await res.json() )
      handlefetchUser()
    } finally {
      setLoading(false)
    }
  }

  const [uname, setuname] = useState('');
  const [uemail, setuemail] = useState('');
  const [uage, setuage] = useState('');
  const addNewClick = ()=>{
    setShowAddModal(true)
    setuname('');
    setuemail('');
    setuage('');
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <Button onClick={addNewClick}>
            添加用户
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table
            columns={columns}
            data={ulist}
            pagination={{
              current: 1,
              pageSize: 10,
              total: ulist.length,
              onChange: (page, pageSize) => console.log('分页变化:', page, pageSize)
            }}
          />
        </div>

        {/* 添加用户弹框 */}
        <Modal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="添加用户"
        >
          <Form onSubmit={handleAddUser} loading={loading}>
            <FormField
              label="用户名"
              name="name"
              required
              placeholder="请输入用户名"
              value={uname} onChange={e=> setuname(e)}
            />
            <FormField
                label="年龄"
                name="age"
                required
                placeholder="请输入年龄"
                value={uage} onChange={e=>setuage(e)}
              />
            <FormField
              label="邮箱"
              name="email"
              type="email"
              required
              placeholder="请输入邮箱"
              value={uemail} onChange={e=> setuemail(e)}
            />
          </Form>
        </Modal>

        {/* 编辑用户弹框 */}
        <Modal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser({id:'',name: '', age:'', email:''})
          }}
          title="编辑用户"
        >
          {selectedUser && (
            <Form onSubmit={handleEditUser} loading={loading}>
              <FormField
                label="用户名"
                name="name"
                required
                placeholder="请输入用户名"
                value={selectedUser.name} onChange={e=>setSelectedUser({...selectedUser, name: e})}
              />
              <FormField
                label="年龄"
                name="age"
                required
                placeholder="请输入年龄"
                value={selectedUser.age} onChange={e=>setSelectedUser({...selectedUser, age: e})}
              />
              <FormField
                label="邮箱"
                name="email"
                type="email"
                required
                placeholder="请输入邮箱"
                value={selectedUser.email} onChange={e=>setSelectedUser({...selectedUser, email: e})}
              />
            </Form>
          )}
        </Modal>
      </div>
    </MainLayout>
  )
}
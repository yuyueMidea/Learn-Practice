'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Modal, ConfirmModal } from '@/components/ui/modal'
import { Form, FormField } from '@/components/ui/form'
import { User } from '@/types'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'admin',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: 'user',
      createdAt: new Date('2024-01-02')
    }
  ])
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const columns = [
    { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
    { key: 'email', title: '邮箱', dataIndex: 'email' },
    {
      key: 'role',
      title: '角色',
      dataIndex: 'role',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'admin' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value === 'admin' ? '管理员' : '普通用户'}
        </span>
      )
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (value: Date) => value.toLocaleDateString('zh-CN')
    },
    {
      key: 'actions',
      title: '操作',
      dataIndex: 'actions',
      render: (_: any, record: User) => (
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
            permission={{ resource: 'users', action: 'delete' }}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedUser(record)
              setShowDeleteModal(true)
            }}
          >
            删除
          </Button>
        </div>
      )
    }
  ]

  const handleAddUser = async (data: any) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Date.now().toString(),
        name: uname,
        email: uemail,
        role: urole,
        createdAt: new Date()
      }
      
      setUsers(prev => [...prev, newUser])
      setShowAddModal(false)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async (data: any) => {
    if (!selectedUser) return
    
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...selectedUser }
          : user
      ))
      
      setShowEditModal(false)
      setSelectedUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id))
      setShowDeleteModal(false)
      setSelectedUser(null)
    } finally {
      setLoading(false)
    }
  }

  const [uname, setuname] = useState('');
  const [uemail, setuemail] = useState('');
  const [urole, seturole] = useState('');
  const addNewClick = ()=>{
    setShowAddModal(true)
    setuname('');
    setuemail('');
    seturole('');
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <Button
            onClick={addNewClick}
            permission={{ resource: 'users', action: 'create' }}
          >
            添加用户
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table
            columns={columns}
            data={users}
            pagination={{
              current: 1,
              pageSize: 10,
              total: users.length,
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
              label="邮箱"
              name="email"
              type="email"
              required
              placeholder="请输入邮箱"
              value={uemail} onChange={e=> setuemail(e)}
            />
            <FormField
              label="角色"
              name="role"
              type="select"
              required
              options={[
                { value: 'admin', label: '管理员' },
                { value: 'user', label: '普通用户' }
              ]}
              value={urole} onChange={e=> seturole(e)}
            />
          </Form>
        </Modal>

        {/* 编辑用户弹框 */}
        <Modal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
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
                label="邮箱"
                name="email"
                type="email"
                required
                placeholder="请输入邮箱"
                value={selectedUser.email} onChange={e=>setSelectedUser({...selectedUser, email: e})}
              />
              <FormField
                label="角色"
                name="role"
                type="select"
                required
                value={selectedUser.role} onChange={e=>setSelectedUser({...selectedUser, role: e})}
                options={[
                  { value: 'admin', label: '管理员' },
                  { value: 'user', label: '普通用户' }
                ]}
              />
            </Form>
          )}
        </Modal>

        {/* 删除确认弹框 */}
        <ConfirmModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedUser(null)
          }}
          onConfirm={handleDeleteUser}
          title="确认删除"
          message={`确定要删除用户 "${selectedUser?.name}" 吗？此操作不可恢复。`}
          loading={loading}
        />
      </div>
    </MainLayout>
  )
}
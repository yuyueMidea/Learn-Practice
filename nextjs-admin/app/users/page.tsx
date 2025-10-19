'use client'

import { useEffect, useMemo, useState } from 'react'
import MainLayout from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Modal, ConfirmModal } from '@/components/ui/modal'
import { Form, FormField } from '@/components/ui/form'

type User = {
  id: string
  name: string
  age: number | null
  email: string
  created_at: string
  updated_at: string
}

const API_BASE = '/api' // 使用 Next 重写代理，避免 CORS / 环境切换

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const msg = (data && (data.detail || data.message || data.error)) || res.statusText
    throw new Error(msg)
  }
  return data as T
}

async function listUsers(q: string, limit: number, offset: number): Promise<User[]> {
  const usp = new URLSearchParams({ limit: String(limit), offset: String(offset) })
  if (q.trim()) usp.set('q', q.trim())
  return request<User[]>(`/users?${usp.toString()}`)
}

async function createUser(body: { name: string; email: string; age: number | null }): Promise<User> {
  return request<User>(`/users`, { method: 'POST', body: JSON.stringify(body) })
}

async function updateUserPut(id: string, body: { name: string; email: string; age: number | null }): Promise<User> {
  return request<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) })
}

async function deleteUserApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
}

export default function UsersPage() {
  // ---- table & query state ----
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<User[]>([])
  const [q, setQ] = useState('')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [hasMore, setHasMore] = useState(false) // 通过“多取一条”来判断是否有下一页

  // ---- modals & form state ----
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState<string | null>(null)

  // add form fields
  const [uname, setUname] = useState('')
  const [uage, setUage] = useState('') // keep as string in input; convert on submit
  const [uemail, setUemail] = useState('')

  // edit form fields
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const offset = useMemo(() => (current - 1) * pageSize, [current, pageSize])

  async function reload() {
    setLoading(true)
    try {
      // 为了判断是否还有下一页，多取一条
      const rows = await listUsers(q, pageSize + 1, offset)
      setHasMore(rows.length > pageSize)
      setList(rows.slice(0, pageSize))
    } catch (e: any) {
      console.error(e)
      alert(`加载失败：${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, current, pageSize])

  // ---- columns ----
  const columns = [
    { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
    { key: 'age', title: '年龄', dataIndex: 'age' },
    { key: 'email', title: '邮箱', dataIndex: 'email' },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'created_at',
      render: (_: any, r: User) => new Date(r.created_at).toLocaleString(),
    },
    {
      key: 'updated_at',
      title: '更新时间',
      dataIndex: 'updated_at',
      render: (_: any, r: User) => new Date(r.updated_at).toLocaleString(),
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
            onClick={(e) => {
              e.stopPropagation()
              setToDeleteId(record.id)
              setConfirmOpen(true)
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]

  // ---- handlers ----
  const handleAddUser = async () => {
    setLoading(true)
    try {
      const age = uage.trim() === '' ? null : Number(uage)
      await createUser({ name: uname.trim(), email: uemail.trim(), age })
      setShowAddModal(false)
      setUname(''); setUemail(''); setUage('')
      // 新增后回到第1页，方便看到最新数据（后端按 created_at desc）
      setCurrent(1)
      await reload()
    } catch (e: any) {
      alert(`保存失败：${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser) return
    setLoading(true)
    try {
      const body = {
        name: selectedUser.name.trim(),
        email: selectedUser.email.trim(),
        age: selectedUser.age === null || selectedUser.age === undefined ? null : Number(selectedUser.age),
      }
      await updateUserPut(selectedUser.id, body)
      setShowEditModal(false)
      setSelectedUser(null)
      await reload()
    } catch (e: any) {
      alert(`保存失败：${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!toDeleteId) return
    setLoading(true)
    try {
      await deleteUserApi(toDeleteId)
      setConfirmOpen(false)
      setToDeleteId(null)
      // 若当前页只剩 1 条被删了，优先回上一页
      if (list.length === 1 && current > 1) {
        setCurrent((c) => c - 1)
      } else {
        await reload()
      }
    } catch (e: any) {
      alert(`删除失败：${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <div className="flex gap-2">
            <input
              className="h-9 px-3 border rounded-md"
              placeholder="按 name/email 搜索… 回车"
              defaultValue={q}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const v = (e.target as HTMLInputElement).value || ''
                  setCurrent(1)
                  setQ(v)
                }
              }}
            />
            <Button onClick={() => { setCurrent(1); reload() }} variant="outline">刷新</Button>
            <Button onClick={() => { setShowAddModal(true); setUname(''); setUemail(''); setUage('') }}>
              添加用户
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table
            columns={columns}
            data={list}
            loading={loading}
            pagination={{
              current,
              pageSize,
              total: hasMore ? current * pageSize + 1 : (current - 1) * pageSize + list.length, // 近似总数
              onChange: (page: number, size: number) => {
                setPageSize(size)
                setCurrent(page)
              },
            }}
          />
        </div>

        {/* 添加用户 */}
        <Modal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="添加用户"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)} disabled={loading}>取消</Button>
              <Button onClick={handleAddUser} disabled={loading}>保存</Button>
            </div>
          }
        >
          <Form onSubmit={handleAddUser} loading={loading}>
            <FormField label="用户名" name="name" required placeholder="请输入用户名" value={uname} onChange={setUname} />
            <FormField label="年龄" name="age" placeholder="可留空" value={uage} onChange={setUage} />
            <FormField label="邮箱" name="email" type="email" required placeholder="请输入邮箱" value={uemail} onChange={setUemail} />
          </Form>
        </Modal>

        {/* 编辑用户 */}
        <Modal
          open={showEditModal}
          onClose={() => { setShowEditModal(false); setSelectedUser(null) }}
          title="编辑用户"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowEditModal(false); setSelectedUser(null) }} disabled={loading}>取消</Button>
              <Button onClick={handleEditUser} disabled={loading || !selectedUser}>保存</Button>
            </div>
          }
        >
          {selectedUser && (
            <Form onSubmit={handleEditUser} loading={loading}>
              <FormField
                label="用户名"
                name="name"
                required
                placeholder="请输入用户名"
                value={selectedUser.name}
                onChange={(v: string) => setSelectedUser({ ...selectedUser, name: v })}
              />
              <FormField
                label="年龄"
                name="age"
                placeholder="可留空"
                value={selectedUser.age ?? '' as any}
                onChange={(v: string) =>
                  setSelectedUser({ ...selectedUser, age: v.trim() === '' ? null : Number(v) as any })
                }
              />
              <FormField
                label="邮箱"
                name="email"
                type="email"
                required
                placeholder="请输入邮箱"
                value={selectedUser.email}
                onChange={(v: string) => setSelectedUser({ ...selectedUser, email: v })}
              />
            </Form>
          )}
        </Modal>

        {/* 确认删除 */}
        <ConfirmModal
          open={confirmOpen}
          title="确认删除"
          content="确定要删除该用户吗？此操作不可恢复。"
          onCancel={() => { setConfirmOpen(false); setToDeleteId(null) }}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </div>
    </MainLayout>
  )
}

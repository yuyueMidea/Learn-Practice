import { User } from "lucide-react"
import useUserStore from "../store/userStore";
import { useState } from "react";
import UserForm from "./UserForm";

export default function UsersPage() {

  const {users, addUser, updateUser,  deleteUser} = useUserStore();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };
  const handleDeleteUser = (userId) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      deleteUser(userId);
    }
  };
  const handleFormSubmit = (formData) => {
    if (editingUser) {
      updateUser( formData);
    } else {
      addUser(formData);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">用户管理</h1>
        <button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">添加用户</button>
      </div>
      {/* 用户表单模态框 */}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  用户信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  角色
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((uitem) => (
                <tr key={uitem.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <User size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{uitem.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{uitem.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{uitem.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      uitem.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {uitem.status === 'active' ? '活跃' : '待激活'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditUser(uitem)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 mr-3">编辑</button>
                    <button onClick={() => handleDeleteUser(uitem.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
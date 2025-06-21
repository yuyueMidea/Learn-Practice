import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel 
} from '@tanstack/react-table';
import { useUserStore } from '../stores/userDataStore';
import './pageStyle.css'
// 生成随机ID的方法，入参是位数，比如16位ID
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}


// 用户表单组件
const UserForm = ({ user, onSubmit, onCancel }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: user || {
            id: '',
            name: '',
            email: '',
            age: '',
        },
    });
    // 当 userData 变化时重置表单
    useEffect(() => {
        reset(user);
    }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-4 border rounded">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1">ID</label>
          <input
            {...register('id', { required: false })}
            className="w-full p-2 border rounded bg-gray-300" disabled
          />
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register('email', { required: false })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register('age', { required: true, min: 18 })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {user ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// 主组件
const UserTable = () => {
    // 添加过滤输入框
    const [globalFilter, setGlobalFilter] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    // 获取用户数据
    const { users, addUser, updateUser, deleteUser, getAllUsers, getUsersByName } = useUserStore();

    const handleEditingUser = (cuser)=>{
        console.log('ciddd: ', cuser)
        setEditingUser(cuser)
        setIsCreating(true);
    }
    const handleDeleteUser = (cid)=>{
        console.log('deleteiddd: ', cid)
        deleteUser(cid);
    }
  // 处理表单提交
    const handleSubmit = (data) => {
        if (editingUser) {
            console.log('upppp_ ', data);
            updateUser(data)
        } else {
            !data.id && (data.id = generateRandomString(16));
            console.log('add_ ', data);
            addUser(data);
        }
        // 添加一条数据后，关闭form，清空表格里面的缓存数据
        setEditingUser(null);
        setIsCreating(false);
    };

  // 表格列定义
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        enableSorting: true,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditingUser(row.original)}
              className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteUser(row.original.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // 初始化表格
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // 在 useReactTable 配置中添加
    getSortedRowModel: getSortedRowModel(),
    // 更新 table 配置
    state: {
        globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsCreating(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add User
        </button>
      </div>

        
    <p>
        <span>过滤输入框</span>
        <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="m-4 p-2 border rounded"
        />
    </p>
    
      <div className={`form_box ${(isCreating || editingUser) ? 'show' : 'hide'}`}>
        <UserForm
        user={editingUser}
        onSubmit={handleSubmit}
        onCancel={() => {
            setEditingUser(null);
            setIsCreating(false);
        }}
        />
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-1 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-cyan-300 hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
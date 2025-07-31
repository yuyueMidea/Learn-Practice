import { create } from "zustand";

const useUserStore = create((set,get) => ({
    userProfile: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '+86 138 0013 8000',
        location: '北京市',
        bio: '产品经理，专注于用户体验设计',
        joinDate: '2023年1月'
    },
    setUserProfile: (uProfile) => {
        set({
            userProfile: uProfile
        })
    },
    // 用户信息列表
    users: [
        {id: '5G4PY3Vq8GIriyNP', name :'zhangsan', email: 'zhangsan@163.com', role: 'admin', status: 'inactive' },
        {id: 'Qgn4RBDtdKYPDgS0', name :'lisi', email: 'lisi@163.com', role: 'guest', status: 'active' },
        {id: 'oWEIgKb4BkfQacBC', name :'wangwu', email: 'wangwu@163.com', role: 'user', status: 'inactive' },
    ],
    // 添加用户
    addUser: (userData) => {
        set(state => ({
            users: [...state.users, userData]
        }))
    },
    // 更新用户
    updateUser: (userData) => {
        set(state => ({
            users: state.users.map(user => 
                user.id === userData.id ? userData : user
            )
        }))
    },
    // 删除用户
    deleteUser: (id) => {
        set(state => ({
            users: state.users.filter( c=> c.id !== id)
        }))
    }
}))

export default useUserStore;
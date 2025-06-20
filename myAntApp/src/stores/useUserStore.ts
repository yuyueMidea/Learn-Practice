import { create } from "zustand";

interface User {
    id: string
    username: string
    role: string
}

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (id: string) => void;
    getUsersByRole: (role: User['role']) => User[];
}
export const useUserStore = create<UserStore>((set, get) =>({
    users: [
        {id: 'Kho5GIoLa3irqGRt', username: '张三', role: 'admin'},
        {id: 'BvwQzKClL50gI2sA', username: '李四', role: 'user'},
        {id: 'BvwQzKClL123I2sA', username: '王五', role: 'guest'},
    ],
      // 添加用户
    addUser: (newUser) =>{
        set(state => ({ users: [...state.users, newUser] }) )
    },
    // 更新用户
    updateUser: (upUser) =>{
        set(state => ({
            users: state.users.map(user => user.id=== upUser.id ? upUser : user)
        }) )
    },
    // 删除用户
    deleteUser: (cid) =>{
        set(state => ({ users: state.users.filter(v=>v.id!==cid) }) )
    },
    // 根据角色筛选用户
    getUsersByRole: (role) => {
        return get().users.filter(user => user.role === role);
    }
}))
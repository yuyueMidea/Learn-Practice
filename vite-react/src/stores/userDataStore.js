import { create } from "zustand";

export const useUserStore = create((set, get) => ({
    users: [
        {id: 'Kho5GIoLa3irqGRt', name: '张三', age:33, email: 'admin@163.com'},
        {id: 'BvwQzKClL50gI2sA', name: '李四', age:24, email: 'user@163.com'},
        {id: 'BvwQzKClL123I2sA', name: '王五', age:42, email: 'guest@163.com'},
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
    getAllUsers: () =>{
        return get().users;
    },
    // 根据角色筛选用户
    getUsersByName: (cname) => {
        return get().users.filter(user => user.name === cname);
    }
}))
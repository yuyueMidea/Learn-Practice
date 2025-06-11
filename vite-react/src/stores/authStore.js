import { create } from "zustand";

const useAuthStore = create((set) =>({
    token: null,
    user: null,
    isAuthenticated: false,
    // 模拟登录API的方法
    mockLoginApi: async(username, password) =>{
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                if (username && password) {
                    resolve({
                        username: username,
                        email: `${username}@163.com`,
                        token: 'mock-jwt-token-123456'
                    })
                    set({ user: username, token: 'mock-jwt-token-123456', isAuthenticated: true });
                    // 可选：将token存储到localStorage
                    // localStorage.setItem('authToken', response.token);
                } else {
                    reject(new Error('用户名或密码错误!'))
                }
            }, 2000);
        })
    },
    login: (token, user) => set({
        token,
        user,
        isAuthenticated: true
    }),
    logOut: () => set({
        token: null,
        user: null,
        isAuthenticated: false
    }),
}))

export default useAuthStore;
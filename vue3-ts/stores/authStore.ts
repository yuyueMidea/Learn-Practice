import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useAppStore } from "./app";
interface User {
    username: string
    email: string
    token: string
}


export const useAuthStore = defineStore('auth', ()=>{
    const pwdStore = useAppStore();
    // 状态
    const user: Ref<User | null> = ref(null)
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);
    // 计算属性
    const isAuthenticated = computed(() => !!user.value);
    const currentUser = computed(() => user.value);

    // 登录方法
    async function login(username: string, password: string) {
        try {
            loading.value = true;
            error.value = null;
            // 模拟API调用
            const response = await mockLoginApi(username, password);
            // 更新用户状态
            user.value = {
                username: response.username,
                email: response.email,
                token: response.token
            }
            // 可选：将token存储到localStorage
            localStorage.setItem('authToken', response.token);
            return response;
        } catch (error2) {
            error.value = error2 instanceof Error ? error2.message : '登录失败';
            throw error2
        } finally {
            loading.value = false;
        }
    }
    // 模拟登录API的方法
    async function mockLoginApi(username: string, password: string): Promise<{username: string, email:string, token:string}> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username ==='admin') {
                    resolve({
                        username: 'admin',
                        email: 'admin@example.com',
                        token: 'mock-jwt-token-123456'
                    })
                    if (password == '57632') {
                        pwdStore.setPassword(5)
                    } else if (password == '25768') {
                        pwdStore.setPassword(3)
                    } else {
                        pwdStore.setPassword(1)
                    }
                } else {
                    reject(new Error('用户名或密码错误!'))
                }
            }, 1000);
        })
    }
    // 登出方法
    function logout() {
        user.value = null;
        localStorage.removeItem('authToken');
    }
    return {
        user,
        loading,
        error,
        isAuthenticated,
        currentUser,
        login,
        logout
    }
})
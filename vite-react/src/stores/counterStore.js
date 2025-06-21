// stores/counterStore.js
import { create } from 'zustand';

const useCounterStore = create((set) => ({
    // 计数值
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    //   展开收缩的状态
    sidebarOpen: true,
    setSidebarOpen: () => set((state) => ({sidebarOpen: !state.sidebarOpen}) ),
    // 当前点击的菜单名称
    menuName: '',
    setMenuName: (cname) => set({
        menuName: cname
    }),
    // 新增menu列表
    menuNameList: [],
    setMenuList: (mlist) => set({
        menuNameList: mlist
    })
}));

export default useCounterStore;
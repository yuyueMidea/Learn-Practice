一、Vue 中 data 返回函数的原因：
- 避免组件复用时数据共享：
   - 当data返回对象时，所有组件示例会共享同一个数据对象；
   - 使用函数每次返回新对象，确保每个组件实例是独立的数据副本；
 
- 保持数据的独立性；
- 根组件例外：因为根组件不会复用；
- 这种设计模式确保了组件的可复用性和数据隔离性，是vue响应式系统的基础要求。

二、vue生命周期：
- beforeCreate：实例初始化后，数据观测/事件配置前；
- created：实例创建完成，数据观测/方法/计算属性已配置；
- beforeMount：模板编译/渲染函数调用前；
- mounted：实例挂载到DOM后调用；
- beforeUpdate：数据变化，DOM更新前；
- updated：数据变化，DOM更新后；
- beforeDestroy：实例销毁前；
- destroyed：实例销毁后；

三、Vue 组件间通信方式有哪些：
- 父子组件：Props 向下传递，$emit 事件向上传递，$parent/$children（不推荐）；
- 跨级组件：provide/inject，Vuex/Pinia；
- 任意组件：事件总线（EventBus），Vuex/Pinia 状态管理，全局事件总线（app.config.globalProperties）；

四、Vue 2 和 Vue 3 响应式原理的区别：
- vue2：使用 Object.defineProperty，只能拦截对象属性的 get/set，数组通过重写方法实现响应式；
- vue3：使用 Proxy 代理整个对象，支持动态添加属性，更好的性能（惰性监听），原生支持 Map/Set 等集合类型；

五、Vue Router， 路由守卫有哪些？执行顺序？
- 全局守卫：beforeEach（路由进入前），beforeResolve（导航确认前），afterEach（导航完成后），
- 路由独享守卫：beforeEnter；
- 组件内守卫：beforeRouteEnter，beforeRouteUpdate，beforeRouteLeave；
- 执行顺序：全局 beforeEach → 路由 beforeEnter → 组件 beforeRouteEnter → 全局 beforeResolve → 全局 afterEach。

六、Vue 项目性能优化手段：
- 代码层面：路由懒加载、组件异步加载、v-if 和 v-show 合理使用、长列表虚拟滚动。
- 构建优化：代码分割（SplitChunks）、Tree Shaking、压缩图片/资源。
- 运行时优化：合理使用keep-alive、防抖节流、避免 v-for 和 v-if 同时使用。


七、进阶问题：
- nextTick 原理及使用场景：原理：将回调推迟到下一个dom更新周期后执行；实现：优先使用Promise.then、降级到MutationObserver、再降级到setTimeout。使用场景：dom更新后获取最新的dom状态、解决异步更新导致视图不同步。
- Vue 的 diff 算法原理：
   - 同级比较：只比较同层级节点；
   - 双端比较：头头比较、 尾尾比较、头尾比较、尾头比较；
   - key的作用：复用相同key的节点；
   - 优化策略：静态节点跳过比较、同组件复用实例；








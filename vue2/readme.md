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

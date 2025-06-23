## Vue2 与 Vue3 的主要区别
- 一、性能提升、体积更小
- 二、Composition API：
   - Vue2：主要使用 Options API（data, methods, computed 等选项）
   - Vue3：引入了 Composition API（setup 函数 + 响应式函数）：更好的逻辑复用（替代 mixins）、更好的 TypeScript 支持、更灵活的组织代码方式
 
- 三、响应式系统
   - Vue2：使用 Object.defineProperty 实现响应式；无法检测对象属性的添加/删除；对数组的某些操作需要特殊处理；
   - Vue3：使用 ES6 的 Proxy 实现响应式：完全解决了 Vue2 的响应式限制；性能更好；支持 Map、Set 等新数据类型；
 
- 四、生命周期变化
```
| Vue2	       | Vue3 (Composition API)
|---------------|-------------
| beforeCreate	| 使用 setup()
| created	| 使用 setup()
| beforeMount	| onBeforeMount
| mounted	| onMounted
| beforeUpdate	| onBeforeUpdate
| updated	| onUpdated
| beforeDestroy	| onBeforeUnmount
| destroyed	| onUnmounted
| errorCaptured	| onErrorCapture
```

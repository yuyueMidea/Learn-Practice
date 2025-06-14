## vue生命周期介绍

vue2的生命周期是理解组件行为的关键，它描述了组件从创建到销毁的完整过程，以下是详细介绍：
```
beforeCreate
  │
  ├── created
  │     │
  │     ├── beforeMount
  │     │      │
  │     │      ├── mounted
  │     │      │     │
  │     │      │     ├── beforeUpdate
  │     │      │     │      │
  │     │      │     │      ├── updated
  │     │      │     │      │
  │     │      │     ├── beforeDestroy
  │     │      │     │      │
  │     │      │     │      ├── destroyed
  │     │      │     │
  │     │      ├── (当keep-alive缓存时)
  │     │      │     ├── activated
  │     │      │     │
  │     │      │     ├── deactivated
```

**二、生命周期钩子详解**

**初始化阶段：**
- beforeCreate，
   - 触发时机，在初始化实例之后，数据观测(data observer)和event/watcher 事件配置之前；
   - 特点：无法访问到data、computed、methods等， 适合添加loading效果
 
- created
   - 触发时机：实例创建完成后
   - 特点：可以访问data、computed、methods等，尚未挂载DOM，$el不可用； 适合发起异步请求；

**挂载阶段：**
- beforeMount，
   - 触发时机：挂载开始之前；
   - 特点：模板编译/渲染函数编译完成，尚未将模板渲染到页面；
 
- mounted，
   - 触发时机：实例挂载到DOM后
   - 可以访问dom元素，适合dom操作，第三方库初始化。
 
**更新阶段：**
- beforeUpdate：
   - 触发时机：数据变化后，虚拟dom重新渲染之前；
   - 特点：可以获取更新前的状态，适合在更新前访问现有的dom；
 
- updated：
   - 触发时机：虚拟dom重新渲染之后；
   - 特点：避免在此钩子中修改状态，可能导致无限循环；适合执行依赖新dom的操作；
 
**销毁阶段：**
- beforeDestroy：
   - 触发时机：实例销毁之前
   - 特点：示例仍然完全可用，适合清除定时器、取消订阅等操作；
 
- destroyed：
   - 触发时机：实例销毁后；
   - 特点：所有绑定和监听器都会被移除，子实例也已经被销毁。

**缓存组件相关**
- activated：
   - 触发时机：被 keep-alive 缓存的组件激活；
   - 特点：适合刷新数据
 
- deactivated：
   - 触发时机：被 keep-alive 缓存的组件停用时；
   - 特点：适合保存状态

**三、生命周期使用场景**
| 生命周期钩子	| 典型应用场景	| 注意事项
|---------------|---------------|----------
| beforeCreate	| 初始化非响应式变量	| 无法访问响应式数据
| created	| API请求、事件监听初始化	| 避免阻塞渲染的长时间操作
| beforeMount	| 服务端渲染中使用	| 浏览器端使用较少
| mounted	| DOM操作、第三方库初始化	| 确保子组件已挂载
| beforeUpdate	| 获取更新前的DOM状态	| 不要修改依赖数据
| updated	| 基于新DOM的操作	| 避免数据修改导致无限更新循环
| beforeDestroy	| 清理定时器、取消事件监听	| 重要的内存泄漏预防阶段
| activated	| 恢复缓存组件的数据状态	| 仅keep-alive组件有效
| deactivated	| 保存组件状态或暂停操作	| 仅keep-alive组件有效

**常见问题与最佳实践**
- 异步请求放在那个钩子？
   - 需要dom操作，放在mounted；
   - 仅需要数据，created；
   - keep-alive组件：activated
 
- 避免在updated中修改数据
```
// 错误示范 - 可能导致无限循环
updated() {
  if (this.count < 10) {
    this.count++; // 触发新的更新
  }
}
```






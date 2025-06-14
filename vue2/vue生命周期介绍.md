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
**- 初始化阶段：**
- beforeCreate，
   - 触发时机，在初始化实例之后，数据观测(data observer)和event/watcher 事件配置之前；
   - 特点：无法访问到data、computed、methods等， 适合添加loading效果
 
- created
   - 触发时机：实例创建完成后
   - 特点：可以访问data、computed、methods等，尚未挂载DOM，$el不可用； 适合发起异步请求；

**- 挂载阶段：**
- beforeMount，
   - 触发时机：挂载开始之前；
   - 特点：模板编译/渲染函数编译完成，尚未将模板渲染到页面；
 
- mounted，
   - 触发时机：实例挂载到DOM后
   - 可以访问dom元素，适合dom操作，第三方库初始化。
 
**- 更新阶段：**
- beforeUpdate：
   - 触发时机：数据变化后，虚拟dom重新渲染之前；
   - 特点：可以获取更新前的状态，适合在更新前访问现有的dom；
 
- updated：
   - 触发时机：虚拟dom重新渲染之后；
   - 特点：避免在此钩子中修改状态，可能导致无限循环；适合执行依赖新dom的操作；
 
**- 销毁阶段：**
- beforeDestroy：
   - 触发时机：实例销毁之前
   - 特点：示例仍然完全可用，适合清除定时器、取消订阅等操作；
 
- destroyed：
   - 触发时机：实例销毁后；
   - 特点：所有绑定和监听器都会被移除，子实例也已经被销毁。





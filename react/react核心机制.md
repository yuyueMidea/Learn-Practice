## react核心机制详解

1、虚拟dom：
- react在内存中维护一个轻量级的dom（虚拟dom）；
- 当状态变化时，react会创建一个新的虚拟dom树；
- 通过对比新旧的虚拟dom树（Diff算法），找出最小变更集；
- 最后把这些变更批量应用到真实dom上。
- 优势：减少直接操作真实dom，提升性能，简化开发者对dom操作的关注；

2、协调（Reconciliation）：
- react的 Diff算法基于两个假设：不同类型的元素会产生不同的树结构，开发者可以通过key属性标识哪些子元素；
- 比较过程：
   - 元素类型不同，react会完全拆除旧的 并构建新树；
   - dom元素类型相同，react会保留dom节点，仅更新改变的属性；
   - 组件元素类型相同：react更新组件实例的props 并调用生命周期方法；
 
3、Fiber架构：

react 16 引入的全新协调引擎，有以下特点：
- 增量更新：将渲染工作拆分为多个小任务；
- 任务优先级：区分任务优先级，高优先级（动画），低优先级（数据获取）；
- 任务可中断：浏览器主线程不会被长期占用；
- 错误边界：可以更好的处理组件树中的错误；

4、组件模型：
- 类组件 `class MyComponent extends React.Component {...}`；
- 函数组件与Hooks：
   - react 16.8 引入Hooks，允许函数组件拥有状态和生命周期；
     ```
     useEffect(() => {
       // 相当于 componentDidMount 和 componentDidUpdate
       return () => {
         // 清理函数，相当于 componentWillUnmount
       };
     }, [count]); // 依赖数组
     ```

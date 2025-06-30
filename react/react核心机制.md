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
- 常用Hooks：
   - useState：管理组件状态;
   - useEffect：处理副作用;
   - useContext：访问上下文;
   - useReducer：复杂状态逻辑;
   - useMemo & useCallback：性能优化;
 
5、状态管理：
- 组件内部状态：类组件：this.state 和 this.setState； 函数组件：useState 和 useReducer；
- 状态提升：通过props将状态提升到共同的祖先组件；
- 上下文API：
```
const MyContext = React.createContext(defaultValue);
// 提供者
<MyContext.Provider value={someValue}>
  <ChildComponent />
</MyContext.Provider>
// 消费者
const value = useContext(MyContext);
```
- 第三方状态库：如 Redux、MobX、Recoil 等；

6、生命周期：
- 类组件的生命周期：
   - 挂载阶段：`constructor()， static getDerivedStateFromProps()、 render()、 componentDidMount()`；
   - 更新阶段：`static getDerivedStateFromProps()、 shouldComponentUpdate()、 render()、 getSnapshotBeforeUpdate()、 componentDidUpdate()`；
   - 卸载阶段：`componentWillUnmount()`；
 
- 函数组件生命周期，通过 useEffect 实现：
```
useEffect(() => {
  // componentDidMount 和 componentDidUpdate
  return () => {
    // componentWillUnmount
  };
}, [dependencies]);
```

7、事件处理：react使用合成事件系统：
- 跨浏览器兼容；
- 事件委托到 document（React 17 后改为挂载的根节点）；
- 自动清理；

8、性能优化：
- 避免不必要的渲染：
   - React.memo：记忆函数组件；
   - PureComponent：类组件的浅比较；
   - shouldComponentUpdate：自定义比较逻辑；
 
- 使用key：列表渲染时为每个项提供稳定的key；
- 代码分割：
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <OtherComponent />
</Suspense>
```
- useMemo 和 useCallback:
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

9、高阶组件 (HOC)：一种重用组件逻辑的模式；

10、 render props：另一种共享代码的技术；

11、react 18+ 新特性：
- 并发渲染：可中断、可暂停、可恢复的渲染；
- 自动批处理：多个状态自动更新合并为单个渲染；
- 过渡更新：区分紧急和非紧急；
- 新的 suspense特性：更好的代码获取和数据分割；
- 新的根API：createRoot 替代 ReactDOM.render；

12、错误处理：ErrorBoundary ，react 18+ suspense 错误处理：
```
<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <ComponentThatMaySuspend />
  </Suspense>
</ErrorBoundary>
```











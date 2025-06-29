## react高频问题及解答方案

虚拟dom工作原理与diff算法优化，解释虚拟dom如何提升性能？Diff算法的比较规则是什么？

回答：
- 虚拟dom是轻量级JS对象，通过对比新旧虚拟DOM树（Diffing），仅更新差异部分到真实dom，减少重绘开销；
- Diff算法采用分层比较，同层节点从左到右遍历，类型相同则更新属性，列表元素依赖key来标识移动、复用（避免索引作为key）；

Hooks原理与限制，为何Hooks不能在条件语句中使用？useState的函数更新与直接传值有啥区别？

回答：
- Hooks依赖调用顺序维护状态链表，条件语句会破坏顺序一致性；
- setCount(count + 1)直接传值在异步更新中可能使用旧值；setCount(prev => prev + 1)函数更新确保基于最新状态；

受控组件 VS 非受控组件；何时选择受控组件？如何用Ref访问表单数据？

回答：
- 受控组件：表单值由react状态管理（value + onChange），适合实时验证、提交；
- 非受控组件：用Ref直接获取dom值（如inputRef.current.value），适合文件上传等低频操作；


**二、Hooks深度机制**

useEffect依赖数组与清理机制，依赖项为空数组`[]` 与未传依赖的区别？如何避免内存泄漏？

解答：
- []：仅执行一次（类似componentDidMount）；无依赖项：每次渲染后执行；[dep]：依赖变化时执行；
- 清理函数：返回的函数在组件卸载或依赖更新前执行，（如取消订阅、清除定时器）；

useMemo与useCallback性能优化；何时使用useMemo？useCallback解决什么问题?

解答：
- useMemo：缓存计算结果，仅在依赖变化时重新计算，避免重复执行开销大的函数，避免重复执行复杂运算（如过滤大型列表）；
- useCallback：缓存函数引用，避免子组件因为回调函数重新生成导致无效渲染，（需要配合React.memo）；useCallback用于缓存某个函数的定义，只有依赖变化时才会重新生成函数，可以避免函数在每次渲染时都创建新的引用；
- 错误用法：过度使用反而会增加内存开销；仅在高开销的操作或者依赖变动频繁时使用。

**三、状态管理与数据流**

Redux核心原理与中间件；描述Redux单向数据流？异步Action如何处理？

解答：
- 流程：View -> Action -> Reducer -> Store -> View更新；
- 异步方案：使用Redux-thunk（函数形式Action）或Redux-saga管理异步逻辑；

Context API替代Redux的场景；Context适合哪些场景？与Redux有何优劣？
- 适用于跨层级传递主题、用户信息等低频更新数据。
- 劣势：无中间件，无DevTools支持，频繁更新可能引发性能问题（需配合memo）

**四、性能优化策略**

1、组件渲染优化的方案：
- React.memo，缓存函数组件，浅比较props；
- PureComponent：类组件自动浅比较state、props；
- 关键点：避免在渲染函数中动态创建对象、函数（破坏浅比较）；

2、代码分割与懒加载：减少首屏加载时间，动态加载非关键组件。代码实现：
```
const LazyComponent = React.lazy(() => import('./Component'));
<Suspense fallback={<Spinner />}> 
  <LazyComponent />
</Suspense>
```

**五、Fiber架构与并发模式（React 18+）**

1、Fiber设计目标与时间切片：Fiber如何解决同步渲染阻塞问题？
- 将渲染拆分为可中断的小任务单元，通过requestIdleCallback在浏览器空闲时间执行，避免卡顿；
- 双缓冲机制：当前树与构建中的树 交替更新。

2、并发特性实践：
- startTransition：标记非紧急更新，避免阻塞用户交互；

**六、高级特性与生态**

1、在 React 中使用 Error Boundaries（错误边界）可以捕获子组件树中的JavaScript错误，记录这些错误并显示一个备用的UI（而不是直接崩溃整个应用）；说明：在React中，将ErrorBoundary 应用于路由组件是常见的错误处理策略，可以确保某个路由下的组件崩溃时不会影响整个应用。
```
// 使用示例
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent /> {/* 可能会抛出错误的组件 */}
    </ErrorBoundary>
  );
}
// 错误显示组件
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>出错了：</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}
```


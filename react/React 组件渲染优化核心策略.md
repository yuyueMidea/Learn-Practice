## React 组件渲染优化核心策略

1、减少不必要的渲染：
- React.memo：缓存组件（浅比较 props）；
- useMemo：缓存计算结果  `const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`；
- useCallback：缓存函数引用 `const handleClick = useCallback(() => doSomething(id), [id]);`;

2、精细化状态管理
- 状态提升：将状态提升到合适的层级；
- 状态拆分：避免大对象的状态（触发多余更新）；
- Context优化：拆分 Context 或使用 selectors： `const { valueA } = useContext(MyContext); // 只订阅需要的值`；

3、列表渲染优化：
- key属性：使用稳定唯一值（非数组索引）；
- 虚拟滚动：处理长列表（react-window 或 react-virtualized）

4、懒加载组件：
- React.lazy + Suspense：动态加载组件
```
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
```
- 图片懒加载：使用 loading="lazy" 或 IntersectionObserver

5、性能分析工具：
- React DevTools Profiler：检测渲染耗时；
- Chrome Performance Tab：分析组件生命周期；

6、其他优化技巧：
- 避免内联对象、函数：减少子组件的无效更新；
- 批量更新：自动批处理（react 18+），或者unstable_batchedUpdates；
- 使用防抖、节流：控制高频更新（如滚动事件）；
   - 防抖：事件停止触发后延迟执行，比如搜索框输入、窗口resize结束检测；
   - 节流：是指固定间隔执行一次，比如滚动事件、按钮频繁点击。

---

优化前后的对比（示例）
| 场景	| 优化前	| 优化后
|-------|---------|-------
| 列表渲染	| 全量 DOM 更新	| 虚拟滚动仅渲染可视区域
| 子组件更新	| 父组件状态变化导致所有子组件渲染	| React.memo 避免未变化子组件渲染
| 计算逻辑	| 每次渲染重复计算	| useMemo 缓存结



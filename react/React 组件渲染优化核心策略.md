## React 组件渲染优化核心策略

1、减少不必要的渲染：
- React.memo：缓存组件（浅比较 props）；
- useMemo：缓存计算结果  `const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`；
- useCallback：缓存函数引用 `const handleClick = useCallback(() => doSomething(id), [id]);`;

2、精细化状态管理
- 状态提升：将状态提升到合适的层级；
- 状态拆分：避免大对象的状态（触发多余更新）；
- Context优化：拆分 Context 或使用 selectors： `const { valueA } = useContext(MyContext); // 只订阅需要的值`；

## react 学习记录


react中的Hooks解决了以下问题：函数组件难以复用状态逻辑、缺乏生命周期能力、组件逻辑分散等问题；总结Hooks的价值：
| Hooks 提供的能力	| 替代/改进了	| 优势
|-------------------|-------------|-------------
| useState	| this.state	| 函数组件也可拥有状态
| useEffect	| 生命周期方法	| 统一副作用管理
| useContext	| Context.Consumer	| 状态共享更方便
| useRef	| createRef	| 函数组件也能访问 DOM、缓存变量
| useMemo / useCallback	| shouldComponentUpdate	| 性能优化更精细
| 自定义 Hook	| HOC / render props	| 逻辑复用简单、组合灵活

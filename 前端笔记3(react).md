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

react18+ 组件的生命周期方法
| 生命周期场景        | 对应 Hook                       | 说明                     |
| ------------- | ----------------------------- | ---------------------- |
| 初始化（挂载）       | `useEffect(() => {}, [])`     | 组件首次渲染后执行一次            |
| 更新（某个状态/属性变化） | `useEffect(() => {}, [deps])` | 依赖更新时执行                |
| 卸载            | `useEffect` 中 return 函数       | 返回清理函数，组件卸载时触发         |
| 获取 DOM 或持久引用  | `useRef`, `useLayoutEffect`   | 类似 `componentDidMount` |
| 计算派生数据（缓存计算）  | `useMemo`                     | 避免不必要的计算               |
| 函数缓存（如事件处理器）  | `useCallback`                 | 避免不必要的函数重建             |

react中状态state和属性props
- props：父传子的只读数据，不可修改；
- state：组件内部可变数据，可以通过useState修改，会触发组件重新渲染；

react中高阶组件简介：高阶组件（HOC）是一种常见的封装逻辑复用的方式，可以实现组件的复用、逻辑的抽象和代码的组合。

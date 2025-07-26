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

react中受控和非受控组件：受控组件的元素值是由state管理，组件内通过useState 控制输入的值；非受控组件可以通过dom来直接访问（使用ref）；

react中展示组件和容器组件的区别：
- 展示组件专注于UI展示，不关心业务逻辑和数据来源，通常通过props接收数据和回调；
- 容器组件专注于业务逻辑和状态管理，负责数据获取状态更新等，将数据和方法传给展示组件；

react中类组件和函数组件的区别：在react中组件分为类组件和函数组件，在react16.8 引入Hooks以后，函数组件主键成为主流；区别：
- 类组件：使用 class 关键字继承 React.Component、通过 this.state 管理状态，this.setState() 更新状态、生命周期方法：如 componentDidMount、shouldComponentUpdate 等；
- 函数组件：使用普通函数定义，写法更简洁（没有this绑定的问题）、自 React 16.8 起支持 Hooks（如 useState, useEffect），更容易复用逻辑；

react中的上下文context 及其作用：React 中的 Context（上下文）是一种用于跨组件共享状态的机制；可以避免通过props一层层传递数据；，适用于处理全局共享的数据，比如用户信息、主题、语言、权限等；

Redux的简介及其优缺点：Redux是一个JavaScript状态管理库，管理复杂组件之间共享的状态，提供了可预测的状态栏；是一个集中式状态管理工具，它通过：Store（存储状态）、Action（触发状态变更的描述对象）、Reducer（描述如何更新状态的函数） 实现了集中管理、可追踪可调试；
| 概念                                              | 说明                          |
| ----------------------------------------------- | --------------------------- |
| `store`                                         | 状态树的集中存储仓库                  |
| `action`                                        | 一个普通 JS 对象，描述“发生了什么”        |
| `reducer`                                       | 根据旧状态和 action 返回新状态的函数（纯函数） |
| `dispatch(action)`                              | 发送一个 action，通知 reducer 处理   |
| `subscribe(listener)`                           | 监听 store 的变化                |
| `connect()` / `useSelector()` / `useDispatch()` | React-Redux 的桥梁，连接组件和 store |

React 中的 DOM Diff 算法（Diffing Algorithm）：是react用来比较两颗虚拟dom树差异，并高效更新真实dom的核心算法；react通过虚拟dom来抽象UI结构，每次组件更新会重新生成一颗新的虚拟dom树，为了将这棵树映射到真实dom，必须比较旧树与新树的差异 并最小化真实dom的操作成本；react Diff有三大优化策略：
- 同层比较：不同层级不计较；
- 同类型节点复用：如果两个组件类型相同、会进行递归比较， 不同类型的组件 会直接卸载旧组件挂载新组件；
- 子节点列表key优化：react遍历children时会更加key来追踪每个元素的身份，相同key会复用dom元素，否则会重新创建或删除；

react中Fiber架构：React Fiber 是 React 16 引入的全新协调（协调调度）架构，它彻底地重写了react内部的渲染和调度机制，提高了UI渲染的性能和响应性，特别是支持异步渲染；传统react在更新UI时是使用同步渲染，整个渲染一旦开始就必须执行，导致界面卡顿、用户体验差；Fiber解决了这个瓶颈，实现了可中断、可恢复的异步渲染；Fiber架构的核心特点：
- Fiber是一种数据结构，是一个链表结构的JavaScript对象，它存储了组件的类型、状态、props、更新队列、以及指向父节点子节点的指针；
- 增量渲染：react将渲染工作拆分成多个小任务，分批执行，不会阻塞主线程，而且在每个任务之间可以暂停渲染去处理用户交互如点击输入，保障了界面响应流畅；
- 任务优先级：Fiber支持为不同的更新分配优先级，比如用户输入优先级最高、动画次之、后台数据加载优先级最低；根据优先级调度任务，提升用户体验；
- 可中断与恢复：渲染过程可以被打断，待浏览器空闲时恢复执行；
- Fiber的工作流程分为：
   - 渲染阶段（Render Phase）：构建FIber树，计算要更新的内容，这个阶段可中断、不直接操作dom；
   - 提交阶段（Commit Phase）：将计算好的更改同步到真实dom，这个阶段不可中断必须快速完成；
 
- Fiber是对旧的Diff的升级和重写，依然采用虚拟dom Diff的原理，但把协调过程拆分成可中断的小块，支持异步更新；

react中key在渲染列表时的作用：在react中，key是在渲染列表时 用于 唯一标识每一个列表项的唯一属性，主要用于帮助react高效地进行dom Diff算法对比和更新，作用：
- 高效更新dom：react通过key 判断元素是否发生变化，从而决定是复用、更新还是重新创建节点，提升性能；
- 减少不必要的渲染：如果key正确设置，react能避免重新渲染不变的元素；







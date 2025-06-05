**React 渲染原理：Render 和 Commit 阶段详解**

React 的渲染过程分为两个主要阶段：Render 阶段和 Commit 阶段。这种分离使得 React 能够实现高效的更新和渲染优化。

整体流程：`触发更新 → Render 阶段 → Commit 阶段 → 浏览器绘制`

**Render阶段（协调阶段）**
1. 主要工作：（1）计算工作，通过对比新旧虚拟dom树（React Element 树），来确定需要更新的部分；（2）创建Fiber树，构建或更新Fiber节点树（React 的内部数据结构）；（3）调度优先级，根据更新的优先级决定处理顺序。
2. 关键特点：（1）可中断：React可以暂停、中止、或重用这个阶段的工作（2）无副作用：这个阶段不会直接修改dom（3）递归处理：采用深度优先遍历方式处理组件树。
3. 详细过程：（1）开始 遍历，从根节点开始处理，（2）协调算法（Diffing）比较新旧FIber节点，复用可复用的节点，标记需要插入、更新、或删除的节点；（3）生命周期调用：调用函数组件的函数体，调用类组件的render方法，执行getDerivedStateFromProps 等生命周期。（4）生成Effect List：标记有副作用的节点。

**Commit阶段**
1. 主要工作：（1）执行dom操作：实际应用所有更新到dom，（2）调用生命周期：执行副作用相关的生命周期方法和Hook，（3）更新refs: 更新所有ref引用；
2. 关键特点：（1）不可中断：必须一次性完成所有dom更新；（2）同步执行：快速完成以避免视觉不一致；（3）分为三个子阶段：Before mutation（突变前），Mutation（突变），Layout（布局）；
3. 详细过程：（1）Before mutation 阶段；（2）Mutation 阶段；（3）Layout 阶段

两个阶段的对比
| 特性	| Render 阶段	| Commit 阶段
|-------|-------------|-----
| 可中断性	| 可中断| 	不可中断
| 副作用	| 无 DOM 操作	| 有 DOM 操作
| 执行方式	| 异步	| 同步
| 生命周期/Hook 调用	| 调用 render 相关方法	| 调用副作用相关方法
| 主要输出	| 标记变化的 Fiber 节点	| 实际 DOM 更新

---

在React18的并发模式下，Render阶段的行为有了重要变化：
1. 时间切片（Time Slicing）：将渲染工作分解为小块，避免长时间阻塞主线程；
2. 过渡更新（Transitions）：区分紧急和非紧急更新；
3. 自动批处理：将多个状态更新合并为单个渲染。
4. 并发模式下的渲染流程：`触发更新 → 调度（Scheduler）→ Render 阶段（可中断）→ Commit 阶段（不可中断）`;


**性能优化启示**
1. 减少Render阶段的工作量：使用 React.memo、useMemo、useCallback、避免在渲染期间进行昂贵计算；
2. 优化Commit阶段：减少不必要的 DOM 操作、批量状态更新；
3. 合理使用并发特性：对非紧急更新使用 startTransition、使用 Suspense 管理异步加载；

**调试工具**
1. React DevTools：查看组件树和渲染性能，分析组件更新原因；
2. Performance 面板：记录和分析渲染时间线，识别性能瓶颈；
3. Scheduler 跟踪；

总结：理解 React 的 Render 和 Commit 阶段对于编写高性能 React 应用至关重要，它能帮助你更好地理解组件何时以及如何更新，从而做出更明智的优化决策。








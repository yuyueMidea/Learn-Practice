## Redux 知识点全面详解

Redux 是一个可预测的状态管理容器，用于 JavaScript 应用。下面我将从核心概念到高级用法全面介绍 Redux 的知识点。

1、Redux三大原则：
- 单一数据源：整个应用的状态存储在单个store中；状态树是一个嵌套的对象结构；
- 状态是只读的：唯一改变状态的方法是触发action；不能直接修改state，必须通过纯函数reducer；
- 使用纯函数执行修改：Reducer是纯函数，接收旧state和action，返回新state；无副作用，相同的输入得到同样的输出；

2、Redux核心概念：
- Action：描述发生了什么的对象，是改变state的唯一途径；Action Creator（创建 action 的函数）
- Reducer特点：纯函数：(state, action) => newState； 不能修改原 state，必须返回新对象； 不能有异步操作、副作用（如 API 调用）；
- Store 职责：保存应用的完整状态树；提供 getState() 获取当前状态； 提供 dispatch(action) 更新状态；提供 subscribe(listener) 注册监听器；

3、Redux数据流：
- 触发：调用 store.dispatch(action)；
- 通知：Redux store 调用 reducer 函数；
- 合并：根 reducer 可能合并多个子 reducer 的输出；
- 保存：store 保存 reducer 返回的新状态树；
- 更新：所有订阅 store.subscribe(listener) 的监听器被调用；

4、Redux中间件：
- 中间件原理：位于action 被发起后，到达reducer前的扩展点： `action -> middleware1 -> middleware2 -> ... -> reducer`；
- 常用中间件：redux-thunk，用于处理异步action；redux-logger：日志记录；

5、React-Redux
```
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```






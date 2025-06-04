**React Hooks 介绍**

React Hooks 是React16.8引入的一项革命性创新，它允许你在组件中使用state 和其他 React特性，而无需编写class组件。

Hooks含义：React Hooks的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

为什么需要Hooks?
- 解决class组件的问题：复杂的生命周期方法、this问题；
- 逻辑复用困难：高阶组件和`Render Props`会导致"wrapper hell";
- 简化组件：将相关代码组织在一起，而不是分散在不同的生命周期里；

**主要Hooks介绍**

1. useState：状态钩子
2. useEffect：副作用钩子；useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
3. useContext：共享状态钩子；如果需要在组件之间共享状态，可以使用useContext()。使用AppContext.Provider包裹组件，AppContext.Provider提供了一个 Context 对象，这个对象可以被子组件共享。
4. useReducer：action 钩子；Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是(state, action) => newState。
5. useMemo
6. useCallback

React Hooks本质是自变量与因变量，useState用来定义自变量，useMemo 与 useCallback 定义无副作用的因变量；useEffect定义有副作用的因变量；useContext用来跨组件层级的操作自变量；useRef让组件逻辑更灵活。


**Hooks规则**
1. 只在最顶层使用Hooks：不要在循环、条件、或嵌套函数中调用`Hooks`；
2. 只在React函数中调用Hooks：在React函数组件或自定义`Hooks`中调用；

Hooks已成为现代React开发的标准方式，推荐在新项目中使用 函数组件和Hooks的组合。

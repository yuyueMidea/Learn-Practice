**React Hooks 介绍**

React Hooks 是React16.8引入的一项革命性创新，它允许你在组件中使用state 和其他 React特性，而无需编写class组件。

为什么需要Hooks?
- 解决class组件的问题：复杂的生命周期方法、this问题；
- 逻辑复用困难：高阶组件和`Render Props`会导致"wrapper hell";
- 简化组件：将相关代码组织在一起，而不是分散在不同的生命周期里；

**主要Hooks介绍**

1. useState
2. useEffect
3. useContext
4. useReducer
5. useMemo
6. useCallback

**Hooks规则**
1. 只在最顶层使用Hooks：不要在循环、条件、或嵌套函数中调用`Hooks`；
2. 只在React函数中调用Hooks：在React函数组件或自定义`Hooks`中调用；

Hooks已成为现代React开发的标准方式，推荐在新项目中使用 函数组件和Hooks组合。

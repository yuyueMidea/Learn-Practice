## 最新版react19的生命周期的介绍

React 19 引入了一些新的特性，但 生命周期函数整体变化不大，依然延续了 React 16/17/18 的 `[函数组件为主、类组件逐步弱化]` 的趋势。

React 19 仍支持类组件生命周期，但在实践中推荐使用函数组件 + Hooks。

```
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // ✅ 挂载时运行一次
  useEffect(() => {
    console.log("组件挂载");

    // ✅ 卸载时清理
    return () => {
      console.log("组件卸载");
    };
  }, []);

  // ✅ 每次 count 更新时运行
  useEffect(() => {
    console.log("count 更新为", count);
  }, [count]);

  return (
    <div>
      <p>点击次数：{count}</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  );
}
```

## useEffect 中方法为什么重复调用

useEffect 中的方法重复调用，通常并不是 Bug，而是 React 设计上的行为。尤其在开发模式下，这是 React 严格模式（Strict Mode） 和 Hook 使用方式共同造成的。

React 会在开发模式下 刻意调用 useEffect 清理和重新执行一次，以帮助你发现副作用中潜在的问题。

1、模拟流程如下：
- useEffect 执行一次（挂载）
- 立即调用 return 清理函数
- 再执行一次 useEffect

2、useEffect 的依赖项 [deps] 发生了变化；
```
useEffect(() => {
  console.log("运行副作用");
}, [count]);
```
那么每次 count 改变，都会重新执行 useEffect。

## React 18+ 新增 Hooks 一览（含 React 19 预发布内容）
- useId： 为组件生成唯一 ID，避免 SSR/CSR 不一致；
- useDeferredValue： 延迟处理高开销值，用于“模糊响应”优化；
- useTransition：实现非阻塞 UI 更新（如切换分页）；
- useSyncExternalStore： 与外部状态库（如 Redux、Zustand）同步；
- useInsertionEffect：DOM 插入前执行（用于 CSS-in-JS）






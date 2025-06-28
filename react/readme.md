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

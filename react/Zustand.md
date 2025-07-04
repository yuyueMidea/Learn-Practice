掘金地址：<https://juejin.cn/post/7321049446443384870?searchId=202505292206209FC32D6DBB624479202A>

**一、Zustand 状态库：轻便、简洁、强大的 React 状态管理工具**

Zustand 是一个轻量级、简洁且强大的 React 状态管理库，旨在为您的 React 项目提供更简单、更灵活的状态管理方式。与其他流行的状态管理库（如 Redux、MobX 等）相比，Zustand 的 API 更加简洁明了，学习成本较低，且无需引入繁琐的中间件和配置。同时，Zustand 支持 TypeScript，让您的项目更具健壮性。

轻量级 ：Zustand 的整个代码库非常小巧，gzip 压缩后仅有 1KB，对项目性能影响极小。

简洁的 API ：Zustand 提供了简洁明了的 API，能够快速上手并使用它来管理项目状态。   基于钩子: Zustand 使用 React 的钩子机制作为状态管理的基础。它通过创建自定义 Hook 来提供对状态的访问和更新。这种方式与函数式组件和钩子的编程模型紧密配合，使得状态管理变得非常自然和无缝。

**二、zustand的优势**
- 轻量级 ：Zustand 的整个代码库非常小巧，gzip 压缩后仅有 1KB，对项目性能影响极小。
- 简洁的 API ：Zustand 提供了简洁明了的 API，能够快速上手并使用它来管理项目状态。   基于钩子: Zustand 使用 React 的钩子机制作为状态管理的基础。它通过创建自定义 Hook 来提供对状态的访问和更新。这种方式与函数式组件和钩子的编程模型紧密配合，使得状态管理变得非常自然和无缝。
- 易于集成 ：Zustand 可以轻松地与其他 React 库（如 Redux、MobX 等）共存，方便逐步迁移项目状态管理。
- 支持 TypeScript：Zustand 支持 TypeScript，让项目更具健壮性。
- 灵活性：Zustand 允许根据项目需求自由组织状态树，适应不同的项目结构。
- 可拓展性 : Zustand 提供了中间件 (middleware) 的概念，允许你通过插件的方式扩展其功能。中间件可以用于处理日志记录、持久化存储、异步操作等需求，使得状态管理更加灵活和可扩展。
- 性能优化: Zustand 在设计时非常注重性能。它采用了高效的状态更新机制，避免了不必要的渲染。同时，Zustand 还支持分片状态和惰性初始化，以提高大型应用程序的性能。
- 无副作用: Zustand 鼓励无副作用的状态更新方式。它倡导使用 immer 库来处理不可变性，使得状态更新更具可预测性，也更易于调试和维护。

**三、如何在 React 项目中使用 Zustand**
- 1、安装：`npm install zustand`
- 2、快速上手：
```

// 计数器 Demo 快速上手
import React from "react";
import { create } from "zustand";

// create（）：存在三个参数，第一个参数为函数，第二个参数为布尔值
// 第一个参数：(set、get、api)=>{…}
// 第二个参数：true/false 
// 若第二个参数不传或者传false时，则调用修改状态的方法后得到的新状态将会和create方法原来的返回值进行融合；
// 若第二个参数传true时，则调用修改状态的方法后得到的新状态将会直接覆盖create方法原来的返回值。

const useStore = create(set => ({
  count: 0,
  setCount: (num: number) => set({ count: num }),
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default function Demo() {
  // 在这里引入所需状态
  const { count, setCount, inc } = useStore();

  return (
    <div>
      {count}
      <input
        onChange={(event) => {
          setCount(Number(event.target.value));
        }}
      ></input>
      <button onClick={inc}>增加</button>
    </div>
  );
}
```
- 3、在状态中访问和存储数组，假设我们需要在 Zustand 中存储一个 state 中的数组, 我们可以像下面这样定义：
```
const useStore = create(set => ({
  fruits: ['apple', 'banana', 'orange'],
  addFruits: (fruit) => {
    set(state => ({
      fruits: [...state.fruits, fruit]
    }));
  }
}));
//以上, 我们创建了一个 store 包含了 fruits state, 其中包含了一系列水果, 第二个参数是 addFruits , 接受一个参数 fruit 并运行一个函数来得到 fruits state 和 新增的 fruits, 第二个变量用于更新我们存储状态的值
```
**Zustand优势**
- 简单易用：API非常直观，学习曲线低
- 高性能：自动处理重复渲染问题
- 灵活性：不需要Provider 包裹组件
- 中间件支持：如持久化、Redux开发工具等
- Typescript友好：完整的类型支持

**最佳实践**
- 按功能拆分store：不要把所有状态放在一个store中
- 使用选择器：只订阅需要的状态，以避免不必要的渲染
- 合理使用持久化：对需要持久化的状态使用 persist中间件
- 组合store：对于复杂应用，可以组合多个store

总结：Zustand 提供了一种比 Redux 更简单、比 Context 更高效的状态管理方案，特别适合中小型 React 应用。对于大型应用，它也能通过良好的组织保持可维护性。









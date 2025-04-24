# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 一、描述UI

1、使用React，你不用直接从代码层面修改UI，例如 不用编写“显式成功消息”这种命令；相反，只需要描述组件在不同状态（‘初始化状态’，‘输入状态’，‘成功状态’）下希望展示的UI，然后根据用户输入触发状态更改。

2、在组件间共享状态，有时候希望两个组件的状态始终同时更改，要实现这一点，可以将相关状态从这两个组件上移除，并把这些状态移到最近的父级组件，然后通过props将状态传递给这两个组件，这被称为“状态提升”。

3、在React中，渲染逻辑和标签共同存在于一个地方--组件。每个react组件都是一个JavaScript函数，它会返回一些标签，react会将这些标签渲染到浏览器上。

JSX规则：只能返回一个根元素，原因是：JSX虽然看起来很像HTML，但在底层其实被转化为了JavaScript对象，你不能在一个函数中返回多个对象，除非用一个数组把它们包装起来。所以多个JSX标签必须要用一个父元素或Fragment来包裹。

在JSX的大括号内：引用变量、调用函数、使用js对象。

React中，每个父组件通过props给子组件传值，可以是对象、数组或函数。

快捷表达式：```（1）在 JSX 中，{cond ? <A /> : <B />} 表示 “当 cond 为真值时, 渲染 <A />，否则 <B />”。 （2）在 JSX 中，{cond && <A />} 表示 “当 cond 为真值时, 渲染 <A />，否则不进行渲染”。```

React中的key值：key值在兄弟节点之间必须是唯一的（不要求全局唯一）；key值不能改变，否则失去了意义，千万不用动态地生成key。

**React 假设你编写的所有组件都是纯函数。**

React中一个组件必须是纯粹的：1、只负责自己的任务；2、输入相同则输出相同（给定相同的输入，组件应该总是返回相同的JSX）。渲染可能随时发生，因此组件不应依赖于彼此的渲染顺序。通过 “设置” state 来更新界面，而不要改变预先存在的对象。

React如何看待组件结构，将UI视为树；渲染树：组件的一个主要特性是能够由其他组件组合而成。在嵌套组件中没有父组件和子组件的概念，每个父组件可能是另一个组件的子组件。在条件渲染中，父组件可以根据传递的数据渲染不同的子组件。

渲染树表示单次渲染中React组件之间的嵌套关系；渲染树有助于识别顶级组件和叶子组件，顶级组件会影响其下所有组件的渲染性能，而叶子组件通常会频繁重新渲染，识别它们有助于调试渲染性能问题。

依赖树表示React应用程序中的模块依赖关系。

构建工具（bundler）使用依赖树来捆绑必要的代码，以部署应用程序。

## 二、添加交互

1、响应事件：你可以使用useState Hook为组件添加状态，内置参数有 初始值和设置函数；渲染和提交：除按法渲染-> 渲染组件-> 提交到DOM。

state如同一张快照，设置它并不改变你已有的状态变量，而是触发一次重新渲染；把一系列state更新加入队列；例如：你可以通过在设置状态时传递一个 更新器函数 来解决这个问题。注意用 setScore(s => s + 1) 替换 setScore(score + 1) 是如何修复“+3”按钮的。

更新state中的状态：不应该直接改变你在React状态中持有的对象和数组，而是需要创建一个新的对象，然后用这个副本来更新状态；

更新state中的数组：应将数组视为只读，创建一个新的数组，然后用新数组来更新状态。

你可以通过 将函数作为prop传递给元素如<button>来处理事件；必须传递事件处理函数，而非函数调用！ onClick={handleClick} ，不是 onClick={handleClick()}。

事件会向上传播，通过事件的第一个参数调用`e.stopPropagation()`来阻止；事件可能具有浏览器默认行为，使用`e.preventDefault()`来阻止这种情况。

2、组件的记忆：









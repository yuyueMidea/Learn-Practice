# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


1、使用React，你不用直接从代码层面修改UI，例如 不用编写“显式成功消息”这种命令；相反，只需要描述组件在不同状态（‘初始化状态’，‘输入状态’，‘成功状态’）下希望展示的UI，然后根据用户输入触发状态更改。

2、在组件间共享状态，有时候希望两个组件的状态始终同时更改，要实现这一点，可以将相关状态从这两个组件上移除，并把这些状态移到最近的父级组件，然后通过props将状态传递给这两个组件，这被称为“状态提升”。

3、在React中，渲染逻辑和标签共同存在于一个地方--组件。每个react组件都是一个JavaScript函数，它会返回一些标签，react会将这些标签渲染到浏览器上。

JSX规则：只能返回一个根元素，原因是：JSX虽然看起来很像HTML，但在底层其实被转化为了JavaScript对象，你不能在一个函数中返回多个对象，除非用一个数组把它们包装起来。所以多个JSX标签必须要用一个父元素或Fragment来包裹。

在JSX的大括号内：引用变量、调用函数、使用js对象。

React中，每个父组件通过props给子组件传值，可以是对象、数组或函数。

快捷表达式：```（1）在 JSX 中，{cond ? <A /> : <B />} 表示 “当 cond 为真值时, 渲染 <A />，否则 <B />”。 （2）在 JSX 中，{cond && <A />} 表示 “当 cond 为真值时, 渲染 <A />，否则不进行渲染”。```

React中的key值：key值在兄弟节点之间必须是唯一的（不要求全局唯一）；key值不能改变，否则失去了意义，千万不用动态地生成key。

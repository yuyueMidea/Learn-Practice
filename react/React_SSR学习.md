**React SSR（服务端渲染）学习路线**

一、概念

1、SSR 是什么？与 CSR/SSG 的区别
- 目标：弄清 SSR 的动机与整体流程（请求 → 服务端渲染 HTML → 客户端接管/水合）。
- 概念：服务端渲染(Server-Side Rendering) 是指在服务端将react组件渲染成HTML字符串，然后发送给客户端，而不是在浏览器中执行JavaScript来渲染界面。

要点：
- CSR（客户端渲染）：首屏 HTML 空壳，JS 下载与执行后渲染。
- SSR（服务端渲染）：服务端把 React 组件渲染为 HTML，浏览器拿到可见内容更快，然后客户端“水合”（hydrate）绑定事件。
- SSG/ISR：构建期或定时预渲染静态页。
- React 18：react-dom/server（renderToPipeableStream/renderToReadableStream）支持 流式 SSR 与 Suspense。

二、核心技术点

2.1 React SSR 核心 API
```
// 服务端渲染 API
import { renderToString } from 'react-dom/server';

// React 18+ 新 API
import { renderToPipeableStream } from 'react-dom/server';
```
2.2 Hydration (水合)
- Hydration 是 SSR 的关键概念,指在客户端将服务端渲染的静态 HTML "激活"为可交互的 React 应用。
```
// 客户端 hydration
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);
```

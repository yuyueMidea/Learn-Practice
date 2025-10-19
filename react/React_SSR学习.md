**React SSR（服务端渲染）学习路线**

1、SSR 是什么？与 CSR/SSG 的区别
- 目标：弄清 SSR 的动机与整体流程（请求 → 服务端渲染 HTML → 客户端接管/水合）。

要点：
- CSR（客户端渲染）：首屏 HTML 空壳，JS 下载与执行后渲染。
- SSR（服务端渲染）：服务端把 React 组件渲染为 HTML，浏览器拿到可见内容更快，然后客户端“水合”（hydrate）绑定事件。
- SSG/ISR：构建期或定时预渲染静态页。
- React 18：react-dom/server（renderToPipeableStream/renderToReadableStream）支持 流式 SSR 与 Suspense。

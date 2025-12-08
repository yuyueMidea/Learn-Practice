**React SSR 服务端渲染完全指南**

服务端渲染(Server-Side Rendering) 是指在服务器端将react组件渲染成HTML字符串，然后发送给客户端， 而不是在浏览器中执行JavaScript来渲染页面。

SSR有以下优势；
- 更好的SEO，搜索引擎爬虫可以直接获取完整的HTML；
- 更快的首屏渲染：用户更快的看到页面内容；
- 更好的性能指标 - FCP(First Contentful Paint)、LCP(Largest Contentful Paint)

SSR的挑战：
- 服务器负载增加：每个请求都需要渲染；
- 开发复杂度：需要考虑服务端和客户端两种环境；
- 状态管理复杂：需要序列化、反序列化状态；

核心技术点
- 核心API：
```
// 服务端渲染 API
import { renderToString } from 'react-dom/server';

// React 18+ 新 API
import { renderToPipeableStream } from 'react-dom/server';
```
- Hydration (水合):hydration是SSR的关键概念，是指在客户端将服务端渲染的静态HTML激活成为可交互的react应用。
```
// 客户端 hydration
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root'), <App />);
```

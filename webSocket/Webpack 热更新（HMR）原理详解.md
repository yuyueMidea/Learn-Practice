## Webpack 热更新（HMR）原理详解

Webpack 热更新 是一种在不刷新整个页面的情况下，更新修改模块的技术，极大地提升了开发体验。以下是基本原理：

整体工作流程：
- 建立通信连接：Webpack Dev Server和浏览器客户端通过 websocket建立持久连接，用于传输通知和模块更新信息；
- 文件监听与编译：webpack监听文件变化并重新编译，编译完成后生成新的模块hash和manifest数据等；
- 更新推送与处理：服务端通过websocket推送更新消息；
- 客户端接收更新并处理模块替换；

关键技术构成：
- Webpack-dev-server (WDS)：提供开发服务器和websocket，集成express服务和webpack-dev-middleware；
- webpack-dev-middleware：内存文件系统替代物理文件系统，监听文件变化并触发重新编译；
- HMR Runtime：注入到打包后的客户端代码中，处理更新逻辑的核心运行时；

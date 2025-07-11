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

客户端处理更新的流程：
```
// 客户端 HMR Runtime 处理流程
1. 接收新的 hash 值并暂存
2. 通过 JSONP 请求获取 manifest 文件
3. 对比确定需要更新的模块
4. 通过 JSONP 获取更新的 chunk
5. 执行模块替换逻辑：
  - 找出过期模块及其依赖
  - 从缓存中删除旧模块
  - 执行新模块代码
  - 触发 accept 回调
```

模块热替换实现：
- module.hot API
```
if (module.hot) {
  module.hot.accept('./module', () => {
    // 更新后的处理逻辑
  });
}
```
更新策略：
- JS：直接替换JavaScript模块代码并重新执行；
- 样式文件：通过style-loader 直接替换style标签；
- Vue/React 组件：框架专用 HMR 插件处理组件状态保持

性能优化机制：
- 增量构建：只重新编译修改的文件及其依赖、使用内存文件系统加速构建；
- 缓存策略：模块级别的缓存管理、通过hash比对确定更新范围；
- 懒更新：只更新受影响的部分应用、保持应用状态不丢失；






## Electron 桌面开发核心技能

技术基础栈：HTML、CSS、JavaScript；掌握现代前端框架：Vue/React；熟悉CSS预处理器sass/less；了解进程之间通信（IPC）；

## Electron技术：

- 1、主进程与渲染进程（理解多进程架构、掌握ipcMain/ipcRender 通信、熟悉contextBridge安全通信）；
- 2、原生能力集成；3、窗口管理（多窗口控制、窗口状态持久化）；

主进程(Main Process)与渲染进程(Renderer Process)，主进程是electron的入口点，运行在node.js环境中，有且只有一个主进程，可以创建和管理多个渲染进程，完全访问node.js和操作系统底层的能力，负责应用生命周期管理；渲染进程，是可以展示网页内容的进程，每个electron窗口都是一个独立的渲染进程。

进程间通信采用：
- 1、IPCMain和ipcRender;
- 2、remote模块（Electron14+ 已废弃）；
- 3、contextBridge（主进程preload.js）;

使用原生API操作系统文件，1、在主进程中操作文件（fs.readFile,fs.writeFile），2、通过IPC暴露给渲染进程(preload.js，主进程ipcMain.handle, 渲染进程ipcRenderer.invoke)。

进阶技能：
- 1、性能优化（启动速度优化）；
- 2、安全防护（源码保护(asar/代码混淆)）；
- 3、打包与分发（掌握electron-builder/webpack配置）。

electron典型应用有：开发工具、IM客户端、数据可视化平台等。

有以下安全注意事项：永远不要直接暴露fs模块给渲染进程，使用contextBridge进行完全通信，验证来自渲染进程的所有输入，限制文件系统访问范围，考虑使用沙箱模式增强安全性。

## Electron的底层逻辑，优化方法及原理：

Electeon采用三层架构模型：
- 1、Chromium负责UI渲染（V8 JavaScript引擎 + Blink渲染引擎）；
- 2、Node.js提供系统级API访问能力；
- 3、Electron胶合层，整合Chromium和node.js,实现进程通信。

关键线程模型：主线程管理窗口生命周期，负责IPC； IO线程处理文件系统，网络等异步操作；UI线程：每个渲染进程有自己的线程。

底层通信机制：
- 1、IPC实现原理（基于libuv、消息序列化采用json序列化，异步通信 基于事件循环，不阻塞主线程）；
- 2、进程间内存共享（SharedArraybuffer 用于高性能数据共享，Nativeimage 跨进程共享图像内存，offScreenCanvas GPU加速的跨进程图形渲染）；

性能优化原理和方法：
- 1、启动优化（冷启动时间），优化原理有Node.js模块加载优化，V8引擎的代码缓存机制；
- 2、内存优化（内存管理原理：Chromium的多进程内存隔离，Node.js的GC策略）；
- 3、渲染进程的优化（底层原理是Chromium的合成器线程，GPU加速渲染管线）；
- 4、IPC优化（通信优化原理：减少序列化、反序列化开销，批量处理消息）；高级优化策略（代码分割与懒加载、进程专有化、内存压缩技术）； 架构设计建议（进程职责分离：主进程窗口管理、菜单控制，渲染进程是UI展示，工作进程是CPU密集型任务）。

## Electron跨平台开发相关要点、

一、系统抽象层组件：
- 1、文件系统访问、系统对话框；
- 2、UI适配组件（标题栏组件、菜单系统、）；
- 3、路径处理要规范（采用path.join进行路径拼接、使用app.getPath('appData')获取配置文件位置，避免硬编码路径）；
- 4、UI跨平台方案（自适应布局技术、样式WIndows适配）；

二、最佳实践总结：
- 1、抽象平台差异（将平台相关代码集中管理）；
- 2、渐进增强设计（先实现核心功能，再添加平台增强特性）；
- 3、继续集成验证（确保每个提交在所有平台都能通过测试）；
- 4、用户配置分离（独立存储平台特有的用户配置）；
- 5、文档明确标注（记录所有平台差异行为和 已知问题）。



在 Electron 应用中，使用 electron-builder 进行打包时可以配置自动压缩输出文件。以下是完整的配置方案：

```
{
  "build": {
    "appId": "com.example.yourapp",
    "productName": "YourApp",
    "copyright": "Copyright © 2023 Your Company",
    
    // 压缩配置
    "compression": "maximum", // 压缩级别
    "asar": true,             // 使用 asar 归档
    
    // 各平台特定配置
    "win": {
      "target": [
        {
          "target": "nsis",   // NSIS 安装程序
          "arch": ["x64"]
        },
        {
          "target": "zip",    // 同时生成 zip
          "arch": ["x64"]
        }
      ]
    }
    
  }
}
```

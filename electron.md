## Electron 桌面开发核心技能

技术基础栈：HTML、CSS、JavaScript；掌握现代前端框架：Vue/React；熟悉CSS预处理器sass/less；了解进程之间通信（IPC）；

## Electron技术：

- 1、主进程与渲染进程（理解多进程架构、掌握ipcMain/ipcRender 通信、熟悉contextBridge安全通信）；2、原生能力集成；3、窗口管理（多窗口控制、窗口状态持久化）；

主进程(Main Process)与渲染进程(Renderer Process)，主进程是electron的入口点，运行在node.js环境中，有且只有一个主进程，可以创建和管理多个渲染进程，完全访问node.js和操作系统底层的能力，负责应用生命周期管理；渲染进程，是可以展示网页内容的进程，每个electron窗口都是一个独立的渲染进程。

进程间通信采用：1、IPCMain和ipcRender;2、remote模块（Electron14+ 已废弃）；3、contextBridge;

electron使用原生API操作系统文件，1、在主进程中操作文件（fs.readFile,fs.writeFile），2、通过IPC暴露给渲染进程。

- 进阶技能：1、性能优化（启动速度优化）；2、安全防护（源码保护(asar/代码混淆)）；3、打包与分发（掌握electron-builder/webpack配置）。

electron典型应用有：开发工具、IM客户端、数据可视化平台等。

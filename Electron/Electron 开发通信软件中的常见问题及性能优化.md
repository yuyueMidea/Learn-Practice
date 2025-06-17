## Electron 开发通信软件中的常见问题及性能优化

**一、常见问题**
- 进程间通信(IPC)效率问题
   - 问题表现：频繁的IPC通信导致界面卡顿
   - 解决方案：（1）批量处理消息，减少通信次数；（2）使用ipcRenderer.invoke/ipcMain.handle替代传统send/on方式；（3）对于大数据传输，考虑使用SharedArrayBuffer（需要注意安全限制）；
 
- 网络连接管理：
   - 问题表现：断线重连机制不稳定，多网络环境适配差
   - 解决方案：（1）实现多级重连策略(立即重试→短延迟→长延迟)，（2）监听网络状态变化(navigator.onLine + 自定义ping检测)；使用WebSocket替代传统HTTP轮询
 
- 内存泄漏：
   - 问题表现：长时间运行后内存持续增长
   - 解决方案：（1）使用Chrome DevTools Memory定期检查；（2）特别注意事件监听器的移除(window、DOM元素)；（3）避免在渲染进程中存储大量数据；
 
- 多窗口同步问题：
   - 问题表现：多个窗口间状态不同步
   - 解决方案：（1）使用主进程作为状态管理中心；（2）考虑使用redux+electron-store组合；（3）实现广播机制通知所有窗口；

**二、性能优化方案**
- 启动优化：策略：在主进程中app.whenReady()中，先创建无边框窗口快速显示，然后后台加载主窗口；其他措施：使用Vite等现代工具构建，延迟加载非核心模块，启用代码分割；
- 消息处理优化：策略：使用消息队列避免阻塞
- 内存优化的措施：
   - 实现虚拟列表渲染长消息记录
   - 限制历史消息存储量（可配置）
   - 对图片或文件使用懒加载
   - 定期调用gc()(需启用--js-flags="--expose-gc")（JavaScript手动内存回收，主进程开启暴露垃圾回收方法，渲染进程添加 window.gc() 方法）
- 渲染优化措施：
   - 使用CSS硬件加速(transform/opacity)
   - 避免频繁的dom操作，使用DocumentFragment
   - 对频繁更新的UI使用Canvas/WebGL
   - 启用offscreen渲染复杂组件
 
**三、高级优化技巧**
- Worker线程利用：
   - 将加密解密、编解码等CPU密集型任务放入Worker；
   - 使用worker_threads模块处理Node.js端任务
 
- 本地缓存策略
   - 分级存储：内存 → SQLite → 文件系统
   - 实现消息分页加载
 
- Electron特性调优：
  ```
      // 主进程窗口配置优化
      new BrowserWindow({
        webPreferences: {
          sandbox: true, // 启用沙箱安全模式
          contextIsolation: true, // 必须开启
          webgl: true, // 启用GPU加速
          offscreen: false // 根据需求调整
        },
        backgroundColor: '#fff', // 减少白屏闪烁
        frame: false // 自定义标题栏可提升性能
      });
  ```



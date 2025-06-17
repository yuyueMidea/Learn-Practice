## Electron 开发通信软件中的常见问题及性能优化

常见问题
- 进程间通信(IPC)效率问题
   - 问题表现：频繁的IPC通信导致界面卡顿
   - 解决方案：（1）批量处理消息，减少通信次数；（2）使用ipcRenderer.invoke/ipcMain.handle替代传统send/on方式；（3）对于大数据传输，考虑使用SharedArrayBuffer（需要注意安全限制）；
 
- 网络连接管理：
   - 问题表现：断线重连机制不稳定，多网络环境适配差
   - 解决方案：（1）实现多级重连策略(立即重试→短延迟→长延迟)，（2）监听网络状态变化(navigator.onLine + 自定义ping检测)；使用WebSocket替代传统HTTP轮询
 
- 内存泄漏：
   - 问题表现：长时间运行后内存持续增长
   - 解决方案：（1）使用Chrome DevTools Memory定期检查；（2）特别注意事件监听器的移除(window、DOM元素)；（3）避免在渲染进程中存储大量数据；

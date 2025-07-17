electron 常用API解析

介绍 electron常用API：窗口管理 (BrowserWindow)、菜单系统、托盘 (Menu, Tray)、对话框 (dialog)、剪贴板、原生通知 等等。

1、窗口管理 BrowserWindow 是 Electron 中创建和控制浏览器窗口的主要模块。有以下常用配置项：
- width/height: 窗口宽高
- minWidth/minHeight: 最小尺寸
- maxWidth/maxHeight: 最大尺寸
- resizable: 是否可调整大小
- frame: 是否显示窗口边框
- title: 窗口标题
- icon: 窗口图标
- show: 创建时是否显示
- webPreferences: 网页功能设置

窗口控制方法：
```
// 显示/隐藏窗口
win.show()
win.hide()
// 最大化/最小化/还原
win.maximize()
win.minimize()
win.restore()
// 关闭窗口
win.close()
// 窗口位置
win.setPosition(x, y)
win.getPosition()
// 窗口尺寸
win.setSize(width, height)
win.getSize()
```

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 窗口控制
  minimizeWindow: ()=> ipcRenderer.invoke('window:minimize'),
  miximizeWindow: ()=> ipcRenderer.invoke('window:maximize'),
  setWinPos: (x,y) => ipcRenderer.invoke('window:setPosition', x,y),
  getWinPos: () => ipcRenderer.invoke('window:getPosition' ),
  // 对话框
  showMessageBox: (options) => ipcRenderer.invoke('dialog:message', options),
  // 剪贴板
  writeTextToClipboard: (text) => ipcRenderer.invoke('clipboard:writeText', text),
  readTextFromClipboard: () => ipcRenderer.invoke('clipboard:readText'),
  showNotification: (options) => ipcRenderer.invoke('notification:show', options),
  // 主进程和渲染进程之间单向通信
  msg2main: (msg)=> ipcRenderer.send('message-to-main', msg),
  // 监听主进程回复
  msg2render:(msg)=> ipcRenderer.on('reply-from-main', (event, arg) => {
    console.log(msg, '收到主进程回复:', arg)
  }),
  
  
})
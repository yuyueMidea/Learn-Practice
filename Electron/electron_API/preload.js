const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 窗口控制
  minimizeWindow: ()=> ipcRenderer.invoke('window:minimize'),
  miximizeWindow: ()=> ipcRenderer.invoke('window:maximize'),
  setWinPos: (x,y) => ipcRenderer.invoke('window:setPosition', x,y),
  getWinPos: () => ipcRenderer.invoke('window:getPosition' ),
})
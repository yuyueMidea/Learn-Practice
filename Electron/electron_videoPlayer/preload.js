const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendToSecondary: (message) => ipcRenderer.send('send-to-secondary', message),
  sendToMain: (message) => ipcRenderer.send('send-to-main', message),
  onMessageFromMain: (callback) => ipcRenderer.on('message-from-main', callback),
  onMessageFromSecondary: (callback) => ipcRenderer.on('message-from-secondary', callback)
})
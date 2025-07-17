const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendToSecondary: (message) => ipcRenderer.send('send-to-secondary', message),
  sendToMain: (message) => ipcRenderer.send('send-to-main', message),
  onMessageFromMain: (callback) => ipcRenderer.on('message-from-main', callback),
  onMessageFromSecondary: (callback) => ipcRenderer.on('message-from-secondary', callback),
  handleSavefile: (content)=> ipcRenderer.invoke('save-file', content),
  execCmd: (cmd) => ipcRenderer.invoke('execcmd', cmd),
  execute: (cmd, args, options) => ipcRenderer.invoke('execute-command', { cmd, args, options }),
  getServerStatus: () => ipcRenderer.invoke('get-server-status')
})
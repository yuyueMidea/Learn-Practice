const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  saveForm: (data) => ipcRenderer.invoke('save-form', data),
  loadForm: () => ipcRenderer.invoke('load-form')
})
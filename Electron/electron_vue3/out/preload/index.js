"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  handleReadfile: (fpath) => electron.ipcRenderer.invoke("read-file", fpath),
  handleSavefile: (content) => electron.ipcRenderer.invoke("save-file", content),
  // 窗口控制
  minimizeWindow: () => electron.ipcRenderer.invoke("window:minimize"),
  maximizeWindow: () => electron.ipcRenderer.invoke("window:maximize"),
  closeWindow: () => electron.ipcRenderer.invoke("window:close"),
  hideWindow: () => electron.ipcRenderer.invoke("window:hide"),
  setWindowPosition: (x, y) => electron.ipcRenderer.invoke("window:setPosition", x, y),
  getWindowPosition: () => electron.ipcRenderer.invoke("window:getPosition"),
  isWindowMaximized: () => electron.ipcRenderer.invoke("window:isMaximized"),
  showMessageBox: (options) => electron.ipcRenderer.invoke("show-message-box", options)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}

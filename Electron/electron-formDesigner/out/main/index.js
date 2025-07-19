"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const app1icon = path.join(__dirname, "../../resources/icon.png");
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { app1icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (process.platform === "win32") {
    mainWindow.setIcon(app1icon);
  }
  const tray = new electron.Tray(app1icon);
  tray.setToolTip("myFormApp");
  const contextMenu = electron.Menu.buildFromTemplate([
    { label: "显示", click: () => {
      mainWindow.show();
    } },
    { label: "退出", click: () => {
      electron.app.quit();
    } }
  ]);
  tray.setContextMenu(contextMenu);
  electron.globalShortcut.register("F12", () => {
    if (mainWindow) {
      const isOpen = mainWindow.webContents.isDevToolsOpened();
      isOpen ? mainWindow.webContents.closeDevTools() : mainWindow.webContents.openDevTools();
    }
  });
  electron.globalShortcut.register("Control+R", () => {
    if (mainWindow) {
      mainWindow.webContents.reloadIgnoringCache();
    }
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});

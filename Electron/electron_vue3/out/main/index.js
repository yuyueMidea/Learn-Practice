"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/apps.png");
const app1icon = path.join(__dirname, "../../resources/app1.png");
const fs = require("fs");
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1e3,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  if (process.platform === "win32") {
    mainWindow.setIcon(icon);
  }
  const tray = new electron.Tray(app1icon);
  tray.setToolTip("myVue3App");
  const contextMenu = electron.Menu.buildFromTemplate([
    { label: "显示", click: () => {
      mainWindow.show();
    } },
    { label: "退出", click: () => {
      electron.app.quit();
    } }
  ]);
  tray.setContextMenu(contextMenu);
  electron.ipcMain.handle("read-file", async (event, msg) => {
    try {
      const res = await openAndReadFile(msg);
      return res;
    } catch (error) {
      console.error("readerr: ", error);
      return error.message;
    }
  });
  electron.ipcMain.handle("save-file", async (event, content) => {
    try {
      const savePath = await saveFile(content);
      return { success: true, path: savePath };
    } catch (error) {
      console.error("saveerr: ", error);
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("show-message-box", async (event, options) => {
    const result = await electron.dialog.showMessageBox(mainWindow, options);
    return result;
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
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
}
function setupWindowControls() {
  electron.ipcMain.handle("window:minimize", () => {
    if (mainWindow) mainWindow.minimize();
  });
  electron.ipcMain.handle("window:maximize", () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });
  electron.ipcMain.handle("window:close", () => {
    if (mainWindow) mainWindow.close();
  });
  electron.ipcMain.handle("window:hide", () => {
    if (mainWindow) mainWindow.hide();
  });
  const boundsX = electron.screen.getPrimaryDisplay().bounds.width;
  const boundsY = electron.screen.getPrimaryDisplay().bounds.height;
  console.log("width&&height==>:", boundsX, boundsY);
  electron.ipcMain.handle("window:setPosition", (_, x, y) => {
    if (Math.abs(x) > boundsX || Math.abs(y) > boundsY) {
      return electron.dialog.showMessageBox(mainWindow, {
        type: "info",
        // 类型: "none", "info", "error", "question", "warning"
        title: "提示信息",
        message: `设置位置x: ${x}, y: ${y}超出视口范围!`,
        buttons: ["确定"],
        defaultId: 0
      });
    } else {
      if (mainWindow) mainWindow.setPosition(x, y);
    }
  });
  electron.ipcMain.handle("window:getPosition", async () => {
    if (mainWindow) {
      const position = mainWindow.getPosition();
      return { x: position[0], y: position[1] };
    }
    return { x: 0, y: 0 };
  });
  electron.ipcMain.handle("window:isMaximized", () => {
    return mainWindow ? mainWindow.isMaximized() : false;
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  setupWindowControls();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("will-quit", () => {
  console.log("========app-quit==========");
  electron.globalShortcut.unregisterAll();
});
async function openAndReadFile(msg, options = {}) {
  const { canceled, filePaths } = await electron.dialog.showOpenDialog(mainWindow, {
    title: "选择文件",
    properties: ["openFile"],
    filters: [
      { name: "文本文件", extensions: ["txt", "json", "md"] },
      { name: "所有文件", extensions: ["*"] }
    ],
    ...options
  });
  if (canceled || filePaths.length === 0) {
    throw new Error("用户取消了文件选择");
  }
  const filePath = filePaths[0];
  const content = await fs.promises.readFile(filePath, "utf8");
  return { path: filePath, content };
}
async function saveFile(content, options = {}) {
  const { canceled, filePath } = await electron.dialog.showSaveDialog(mainWindow, {
    title: "保存文件",
    defaultPath: path.join(electron.app.getPath("documents"), "untitled.txt"),
    filters: [
      { name: "文本文件", extensions: ["txt"] },
      { name: "Markdown", extensions: ["md"] },
      { name: "JSON", extensions: ["json"] }
    ],
    ...options
  });
  if (canceled || !filePath) {
    throw new Error("用户取消了保存操作");
  }
  await fs.promises.writeFile(filePath, content, "utf8");
  return filePath;
}

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow, secondaryWindow

function createWindows() {
  // 主窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.loadFile('mainWindow.html')
  
  // 第二个窗口
  secondaryWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  secondaryWindow.loadFile('secondaryWindow.html')
  
  // 窗口关闭时清理引用
  mainWindow.on('closed', () => { mainWindow = null })
  secondaryWindow.on('closed', () => { secondaryWindow = null })
  
  // 窗口间通信示例
  setupWindowCommunication()
}

function setupWindowCommunication() {
  // 主窗口发往副窗口
  ipcMain.on('send-to-secondary', (event, message) => {
    if (secondaryWindow) {
      secondaryWindow.webContents.send('message-from-main', message)
    }
  })
  
  // 副窗口发往主窗口
  ipcMain.on('send-to-main', (event, message) => {
    if (mainWindow) {
      mainWindow.webContents.send('message-from-secondary', message)
    }
  })
}

app.whenReady().then(createWindows)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null && secondaryWindow === null) {
    createWindows()
  }
})
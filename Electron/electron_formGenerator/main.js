
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools() // 开发时打开开发者工具
}

// app.whenReady().then(createWindow)
console.log('===app-ready===')

// 添加IPC处理程序
function setupIpcHandlers() {
  ipcMain.handle('save-form', async (event, formData) => {
    const { filePath } = await dialog.showSaveDialog({
      title: '保存表单设计',
      defaultPath: 'form-design.json',
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })
    
    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(formData, null, 2))
      return true
    }
    return false
  })
  
  ipcMain.handle('load-form', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      title: '加载表单设计',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
      properties: ['openFile']
    })
    
    if (filePaths && filePaths.length > 0) {
      const data = fs.readFileSync(filePaths[0], 'utf8')
      return JSON.parse(data)
    }
    return null
  })
}

app.whenReady().then(() => {
  setupIpcHandlers()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
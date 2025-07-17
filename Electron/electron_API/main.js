const { trace } = require('console')
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const path = require('path')

let mainWindow

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
  // 窗口关闭时清理引用
  mainWindow.on('closed', () => { mainWindow = null })
  
  // 最小化窗口
  ipcMain.handle('window:minimize', () => {
    if (mainWindow) mainWindow.minimize()
  })

  // 最大化/还原窗口
  ipcMain.handle('window:maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  })
  // 设置窗口位置
  ipcMain.handle('window:setPosition', (_, x, y) => {
    if (mainWindow) {
      // 确保参数是数字
      const posX = typeof x === 'number' ? x : parseInt(x, 10)
      const posY = typeof y === 'number' ? y : parseInt(y, 10)
      mainWindow.setPosition(posX, posY)
    }
  })
  // 获取窗口位置
  ipcMain.handle('window:getPosition', async () => {
    if (mainWindow) {
      const position = mainWindow.getPosition()
      return { x: position[0], y: position[1] }
    }
    return { x: 0, y: 0 }
  })
  //设置托盘图标
  tray = new Tray(path.join(__dirname, 'database.png'));
  tray.setToolTip('我的应用');
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示', click: () => { mainWindow.show() } },
    { label: '退出', click: () => { app.quit() } }
  ])
  tray.setContextMenu(contextMenu);
  // 设置应用程序菜单
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '打开',
          accelerator: 'CmdOrCtrl+O',
          click: () => { console.log('打开文件') }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { 
          label: '重新加载',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        { 
          label: '强制重新加载',
          accelerator: 'CmdOrCtrl+Shift+R',
          role: 'forceReload'  // 使用预定义角色
        },
        { type: 'separator' },
        { 
          label: '开发者工具',
          accelerator: 'CmdOrCtrl+Shift+I',
          role: 'toggleDevTools'  // 使用预定义角色
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindows)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null ) {
    createWindows()
  }
})
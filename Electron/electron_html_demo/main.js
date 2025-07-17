const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

// 模拟数据
const products = [
    { id: 1, name: '笔记本电脑', price: 5999, stock: 15 },
    { id: 2, name: '智能手机', price: 3999, stock: 30 },
    { id: 3, name: '无线耳机', price: 599, stock: 50 },
    { id: 4, name: '智能手表', price: 1299, stock: 25 },
    { id: 5, name: '平板电脑', price: 2599, stock: 18 }
];

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'app1.png'), // 设置窗口图标
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // 设置任务栏图标（Windows）
    if (process.platform === 'win32') {
        mainWindow.setIcon(path.join(__dirname, 'app1.png'))
    }
    //设置托盘图标
      tray = new Tray(path.join(__dirname, 'app1.png'));
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
              click: () => { console.log('open_file!') }
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
      Menu.setApplicationMenu(menu);

    mainWindow.loadFile('./mainWindow.html');
}

// IPC通信处理
ipcMain.handle('get-products', () => {
    return products;
});

ipcMain.handle('delete-product', (event, id) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        return products; // 返回更新后的完整列表
    }
    return false;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
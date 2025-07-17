const { app, BrowserWindow, ipcMain } = require('electron')
const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const { startServer, stopServer } = require('./server');

let mainWindow, secondaryWindow;
let server;

function createWindows() {
  // 主窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.loadFile('mainWindow.html')
  // 窗口关闭时清理引用
  mainWindow.on('closed', () => { mainWindow = null })
  // 启动服务器
  server = startServer(3000);
  // 通过 IPC 与渲染进程通信
  ipcMain.handle('get-server-status', () => {
    return server && server.listening;
  });
  // 第二个窗口
  /* secondaryWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  secondaryWindow.loadFile('secondaryWindow.html')
  secondaryWindow.on('closed', () => { secondaryWindow = null }) */
  
  // 窗口间通信示例
  setupWindowCommunication()
  //读写文件操作的
  ipcMain.handle('read-file', async(event, msg) =>{
    try {
      const res = await openAndReadFile(msg);
      return res;
    } catch (error) {
      console.error('readerr: ', error)
      return error.message;
    }
  })
  ipcMain.handle('save-file', async(event, content) =>{
    try {
      const savePath = await saveFile(content);
      return {success: true, path: savePath}
    } catch (error) {
      console.error('saveerr: ', error)
      return { success: false, error: error.message };
    }
  })
  // 执行系统命令（适合短时间完成的命令）
  ipcMain.handle('execcmd', async(event, cmd)=> {
    // console.log({event, cmd })
      return new Promise((resolve, reject) => {
        exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行错误: ${error}`);
            return reject(error);
          }
          if (stderr) {
            console.warn(`命令输出: ${stderr}`);
          }
          resolve(stdout.trim());
        });
      });
    })
  // 注册进程执行处理器
  ipcMain.handle('execute-command', async (event, { cmd, args, options }) => {
    return new Promise((resolve, reject) => {
      const child = spawn(cmd, args, options);
console.log({ child })
      const result = {
        pid: child.pid,
        output: '',
        error: '',
        exitCode: null
      };

      child.stdout.on('data', (data) => {
        result.output += data.toString();
        // 实时发送进度到渲染进程
        event.sender.send('command-stdout', data.toString());
      });

      child.stderr.on('data', (data) => {
        result.error += data.toString();
        event.sender.send('command-stderr', data.toString());
      });

      child.on('close', (code) => {
        result.exitCode = code;
        if (code === 0) {
          resolve(result);
        } else {
          reject(result);
        }
      });

      child.on('error', (err) => {
        result.error = err.message;
        reject(result);
      });
    });
  });

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

/**
 * 打开文件选择对话框并读取文件内容
 * @param {BrowserWindow} window - 关联的浏览器窗口
 * @param {Object} [options] - 对话框选项
 * @returns {Promise<{path: string, content: string}>}
 */
async function openAndReadFile(msg, options = {}) {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: '选择文件',
    properties: ['openFile'],
    filters: [
      { name: '文本文件', extensions: ['txt', 'json', 'md'] },
      { name: '所有文件', extensions: ['*'] }
    ],
    ...options
  });

  if (canceled || filePaths.length === 0) {
    throw new Error('用户取消了文件选择');
  }

  const filePath = filePaths[0];
  const content = await fs.promises.readFile(filePath, 'utf8');
  
  return { path: filePath, content };
}

/**
 * 打开文件保存对话框并写入内容
 * @param {BrowserWindow} window - 关联的浏览器窗口
 * @param {string} content - 要保存的内容
 * @param {Object} [options] - 对话框选项
 * @returns {Promise<string>} - 返回保存的文件路径
 */
async function saveFile( content, options = {}) {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    title: '保存文件',
    defaultPath: path.join(app.getPath('documents'), 'untitled.txt'),
    filters: [
      { name: '文本文件', extensions: ['txt'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: 'JSON', extensions: ['json'] }
    ],
    ...options
  });

  if (canceled || !filePath) {
    throw new Error('用户取消了保存操作');
  }
  await fs.promises.writeFile(filePath, content, 'utf8');
  return filePath;
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
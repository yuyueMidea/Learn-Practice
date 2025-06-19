在 Electron 应用中，使用 electron-builder 进行打包时可以配置自动压缩输出文件。以下是完整的配置方案：

```
{
  "build": {
    "appId": "com.example.yourapp",
    "productName": "YourApp",
    "copyright": "Copyright © 2023 Your Company",
    
    // 压缩配置
    "compression": "maximum", // 压缩级别
    "asar": true,             // 使用 asar 归档
    
    // 各平台特定配置
    "win": {
      "target": [
        {
          "target": "nsis",   // NSIS 安装程序
          "arch": ["x64"]
        },
        {
          "target": "zip",    // 同时生成 zip
          "arch": ["x64"]
        }
      ]
    }
    
  }
}
```

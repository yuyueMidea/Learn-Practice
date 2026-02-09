# 前端工程化与自动化全面解析

## 目录

1. [前端工程化概述](#前端工程化概述)
2. [模块化开发](#模块化开发)
3. [构建工具体系](#构建工具体系)
4. [包管理与依赖](#包管理与依赖)
5. [代码规范与质量](#代码规范与质量)
6. [自动化测试](#自动化测试)
7. [持续集成与部署](#持续集成与部署)
8. [性能优化自动化](#性能优化自动化)
9. [监控与日志](#监控与日志)
10. [开发工作流](#开发工作流)
11. [最佳实践](#最佳实践)
12. [未来趋势](#未来趋势)

---

## 前端工程化概述

### 什么是前端工程化

前端工程化是指将软件工程的方法和理念应用到前端开发中，通过规范化、标准化、自动化的手段，提升开发效率、保证代码质量、优化用户体验的一系列技术和流程。

### 核心目标

#### 1. 提升开发效率
- 自动化重复性工作
- 提供开发工具链
- 优化开发体验
- 快速迭代发布

#### 2. 保证代码质量
- 统一编码规范
- 自动化测试
- 代码审查机制
- 持续集成验证

#### 3. 优化性能体验
- 资源优化压缩
- 按需加载
- 缓存策略
- 首屏优化

#### 4. 提高可维护性
- 模块化设计
- 组件化开发
- 文档自动生成
- 版本管理

### 发展历程

```
远古时期（2000-2008）
├─ 页面静态化
├─ jQuery 时代
└─ 手工维护

工具化时期（2008-2014）
├─ 任务运行器（Grunt/Gulp）
├─ 预处理器（Sass/Less）
├─ 包管理器（npm/Bower）
└─ 模块化方案（AMD/CMD）

工程化时期（2014-2020）
├─ 构建工具（Webpack/Rollup）
├─ 前端框架（React/Vue/Angular）
├─ ES6+ 标准化
├─ TypeScript
└─ CI/CD 普及

现代化时期（2020-至今）
├─ Vite/ESBuild 新一代构建
├─ Monorepo 管理
├─ 微前端架构
├─ Serverless
└─ 低代码/无代码
```

### 工程化体系架构

```
┌─────────────────────────────────────────────────────┐
│                   前端工程化体系                      │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 开发阶段 │  │ 构建阶段 │  │ 部署阶段 │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       │             │             │                  │
│  ┌────┴─────────────┴─────────────┴────┐            │
│  │          自动化流程引擎              │            │
│  │  - CI/CD  - 测试  - 发布  - 监控    │            │
│  └──────────────────────────────────────┘            │
│       │             │             │                  │
│  ┌────┴─────┐  ┌───┴──────┐  ┌──┴───────┐          │
│  │代码规范  │  │构建工具  │  │质量保障  │          │
│  │-ESLint   │  │-Webpack  │  │-单元测试 │          │
│  │-Prettier │  │-Vite     │  │-E2E测试  │          │
│  │-StyleLint│  │-Rollup   │  │-性能测试 │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 模块化开发

### 模块化的演进

#### 1. 全局函数模式（远古时期）

```javascript
// 污染全局命名空间
function getUserInfo() {
  // ...
}

function setUserInfo() {
  // ...
}
```

**问题：**
- 全局污染
- 命名冲突
- 依赖关系不明确

#### 2. 命名空间模式

```javascript
var MyApp = {
  name: 'MyApplication',
  version: '1.0.0',
  
  getUserInfo: function() {
    // ...
  },
  
  setUserInfo: function() {
    // ...
  }
};
```

**改进：**
- 减少全局变量
- 避免命名冲突

**问题：**
- 数据不安全
- 依赖关系仍不明确

#### 3. IIFE 模式（立即执行函数）

```javascript
var myModule = (function() {
  // 私有变量
  var privateVar = 'private';
  
  // 私有方法
  function privateMethod() {
    console.log(privateVar);
  }
  
  // 暴露公共接口
  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();
```

**优势：**
- 数据私有化
- 避免全局污染

#### 4. CommonJS（Node.js）

```javascript
// math.js
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  PI,
  add,
  subtract
};

// app.js
const math = require('./math');
console.log(math.add(1, 2)); // 3
console.log(math.PI); // 3.14159
```

**特点：**
- 同步加载
- 服务端使用
- 运行时加载
- 值的拷贝

#### 5. AMD（Asynchronous Module Definition）

```javascript
// 定义模块
define('math', ['jquery'], function($) {
  return {
    add: function(a, b) {
      return a + b;
    }
  };
});

// 使用模块
require(['math'], function(math) {
  console.log(math.add(1, 2));
});
```

**特点：**
- 异步加载
- 浏览器端使用
- 依赖前置
- RequireJS 实现

#### 6. CMD（Common Module Definition）

```javascript
// 定义模块
define(function(require, exports, module) {
  var $ = require('jquery');
  
  exports.add = function(a, b) {
    return a + b;
  };
});

// 使用模块
seajs.use(['math'], function(math) {
  console.log(math.add(1, 2));
});
```

**特点：**
- 异步加载
- 依赖就近
- 延迟执行
- SeaJS 实现

#### 7. UMD（Universal Module Definition）

```javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量
    root.myModule = factory(root.jQuery);
  }
}(this, function ($) {
  return {
    method: function() {
      // ...
    }
  };
}));
```

**特点：**
- 兼容多种模块规范
- 可在多种环境使用

#### 8. ES6 Module（现代标准）

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export default {
  multiply(a, b) {
    return a * b;
  }
};

// app.js
import math, { add, PI } from './math.js';

console.log(add(1, 2)); // 3
console.log(PI); // 3.14159
console.log(math.multiply(2, 3)); // 6
```

**特点：**
- 编译时加载（静态）
- 值的引用
- 支持 Tree Shaking
- 原生支持

### 模块化最佳实践

#### 1. 单一职责原则

```javascript
// ❌ 不好：一个模块做太多事
export default {
  fetchData() { },
  validateData() { },
  renderUI() { },
  handleEvents() { }
};

// ✅ 好：拆分为多个模块
// api.js
export function fetchData() { }

// validator.js
export function validateData() { }

// ui.js
export function renderUI() { }

// events.js
export function handleEvents() { }
```

#### 2. 明确的导入导出

```javascript
// ❌ 不好：导出所有
export * from './utils';

// ✅ 好：明确导出
export { formatDate, formatCurrency } from './utils';
```

#### 3. 避免循环依赖

```javascript
// ❌ 不好：循环依赖
// a.js
import { b } from './b';
export const a = b + 1;

// b.js
import { a } from './a';
export const b = a + 1;

// ✅ 好：提取公共依赖
// common.js
export const base = 1;

// a.js
import { base } from './common';
export const a = base + 1;

// b.js
import { base } from './common';
export const b = base + 2;
```

---

## 构建工具体系

### 构建工具对比

| 工具 | 发布时间 | 核心特点 | 适用场景 | 性能 |
|------|----------|----------|----------|------|
| Webpack | 2012 | 强大灵活、生态丰富 | 大型应用、复杂配置 | 中等 |
| Rollup | 2015 | Tree Shaking、ES模块 | 库打包 | 快 |
| Parcel | 2017 | 零配置、开箱即用 | 快速原型 | 快 |
| Vite | 2020 | 极速冷启动、HMR | 现代应用开发 | 极快 |
| esbuild | 2020 | Go编写、极致性能 | 构建工具底层 | 极快 |
| Turbopack | 2022 | Rust编写、增量构建 | Next.js | 极快 |

### Webpack 深度解析

#### 核心概念

```javascript
// webpack.config.js
module.exports = {
  // 1. 入口
  entry: {
    app: './src/index.js',
    vendor: './src/vendor.js'
  },
  
  // 2. 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    clean: true
  },
  
  // 3. 加载器
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  
  // 4. 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ],
  
  // 5. 优化
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  
  // 6. 解析
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
```

#### Loader 工作原理

```javascript
// 自定义 Loader
module.exports = function(source) {
  // source 是文件内容
  const options = this.getOptions();
  
  // 转换代码
  const transformedCode = transform(source, options);
  
  // 返回转换后的代码
  return transformedCode;
};

// 链式调用示例
// style-loader!css-loader!sass-loader!source.scss
// 从右到左执行：
// 1. sass-loader: scss → css
// 2. css-loader: 处理 @import 和 url()
// 3. style-loader: 将 CSS 插入到页面
```

#### Plugin 工作原理

```javascript
// 自定义 Plugin
class MyPlugin {
  apply(compiler) {
    // 在编译开始时执行
    compiler.hooks.compile.tap('MyPlugin', () => {
      console.log('编译开始');
    });
    
    // 在资源输出前执行
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // compilation 包含所有模块和资源信息
      
      // 遍历所有资源
      for (const filename in compilation.assets) {
        console.log(`生成文件: ${filename}`);
      }
      
      // 添加新资源
      compilation.assets['new-file.txt'] = {
        source: () => 'Hello World',
        size: () => 11
      };
      
      callback();
    });
    
    // 在编译完成时执行
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      console.log('编译完成');
    });
  }
}

module.exports = MyPlugin;
```

#### 高级优化配置

```javascript
// webpack.prod.js
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  
  optimization: {
    minimize: true,
    minimizer: [
      // JavaScript 压缩
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      
      // CSS 压缩
      new CssMinimizerPlugin()
    ],
    
    // 代码分割
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        // 第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        // 公共模块
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        },
        // React 相关
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          priority: 20
        }
      }
    },
    
    // 运行时代码提取
    runtimeChunk: {
      name: 'runtime'
    }
  },
  
  // 性能提示
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  
  plugins: [
    // 打包分析
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
```

### Vite 深度解析

#### 核心优势

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 插件
  plugins: [vue(), react()],
  
  // 开发服务器
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // 构建配置
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    
    // Rollup 选项
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom']
        }
      }
    },
    
    // 代码分割阈值
    chunkSizeWarningLimit: 500
  },
  
  // 路径别名
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    }
  },
  
  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
```

#### 为什么 Vite 快？

**开发环境：**
```
传统构建（Webpack）
源代码 → 全量打包 → Bundle → 开发服务器 → 浏览器
(冷启动慢：需要打包所有模块)

Vite
源代码 → 开发服务器 → 浏览器按需加载
(冷启动快：利用浏览器 ESM，按需编译)
```

**热更新（HMR）：**
```
传统 HMR
修改文件 → 重新打包相关模块 → 更新 Bundle → 刷新页面

Vite HMR
修改文件 → 精确更新该模块 → 浏览器热替换
(速度与模块数量无关)
```

### Rollup 深度解析

#### 为什么适合库打包？

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  
  // 多格式输出
  output: [
    {
      file: 'dist/my-library.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/my-library.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/my-library.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
      globals: {
        'react': 'React'
      }
    }
  ],
  
  // 外部依赖（不打包）
  external: ['react', 'react-dom'],
  
  plugins: [
    // 解析 node_modules
    resolve(),
    
    // 转换 CommonJS
    commonjs(),
    
    // TypeScript 支持
    typescript({
      tsconfig: './tsconfig.json'
    }),
    
    // Babel 转译
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    
    // 压缩
    terser()
  ],
  
  // Tree Shaking
  treeshake: {
    moduleSideEffects: false
  }
};
```

#### Tree Shaking 原理

```javascript
// utils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

// main.js
import { add } from './utils';

console.log(add(1, 2));

// 打包后只包含 add 函数
// subtract 和 multiply 被移除（Tree Shaking）
```

**条件：**
- 使用 ES6 模块语法
- 没有副作用（side effects）
- 静态分析可达性

### esbuild 深度解析

#### 为什么这么快？

**原因：**
1. **Go 语言编写**：并行处理，充分利用多核
2. **从零开始**：没有历史包袱
3. **高效算法**：优化的解析和生成算法
4. **内存效率**：减少数据转换

#### 使用示例

```javascript
// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  outfile: 'dist/bundle.js',
  
  // Loader
  loader: {
    '.js': 'jsx',
    '.png': 'dataurl'
  },
  
  // 外部依赖
  external: ['react'],
  
  // 自定义插件
  plugins: [
    {
      name: 'example',
      setup(build) {
        build.onResolve({ filter: /^env$/ }, args => ({
          path: args.path,
          namespace: 'env-ns'
        }));
        
        build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
          contents: JSON.stringify(process.env),
          loader: 'json'
        }));
      }
    }
  ]
}).catch(() => process.exit(1));
```

### 构建工具选型指南

```
项目类型决策树：

应用开发
├─ 需要快速开发体验？
│   ├─ 是 → Vite
│   └─ 否 → Webpack
│
库/组件开发
├─ 需要多格式输出？
│   ├─ 是 → Rollup
│   └─ 否 → esbuild
│
快速原型
└─ Parcel（零配置）

性能要求极致
└─ esbuild 或 Vite
```

---

## 包管理与依赖

### 包管理器对比

#### npm（Node Package Manager）

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install lodash
npm install --save-dev webpack
npm install -g typescript

# 更新依赖
npm update
npm outdated

# 清理缓存
npm cache clean --force

# 审计安全漏洞
npm audit
npm audit fix
```

**特点：**
- Node.js 官方包管理器
- 生态最完善
- 较慢的安装速度（早期版本）

#### Yarn

```bash
# 初始化
yarn init

# 安装
yarn add lodash
yarn add webpack --dev
yarn global add typescript

# 更新
yarn upgrade
yarn upgrade-interactive

# 清理
yarn cache clean

# 工作区（Monorepo）
yarn workspaces
```

**优势：**
- 更快的安装速度
- 离线模式
- 确定性安装（yarn.lock）
- 工作区支持

#### pnpm

```bash
# 安装
npm install -g pnpm

# 使用
pnpm install
pnpm add lodash
pnpm add -D webpack

# 更新
pnpm update
pnpm outdated

# Monorepo
pnpm -r run build
```

**核心优势：**
- **节省磁盘空间**：硬链接共享依赖
- **安装速度快**：并行安装
- **严格的依赖管理**：避免幻影依赖

**工作原理：**
```
传统 npm/yarn:
node_modules/
├─ package-a/
│  └─ node_modules/
│     └─ lodash/ (副本1)
└─ package-b/
   └─ node_modules/
      └─ lodash/ (副本2)

pnpm:
node_modules/
├─ .pnpm/
│  └─ lodash@4.17.21/
│     └─ node_modules/
│        └─ lodash/ (唯一真实文件)
├─ package-a -> .pnpm/package-a/...
└─ package-b -> .pnpm/package-b/...
```

### 依赖管理最佳实践

#### 1. 锁文件管理

```json
// package.json
{
  "dependencies": {
    "react": "^18.2.0"  // ^表示兼容版本
  }
}

// package-lock.json / yarn.lock / pnpm-lock.yaml
// 锁定确切版本，确保团队一致性
```

**重要性：**
- 确保所有开发者使用相同版本
- 避免"在我机器上能跑"问题
- 锁文件必须提交到版本控制

#### 2. 语义化版本（SemVer）

```
版本格式：主版本.次版本.修订版本
例如：1.2.3

主版本（Major）：不兼容的 API 变更
次版本（Minor）：向下兼容的功能新增
修订版本（Patch）：向下兼容的问题修正

版本范围：
^1.2.3  →  >=1.2.3 <2.0.0  （最常用）
~1.2.3  →  >=1.2.3 <1.3.0
1.2.x   →  >=1.2.0 <1.3.0
*       →  任意版本
1.2.3   →  精确版本
```

#### 3. 依赖分类

```json
{
  "dependencies": {
    // 生产环境依赖
    "react": "^18.2.0",
    "axios": "^1.4.0"
  },
  
  "devDependencies": {
    // 开发环境依赖
    "webpack": "^5.88.0",
    "eslint": "^8.44.0",
    "@types/react": "^18.2.14"
  },
  
  "peerDependencies": {
    // 宿主依赖（库开发）
    "react": ">=16.8.0"
  },
  
  "optionalDependencies": {
    // 可选依赖
    "fsevents": "^2.3.2"
  }
}
```

#### 4. Monorepo 管理

**使用 pnpm workspaces：**

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// package.json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "dev": "pnpm --filter @myapp/web dev"
  }
}

// packages/shared/package.json
{
  "name": "@myapp/shared",
  "version": "1.0.0"
}

// apps/web/package.json
{
  "name": "@myapp/web",
  "dependencies": {
    "@myapp/shared": "workspace:*"
  }
}
```

**使用 Turborepo：**

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

#### 5. 依赖安全

```bash
# npm 审计
npm audit
npm audit fix

# 使用 Snyk
npm install -g snyk
snyk test
snyk monitor

# 定期更新依赖
npm outdated
npm update

# 使用 Renovate 或 Dependabot 自动更新
```

#### 6. 私有包管理

```bash
# 发布到 npm
npm login
npm publish

# 使用私有仓库
npm config set registry https://registry.company.com/

# .npmrc 配置
registry=https://registry.npmjs.org/
@mycompany:registry=https://npm.company.com/
//npm.company.com/:_authToken=${NPM_TOKEN}
```

---

## 代码规范与质量

### ESLint 配置

#### 基础配置

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  
  // 环境
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  
  // 解析器
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  
  // 继承规则集
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier' // 必须放在最后
  ],
  
  // 插件
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'import'
  ],
  
  // 自定义规则
  rules: {
    // 通用规则
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    
    // React 规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import 规则
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc'
      }
    }]
  },
  
  // 设置
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

#### 高级配置

```javascript
// .eslintrc.js
module.exports = {
  // ... 基础配置
  
  // 覆盖特定文件
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true
      },
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['*.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  
  // 忽略模式
  ignorePatterns: [
    'dist',
    'build',
    'node_modules',
    '*.min.js'
  ]
};
```

### Prettier 配置

```javascript
// .prettierrc.js
module.exports = {
  // 行宽
  printWidth: 80,
  
  // 缩进
  tabWidth: 2,
  useTabs: false,
  
  // 分号
  semi: true,
  
  // 引号
  singleQuote: true,
  quoteProps: 'as-needed',
  
  // JSX
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  
  // 尾随逗号
  trailingComma: 'es5',
  
  // 括号空格
  bracketSpacing: true,
  
  // 箭头函数参数
  arrowParens: 'always',
  
  // 换行符
  endOfLine: 'lf',
  
  // 文件覆盖
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120
      }
    }
  ]
};
```

### StyleLint 配置

```javascript
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier'
  ],
  
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  
  rules: {
    // 颜色
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,
    
    // 字体
    'font-family-no-missing-generic-family-keyword': true,
    
    // 选择器
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-pseudo-class-no-unknown': true,
    
    // 属性
    'property-no-unknown': true,
    'declaration-block-no-duplicate-properties': true,
    
    // 顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'display',
      'flex',
      'width',
      'height',
      // ... 更多属性
    ]
  }
};
```

### Git Hooks

#### 使用 Husky

```bash
# 安装
npm install --save-dev husky
npx husky install
npm set-script prepare "husky install"

# 添加 hook
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

#### 使用 lint-staged

```javascript
// .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{css,scss,less}': [
    'stylelint --fix',
    'prettier --write'
  ],
  '*.{json,md}': [
    'prettier --write'
  ]
};
```

### Commitlint 配置

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  
  rules: {
    'type-enum': [2, 'always', [
      'feat',     // 新功能
      'fix',      // 修复
      'docs',     // 文档
      'style',    // 格式
      'refactor', // 重构
      'perf',     // 性能
      'test',     // 测试
      'chore',    // 构建/工具
      'revert'    // 回退
    ]],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 100]
  }
};
```

**规范的提交信息：**
```bash
feat: 添加用户登录功能
fix: 修复购物车计算错误
docs: 更新 README
style: 格式化代码
refactor: 重构支付模块
perf: 优化列表渲染性能
test: 添加单元测试
chore: 升级依赖版本
```

### TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    // 目标和模块
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    
    // 模块解析
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    
    // 输出
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    // 类型检查
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    
    // JSX
    "jsx": "react-jsx",
    
    // 路径
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },
    
    // 其他
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

---

## 自动化测试

### 测试金字塔

```
        /\
       /  \
      / E2E \        少量：端到端测试
     /______\
    /        \
   /  集成测试  \     适量：组件/模块集成
  /____________\
 /              \
/   单元测试      \   大量：函数/方法测试
/__________________\
```

### 单元测试

#### Jest 配置

```javascript
// jest.config.js
module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 根目录
  rootDir: '.',
  
  // 测试匹配模式
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // 模块路径别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // 转换
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // 覆盖率
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/index.tsx'
  ],
  
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 设置文件
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
```

#### 测试示例

```typescript
// sum.ts
export function sum(a: number, b: number): number {
  return a + b;
}

// sum.test.ts
import { sum } from './sum';

describe('sum', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0, 0)).toBe(0);
  });
  
  it('should handle decimal numbers', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
```

#### React 组件测试

```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

#### Hooks 测试

```typescript
// useCounter.ts
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(7);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});
```

### 集成测试

```typescript
// UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserProfile } from './UserProfile';

// Mock API 服务器
const server = setupServer(
  rest.get('/api/user/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id,
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile', () => {
  it('should fetch and display user data', async () => {
    render(<UserProfile userId="123" />);
    
    // 加载状态
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // 等待数据加载
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });
  
  it('should handle API errors', async () => {
    server.use(
      rest.get('/api/user/:id', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<UserProfile userId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error loading user')).toBeInTheDocument();
    });
  });
});
```

### E2E 测试

#### Playwright 配置

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  
  // 超时
  timeout: 30 * 1000,
  
  // 重试
  retries: process.env.CI ? 2 : 0,
  
  // 并发
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  
  use: {
    // Base URL
    baseURL: 'http://localhost:3000',
    
    // 截图
    screenshot: 'only-on-failure',
    
    // 视频
    video: 'retain-on-failure',
    
    // Trace
    trace: 'on-first-retry'
  },
  
  // 项目
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  
  // Web Server
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

#### E2E 测试示例

```typescript
// login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  
  test('should display login form', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
  
  test('should login successfully', async ({ page }) => {
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
  
  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
  
  test('should validate required fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});
```

### 视觉回归测试

```typescript
// visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage should match screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png');
  });
  
  test('button states', async ({ page }) => {
    await page.goto('/components/button');
    
    const button = page.getByRole('button');
    
    // 正常状态
    await expect(button).toHaveScreenshot('button-normal.png');
    
    // Hover 状态
    await button.hover();
    await expect(button).toHaveScreenshot('button-hover.png');
    
    // 禁用状态
    await button.evaluate((el) => el.setAttribute('disabled', ''));
    await expect(button).toHaveScreenshot('button-disabled.png');
  });
});
```

### 性能测试

```typescript
// performance.spec.ts
import { test, expect } from '@playwright/test';

test('page load performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3秒内加载
  
  // Web Vitals
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {};
        
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
          }
          if (entry.name === 'largest-contentful-paint') {
            vitals.LCP = entry.startTime;
          }
        });
        
        resolve(vitals);
      }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    });
  });
  
  expect(metrics.FCP).toBeLessThan(1800);
  expect(metrics.LCP).toBeLessThan(2500);
});
```

---

## 持续集成与部署

### CI/CD 概念

```
持续集成（CI）
代码提交 → 自动构建 → 自动测试 → 反馈结果

持续部署（CD）
测试通过 → 自动部署 → 环境验证 → 上线发布

持续交付（CD）
测试通过 → 手动批准 → 部署上线
```

### GitHub Actions

#### 基础工作流

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Test
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-${{ matrix.node-version }}
          path: dist/
```

#### 部署工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      
      - name: Install and build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

#### E2E 测试工作流

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  pull_request:
    branches: [main]

jobs:
  e2e-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - install
  - lint
  - test
  - build
  - deploy

# 缓存
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

# 安装依赖
install:
  stage: install
  script:
    - npm ci --cache .npm --prefer-offline
  artifacts:
    paths:
      - node_modules/

# 代码检查
lint:
  stage: lint
  dependencies:
    - install
  script:
    - npm run lint
    - npm run type-check

# 测试
test:
  stage: test
  dependencies:
    - install
  script:
    - npm run test:coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# 构建
build:
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

# 部署到测试环境
deploy:staging:
  stage: deploy
  dependencies:
    - build
  script:
    - npm run deploy:staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

# 部署到生产环境
deploy:production:
  stage: deploy
  dependencies:
    - build
  script:
    - npm run deploy:production
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual  # 手动触发
```

### Docker 化部署

#### Dockerfile

```dockerfile
# 多阶段构建
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装 pnpm 和依赖
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# 生产镜像
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx 配置

```nginx
# nginx.conf
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
    
    # 缓存策略
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
    networks:
      - app-network
  
  backend:
    image: backend:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
    networks:
      - app-network
  
  db:
    image: postgres:14-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### 部署策略

#### 蓝绿部署

```yaml
# k8s-blue-green.yml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
    version: blue  # 切换为 green 实现蓝绿部署
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: blue
  template:
    metadata:
      labels:
        app: frontend
        version: blue
    spec:
      containers:
      - name: frontend
        image: myapp:1.0.0
        ports:
        - containerPort: 80

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: green
  template:
    metadata:
      labels:
        app: frontend
        version: green
    spec:
      containers:
      - name: frontend
        image: myapp:2.0.0
        ports:
        - containerPort: 80
```

#### 金丝雀发布

```yaml
# k8s-canary.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-stable
spec:
  replicas: 9  # 90% 流量
  template:
    metadata:
      labels:
        app: frontend
        track: stable
    spec:
      containers:
      - name: frontend
        image: myapp:1.0.0

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-canary
spec:
  replicas: 1  # 10% 流量
  template:
    metadata:
      labels:
        app: frontend
        track: canary
    spec:
      containers:
      - name: frontend
        image: myapp:2.0.0
```

---

## 性能优化自动化

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### Bundle 分析自动化

```javascript
// webpack.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // ...
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  ]
};
```

```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:ci": "webpack-bundle-analyzer dist/stats.json"
  }
}
```

### 性能预算

```javascript
// webpack.config.js
module.exports = {
  performance: {
    maxEntrypointSize: 250000, // 250kb
    maxAssetSize: 250000,
    hints: 'error',
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
};
```

### 图片优化自动化

```javascript
// webpack.config.js
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false
                    }
                  ]
                }
              ]
            ]
          }
        }
      })
    ]
  }
};
```

---

## 监控与日志

### 前端监控体系

```
性能监控
├─ 页面加载时间
├─ 资源加载时间
├─ API 请求时间
└─ Web Vitals

错误监控
├─ JavaScript 错误
├─ 资源加载错误
├─ API 请求错误
└─ Promise rejection

用户行为监控
├─ PV/UV
├─ 用户路径
├─ 点击热力图
└─ 停留时长
```

### Sentry 集成

```typescript
// sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
  
  // 性能监控
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  
  // 采样率
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // 过滤
  beforeSend(event, hint) {
    // 过滤第三方错误
    if (event.exception) {
      const error = hint.originalException;
      if (error && error.message.includes('third-party')) {
        return null;
      }
    }
    return event;
  },
  
  // 用户信息
  initialScope: {
    user: {
      id: getUserId(),
      username: getUsername(),
      email: getUserEmail()
    }
  }
});
```

### 性能监控

```typescript
// performance.ts
class PerformanceMonitor {
  // 监控页面加载
  static monitorPageLoad() {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcpTime = perfData.connectEnd - perfData.connectStart;
      const requestTime = perfData.responseEnd - perfData.requestStart;
      
      this.report({
        type: 'pageLoad',
        pageLoadTime,
        domReadyTime,
        dnsTime,
        tcpTime,
        requestTime
      });
    });
  }
  
  // 监控 Web Vitals
  static monitorWebVitals() {
    // FCP - First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.report({
            type: 'FCP',
            value: entry.startTime
          });
        }
      }
    }).observe({ entryTypes: ['paint'] });
    
    // LCP - Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.report({
        type: 'LCP',
        value: lastEntry.startTime
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      this.report({
        type: 'CLS',
        value: clsValue
      });
    }).observe({ entryTypes: ['layout-shift'] });
    
    // FID - First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.report({
          type: 'FID',
          value: entry.processingStart - entry.startTime
        });
      }
    }).observe({ entryTypes: ['first-input'] });
  }
  
  // 监控资源加载
  static monitorResources() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {  // 超过1秒的资源
          this.report({
            type: 'slowResource',
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize
          });
        }
      }
    }).observe({ entryTypes: ['resource'] });
  }
  
  // 上报数据
  static report(data) {
    // 使用 sendBeacon 确保数据发送
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    
    navigator.sendBeacon('/api/monitor', blob);
  }
}

// 初始化监控
PerformanceMonitor.monitorPageLoad();
PerformanceMonitor.monitorWebVitals();
PerformanceMonitor.monitorResources();
```

### 错误监控

```typescript
// error-monitor.ts
class ErrorMonitor {
  static init() {
    // JavaScript 错误
    window.addEventListener('error', (event) => {
      this.reportError({
        type: 'jsError',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
      });
    });
    
    // Promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        type: 'promiseRejection',
        reason: event.reason,
        promise: event.promise
      });
    });
    
    // 资源加载错误
    window.addEventListener('error', (event) => {
      const target = event.target;
      if (target !== window) {
        this.reportError({
          type: 'resourceError',
          tagName: target.tagName,
          src: target.src || target.href
        });
      }
    }, true);
  }
  
  static reportError(error) {
    fetch('/api/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...error,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      })
    }).catch(() => {
      // 错误上报失败，使用 sendBeacon
      navigator.sendBeacon('/api/error', JSON.stringify(error));
    });
  }
}

ErrorMonitor.init();
```

### 用户行为追踪

```typescript
// analytics.ts
class Analytics {
  static track(eventName: string, properties?: any) {
    const data = {
      event: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now()
      },
      user: this.getUserInfo()
    };
    
    this.send(data);
  }
  
  static pageView() {
    this.track('pageView', {
      title: document.title,
      path: window.location.pathname
    });
  }
  
  static click(element: HTMLElement) {
    this.track('click', {
      tagName: element.tagName,
      className: element.className,
      id: element.id,
      text: element.textContent?.slice(0, 100)
    });
  }
  
  static apiCall(url: string, method: string, duration: number, status: number) {
    this.track('apiCall', {
      url,
      method,
      duration,
      status
    });
  }
  
  private static getUserInfo() {
    return {
      userId: localStorage.getItem('userId'),
      sessionId: this.getSessionId(),
      deviceId: this.getDeviceId()
    };
  }
  
  private static getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
  
  private static getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = this.generateId();
      localStorage.getItem('deviceId', deviceId);
    }
    return deviceId;
  }
  
  private static generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  private static send(data: any) {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    navigator.sendBeacon('/api/analytics', blob);
  }
}

// 自动追踪页面浏览
Analytics.pageView();

// 自动追踪点击
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.dataset.track) {
    Analytics.click(target);
  }
});
```

---

## 开发工作流

### Git 工作流

#### Git Flow

```
master (生产)
  └─ hotfix/* (紧急修复)

develop (开发)
  ├─ feature/* (新功能)
  ├─ release/* (发布)
  └─ bugfix/* (修复)
```

```bash
# 开始新功能
git checkout -b feature/user-login develop

# 完成功能
git checkout develop
git merge --no-ff feature/user-login
git branch -d feature/user-login

# 发布版本
git checkout -b release/1.2.0 develop
# 修复bug、更新版本号
git checkout master
git merge --no-ff release/1.2.0
git tag -a 1.2.0

git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
```

#### GitHub Flow

```
main (生产)
  └─ feature-branch (功能分支)
      ├─ 创建PR
      ├─ 代码审查
      ├─ CI测试
      └─ 合并到main
```

### 代码审查

#### PR 模板

```markdown
<!-- .github/pull_request_template.md -->
## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 重构
- [ ] 性能优化

## 变更描述
简要描述这个 PR 的改动

## 相关 Issue
Closes #123

## 测试
- [ ] 单元测试
- [ ] 集成测试
- [ ] 手动测试

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 无破坏性变更

## 截图（如适用）

## 附加说明
```

#### Code Review 指南

```markdown
# Code Review 检查项

## 代码质量
- [ ] 代码可读性好
- [ ] 命名规范合理
- [ ] 无重复代码
- [ ] 遵循 SOLID 原则

## 功能实现
- [ ] 功能符合需求
- [ ] 边界条件处理
- [ ] 错误处理完善
- [ ] 性能考虑

## 测试
- [ ] 测试覆盖充分
- [ ] 测试用例合理
- [ ] 边界测试

## 安全性
- [ ] 无安全漏洞
- [ ] 输入验证
- [ ] XSS 防护
- [ ] CSRF 防护

## 文档
- [ ] 注释清晰
- [ ] README 更新
- [ ] API 文档更新
```

### 版本管理

#### Semantic Versioning

```bash
# 使用 standard-version
npm install --save-dev standard-version

# package.json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}

# 执行发布
npm run release

# 自动更新版本号、生成 CHANGELOG、创建 git tag
```

#### 变更日志自动生成

```markdown
# CHANGELOG.md (自动生成)

## [1.2.0](https://github.com/user/repo/compare/v1.1.0...v1.2.0) (2024-02-09)

### Features

* 添加用户登录功能 ([a1b2c3d](https://github.com/user/repo/commit/a1b2c3d))
* 支持多语言切换 ([e4f5g6h](https://github.com/user/repo/commit/e4f5g6h))

### Bug Fixes

* 修复购物车计算错误 ([i7j8k9l](https://github.com/user/repo/commit/i7j8k9l))

### Performance Improvements

* 优化列表渲染性能 ([m0n1o2p](https://github.com/user/repo/commit/m0n1o2p))
```

---

## 最佳实践

### 项目结构

```
my-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── pull_request_template.md
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── index.ts
│   │   └── dashboard/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   └── index.tsx
├── tests/
│   ├── e2e/
│   └── setup.ts
├── .eslintrc.js
├── .prettierrc.js
├── .stylelintrc.js
├── commitlint.config.js
├── jest.config.js
├── playwright.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

### 环境变量管理

```bash
# .env.example
VITE_API_URL=
VITE_APP_NAME=
VITE_SENTRY_DSN=

# .env.development
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My App (Dev)
VITE_SENTRY_DSN=

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

```typescript
// env.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};
```

### 多环境配置

```javascript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
    
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true
        }
      }
    },
    
    build: {
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom']
          }
        }
      }
    }
  };
});
```

### 文档自动化

```typescript
// 使用 TypeDoc 生成API文档
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}

// package.json
{
  "scripts": {
    "docs": "typedoc --out docs src/index.ts"
  }
}
```

```javascript
// 使用 Storybook 组件文档
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ]
};
```

---

## 未来趋势

### 1. AI 辅助开发

**代码生成：**
- GitHub Copilot
- ChatGPT Code Interpreter
- Amazon CodeWhisperer

**自动化测试生成：**
- AI 生成测试用例
- 智能断言推荐

**代码审查助手：**
- 自动发现问题
- 优化建议

### 2. Rust 工具链

**新一代构建工具：**
- SWC（替代 Babel）
- Turbopack（替代 Webpack）
- Rspack
- Oxc

**优势：**
- 极致性能
- 更快的构建速度
- 更好的并行处理

### 3. 边缘计算

**Edge Functions：**
- Cloudflare Workers
- Vercel Edge Functions
- Netlify Edge Functions

**优势：**
- 更低的延迟
- 更好的性能
- 全球分发

### 4. Web 组件标准化

**Web Components：**
- Custom Elements
- Shadow DOM
- HTML Templates

**框架无关：**
- 跨框架复用
- 标准化组件

### 5. 微前端演进

**Module Federation：**
- Webpack 5 原生支持
- 运行时集成
- 独立部署

**应用场景：**
- 大型应用拆分
- 团队独立开发
- 渐进式迁移

### 6. Serverless 架构

**Backend for Frontend：**
- API 聚合
- 数据预处理
- 权限控制

**优势：**
- 无服务器运维
- 按需付费
- 自动扩展

### 7. 低代码/无代码

**可视化开发：**
- 拖拽式界面
- 配置化开发
- 快速原型

**AI 驱动：**
- 自然语言生成代码
- 智能组件推荐

### 8. Web Assembly

**性能关键任务：**
- 图像/视频处理
- 加密算法
- 游戏引擎

**多语言支持：**
- Rust
- C/C++
- Go

---

## 总结

### 工程化的核心价值

1. **提升效率**：自动化重复工作，让开发者专注于业务逻辑
2. **保证质量**：通过规范和自动化测试，确保代码质量
3. **降低风险**：CI/CD 流程减少人为错误
4. **提高协作**：统一的规范和流程促进团队协作

### 实施路径

```
阶段一：基础设施
├─ 选择构建工具
├─ 配置代码规范
├─ 搭建测试框架
└─ 版本控制规范

阶段二：自动化流程
├─ 配置 CI/CD
├─ 自动化测试
├─ 自动化部署
└─ 监控告警

阶段三：优化提升
├─ 性能优化
├─ 安全加固
├─ 文档完善
└─ 持续改进
```

### 关键原则

1. **渐进式引入**：不要一次性引入所有工具和流程
2. **团队共识**：确保团队成员理解并认同
3. **持续优化**：根据实际情况不断调整
4. **适度工程化**：避免过度工程化

### 常见误区

- ❌ 盲目追求新技术
- ❌ 过度配置和优化
- ❌ 忽视团队学习成本
- ❌ 工具堆砌而无实际收益

### 推荐学习路径

1. **掌握基础**：模块化、构建工具、包管理
2. **学习规范**：代码规范、Git 工作流
3. **实践自动化**：CI/CD、自动化测试
4. **深入优化**：性能优化、监控
5. **探索前沿**：关注新技术趋势

---

## 参考资源

### 官方文档

- [Webpack](https://webpack.js.org/)
- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [esbuild](https://esbuild.github.io/)
- [pnpm](https://pnpm.io/)

### 测试工具

- [Jest](https://jestjs.io/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)

### CI/CD

- [GitHub Actions](https://docs.github.com/actions)
- [GitLab CI](https://docs.gitlab.com/ee/ci/)
- [CircleCI](https://circleci.com/docs/)

### 监控工具

- [Sentry](https://sentry.io/)
- [Datadog](https://www.datadoghq.com/)
- [New Relic](https://newrelic.com/)

### 社区资源

- [前端工程化实践指南](https://github.com/fouber/blog)
- [awesome-frontend-engineering](https://github.com/topics/frontend-engineering)

---

**文档版本：** v1.0  
**更新日期：** 2024-02-09  
**作者：** Claude  
**许可：** CC BY-NC-SA 4.0

---

*本文档全面介绍了前端工程化与自动化的理论、实践和未来趋势，旨在帮助开发者构建高效、可靠的前端工程体系。*
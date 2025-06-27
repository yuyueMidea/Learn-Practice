## 使用vite 进行打包优化，更小的体积

Vite 是一个现代化的前端构建工具，它利用浏览器原生 ES 模块导入（ESM）的特性，提供了极快的开发服务器启动和热更新。在生产打包时，Vite 使用 Rollup 进行构建，因此我们可以利用 Rollup 的优化能力以及 Vite 提供的一些配置选项来减小打包体积。

以下是一些优化 Vite 打包体积的常用方法：

- **启用 Tree Shaking**
- Vite 默认使用 Rollup 进行构建，Rollup 具有优秀的 Tree Shaking 能力，它会自动移除未使用的代码。确保你的代码是 ES 模块格式（使用 `import` 和 `export`）以便 Rollup 能够正确分析依赖。

- **代码分割（Code Splitting）**
- 通过代码分割，可以将代码拆分成多个小块，按需加载。Vite 默认支持代码分割，但你可以进一步配置：

## 使用vite 进行打包优化，更小的体积

Vite 是一个现代化的前端构建工具，它利用浏览器原生 ES 模块导入（ESM）的特性，提供了极快的开发服务器启动和热更新。在生产打包时，Vite 使用 Rollup 进行构建，因此我们可以利用 Rollup 的优化能力以及 Vite 提供的一些配置选项来减小打包体积。

以下是一些优化 Vite 打包体积的常用方法：

- **启用 Tree Shaking**
- Vite 默认使用 Rollup 进行构建，Rollup 具有优秀的 Tree Shaking 能力，它会自动移除未使用的代码。确保你的代码是 ES 模块格式（使用 `import` 和 `export`）以便 Rollup 能够正确分析依赖。

- **代码分割（Code Splitting）**
- 通过代码分割，可以将代码拆分成多个小块，按需加载。Vite 默认支持代码分割，但你可以进一步配置...

- **压缩资源**
- Vite 默认使用 Terser 来压缩 JavaScript，使用 `vite-plugin-compression` 插件可以进一步压缩资源（如 gzip 或 brotli）：`npm install vite-plugin-compression -D`

- **使用更小的库**
-  尽可能选择体积更小的库。例如，使用 `dayjs` 替代 `moment.js`，使用 `preact` 替代 `react` 等。

-  **分析打包体积**
-  使用 `rollup-plugin-visualizer` 来分析打包后的体积，找出可以优化的模块：`npm install rollup-plugin-visualizer -D`

-  **图片压缩**
-  使用 `vite-plugin-imagemin` 插件压缩图片：`npm install vite-plugin-imagemin -D`

- **排除 Polyfill**
- 现代浏览器已经支持大多数现代特性，因此避免引入不必要的 polyfill。你可以使用 `@vitejs/plugin-legacy` 插件只为旧浏览器提供 polyfill，这样现代浏览器可以加载更小的包。 `npm install @vitejs/plugin-legacy -D`

- **启用 CSS 代码分割**
- Vite 默认将 CSS 提取到单独的文件中。确保 `build.cssCodeSplit` 为 `true`（默认值）以进行 CSS 代码分割。

- **使用动态导入**
- 在代码中，对于非首屏需要的模块，使用动态导入（`import()`）来实现按需加载。

- **服务端渲染（SSR）**
- 如果应用适合，使用 SSR 可以减少客户端加载的代码量。


## 要优化 Vite 打包体积，减少最终产物的尺寸，可以通过以下策略实现：
- 代码压缩与优化

- Tree Shaking（自动启用）

- 代码分割与懒加载
```
// 动态导入（按需加载）
const module = import('./heavy-module.js');

// 路由懒加载（Vue/React）
// Vue Router
{ path: '/home', component: () => import('@/views/Home.vue') }
```





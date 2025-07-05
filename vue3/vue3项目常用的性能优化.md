在使用 Vue 3 开发管理系统时，为了提升用户体验和加载速度，需要从多个维度进行性能优化。以下是常见的优化策略，包含懒加载、资源压缩、缓存策略、首屏优化等方面：

- 路由懒加载，（按需加载）避免一次性加载所有页面，减少初始包体积；
```
// router/index.js
const UserPage = () => import('@/views/UserPage.vue');
const routes = [
  { path: '/user', component: UserPage }
];

```
- 组件懒加载 + 动态导入；对于较大的组件，按需异步引入；
```
<script setup>
import { defineAsyncComponent } from 'vue';

const BigComponent = defineAsyncComponent(() => import('@/components/BigComponent.vue'));
</script>
```
- 代码分割（Webpack/Vite 自动支持）: vue3 + vite 支持自动进行代码分割，可配合懒加载使用，确保开启 build.ssr: false 和 build.rollupOptions.output.manualChunks 做更细粒度拆分。
- 静态资源压缩与优化，开启Gzip 压缩；使用 Vite 插件如 vite-plugin-compression：
```
// vite.config.js
import viteCompression from 'vite-plugin-compression';

export default {
  plugins: [viteCompression()]
};
```
- 图片优化：（1）使用WebP 格式图片；（2）小图使用Base64；（3）使用懒加载库 如lazysizes `<img v-lazy="imgUrl" />`;
- 首屏加载优化：（1）减少首屏依赖，避免加载不必要组件，（2）使用骨架屏；（3）首页关键资源预加载 `<link rel="preload">` 或 vite 中配置 `build.rollupOptions.output.inlineDynamicImports`；

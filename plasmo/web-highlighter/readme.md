📦 项目总结

1️⃣ 网页高亮工具

一个智能的文本高亮扩展，支持：
- 🎨 6种预设颜色选择
- 💾 自动保存高亮内容
- 🔍 按页面管理高亮
- 📊 查看所有高亮统计
- ♻️ 刷新页面后自动恢复高亮

核心技术点：
- Content Script 实现 DOM 操作
- Storage API 持久化数据
- React Hooks 管理状态
- 消息通信实现跨组件交互

启动指南：
```
# 创建项目
pnpm create plasmo web-highlighter
cd web-highlighter

# 安装依赖
pnpm install
pnpm install @plasmohq/storage @plasmohq/messaging
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

运行项目:
```
# 开发模式
pnpm dev

# 构建生产版本
pnpm build
```

加载到浏览器
- 打开 Chrome，访问 chrome://extensions/
- 启用"开发者模式"
- 点击"加载已解压的扩展程序"
- 选择 build/chrome-mv3-dev 文件夹

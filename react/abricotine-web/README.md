# Abricotine Web (React) — 行内预览 Markdown 编辑器（前端版）

> 目标：参考 Abricotine 的“行内预览”理念，用 Web 前端（React）实现一个可管理多文档的 Markdown 编辑系统。

## 功能清单（已实现）

- ✅ 多文档管理：新建 / 重命名 / 删除，LocalStorage 持久化
- ✅ 核心编辑体验：CodeMirror 6 + Markdown 语法高亮
- ✅ 行内预览（轻量版）：在编辑区把
  - 任务列表 `- [ ]` / `- [x]`
  - 图片语法 `![](url)`
  替换成小组件（Widget），更接近“编辑即预览”
- ✅ 实时渲染预览：右侧安全 HTML 预览（markdown-it + DOMPurify）
- ✅ 数学公式：KaTeX（行内/块级）
- ✅ 代码高亮：highlight.js
- ✅ 无干扰：可自行拓展全屏模式（当前通过浏览器全屏即可）
- ✅ 辅助工具：
  - 显示隐藏字符（highlightSpecialChars）
  - 搜索/替换（Ctrl/⌘-F，CodeMirror search）
  - 表格工具：快速生成并插入 Markdown 表格
- ✅ 导航：
  - 目录/大纲：从 `#..######` 解析并可一键跳转预览位置
- ✅ 自定义：
  - 主题切换（亮/暗）
  - 代码字体支持连字（用户自行安装 Fira Code 等）
- ✅ 导出：
  - HTML：直接下载
  - DOCX：浏览器端转换下载
  - PDF：打开打印窗口，使用“另存为 PDF”

## 本地启动

```bash
npm i
npm run dev
```

构建与预览：

```bash
npm run build
npm run preview
```

## 说明：关于 Pandoc 与“后处理器”

Abricotine 桌面端导出依赖 Pandoc。浏览器端无法直接调用系统 Pandoc，因此这里采用纯前端导出方案。
如需“Pandoc 全格式导出 + 后处理任务链”，推荐做一个轻量后端（Node/Go/Python）：
- 前端上传 Markdown
- 后端调用 Pandoc 输出（PDF/ODT/EPUB…）
- 后端执行用户配置的 post-processor（脚本/插件）
- 返回文件给前端下载

你可以把本项目作为前端 UI 的基础，后续接入导出服务。


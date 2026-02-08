import { saveAs } from "file-saver";
import { renderMarkdownToSafeHtml } from "./markdown";
import type { ExportFormat } from "./types";

function wrapHtml(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<style>
  body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; margin: 28px;}
  pre{background: #f3f4f6; padding: 12px; border-radius: 12px; overflow:auto}
  code{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;}
  img{max-width: 100%;}
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function exportDoc(title: string, markdown: string, format: ExportFormat) {
  const bodyHtml = renderMarkdownToSafeHtml(markdown);
  const html = wrapHtml(title, bodyHtml);

  if (format === "html") {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, `${safeName(title)}.html`);
    return;
  }

  if (format === "pdf") {
    // 浏览器端最稳定的方式：用新窗口打开可打印的 HTML，让用户选择“另存为 PDF”
    const w = window.open("", "_blank");
    if (!w) throw new Error("无法打开新窗口（可能被浏览器拦截）。");
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    // 给资源一点点时间加载（字体/图片）
    setTimeout(() => w.print(), 350);
    return;
  }

  if (format === "docx") {
    // ⚠️ html-to-docx 在纯浏览器环境中经常因依赖（xmlbuilder2 等）报错，
    //     如果顶层 import 会导致页面启动即崩溃（你看到的空白页）。
    // 这里改为“按需动态加载 + 失败降级”，避免影响主页面。
    try {
      const mod: any = await import("html-to-docx");
      const htmlToDocx = mod?.default ?? mod;
      const docxBlob = await htmlToDocx(html, undefined, {
        table: { row: { cantSplit: true } },
        footer: false,
        pageNumber: false,
      });
      saveAs(docxBlob, `${safeName(title)}.docx`);
      return;
    } catch (err) {
      // 降级：导出为 Word 可打开的 .doc（HTML 伪装）
      // 兼容性最好，不依赖 Node polyfill
      console.warn("[exportDoc] html-to-docx not supported in this browser build, fallback to .doc", err);
      const wordHtml =
        `<!doctype html><html><head><meta charset="utf-8">` +
        `<title>${escapeHtml(title)}</title>` +
        `</head><body>${renderMarkdownToSafeHtml(markdown)}</body></html>`;
      const blob = new Blob([wordHtml], { type: "application/msword;charset=utf-8" });
      saveAs(blob, `${safeName(title)}.doc`);
      return;
    }
  }
}

function safeName(name: string) {
  return name.trim().replace(/[\\/:*?"<>|]+/g, "_").slice(0, 80) || "document";
}

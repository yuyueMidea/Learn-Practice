import React, { useEffect, useMemo, useState } from "react";
import FileList from "./components/FileList";
import MarkdownEditor from "./components/MarkdownEditor";
import Outline from "./components/Outline";
import TableTool from "./components/TableTool";
import { renderMarkdownToSafeHtml, extractHeadings } from "./lib/markdown";
import type { AppSettings, Doc, ExportFormat } from "./lib/types";
import {
  createDoc,
  getActiveDocId,
  loadDocs,
  loadSettings,
  saveDocs,
  saveSettings,
  setActiveDocId,
  updateDoc,
} from "./lib/storage";
import { exportDoc } from "./lib/exporter";

export default function App() {
  const [docs, setDocs] = useState<Doc[]>(() => loadDocs());
  const [activeId, setActiveId] = useState<string | null>(() => getActiveDocId());
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [showTableTool, setShowTableTool] = useState(false);
  const [status, setStatus] = useState<string>("");

  const activeDoc = useMemo(() => docs.find((d) => d.id === activeId) ?? null, [docs, activeId]);

  // bootstrap
  useEffect(() => {
    if (docs.length === 0) {
      const d = createDoc("欢迎使用");
      setDocs([d]);
      setActiveId(d.id);
      setActiveDocId(d.id);
      saveDocs([d]);
    } else if (!activeId) {
      const id = docs.slice().sort((a, b) => b.updatedAt - a.updatedAt)[0]?.id ?? null;
      setActiveId(id);
      if (id) setActiveDocId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // theme
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    saveSettings(settings);
  }, [settings]);

  // persist docs
  useEffect(() => {
    saveDocs(docs);
  }, [docs]);

  const headings = useMemo(() => extractHeadings(activeDoc?.content ?? ""), [activeDoc?.content]);
  const previewHtml = useMemo(() => renderMarkdownToSafeHtml(activeDoc?.content ?? ""), [activeDoc?.content]);

  const setDocContent = (content: string) => {
    if (!activeDoc) return;
    const updated = updateDoc(activeDoc, { content });
    setDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    if (settings.autosave) setStatus("已自动保存");
    else setStatus("未保存（已在内存中修改）");
    clearStatusLater();
  };

  const clearStatusLater = () => {
    window.clearTimeout((clearStatusLater as any)._t);
    (clearStatusLater as any)._t = window.setTimeout(() => setStatus(""), 1400);
  };

  const newDoc = () => {
    const name = prompt("文档标题：", "新建文档");
    if (!name) return;
    const d = createDoc(name.trim());
    setDocs((prev) => [d, ...prev]);
    setActiveId(d.id);
    setActiveDocId(d.id);
  };

  const renameDoc = () => {
    if (!activeDoc) return;
    const name = prompt("新的标题：", activeDoc.title);
    if (!name) return;
    const updated = updateDoc(activeDoc, { title: name.trim() });
    setDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const deleteDoc = () => {
    if (!activeDoc) return;
    if (!confirm(`删除“${activeDoc.title}”？此操作不可撤销。`)) return;
    const left = docs.filter((d) => d.id !== activeDoc.id);
    setDocs(left);
    const next = left.slice().sort((a, b) => b.updatedAt - a.updatedAt)[0]?.id ?? null;
    setActiveId(next);
    if (next) setActiveDocId(next);
  };

  const manualSave = () => {
    setStatus("已保存");
    clearStatusLater();
    // docs are persisted by effect
  };

  const toggle = (k: keyof AppSettings) => {
    setSettings((s) => ({ ...s, [k]: !s[k] }));
  };

  const toggleTheme = () => {
    setSettings((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  };

  const doExport = async (format: ExportFormat) => {
    if (!activeDoc) return;
    try {
      await exportDoc(activeDoc.title, activeDoc.content, format);
    } catch (e: any) {
      alert(e?.message ?? String(e));
    }
  };

  const jumpToHeading = (slug: string) => {
    // Preview panel: scroll to heading by id (we add id attributes in post-processing)
    const el = document.getElementById("h-" + slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const previewWithIds = useMemo(() => {
    // post-process previewHtml to add ids to headings for in-page navigation
    // Works because markdown-it outputs <h1>..</h1> etc.
    let html = previewHtml;
    for (const h of headings) {
      const openTag = new RegExp(`<h${h.level}([^>]*)>\s*${escapeRegExp(h.text)}\s*<\/h${h.level}>`);
      html = html.replace(openTag, `<h${h.level}$1 id="h-${h.slug}">${h.text}</h${h.level}>`);
    }
    return html;
  }, [previewHtml, headings]);

  return (
    <div className="app">
      {/* Left: documents */}
      <section className="panel">
        <div className="header">
          <h1>文档</h1>
          <div className="toolbar">
            <button className="btn primary" onClick={newDoc}>
              新建
            </button>
          </div>
        </div>
        <FileList
          docs={docs}
          activeId={activeId}
          onOpen={(id) => {
            setActiveId(id);
            setActiveDocId(id);
          }}
        />
      </section>

      {/* Middle: editor */}
      <section className="panel">
        <div className="header">
          <h1>
            编辑器 {activeDoc ? `· ${activeDoc.title}` : ""}{" "}
            <span className="small" style={{ marginLeft: 8 }}>
              {status}
            </span>
          </h1>
          <div className="toolbar">
            <button className="btn" onClick={renameDoc} disabled={!activeDoc}>
              重命名
            </button>
            <button className="btn danger" onClick={deleteDoc} disabled={!activeDoc}>
              删除
            </button>
            <button className="btn" onClick={() => setShowTableTool(true)} disabled={!activeDoc}>
              表格
            </button>
            <button className="btn" onClick={() => toggle("inlinePreview")}>
              行内预览：{settings.inlinePreview ? "开" : "关"}
            </button>
            <button className="btn" onClick={() => toggle("showInvisibles")}>
              隐藏字符：{settings.showInvisibles ? "显" : "隐"}
            </button>
            <button className="btn" onClick={() => toggle("autosave")}>
              自动保存：{settings.autosave ? "开" : "关"}
            </button>
            <button className="btn" onClick={manualSave} disabled={!settings.autosave}>
              手动保存
            </button>
            <button className="btn" onClick={toggleTheme}>
              主题：{settings.theme === "dark" ? "暗" : "亮"}
            </button>
          </div>
        </div>

        <div className="editorWrap">
          {activeDoc ? (
            <MarkdownEditor
              value={activeDoc.content}
              onChange={setDocContent}
              theme={settings.theme}
              inlinePreview={settings.inlinePreview}
              showInvisibles={settings.showInvisibles}
            />
          ) : (
            <div className="small" style={{ padding: 12 }}>
              请选择或新建一个文档
            </div>
          )}

          <div className="toolbar" style={{ justifyContent: "space-between" }}>
            <div className="small">
              搜索/替换：Ctrl/⌘-F · 注：更完整的「高级搜索」可扩展为全局搜索（多文档）和正则/文件过滤
            </div>
            <div className="toolbar">
              <button className="btn" onClick={() => doExport("html")} disabled={!activeDoc}>
                导出 HTML
              </button>
              <button className="btn" onClick={() => doExport("docx")} disabled={!activeDoc}>
                导出 Word（DOCX/降级DOC）
              </button>
              <button className="btn" onClick={() => doExport("pdf")} disabled={!activeDoc}>
                导出 PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Right: preview + outline */}
      <section className="panel">
        <div className="header">
          <h1>预览与导航</h1>
          <div className="toolbar">
            <span className="small">目录自动从标题生成</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateRows: "220px 1fr", minHeight: 0 }}>
          <div style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
            <Outline headings={headings} onJump={jumpToHeading} />
          </div>
          <div className="preview" dangerouslySetInnerHTML={{ __html: previewWithIds }} />
        </div>
      </section>

      {showTableTool && activeDoc && (
        <TableTool
          onClose={() => setShowTableTool(false)}
          onInsert={(tableMd) => {
            setShowTableTool(false);
            setDocContent((activeDoc.content + "\n\n" + tableMd + "\n") as any);
          }}
        />
      )}
    </div>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

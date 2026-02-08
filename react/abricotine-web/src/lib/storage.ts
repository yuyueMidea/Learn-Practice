import { nanoid } from "nanoid";
import type { AppSettings, Doc, DocId } from "./types";

const DOCS_KEY = "abricotine_web_docs_v1";
const ACTIVE_KEY = "abricotine_web_active_v1";
const SETTINGS_KEY = "abricotine_web_settings_v1";

const now = () => Date.now();

export function loadDocs(): Doc[] {
  const raw = localStorage.getItem(DOCS_KEY);
  if (!raw) return [];
  try {
    const docs = JSON.parse(raw) as Doc[];
    if (!Array.isArray(docs)) return [];
    return docs;
  } catch {
    return [];
  }
}

export function saveDocs(docs: Doc[]) {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

export function createDoc(title = "未命名文档"): Doc {
  const t = now();
  return {
    id: nanoid(),
    title,
    content:
`# ${title}

- [ ] 这是一个待办任务（点击“行内预览”可看到更像「所见即所得」的效果）
- [x] 支持数学：$\\int_0^1 x^2 dx$
- 图片：![](https://picsum.photos/seed/abricotine/240/120)

\n\n\`\`\`js
console.log("Hello Abricotine Web");
\`\`\`
`,
    createdAt: t,
    updatedAt: t,
  };
}

export function updateDoc(d: Doc, patch: Partial<Doc>): Doc {
  return { ...d, ...patch, updatedAt: now() };
}

export function setActiveDocId(id: DocId) {
  localStorage.setItem(ACTIVE_KEY, id);
}
export function getActiveDocId(): DocId | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function loadSettings(): AppSettings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  const fallback: AppSettings = {
    theme: "light",
    inlinePreview: true,
    showInvisibles: false,
    autosave: true,
  };
  if (!raw) return fallback;
  try {
    return { ...fallback, ...(JSON.parse(raw) as Partial<AppSettings>) };
  } catch {
    return fallback;
  }
}

export function saveSettings(s: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

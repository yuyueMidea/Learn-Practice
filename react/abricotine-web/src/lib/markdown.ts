import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";
import mk from "markdown-it-katex";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

md.use(taskLists, { enabled: true, label: true, labelAfter: true });
md.use(mk, { throwOnError: false, errorColor: "#cc0000" });

export function renderMarkdownToSafeHtml(markdown: string): string {
  const unsafe = md.render(markdown);
  // Allow KaTeX generated markup & basic HTML, but sanitize everything.
  const clean = DOMPurify.sanitize(unsafe, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
  return clean;
}

export type Heading = { level: number; text: string; slug: string; line?: number };

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split(/\r?\n/);
  const out: Heading[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^(#{1,6})\s+(.*)$/.exec(lines[i]);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].trim();
    const slug = slugify(text);
    out.push({ level, text, slug, line: i + 1 });
  }
  return out;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()_+=[\]{};:'",.<>/?\\|]+/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

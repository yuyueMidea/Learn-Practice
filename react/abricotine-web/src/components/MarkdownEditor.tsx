import React, { useEffect, useMemo, useRef } from "react";
import { EditorState, Extension, RangeSetBuilder } from "@codemirror/state";
import { EditorView, Decoration, WidgetType, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { highlightSpecialChars, drawSelection, highlightActiveLine } from "@codemirror/view";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";

type Props = {
  value: string;
  onChange: (v: string) => void;
  theme: "light" | "dark";
  inlinePreview: boolean;
  showInvisibles: boolean;
};

class TaskWidget extends WidgetType {
  constructor(private checked: boolean) { super(); }
  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-inlineWidget";
    const box = document.createElement("span");
    box.className = "cm-taskBox" + (this.checked ? " checked" : "");
    const label = document.createElement("span");
    label.textContent = this.checked ? "已完成" : "待办";
    span.appendChild(box);
    span.appendChild(label);
    return span;
  }
  ignoreEvent() { return true; }
}

class ImageWidget extends WidgetType {
  constructor(private url: string) { super(); }
  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-inlineWidget";
    const img = document.createElement("img");
    img.src = this.url;
    img.alt = "img";
    const label = document.createElement("span");
    label.textContent = "图片";
    span.appendChild(img);
    span.appendChild(label);
    return span;
  }
  ignoreEvent() { return true; }
}

function hasLineBreak(s: string) {
  return s.includes("\n") || s.includes("\r");
}

function inlinePreviewPlugin(enabled: boolean) {
  return ViewPlugin.fromClass(class {
    decorations: any;
    constructor(view: EditorView) {
      this.decorations = this.build(view, enabled);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.build(update.view, enabled);
      }
      if (update.transactions.some(t => t.annotation(TransactionFlag) === "toggleInline")) {
        this.decorations = this.build(update.view, enabled);
      }
    }
    build(view: EditorView, en: boolean) {
      if (!en) return Decoration.none;
      const b = new RangeSetBuilder<Decoration>();
      for (const { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        // Task list: "- [ ]" or "* [x]"
        const taskRe = /(^|\n)(\s*[-*]\s+\[( |x|X)\])/g;
        let m: RegExpExecArray | null;
        while ((m = taskRe.exec(text))) {
          const idx = m.index + (m[1] ? m[1].length : 0);
          const token = m[2];
          const checked = /\[(x|X)\]/.test(token);
          const start = from + idx;
          const end = start + token.length;
          const raw = view.state.doc.sliceString(start, end);
          // 不使用 replace（replace 跨行会报错）；改为 mark + widget
          if (!hasLineBreak(raw)) {
            b.add(start, end, Decoration.mark({ class: "cm-hideSyntax" }));
            b.add(end, end, Decoration.widget({ widget: new TaskWidget(checked), side: 1 }));
          }
        }

        // Image: ![alt](url)
        const imgRe = /!\[[^\]]*\]\(([^)\s]+)\)/g;
        while ((m = imgRe.exec(text))) {
          const url = m[1];
          const start = from + m.index;
          const end = start + m[0].length;
          const raw = view.state.doc.sliceString(start, end);
          if (!hasLineBreak(raw)) {
            b.add(start, end, Decoration.mark({ class: "cm-hideSyntax" }));
            b.add(end, end, Decoration.widget({ widget: new ImageWidget(url), side: 1 }));
          }
        }
      }
      return b.finish();
    }
  }, { decorations: v => v.decorations });
}

// A tiny annotation channel to force plugin rebuild when toggling without doc change
import { Annotation } from "@codemirror/state";
const TransactionFlag = Annotation.define<string>();

export default function MarkdownEditor(props: Props) {
  const host = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const extensions = useMemo(() => {
    const exts: Extension[] = [
      history(),
      drawSelection(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        indentWithTab,
        ...defaultKeymap,
        ...historyKeymap,
        ...searchKeymap,
      ]),
      markdown({ base: markdownLanguage }),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) props.onChange(v.state.doc.toString());
      }),
    ];

    if (props.showInvisibles) {
      exts.push(highlightSpecialChars());
    }

    if (props.theme === "dark") {
      exts.push(oneDark);
    }

    exts.push(inlinePreviewPlugin(props.inlinePreview));
    return exts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.theme, props.inlinePreview, props.showInvisibles]);

  // init
  useEffect(() => {
    if (!host.current) return;
    const state = EditorState.create({ doc: props.value, extensions });
    const view = new EditorView({ state, parent: host.current });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === props.value) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: props.value }
    });
  }, [props.value]);

  // extension changes (theme/toggles)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: StateEffect.reconfigure.of(extensions),
      annotations: TransactionFlag.of("toggleInline"),
    } as any);
  }, [extensions]);

  return <div className="cmHost" ref={host} />;
}

// Needed imports for reconfigure
import { StateEffect } from "@codemirror/state";

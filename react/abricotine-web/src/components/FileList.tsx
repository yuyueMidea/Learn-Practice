import React from "react";
import type { Doc } from "../lib/types";

export default function FileList({
  docs,
  activeId,
  onOpen,
}: {
  docs: Doc[];
  activeId: string | null;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="list">
      {docs.length === 0 ? (
        <div className="small">还没有文档。点击“新建”创建一个。</div>
      ) : (
        docs
          .slice()
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((d) => (
            <div key={d.id} className={"file" + (d.id === activeId ? " active" : "")} onClick={() => onOpen(d.id)}>
              <div className="title">{d.title}</div>
              <div className="meta">
                <span>{new Date(d.updatedAt).toLocaleString()}</span>
                <span>{Math.ceil(d.content.length / 1024)}KB</span>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

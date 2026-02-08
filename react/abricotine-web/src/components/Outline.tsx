import React from "react";
import type { Heading } from "../lib/markdown";

export default function Outline({ headings, onJump }: { headings: Heading[]; onJump: (slug: string) => void }) {
  return (
    <div className="list">
      {headings.length === 0 ? (
        <div className="small">没有检测到标题（使用 # / ## / ### ...）</div>
      ) : (
        headings.map((h) => (
          <div
            key={h.slug + h.level}
            className="file"
            style={{ marginLeft: (h.level - 1) * 10, padding: "8px 10px" }}
            onClick={() => onJump(h.slug)}
            title={`跳转到：${h.text}`}
          >
            <div className="title" style={{ fontSize: 13 }}>
              {h.text}
            </div>
            <div className="meta">
              <span>H{h.level}</span>
              <span>#{h.slug}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

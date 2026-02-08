import React, { useMemo, useState } from "react";
import { Dialog } from "./Dialog";

type Props = {
  onInsert: (markdownTable: string) => void;
  onClose: () => void;
};

function buildTable(rows: number, cols: number): string {
  const header = Array.from({ length: cols }, (_, i) => `列${i + 1}`);
  const sep = Array.from({ length: cols }, () => "---");
  const body = Array.from({ length: Math.max(0, rows - 1) }, (_, r) =>
    Array.from({ length: cols }, (_, c) => `R${r + 1}C${c + 1}`)
  );

  const line = (arr: string[]) => `| ${arr.join(" | ")} |`;
  return [line(header), line(sep), ...body.map(line)].join("\n");
}

export default function TableTool({ onInsert, onClose }: Props) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const preview = useMemo(() => buildTable(rows, cols), [rows, cols]);

  return (
    <Dialog
      title="表格工具"
      onClose={onClose}
      actions={
        <>
          <button className="btn" onClick={onClose}>
            取消
          </button>
          <button className="btn primary" onClick={() => onInsert(preview)}>
            插入到光标处（追加）
          </button>
        </>
      }
    >
      <div className="grid2">
        <div>
          <div className="fieldRow">
            <div style={{ width: 90 }} className="small">
              行数
            </div>
            <input
              className="input"
              type="number"
              min={2}
              max={30}
              value={rows}
              onChange={(e) => setRows(Math.max(2, Math.min(30, Number(e.target.value) || 2)))}
            />
          </div>
          <div className="fieldRow">
            <div style={{ width: 90 }} className="small">
              列数
            </div>
            <input
              className="input"
              type="number"
              min={2}
              max={12}
              value={cols}
              onChange={(e) => setCols(Math.max(2, Math.min(12, Number(e.target.value) || 2)))}
            />
          </div>
          <p className="small">提示：这是一个轻量工具，生成基础 Markdown 表格；后续可扩展对齐、单元格编辑等。</p>
        </div>
        <div>
          <div className="small" style={{ marginBottom: 6 }}>
            预览（Markdown）
          </div>
          <textarea className="input" style={{ height: 180, fontFamily: "var(--mono)" }} value={preview} readOnly />
        </div>
      </div>
    </Dialog>
  );
}

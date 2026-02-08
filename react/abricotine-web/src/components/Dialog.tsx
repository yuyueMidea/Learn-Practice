import React, { PropsWithChildren, useEffect } from "react";

export function Dialog({
  title,
  onClose,
  actions,
  children,
}: PropsWithChildren<{ title: string; onClose: () => void; actions?: React.ReactNode }>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="dialogOverlay" onMouseDown={onClose}>
      <div className="dialog" onMouseDown={(e) => e.stopPropagation()}>
        <div className="header">
          <h1>{title}</h1>
          <div className="toolbar">{actions}</div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

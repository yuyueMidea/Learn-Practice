// useTableJump.ts
import React, { useCallback } from "react";

export type TableKind = "cheque" | "emeans";

export interface TableJumpConfig {
  /** tbody 对应的 data-testid，用来限定 query 范围 */
  tbodyTestId: string;
  /** 是否允许在键盘操作时新增一行（和按钮 disabled 逻辑保持一致） */
  canAddRow: () => boolean;
  /** 新增一行（内部通常是 push 一条空数据） */
  addRow: () => void;
}

export type TableJumpConfigMap = Record<TableKind, TableJumpConfig>;

export function useTableJump(config: TableJumpConfigMap) {
  /**
   * 聚焦到某个元素：
   * - input: focus + select()
   * - select: focus + 尝试自动打开下拉框（模拟 mouse 事件）
   */
  const focusElementAndMaybeOpen = (el: HTMLElement | null) => {
    if (!el) return;
if (next instanceof HTMLSelectElement) {
  const selectEl = next as HTMLSelectElement;

  // 先聚焦
  selectEl.focus();

  // ✅ Chrome 支持的方式：showPicker（新一点的版本）
  (selectEl as any).showPicker?.();

  // 再补一套鼠标事件，保证大多数 Chrome 场景都能弹开
  setTimeout(() => {
    const mousedown = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const mouseup = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    selectEl.dispatchEvent(mousedown);
    selectEl.dispatchEvent(mouseup);
    selectEl.dispatchEvent(click);
  }, 0);
}

    el.focus();

    if (el instanceof HTMLInputElement) {
      el.select();
      return;
    }

    if (el instanceof HTMLSelectElement) {
      // 一些实验性的实现可能支持 showPicker
      (el as any).showPicker?.();

      // 为了兼容更多浏览器，再模拟一次点击
      setTimeout(() => {
        const mousedown = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        const mouseup = new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        const click = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        el.dispatchEvent(mousedown);
        el.dispatchEvent(mouseup);
        el.dispatchEvent(click);
      }, 0);
    }
  };

  const focusNextInput = useCallback(
    (currentElement: HTMLElement, kind: TableKind) => {
      const { tbodyTestId, canAddRow, addRow } = config[kind];

      const tbody = document.querySelector<HTMLElement>(
        `[data-testid="${tbodyTestId}"]`
      );
      if (!tbody) return;

      // 当前表格下所有可跳转控件
      const allInputs = Array.from(
        tbody.querySelectorAll<HTMLElement>("input, select")
      );

      const currentIndex = allInputs.indexOf(currentElement);
      if (currentIndex === -1) return;

      // 1. 不是最后一个 → 直接跳下一格
      if (currentIndex < allInputs.length - 1) {
        const next = allInputs[currentIndex + 1];
        focusElementAndMaybeOpen(next);
        return;
      }

      // 2. 已是最后一个 → 判断是否允许新增行
      if (!canAddRow()) {
        // 不允许新增，就停在这里
        return;
      }

      const oldLength = allInputs.length;

      addRow();

      // 等下一帧渲染完，再聚焦到“新行第一个单元格”
      setTimeout(() => {
        const newInputs = Array.from(
          tbody.querySelectorAll<HTMLElement>("input, select")
        );
        const newFirst = newInputs[oldLength]; // 新增行的第一个元素
        focusElementAndMaybeOpen(newFirst);
      }, 0);
    },
    [config]
  );

  /** 给 input 用的 onKeyDown：按 Enter 时跳转 */
  const makeInputKeyDown = useCallback(
    (kind: TableKind) =>
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          focusNextInput(e.currentTarget, kind);
        }
      },
    [focusNextInput]
  );

  /** 给 select 用的 onKeyDown：按 Enter 时跳转（可选） */
  const makeSelectKeyDown = useCallback(
    (kind: TableKind) =>
      (e: React.KeyboardEvent<HTMLSelectElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          focusNextInput(e.currentTarget, kind);
        }
      },
    [focusNextInput]
  );

  /** 给 select 用的 onChange：选中后立即跳转（可选） */
  const makeSelectChangeJump = useCallback(
    (kind: TableKind) =>
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        focusNextInput(e.currentTarget, kind);
      },
    [focusNextInput]
  );

  return {
    focusNextInput,
    makeInputKeyDown,
    makeSelectKeyDown,
    makeSelectChangeJump,
  };
}

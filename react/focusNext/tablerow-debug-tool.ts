// ============================================================================
// 调试工具：帮助定位边框消失问题
// ============================================================================

import React, { useEffect, useRef } from 'react';

// 1. 渲染追踪器
export const useRenderTracker = (componentName: string, props: any) => {
    const renderCount = useRef(0);
    const prevProps = useRef(props);

    useEffect(() => {
        renderCount.current += 1;
        
        console.log(`[${componentName}] Render #${renderCount.current}`);
        
        // 比较哪些 props 变化了
        Object.keys(props).forEach(key => {
            if (prevProps.current[key] !== props[key]) {
                console.log(`  ↳ ${key} changed:`, {
                    from: prevProps.current[key],
                    to: props[key]
                });
            }
        });
        
        prevProps.current = props;
    });
};

// 2. 边框检查器 - 检测 DOM 元素是否有边框
export const useBorderChecker = (enabled: boolean = false) => {
    useEffect(() => {
        if (!enabled) return;

        const checkBorders = () => {
            const cells = document.querySelectorAll('td');
            const cellsWithoutBorder: HTMLElement[] = [];
            
            cells.forEach((cell) => {
                const style = window.getComputedStyle(cell);
                const borders = [
                    style.borderTopWidth,
                    style.borderRightWidth,
                    style.borderBottomWidth,
                    style.borderLeftWidth
                ];
                
                // 如果所有边框都是 0，说明边框丢失
                if (borders.every(b => b === '0px')) {
                    cellsWithoutBorder.push(cell as HTMLElement);
                }
            });
            
            if (cellsWithoutBorder.length > 0) {
                console.warn(`⚠️ Found ${cellsWithoutBorder.length} cells without borders:`);
                cellsWithoutBorder.forEach((cell, idx) => {
                    const row = cell.closest('tr');
                    const rowIndex = row ? Array.from(row.parentElement!.children).indexOf(row) : -1;
                    const colIndex = Array.from(cell.parentElement!.children).indexOf(cell);
                    
                    console.log(`  Cell [${rowIndex}, ${colIndex}]:`, cell);
                    
                    // 高亮显示有问题的单元格
                    cell.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    cell.style.outline = '2px solid red';
                });
            } else {
                console.log('✅ All cells have borders');
            }
        };

        // 延迟检查，确保渲染完成
        const timer = setTimeout(checkBorders, 1000);
        return () => clearTimeout(timer);
    }, [enabled]);
};

// 3. React.memo 比较函数生成器（带日志）
export const createMemoComparison = <P extends object>(
    componentName: string,
    compareFn: (prev: P, next: P) => boolean
) => {
    return (prev: P, next: P): boolean => {
        const shouldSkip = compareFn(prev, next);
        
        if (process.env.NODE_ENV === 'development') {
            if (!shouldSkip) {
                console.log(`[${componentName}] Re-rendering due to prop changes`);
                
                // 详细记录变化的 props
                Object.keys(prev).forEach(key => {
                    if (prev[key] !== next[key]) {
                        console.log(`  ↳ ${key} changed`);
                    }
                });
            }
        }
        
        return shouldSkip;
    };
};

// ============================================================================
// 使用示例：TableRow with Debug
// ============================================================================

import { memo } from 'react';
import style from './EnterTables.module.css';

const TableRowWithDebug = memo<TableRowProps>(({
    rowItem,
    rowIndex,
    ...props
}) => {
    // 🐛 开启渲染追踪
    useRenderTracker(`TableRow[${rowIndex}]`, { rowItem, rowIndex });

    // 🐛 检查这一行的边框
    const rowRef = useRef<HTMLTableRowElement>(null);
    useEffect(() => {
        if (rowRef.current) {
            const cells = rowRef.current.querySelectorAll('td');
            cells.forEach((cell, idx) => {
                const style = window.getComputedStyle(cell);
                if (style.borderWidth === '0px') {
                    console.warn(`Row ${rowIndex}, Cell ${idx} has no border!`);
                }
            });
        }
    }, [rowIndex]);

    return (
        <tr 
            ref={rowRef}
            className={rowItem.errorRow ? style.selfRowError : ''}
            data-row-index={rowIndex}
            data-row-id={rowItem.id}
        >
            {/* ... 单元格渲染 */}
        </tr>
    );
}, createMemoComparison('TableRow', (prev, next) => {
    // 你的比较逻辑
    if (prev.rowIndex !== next.rowIndex) return false;
    if (prev.rowItem.id !== next.rowItem.id) return false;
    
    // ... 更多比较
    
    return true;
}));

// ============================================================================
// 父组件调试工具
// ============================================================================

const ParentComponentWithDebug = () => {
    const [tableData, setTableData] = useState<DataSingleProps[]>([]);

    // 🐛 全局边框检查
    useBorderChecker(true); // 开启边框检查

    // 🐛 数据一致性检查
    useEffect(() => {
        console.log('=== Table Data Consistency Check ===');
        
        // 检查是否有重复的 ID
        const ids = tableData.map(row => row.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            console.error('⚠️ Found duplicate row IDs!');
        }
        
        // 检查 rowIndex 是否连续
        tableData.forEach((row, idx) => {
            row.list.forEach(cell => {
                if (cell.rowIndex !== idx) {
                    console.warn(`⚠️ Row ${idx} has incorrect cell.rowIndex: ${cell.rowIndex}`);
                }
            });
        });
        
        console.log('✅ Data consistency check complete');
    }, [tableData]);

    return (
        <table>
            <tbody>
                {tableData.map((rowItem, idx) => (
                    <TableRowWithDebug
                        key={rowItem.id}
                        rowItem={rowItem}
                        rowIndex={idx}
                        // ... other props
                    />
                ))}
            </tbody>
        </table>
    );
};

// ============================================================================
// CSS 调试样式
// ============================================================================

/*
添加到你的 CSS 文件中用于调试：

/* 调试模式：显示所有边框 
.debug-mode table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
}

.debug-mode td {
    border: 2px solid red !important;
    background: rgba(255, 0, 0, 0.05) !important;
}

/* 高亮渲染的行 
@keyframes highlight-render {
    0% { background-color: yellow; }
    100% { background-color: transparent; }
}

.debug-mode tr {
    animation: highlight-render 0.5s ease-out;
}

/* 显示行索引 
.debug-mode tr::before {
    content: attr(data-row-index);
    position: absolute;
    left: -30px;
    color: red;
    font-weight: bold;
}
*/

// ============================================================================
// 浏览器开发工具脚本
// ============================================================================

// 在浏览器 Console 中运行此脚本来检查边框
const debugTableBorders = () => {
    const table = document.querySelector('table');
    if (!table) {
        console.error('No table found');
        return;
    }

    const rows = table.querySelectorAll('tbody tr');
    let problematicRows = 0;

    rows.forEach((row, rowIdx) => {
        const cells = row.querySelectorAll('td');
        let rowHasIssue = false;

        cells.forEach((cell, cellIdx) => {
            const computed = window.getComputedStyle(cell);
            const borders = {
                top: computed.borderTopWidth,
                right: computed.borderRightWidth,
                bottom: computed.borderBottomWidth,
                left: computed.borderLeftWidth
            };

            const hasBorder = Object.values(borders).some(b => b !== '0px');

            if (!hasBorder) {
                if (!rowHasIssue) {
                    console.log(`Row ${rowIdx} has issues:`);
                    rowHasIssue = true;
                    problematicRows++;
                }
                console.log(`  Cell [${rowIdx}, ${cellIdx}] missing borders:`, borders);
                
                // 高亮有问题的单元格
                cell.style.outline = '3px solid red';
                cell.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            }
        });
    });

    console.log(`Total rows with issues: ${problematicRows} / ${rows.length}`);
    
    if (problematicRows === 0) {
        console.log('✅ All cells have borders!');
    } else {
        console.log('⚠️ Found cells without borders (highlighted in red)');
    }
};

// 复制这个函数到浏览器 Console 中，然后运行：
// debugTableBorders()

// ============================================================================
// React DevTools Profiler 配置
// ============================================================================

// 包裹你的表格组件来分析性能
import { Profiler } from 'react';

const onRenderCallback = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
) => {
    console.log(`[Profiler] ${id} - ${phase}`, {
        actualDuration: `${actualDuration.toFixed(2)}ms`,
        baseDuration: `${baseDuration.toFixed(2)}ms`
    });
};

export const TableWithProfiler = () => {
    return (
        <Profiler id="EnterTable" onRender={onRenderCallback}>
            <table>
                {/* 你的表格内容 */}
            </table>
        </Profiler>
    );
};

// ============================================================================
// 快速测试脚本
// ============================================================================

// 在你的测试文件中使用
export const testTableBorders = () => {
    describe('Table Border Tests', () => {
        it('should render all borders correctly', () => {
            const { container } = render(<YourTableComponent />);
            
            const cells = container.querySelectorAll('td');
            let cellsWithoutBorder = 0;
            
            cells.forEach(cell => {
                const style = window.getComputedStyle(cell);
                const hasBorder = 
                    style.borderTopWidth !== '0px' ||
                    style.borderRightWidth !== '0px' ||
                    style.borderBottomWidth !== '0px' ||
                    style.borderLeftWidth !== '0px';
                
                if (!hasBorder) {
                    cellsWithoutBorder++;
                }
            });
            
            expect(cellsWithoutBorder).toBe(0);
        });
    });
};

export default {
    useRenderTracker,
    useBorderChecker,
    createMemoComparison,
    debugTableBorders
};
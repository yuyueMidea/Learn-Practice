import React, { useState, useMemo } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward, UnfoldMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Empty } from '@/components/common';

interface ColumnConfig {
    key: string;
    label: string;
    width?: number | string;
    render?: (value: any, row: any) => React.ReactNode;
    sortable?: boolean;
    sortType?: 'string' | 'number' | 'date';
    customSort?: (a: any, b: any) => number;
}

interface ListWithHeaderProps {
    columns: ColumnConfig[];
    data: any[];
    height?: number | string;
    showHeader?: boolean;
    onRowClick?: (row: any, index: number) => void;
    showIndex?: boolean;
    indexColumnWidth?: number | string;
    indexColumnLabel?: string;
    defaultSortKey?: string;
    defaultSortOrder?: 'asc' | 'desc';
    // 分页配置
    pagination?: boolean | {
        pageSize?: number;
        showTotal?: boolean;
    };
}

type SortOrder = 'asc' | 'desc' | null;

const ListWithHeader: React.FC<ListWithHeaderProps> = ({
    columns,
    data,
    height = 400,
    showHeader = true,
    onRowClick,
    showIndex = false,
    indexColumnWidth = 60,
    indexColumnLabel = 'No.',
    defaultSortKey,
    defaultSortOrder = 'asc',
    pagination = false
}) => {
    const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortKey ? defaultSortOrder : null);
    const [currentPage, setCurrentPage] = useState(1);

    // 解析分页配置
    const paginationConfig = useMemo(() => {
        if (!pagination) return null;
        if (pagination === true) {
            return { pageSize: 10, showTotal: true };
        }
        return {
            pageSize: pagination.pageSize || 10,
            showTotal: pagination.showTotal !== false
        };
    }, [pagination]);

    // 所有列配置
    const allColumns = showIndex 
        ? [
            {
                key: '_index',
                label: indexColumnLabel,
                width: indexColumnWidth,
                sortable: false
            },
            ...columns
        ]
        : columns;

    // 排序逻辑
    const sortedData = useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        const column = columns.find(col => col.key === sortKey);
        if (!column) return data;

        return [...data].sort((a, b) => {
            if (column.customSort) {
                return sortOrder === 'asc' 
                    ? column.customSort(a, b)
                    : column.customSort(b, a);
            }

            const aVal = a[sortKey];
            const bVal = b[sortKey];

            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            let result = 0;
            switch (column.sortType) {
                case 'number':
                    result = Number(aVal) - Number(bVal);
                    break;
                case 'date':
                    result = new Date(aVal).getTime() - new Date(bVal).getTime();
                    break;
                case 'string':
                default:
                    result = String(aVal).localeCompare(String(bVal));
                    break;
            }

            return sortOrder === 'asc' ? result : -result;
        });
    }, [data, sortKey, sortOrder, columns]);

    // 分页逻辑
    const paginatedData = useMemo(() => {
        if (!paginationConfig) return sortedData;

        const { pageSize } = paginationConfig;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, paginationConfig]);

    // 计算总页数
    const totalPages = useMemo(() => {
        if (!paginationConfig) return 1;
        return Math.ceil(sortedData.length / paginationConfig.pageSize);
    }, [sortedData.length, paginationConfig]);

    // 重置页码（当排序或数据变化时）
    useMemo(() => {
        setCurrentPage(1);
    }, [sortKey, sortOrder, data.length]);

    // 处理排序点击
    const handleSort = (columnKey: string) => {
        const column = allColumns.find(col => col.key === columnKey);
        if (!column?.sortable) return;

        if (sortKey === columnKey) {
            if (sortOrder === 'asc') {
                setSortOrder('desc');
            } else if (sortOrder === 'desc') {
                setSortOrder(null);
                setSortKey(null);
            }
        } else {
            setSortKey(columnKey);
            setSortOrder('asc');
        }
    };

    // 获取排序图标
    const getSortIcon = (columnKey: string) => {
        if (sortKey !== columnKey) {
            return <UnfoldMore sx={{ fontSize: 16, opacity: 0.3 }} />;
        }
        if (sortOrder === 'asc') {
            return <ArrowUpward sx={{ fontSize: 16 }} />;
        }
        return <ArrowDownward sx={{ fontSize: 16 }} />;
    };

    // 分页控制
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    return (
        <Box
            sx={{
                height,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* 表头 */}
            {showHeader && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        py: 1,
                        px: 2,
                        backgroundColor: 'action.selected',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    {allColumns.map((column, colIndex) => (
                        <Box
                            key={column.key}
                            onClick={() => handleSort(column.key)}
                            sx={{
                                width: column.width || 'auto',
                                flex: column.width ? 'none' : 1,
                                minWidth: 0,
                                display: 'flex',
                                alignItems: 'center',
                                ml: colIndex > 0 ? 2 : 0,
                                cursor: column.sortable ? 'pointer' : 'default',
                                '&:hover': column.sortable ? {
                                    '& .sort-icon': {
                                        opacity: 1
                                    }
                                } : {}
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    flex: 1,
                                    textAlign: 'left'
                                }}
                            >
                                {column.label}
                            </Typography>
                            {column.sortable && (
                                <Box
                                    className="sort-icon"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        ml: 0.5,
                                        opacity: sortKey === column.key ? 1 : 0.3,
                                        transition: 'opacity 0.2s'
                                    }}
                                >
                                    {getSortIcon(column.key)}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* 列表内容 */}
            <Box 
                sx={{ 
                    overflow: 'auto', 
                    flex: 1,
                    minHeight: 0
                }}
            >
                {paginatedData.length === 0 ? (
                    <Empty wrapClassName="emptyWrap"/>
                ) : (
                    paginatedData.map((row, index) => {
                        // 计算真实索引（考虑分页）
                        const realIndex = paginationConfig 
                            ? (currentPage - 1) * paginationConfig.pageSize + index
                            : index;

                        return (
                            <Box
                                key={row.id || realIndex}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    py: 1,
                                    px: 2,
                                    borderBottom: index < paginatedData.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'divider',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                        cursor: onRowClick ? 'pointer' : 'default'
                                    }
                                }}
                                onClick={() => onRowClick && onRowClick(row, realIndex)}
                            >
                                {allColumns.map((column, colIndex) => (
                                    <Box
                                        key={column.key}
                                        sx={{
                                            width: column.width || 'auto',
                                            flex: column.width ? 'none' : 1,
                                            minWidth: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            ml: colIndex > 0 ? 2 : 0
                                        }}
                                    >
                                        <Tooltip 
                                            title={
                                                column.key === '_index' 
                                                    ? realIndex + 1
                                                    : column.render 
                                                        ? column.render(row[column.key], row)
                                                        : row[column.key]
                                            } 
                                            arrow 
                                            placement='top-start'
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    width: '100%',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                {column.key === '_index'
                                                    ? realIndex + 1
                                                    : column.render
                                                        ? column.render(row[column.key], row)
                                                        : row[column.key]
                                                }
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                ))}
                            </Box>
                        );
                    })
                )}
            </Box>

            {/* 分页控制 */}
            {paginationConfig && sortedData.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: 2,
                        py: 0.5,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        minHeight: 36
                    }}
                >
                    {paginationConfig.showTotal && (
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                mr: 2,
                                color: 'text.secondary',
                                fontSize: '0.75rem'
                            }}
                        >
                            {`${(currentPage - 1) * paginationConfig.pageSize + 1}-${Math.min(currentPage * paginationConfig.pageSize, sortedData.length)} of ${sortedData.length}`}
                        </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                            size="small"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            sx={{ 
                                width: 28, 
                                height: 28,
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ChevronLeft fontSize="small" />
                        </IconButton>
                        
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                minWidth: 60,
                                textAlign: 'center',
                                color: 'text.primary',
                                fontSize: '0.75rem',
                                fontWeight: 500
                            }}
                        >
                            {currentPage} / {totalPages}
                        </Typography>
                        
                        <IconButton
                            size="small"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            sx={{ 
                                width: 28, 
                                height: 28,
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            <ChevronRight fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ListWithHeader;

// ============= 使用示例 =============

/*
// 示例 1: 基础分页（默认每页10条）
<LightweightList 
    height={400}
    columns={columns} 
    data={data}
    pagination={true}
/>

// 示例 2: 自定义每页条数
<LightweightList 
    height={400}
    columns={columns} 
    data={data}
    pagination={{
        pageSize: 20
    }}
/>

// 示例 3: 隐藏总数显示
<LightweightList 
    height={400}
    columns={columns} 
    data={data}
    pagination={{
        pageSize: 15,
        showTotal: false
    }}
/>

// 示例 4: 完整配置（排序 + 分页）
const columns = [
    {
        label: 'EE Account Number',
        key: 'memAcctCode',
        width: 200,
        sortable: true,
        sortType: 'string' as const
    },
    {
        label: 'Error',
        key: 'errCount',
        width: 140,
        sortable: true,
        sortType: 'number' as const
    }
];

<LightweightList 
    height={400}
    showIndex={true}
    columns={columns} 
    data={filteredMemInfo}
    onRowClick={(row, idx) => handleTableRowClick(row)}
    defaultSortKey="errCount"
    defaultSortOrder="desc"
    pagination={{
        pageSize: 20,
        showTotal: true
    }}
/>
*/
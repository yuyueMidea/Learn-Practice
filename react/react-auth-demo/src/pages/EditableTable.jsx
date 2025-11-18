import React, { useState, useRef, useEffect } from 'react';
import './EditableTable.css';

const EnhancedEditableTable = () => {
    // 初始化表格数据
    const initialData = [
        { id: 1, name: '张三', amount: 1234567, date: '2023-06-15', phone: '13800138000', email: 'zhang@example.com' },
        { id: 2, name: '李四', amount: 987654, date: '2023-07-20', phone: '13900139000', email: 'li@example.com' },
        { id: 3, name: '王五', amount: 500000, date: '2023-08-25', phone: '13700137000', email: 'wang@example.com' }
    ];

    const [data, setData] = useState(initialData);
    const [nextId, setNextId] = useState(4);
    const tableRef = useRef(null);

    // 添加新行
    const addRow = (index = null) => {
        const newRow = {
            id: nextId,
            name: '',
            amount: 0,
            date: '',
            phone: '',
            email: ''
        };

        if (index !== null) {
            // 在指定位置插入新行
            const newData = [...data];
            newData.splice(index + 1, 0, newRow);
            setData(newData);
        } else {
            // 在末尾添加新行
            setData([...data, newRow]);
        }

        setNextId(nextId + 1);
        return newRow.id;
    };

    // 删除行
    const deleteRow = (id) => {
        if (data.length <= 1) {
            alert('至少保留一行数据');
            return;
        }
        setData(data.filter(row => row.id !== id));
    };

    // 更新单元格数据
    const updateCell = (id, field, value) => {
        setData(data.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // 聚焦到指定单元格
    const focusCell = (rowIndex, colIndex) => {
        setTimeout(() => {
            const cell = tableRef.current?.querySelector(
                `[data-row="${rowIndex}"][data-col="${colIndex}"]`
            );
            if (cell) cell.focus();
        }, 10);
    };

    // 处理键盘导航
    const handleKeyDown = (e, rowIndex, colIndex) => {
        // Tab或Enter键处理
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();

            // 计算下一个单元格位置
            let nextRowIndex = rowIndex;
            let nextColIndex = colIndex + 1;

            // 如果当前是最后一列
            if (nextColIndex > 4) {
                nextRowIndex += 1;
                nextColIndex = 0;

                // 如果当前是最后一行，添加新行
                if (nextRowIndex >= data.length) {
                    const newRowId = addRow();
                    // 等待新行渲染完成后聚焦
                    setTimeout(() => {
                        const newRowIndex = data.length;
                        focusCell(newRowIndex, 0);
                    }, 50);
                    return;
                }
            }

            focusCell(nextRowIndex, nextColIndex);
        }
        // 方向键导航
        else if (e.key === 'ArrowUp' && rowIndex > 0) {
            e.preventDefault();
            focusCell(rowIndex - 1, colIndex);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            // 如果是最后一行，添加新行
            if (rowIndex === data.length - 1) {
                const newRowId = addRow();
                setTimeout(() => {
                    focusCell(rowIndex + 1, colIndex);
                }, 50);
            } else {
                focusCell(rowIndex + 1, colIndex);
            }
        } else if (e.key === 'ArrowLeft' && colIndex > 0) {
            e.preventDefault();
            focusCell(rowIndex, colIndex - 1);
        } else if (e.key === 'ArrowRight' && colIndex < 4) {
            e.preventDefault();
            focusCell(rowIndex, colIndex + 1);
        }
    };

    // 金额格式化（千分位）
    const formatAmount = (value) => {
        if (!value && value !== 0) return '';
        const num = parseFloat(value.toString().replace(/,/g, ''));
        return isNaN(num) ? '' : num.toLocaleString('en-US');
    };

    // 验证邮箱格式
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // 验证电话号码
    const validatePhone = (phone) => {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    };

    return (
        <div className="editable-table-container">
            <div className="table-header">
                <h2>增强版可编辑表格</h2>
                <div className="header-actions">
                    <button className="add-row-btn" onClick={() => addRow()}>
                        + 添加行
                    </button>
                    <div className="keyboard-hint">
                        <span>使用 Tab / Enter 键在单元格间导航</span>
                    </div>
                </div>
            </div>

            <div className="table-wrapper" ref={tableRef}>
                <div className="table">
                    {/* 表头 */}
                    <div className="table-row header">
                        <div className="table-cell fixed action-cell">操作</div>
                        <div className="table-cell">姓名</div>
                        <div className="table-cell">金额</div>
                        <div className="table-cell">日期</div>
                        <div className="table-cell">电话</div>
                        <div className="table-cell">邮箱</div>
                    </div>

                    {/* 表格内容 */}
                    {data.map((row, rowIndex) => (
                        <div className="table-row" key={row.id}>
                            {/* 固定操作栏 */}
                            <div className="table-cell fixed action-cell">
                                <button
                                    className="action-btn add-btn"
                                    onClick={() => {
                                        const newRowId = addRow(rowIndex);
                                        // 聚焦到新行的第一个单元格
                                        setTimeout(() => {
                                            focusCell(rowIndex + 1, 0);
                                        }, 50);
                                    }}
                                    title="在下方插入行"
                                >
                                    +
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => deleteRow(row.id)}
                                    title="删除行"
                                >
                                    -
                                </button>
                            </div>

                            {/* 姓名输入框 */}
                            <div className="table-cell">
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => updateCell(row.id, 'name', e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
                                    data-row={rowIndex}
                                    data-col={0}
                                    placeholder="请输入姓名"
                                />
                            </div>

                            {/* 金额输入框 */}
                            <div className="table-cell">
                                <AmountInput
                                    value={row.amount}
                                    onChange={(value) => updateCell(row.id, 'amount', value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                                    rowIndex={rowIndex}
                                    colIndex={1}
                                />
                            </div>

                            {/* 日期输入框 */}
                            <div className="table-cell">
                                <input
                                    type="date"
                                    value={row.date}
                                    onChange={(e) => updateCell(row.id, 'date', e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                                    data-row={rowIndex}
                                    data-col={2}
                                />
                            </div>

                            {/* 电话输入框 */}
                            <div className="table-cell">
                                <PhoneInput
                                    value={row.phone}
                                    onChange={(value) => updateCell(row.id, 'phone', value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                                    rowIndex={rowIndex}
                                    colIndex={3}
                                    validate={validatePhone}
                                />
                            </div>

                            {/* 邮箱输入框 */}
                            <div className="table-cell">
                                <EmailInput
                                    value={row.email}
                                    onChange={(value) => updateCell(row.id, 'email', value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                                    rowIndex={rowIndex}
                                    colIndex={4}
                                    validate={validateEmail}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="table-footer">
                <div className="row-count">共 {data.length} 行数据</div>
                <div className="navigation-tip">
                    提示: 使用方向键、Tab键或Enter键在表格中导航，到达行尾时自动创建新行
                </div>
            </div>
        </div>
    );
};

// 金额输入组件
const AmountInput = ({ value, onChange, onKeyDown, rowIndex, colIndex }) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isFocused) {
            setDisplayValue(formatAmount(value));
        }
    }, [value, isFocused]);

    const formatAmount = (val) => {
        if (!val && val !== 0) return '';
        const num = parseFloat(val.toString().replace(/,/g, ''));
        return isNaN(num) ? '' : num.toLocaleString('en-US');
    };

    const handleFocus = () => {
        setIsFocused(true);
        setDisplayValue(value ? value.toString().replace(/,/g, '') : '');
    };

    const handleBlur = () => {
        setIsFocused(false);
        const numValue = displayValue ? parseFloat(displayValue.replace(/,/g, '')) : 0;
        if (!isNaN(numValue)) {
            onChange(numValue);
            setDisplayValue(formatAmount(numValue));
        } else {
            setDisplayValue(formatAmount(value));
        }
    };

    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, '');
        setDisplayValue(inputValue);
    };

    return (
        <input
            type="text"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            data-row={rowIndex}
            data-col={colIndex}
            placeholder="0"
        />
    );
};

// 电话输入组件
const PhoneInput = ({ value, onChange, onKeyDown, rowIndex, colIndex, validate }) => {
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        onChange(inputValue);
        setIsValid(validate(inputValue) || inputValue === '');
    };

    const handleBlur = () => {
        setIsValid(validate(value) || value === '');
    };

    return (
        <div className={`input-wrapper ${!isValid ? 'invalid' : ''}`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
                data-row={rowIndex}
                data-col={colIndex}
                placeholder="请输入电话号码"
                maxLength={11}
            />
            {!isValid && <span className="error-icon" title="电话号码格式不正确">!</span>}
        </div>
    );
};

// 邮箱输入组件
const EmailInput = ({ value, onChange, onKeyDown, rowIndex, colIndex, validate }) => {
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);
        setIsValid(validate(inputValue) || inputValue === '');
    };

    const handleBlur = () => {
        setIsValid(validate(value) || value === '');
    };

    return (
        <div className={`input-wrapper ${!isValid ? 'invalid' : ''}`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
                data-row={rowIndex}
                data-col={colIndex}
                placeholder="请输入邮箱地址"
            />
            {!isValid && <span className="error-icon" title="邮箱格式不正确">!</span>}
        </div>
    );
};

export default EnhancedEditableTable;
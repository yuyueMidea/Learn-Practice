import { useCallback, useEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'

// ==================== 方案一：使用 isDirty 标志（推荐） ====================
export function useRowChangeDetection() {
    const [ddeMemInfo, setDdeMemInfo] = useState<DdeMemInfo | null>(null);
    const [isDirty, setIsDirty] = useState(false); // 标记是否有未保存的修改
    const originalDataRef = useRef<DdeMemInfo | null>(null); // 保存原始数据

    // 监听数据变化，自动设置 isDirty
    useEffect(() => {
        if (!originalDataRef.current || !ddeMemInfo) {
            setIsDirty(false);
            return;
        }

        const tempOriginal = { ...originalDataRef.current };
        const tempCurrent = { ...ddeMemInfo };
        delete tempOriginal.Total;
        delete tempCurrent.Total;

        setIsDirty(!isEqual(tempOriginal, tempCurrent));
    }, [ddeMemInfo]);

    const handleTableRowClick = useCallback((row: DdeMemInfo) => {
        // 如果有未保存的修改，提示用户
        if (isDirty && ddeMemInfo && ddeMemInfo.id !== row.id) {
            if (!confirm("You have unsaved changes. Do you want to discard them?")) {
                return false;
            }
        }

        // 更新数据和原始数据引用
        setDdeMemInfo(row);
        originalDataRef.current = { ...row }; // 深拷贝一份作为原始数据
        setIsDirty(false);
        
        // 其他逻辑...
        setErrList(row.ddeErrorLists || []);
        const isEditFlag = row.errCount > 0;
        setIsEdit(isEditFlag);
        
        return true;
    }, [isDirty, ddeMemInfo]);

    // 保存成功后重置 isDirty
    const handleSaveSuccess = useCallback((savedData: DdeMemInfo) => {
        originalDataRef.current = { ...savedData };
        setDdeMemInfo(savedData);
        setIsDirty(false);
    }, []);

    return {
        ddeMemInfo,
        setDdeMemInfo,
        isDirty,
        handleTableRowClick,
        handleSaveSuccess
    };
}

// ==================== 方案二：使用 Ref 保存原始数据 ====================
export function useRowChangeDetectionV2() {
    const [ddeMemInfo, setDdeMemInfo] = useState<DdeMemInfo | null>(null);
    const originalDataRef = useRef<DdeMemInfo | null>(null);
    const currentIdRef = useRef<string | null>(null);

    const checkHasChanges = useCallback(() => {
        if (!originalDataRef.current || !ddeMemInfo) {
            return false;
        }

        const tempOriginal = { ...originalDataRef.current };
        const tempCurrent = { ...ddeMemInfo };
        delete tempOriginal.Total;
        delete tempCurrent.Total;

        return !isEqual(tempOriginal, tempCurrent);
    }, [ddeMemInfo]);

    const handleTableRowClick = useCallback((row: DdeMemInfo) => {
        // 检查是否切换到不同的行
        if (currentIdRef.current && currentIdRef.current !== row.id) {
            const hasChanges = checkHasChanges();
            
            if (hasChanges) {
                if (!confirm("You have unsaved changes. Do you want to discard them?")) {
                    return false;
                }
            }
        }

        // 更新数据
        setDdeMemInfo(row);
        originalDataRef.current = JSON.parse(JSON.stringify(row)); // 深拷贝
        currentIdRef.current = row.id;
        
        return true;
    }, [checkHasChanges]);

    return {
        ddeMemInfo,
        setDdeMemInfo,
        hasChanges: checkHasChanges(),
        handleTableRowClick,
        resetOriginal: () => {
            if (ddeMemInfo) {
                originalDataRef.current = JSON.parse(JSON.stringify(ddeMemInfo));
            }
        }
    };
}

// ==================== 方案三：使用自定义 Hook 完整实现 ====================
export function useEditableRowData<T extends { id: string }>(
    config?: {
        onBeforeChange?: (current: T, next: T) => boolean;
        onAfterChange?: (data: T) => void;
        excludeKeys?: string[]; // 对比时排除的字段
    }
) {
    const [currentData, setCurrentData] = useState<T | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const originalDataRef = useRef<T | null>(null);
    const isCheckingRef = useRef(false);

    // 计算是否有改变
    const calculateDirty = useCallback((original: T | null, current: T | null) => {
        if (!original || !current) return false;

        const cleanOriginal = { ...original };
        const cleanCurrent = { ...current };

        // 移除需要排除的字段
        config?.excludeKeys?.forEach(key => {
            delete cleanOriginal[key];
            delete cleanCurrent[key];
        });

        return !isEqual(cleanOriginal, cleanCurrent);
    }, [config?.excludeKeys]);

    // 监听当前数据变化
    useEffect(() => {
        if (isCheckingRef.current) return;
        
        const dirty = calculateDirty(originalDataRef.current, currentData);
        setIsDirty(dirty);
    }, [currentData, calculateDirty]);

    // 切换行数据
    const switchRowData = useCallback((newRow: T): boolean => {
        // 同一行不需要检查
        if (currentData?.id === newRow.id) {
            return true;
        }

        // 检查是否有未保存的修改
        if (isDirty) {
            const shouldContinue = config?.onBeforeChange?.(currentData!, newRow) ?? 
                confirm("You have unsaved changes. Do you want to discard them?");
            
            if (!shouldContinue) {
                return false;
            }
        }

        // 更新数据
        isCheckingRef.current = true;
        setCurrentData(newRow);
        originalDataRef.current = JSON.parse(JSON.stringify(newRow));
        setIsDirty(false);
        isCheckingRef.current = false;

        config?.onAfterChange?.(newRow);
        return true;
    }, [currentData, isDirty, config]);

    // 保存后重置原始数据
    const markAsSaved = useCallback((savedData?: T) => {
        const dataToSave = savedData || currentData;
        if (dataToSave) {
            originalDataRef.current = JSON.parse(JSON.stringify(dataToSave));
            setIsDirty(false);
        }
    }, [currentData]);

    // 手动重置到原始状态
    const resetToOriginal = useCallback(() => {
        if (originalDataRef.current) {
            setCurrentData({ ...originalDataRef.current });
            setIsDirty(false);
        }
    }, []);

    return {
        currentData,
        setCurrentData,
        isDirty,
        switchRowData,
        markAsSaved,
        resetToOriginal,
        originalData: originalDataRef.current
    };
}

// ==================== 使用示例 ====================
export function ExampleUsage() {
    const {
        currentData: ddeMemInfo,
        setCurrentData: setDdeMemInfo,
        isDirty,
        switchRowData,
        markAsSaved
    } = useEditableRowData<DdeMemInfo>({
        excludeKeys: ['Total'], // 排除 Total 字段的对比
        onAfterChange: (data) => {
            // 切换行后的额外操作
            setErrList(data.ddeErrorLists || []);
            setIsEdit(data.errCount > 0);
        }
    });

    const handleTableRowClick = useCallback((row: DdeMemInfo) => {
        return switchRowData(row);
    }, [switchRowData]);

    const handleSave = useCallback(async () => {
        if (!ddeMemInfo) return;
        
        try {
            const res = await saveContrDetail(ddeMemInfo);
            markAsSaved(res); // 保存成功后标记为已保存
            message.success({ content: 'Save success' });
        } catch (err) {
            message.error({ content: 'Save failed' });
        }
    }, [ddeMemInfo, markAsSaved]);

    return {
        ddeMemInfo,
        setDdeMemInfo,
        isDirty,
        handleTableRowClick,
        handleSave
    };
}
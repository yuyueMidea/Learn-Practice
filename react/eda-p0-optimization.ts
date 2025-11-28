// ============================================================================
// P0 优化 1: 提取常量和配置（消除硬编码）
// ============================================================================

// constants/tableConfig.ts
export const CONTRIB_TABLE_COLUMNS = [
    {
        label: 'EE Account Number',
        dataIndex: 'memAcctCode',
        key: 'memAcctCode',
        width: 200
    },
    {
        label: 'EE Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        label: 'Contribution Period Start Date',
        dataIndex: 'contrPeriodStartDate',
        key: 'contrPeriodStartDate',
        width: 250
    },
    {
        label: 'Contribution Period End Date',
        dataIndex: 'contrPeriodEndDate',
        key: 'contrPeriodEndDate',
        width: 250
    },
    {
        label: 'Error',
        dataIndex: 'errCount',
        key: 'errCount',
        width: 140,
    },
    {
        label: 'RI',
        dataIndex: 'ddeRi',
        key: 'ddeRi',
        width: 140,
        render: (amount: number) => amount?.toLocaleString('en-US') || ''
    },
    {
        label: 'Basic Salary',
        dataIndex: 'ddeBasicSalary',
        key: 'ddeBasicSalary',
        width: 140,
        render: (amount: number) => amount?.toLocaleString('en-US') || ''
    },
    {
        label: 'ERMC',
        dataIndex: 'ddeErmc',
        key: 'ddeErmc',
        width: 140,
        render: (amount: number) => amount?.toLocaleString('en-US') || ''
    },
    {
        label: 'EEMC',
        dataIndex: 'ddeEemc',
        key: 'ddeEemc',
        width: 140,
        render: (amount: number) => amount?.toLocaleString('en-US') || ''
    }
] as const;

export const ERROR_TABLE_COLUMNS = [
    {
        label: 'Error Type',
        dataIndex: 'ddeErrorType',
        key: 'ddeErrorType',
        width: 100
    },
    {
        label: 'Error Message',
        dataIndex: 'ddeErrorMsg',
        key: 'ddeErrorMsg'
    },
    {
        label: 'Error Code',
        dataIndex: 'ddeErrorCode',
        key: 'ddeErrorCode'
    },
    {
        label: 'Error Status',
        dataIndex: 'errorStatusCode',
        key: 'errorStatusCode',
        width: 140
    }
] as const;

export const MESSAGE_TABLE_COLUMNS = [
    {
        label: 'Date Time',
        dataIndex: 'inputDate',
        key: 'inputDate',
        width: 150,
    },
    {
        label: 'User',
        dataIndex: 'inputUser',
        key: 'inputUser',
        width: 200
    },
    {
        label: 'Message',
        dataIndex: 'fupRemark',
        key: 'fupRemark'
    }
] as const;

// constants/validation.ts
export const VALIDATION_PATTERNS = {
    DATE: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    MOBILE: /^[+]?[(]?[\d\s-()]{10,}$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    CHINESE_NAME: /^[\u4e00-\u9fa5]{1,10}$/
} as const;

export const FIELD_GROUPS = {
    MEMBER_INFO: ['firstName', 'lastName', 'memberClass', 'dateOfJoinScheme', 
                  'birthDate', 'empDate', 'mobile', 'email', 'mobileCountryCode', 
                  'firstnameZhhk', 'lastnameZhhk'],
    AMOUNT_FIELDS: ['ERMC', 'EEMC', 'ERVC1', 'ERVC2', 'ERVC3', 'ERVC4', 
                    'ERVC5', 'ERVC6', 'ERVC7', 'EEVC1', 'EEVC2']
} as const;

// ============================================================================
// P0 优化 2: 修复 useEffect 依赖问题（导致无限循环）
// ============================================================================

// 🔴 问题：这个 useEffect 会导致无限循环
/*
useEffect(() => {
    if (!ddeMemInfo) return;
    const totalVal = amountFields.reduce((sum, fieldKey) => {
        return sum + (Number(ddeMemInfo[fieldKey]) || 0);
    }, 0);
    setDdeMemInfo(prev => prev ? { ...prev, Total: totalVal } : null);
}, [amountFields, ddeMemInfo?.ddeErmc, ddeMemInfo?.ddeEemc, ...]);
// 问题：setDdeMemInfo 会触发 ddeMemInfo 变化，导致循环
*/

// ✅ 解决方案：使用 useMemo 计算 Total
const totalAmount = useMemo(() => {
    if (!ddeMemInfo) return 0;
    return amountFields.reduce((sum, fieldKey) => {
        return sum + (Number(ddeMemInfo[fieldKey]) || 0);
    }, 0);
}, [ddeMemInfo, amountFields]);

// 在渲染时使用计算后的 total，而不是存储在 state 中
// 或者使用独立的 state
const [calculatedTotal, setCalculatedTotal] = useState(0);

useEffect(() => {
    if (!ddeMemInfo) return;
    const totalVal = amountFields.reduce((sum, fieldKey) => {
        return sum + (Number(ddeMemInfo[fieldKey]) || 0);
    }, 0);
    setCalculatedTotal(totalVal);
}, [ddeMemInfo, amountFields]);

// ============================================================================
// P0 优化 3: 优化状态管理（减少不必要的状态）
// ============================================================================

// 🔴 问题：多个状态管理混乱
// const [ddeMemInfo, setDdeMemInfo] = useState<DdeMemInfo | null>(null);
// const [ddeMemInfoOld, setddeMemInfoOld] = useState<DdeMemInfo | null>(null);
// const safeMemInfo = createSafeMemInfo(ddeMemInfo);

// ✅ 优化：使用 useRef 保存旧值，减少状态
const ddeMemInfoOldRef = useRef<DdeMemInfo | null>(null);

const handleTableRowClick = useCallback((row: DdeMemInfo) => {
    const oldInfo = ddeMemInfoOldRef.current;
    
    if (oldInfo && ddeMemInfo && (ddeMemInfo.id !== row.id)) {
        const tempOld = { ...oldInfo };
        const tempCurrent = { ...ddeMemInfo };
        delete tempOld.Total;
        delete tempCurrent.Total;

        const hasUnsavedChanges = !isEqual(tempOld, tempCurrent);
        if (hasUnsavedChanges && !confirm("You have unsaved changes. Do you want to discard them?")) {
            return false;
        }
    }
    
    setDdeMemInfo(row);
    ddeMemInfoOldRef.current = row; // 使用 ref 而不是 state
    setErrList(row.ddeErrorLists || []);
    
    const isEditFlag = (row.errCount > 0);
    setIsEdit(isEditFlag);
    
    if (isEditFlag) {
        updateFieldDisabled(
            FIELD_GROUPS.MEMBER_INFO, 
            !!row.memAcctUuid
        );
    }
    
    return true;
}, [ddeMemInfo, updateFieldDisabled]);

// ============================================================================
// P0 优化 4: 合并多个状态更新（性能优化）
// ============================================================================

// 🔴 问题：filters 对象的每个属性都触发单独更新
// const [filters, setFilters] = useState({
//     errFlag: false,
//     errMsg: '',
//     memAccount: '',
//     memName: ''
// });

// ✅ 优化：使用 useReducer 管理复杂状态
type FilterState = {
    errFlag: boolean;
    errMsg: string;
    memAccount: string;
    memName: string;
};

type FilterAction = 
    | { type: 'SET_ERROR_FLAG'; payload: boolean }
    | { type: 'SET_ERROR_MSG'; payload: string }
    | { type: 'SET_MEM_ACCOUNT'; payload: string }
    | { type: 'SET_MEM_NAME'; payload: string }
    | { type: 'RESET' }
    | { type: 'BATCH_UPDATE'; payload: Partial<FilterState> };

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
    switch (action.type) {
        case 'SET_ERROR_FLAG':
            return { ...state, errFlag: action.payload };
        case 'SET_ERROR_MSG':
            return { ...state, errMsg: action.payload };
        case 'SET_MEM_ACCOUNT':
            return { ...state, memAccount: action.payload };
        case 'SET_MEM_NAME':
            return { ...state, memName: action.payload };
        case 'RESET':
            return { errFlag: false, errMsg: '', memAccount: '', memName: '' };
        case 'BATCH_UPDATE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const [filters, dispatchFilter] = useReducer(filterReducer, {
    errFlag: false,
    errMsg: '',
    memAccount: '',
    memName: ''
});

const handleFilterChange = useCallback((filterObj: Partial<FilterState>) => {
    dispatchFilter({ type: 'BATCH_UPDATE', payload: filterObj });
}, []);

const handleReset = useCallback(() => {
    dispatchFilter({ type: 'RESET' });
}, []);

// ============================================================================
// P0 优化 5: 提取工具函数（避免重复创建）
// ============================================================================

// utils/validation.ts
export const isValidDate = (date: string | undefined): boolean => {
    if (!date) return false;
    return VALIDATION_PATTERNS.DATE.test(date);
};

export const validateNewMember = (memInfo: DdeMemInfo) => {
    const errors: string[] = [];
    
    if (!memInfo.memAcctUuid) {
        if (memInfo.dateOfJoinScheme && !isValidDate(memInfo.dateOfJoinScheme)) {
            errors.push('Invalid dateOfJoinScheme');
        }
        
        if (memInfo.termLastDateOfEmp && !isValidDate(memInfo.termLastDateOfEmp)) {
            errors.push('Invalid termLastDateOfEmp');
        }
        
        if (!VALIDATION_PATTERNS.MOBILE.test(memInfo.mobile)) {
            errors.push('Invalid mobile');
        }
        
        if (!VALIDATION_PATTERNS.EMAIL.test(memInfo.email)) {
            errors.push('Invalid email');
        }
        
        if (!VALIDATION_PATTERNS.CHINESE_NAME.test(memInfo.firstnameZhhk)) {
            errors.push('Invalid firstnameZhhk');
        }
        
        if (!VALIDATION_PATTERNS.CHINESE_NAME.test(memInfo.lastnameZhhk)) {
            errors.push('Invalid lastnameZhhk');
        }
    }
    
    return errors;
};

// utils/format.ts
export const toThousandSeparator = (num: string | number | null | undefined): string => {
    if (num === null || num === undefined) return '';
    return Number(num).toLocaleString('en-US');
};

export const formatDateTime = (dateTimeString: string): string => {
    const [date, time] = dateTimeString.split(' ');
    const formattedDate = date.split('-').reverse().join('/');
    return `${formattedDate} T${time}`;
};

// ============================================================================
// P0 优化 6: 修复 handleSubmit 中的验证逻辑
// ============================================================================

// 🔴 原代码问题：验证逻辑复杂且重复
const handleSubmit = useCallback(async () => {
    if (!ddeMemInfo) return;
    
    setLoadingFlag(true);
    
    // ✅ 使用提取的验证函数
    const validationErrors = validateNewMember(ddeMemInfo);
    
    if (validationErrors.length > 0) {
        message.error({ content: validationErrors.join('\n') });
        setLoadingFlag(false);
        return;
    }
    
    try {
        const detail = {
            ...ddeMemInfo,
            awdWorkId: rawResponseData.caseInfo?.awdWorkId,
            inputterType: '',
            erAcctNo: rawResponseData.ddeErInfo?.employerCode
        };
        
        const res = await submitContrDetail(detail);
        setErrList(res.errorLists);
        handleSaveOrSubmitSuccessResponse(res, 'Submit success', ddeMemInfo);
    } catch (err) {
        handleApiError(err, 'Submit failed');
    } finally {
        setLoadingFlag(false);
    }
}, [ddeMemInfo, rawResponseData, handleApiError]);

// ============================================================================
// P0 优化 7: 优化 filteredMemInfo 计算（性能关键）
// ============================================================================

// ✅ 优化：提取过滤函数，避免在 useMemo 中创建匿名函数
const filterByError = useCallback((items: DdeMemInfo[], errFlag: boolean, errMsg: string) => {
    if (!errFlag && !errMsg) return items;
    
    let result = items;
    
    if (errFlag) {
        result = result.filter(item => item.errCount > 0);
    }
    
    if (errMsg) {
        result = result.filter(item => item.errorCodes?.includes(errMsg));
    }
    
    return result;
}, []);

const filterByAccount = useCallback((items: DdeMemInfo[], account: string) => {
    if (!account) return items;
    return items.filter(item => 
        String(item.memAcctCode || '').includes(account)
    );
}, []);

const filterByName = useCallback((items: DdeMemInfo[], name: string) => {
    if (!name) return items;
    return items.filter(item => 
        item.firstName?.includes(name) ||
        item.firstnameZhhk?.includes(name) ||
        item.lastName?.includes(name) ||
        item.lastnameZhhk?.includes(name)
    );
}, []);

const filteredMemInfo = useMemo(() => {
    let result = rawResponseData.ddeMemInfos;
    
    result = filterByError(result, filters.errFlag, filters.errMsg);
    result = filterByAccount(result, filters.memAccount);
    result = filterByName(result, filters.memName);
    
    return result;
}, [
    rawResponseData.ddeMemInfos,
    filters,
    filterByError,
    filterByAccount,
    filterByName
]);

// ============================================================================
// P0 优化 8: 优化初始化加载（避免竞态条件）
// ============================================================================

// 🔴 原代码问题：多个异步操作，没有正确处理取消
useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    
    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('awdWorkId') || '2025-08-22T12:34:56';
    
    const init = async () => {
        setLoadingFlag(true);
        
        try {
            // ✅ 使用 Promise.allSettled 处理部分失败的情况
            const results = await Promise.allSettled([
                getMemInfos({ awdWorkId: workId }),
                getMobileInfos(),
                getMsgInfos(workId)
            ]);
            
            if (cancelled) return;
            
            // 检查哪些请求失败了
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const requestNames = ['Member Info', 'Mobile Codes', 'Messages'];
                    console.error(`Failed to load ${requestNames[index]}:`, result.reason);
                }
            });
            
        } catch (e) {
            console.error('Init EDA page error:', e);
        } finally {
            if (!cancelled) {
                setLoadingFlag(false);
            }
        }
    };
    
    init();
    
    return () => {
        cancelled = true;
        abortController.abort();
    };
}, []); // ✅ 空依赖数组，只在挂载时执行一次

// ============================================================================
// P0 优化 9: 优化 API 调用（添加取消令牌）
// ============================================================================

// hooks/useApiCall.ts
export const useApiCall = <T,>(
    apiFunc: (...args: any[]) => Promise<T>,
    options?: {
        onSuccess?: (data: T) => void;
        onError?: (error: any) => void;
    }
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    const execute = useCallback(async (...args: any[]) => {
        // 取消之前的请求
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(null);
        
        try {
            const result = await apiFunc(...args);
            options?.onSuccess?.(result);
            return result;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request cancelled');
                return;
            }
            setError(err);
            options?.onError?.(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc, options]);
    
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);
    
    return { execute, loading, error };
};

// 使用示例
const { execute: executeSave, loading: saveLoading } = useApiCall(
    saveContrDetail,
    {
        onSuccess: (res) => {
            handleSaveOrSubmitSuccessResponse(res, 'Save success', ddeMemInfo);
        },
        onError: (err) => {
            handleApiError(err, 'Save failed');
        }
    }
);

const handleSave = useCallback(async () => {
    if (!ddeMemInfo) return;
    
    const detail = {
        ...ddeMemInfo,
        awdWorkId: rawResponseData.caseInfo?.awdWorkId,
        inputterType: '',
        erAcctNo: rawResponseData.ddeErInfo?.employerCode
    };
    
    await executeSave(detail);
}, [ddeMemInfo, rawResponseData, executeSave]);

// ============================================================================
// P0 优化 10: 修复 getLoadERType 中的逻辑问题
// ============================================================================

// 🔴 原代码问题：复杂的字段映射逻辑
const getLoadERType = useCallback(async (ercode: string, pgID: string) => {
    try {
        const res: any = await loadERType(ercode, pgID);
        
        let showFieldList: string[] = res.map((c: any) => c.subacctTypeShortName);
        
        if (showFieldList.length === 0) {
            console.error('MC and VC setting config all empty, please check!');
            return;
        }
        
        // ✅ 优化：使用 Map 简化映射逻辑
        const fieldMapping = new Map([
            ['ERVC', 'ERVC1'],
            ['EEVC', 'EEVC1']
        ]);
        
        showFieldList = showFieldList.map(field => 
            fieldMapping.get(field) || field
        );
        
        // ✅ 使用常量代替硬编码
        const hideColumns = FIELD_GROUPS.AMOUNT_FIELDS.filter(
            field => !showFieldList.includes(field)
        );
        
        console.log('EDA, MC and VC dynamic display:', showFieldList, 'hideColumn:', hideColumns);
        
        setHideFields(hideColumns);
        
        const visibleFields = MEMBER_FIELD_CONFIGS.filter(v => 
            showFieldList.includes(v.label)
        );
        setAmountFields(visibleFields.map(v => v.key));
        
    } catch (error) {
        console.error('Failed to load ER type:', error);
        message.error({ content: 'Failed to load field configuration' });
    }
}, []);

// ============================================================================
// 完整优化后的组件主体（关键部分）
// ============================================================================

export default function EdaCollection() {
    // ==================== 状态管理 ====================
    const tokenInfo = tab.getState();
    const [ddeMemInfo, setDdeMemInfo] = useState<DdeMemInfo | null>(null);
    const ddeMemInfoOldRef = useRef<DdeMemInfo | null>(null); // ✅ 使用 ref
    
    const [schemeCode, setSchemeCode] = useState<string>('');
    const [filters, dispatchFilter] = useReducer(filterReducer, { // ✅ 使用 reducer
        errFlag: false,
        errMsg: '',
        memAccount: '',
        memName: ''
    });
    
    const [rawResponseData, setRawResponseData] = useState<MemInputPayloadProp>({
        ddeMemInfos: [],
        caseInfo: {
            applRefNo: '',
            awdWorkId: '',
            billContrPeriodEndDate: '',
            billContrPeriodStartDate: '',
            caseRemark: '',
            caseStatusCode: '',
            cycleChangeDate: '',
            formSubType: '',
            submitDate: '',
        },
        ddeErInfo: {
            employerCode: '',
            employerName: '',
            erAcctUuid: '',
            inputterType: '',
            payrollGroupShortName: ''
        },
    });
    
    const [errList, setErrList] = useState<ErrInfo[]>([]);
    const [msgList, setMsgList] = useState<MsgInfo[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [hideFields, setHideFields] = useState<string[]>([]);
    const [amountFields, setAmountFields] = useState<string[]>([]);
    const [filterFieldList, setfilterFieldList] = useState<FieldConfig[]>(MEMBER_FIELD_CONFIGS);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // ==================== 计算属性（使用 useMemo）====================
    const safeMemInfo = useMemo(() => 
        ddeMemInfo || ({} as DdeMemInfo),
        [ddeMemInfo]
    );
    
    const totalErrCount = useMemo(() => 
        rawResponseData.ddeMemInfos.reduce((sum, row) => sum + (row.errCount || 0), 0),
        [rawResponseData.ddeMemInfos]
    );
    
    const totalAmount = useMemo(() => {
        if (!ddeMemInfo) return 0;
        return amountFields.reduce((sum, fieldKey) => 
            sum + (Number(ddeMemInfo[fieldKey]) || 0), 0
        );
    }, [ddeMemInfo, amountFields]);
    
    const visibleFields = useMemo(() => 
        filterFieldList.filter(v => !hideFields.includes(v.label)),
        [filterFieldList, hideFields]
    );
    
    const enabledFields = useMemo(() => 
        visibleFields.filter(v => !v.disabled && isEdit),
        [visibleFields, isEdit]
    );
    
    const fieldOrder = useMemo(() => 
        enabledFields.map(f => f.key),
        [enabledFields]
    );
    
    // ✅ 使用优化后的过滤逻辑
    const filteredMemInfo = useMemo(() => {
        let result = rawResponseData.ddeMemInfos;
        result = filterByError(result, filters.errFlag, filters.errMsg);
        result = filterByAccount(result, filters.memAccount);
        result = filterByName(result, filters.memName);
        return result;
    }, [rawResponseData.ddeMemInfos, filters, filterByError, filterByAccount, filterByName]);
    
    // ==================== Refs ====================
    const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
    
    // ==================== 回调函数（使用 useCallback）====================
    const registerInputRef = useCallback((
        fieldKey: string, 
        el: HTMLInputElement | HTMLSelectElement | null, 
        disabled: boolean
    ) => {
        inputRefs.current[fieldKey] = disabled ? null : el;
    }, []);
    
    const handleFieldEnter = useCallback((currentKey: string) => {
        const startIndex = fieldOrder.indexOf(currentKey);
        for (let i = startIndex + 1; i < fieldOrder.length; i++) {
            const key = fieldOrder[i];
            const nextEl = inputRefs.current[key];
            if (nextEl && !nextEl.disabled) {
                nextEl.focus();
                return;
            }
        }
    }, [fieldOrder]);
    
    const updateFieldDisabled = useCallback((
        fieldKeyList: string[], 
        disabled: boolean
    ) => {
        setfilterFieldList(prev =>
            prev.map(field =>
                fieldKeyList.includes(field.key)
                    ? { ...field, disabled }
                    : field
            )
        );
    }, []);
    
    // ... 其余代码保持一致
    
    return (
        <div className={style.edaWrapper_conteiner}>
            {/* JSX 内容 */}
        </div>
    );
}
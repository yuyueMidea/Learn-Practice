import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, ChevronRight, User, Clock, CheckCircle, XCircle, AlertCircle, Send, FileText, Save, Play } from 'lucide-react';

// ==================== 数据模型定义 ====================
const ApprovalStatus = {
    DRAFT: 'draft',          // 草稿
    PENDING: 'pending',      // 待审批
    APPROVED: 'approved',    // 已通过
    REJECTED: 'rejected',    // 已拒绝
    CANCELLED: 'cancelled'   // 已取消
};

const NodeType = {
    START: 'start',
    APPROVAL: 'approval',
    CONDITION: 'condition',
    END: 'end'
};

const ApprovalType = {
    LEAVE: '请假申请',
    EXPENSE: '报销申请',
    CONTRACT: '合同审批',
    PURCHASE: '采购申请'
};

// ==================== 模拟数据库 ====================
class Database {
    constructor() {
        this.users = [
            { id: 'u1', name: '张三', role: '员工', department: '技术部' },
            { id: 'u2', name: '李四', role: '部门主管', department: '技术部' },
            { id: 'u3', name: '王五', role: '财务', department: '财务部' },
            { id: 'u4', name: '赵六', role: '总经理', department: '管理层' },
            { id: 'u5', name: '钱七', role: '员工', department: '市场部' },
            { id: 'u6', name: '孙八', role: '部门主管', department: '市场部' },
            { id: 'u7', name: '周九', role: 'HR', department: '人力资源部' }
        ];

        this.workflows = [];
        this.instances = [];
        this.currentUser = this.users[0]; // 默认登录用户
    }

    getUsers() {
        return [...this.users];
    }

    getCurrentUser() {
        return { ...this.currentUser };
    }

    setCurrentUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) this.currentUser = user;
    }

    saveWorkflow(workflow) {
        const index = this.workflows.findIndex(w => w.id === workflow.id);
        if (index >= 0) {
            this.workflows[index] = workflow;
        } else {
            this.workflows.push(workflow);
        }
        return workflow;
    }

    getWorkflow(id) {
        return this.workflows.find(w => w.id === id);
    }

    getWorkflows() {
        return [...this.workflows];
    }

    createInstance(workflowId, formData) {
        const workflow = this.getWorkflow(workflowId);
        if (!workflow) return null;

        const instance = {
            id: `inst_${Date.now()}`,
            workflowId,
            workflowName: workflow.name,
            applicant: this.currentUser,
            formData,
            status: ApprovalStatus.PENDING,
            currentNodeIndex: 0,
            createTime: new Date().toLocaleString('zh-CN'),
            history: [{
                nodeId: 'start',
                nodeName: '发起申请',
                assignee: this.currentUser.name,
                status: ApprovalStatus.APPROVED,
                action: 'submit',
                time: new Date().toLocaleString('zh-CN'),
                comment: '发起申请'
            }]
        };

        this.instances.push(instance);
        return instance;
    }

    getInstances() {
        return [...this.instances];
    }

    getInstance(id) {
        return this.instances.find(i => i.id === id);
    }

    processApproval(instanceId, action, comment) {
        const instance = this.getInstance(instanceId);
        if (!instance) return null;

        const workflow = this.getWorkflow(instance.workflowId);
        const currentNode = workflow.nodes[instance.currentNodeIndex];

        const record = {
            nodeId: currentNode.id,
            nodeName: currentNode.name,
            assignee: this.currentUser.name,
            status: action === 'approve' ? ApprovalStatus.APPROVED : ApprovalStatus.REJECTED,
            action,
            time: new Date().toLocaleString('zh-CN'),
            comment: comment || ''
        };

        instance.history.push(record);

        if (action === 'reject') {
            instance.status = ApprovalStatus.REJECTED;
        } else if (instance.currentNodeIndex >= workflow.nodes.length - 1) {
            instance.status = ApprovalStatus.APPROVED;
        } else {
            // 检查下一个节点的条件
            let nextIndex = instance.currentNodeIndex + 1;
            let moved = false;

            while (nextIndex < workflow.nodes.length && !moved) {
                const nextNode = workflow.nodes[nextIndex];
                if (this.checkConditions(nextNode.conditions, instance.formData)) {
                    instance.currentNodeIndex = nextIndex;
                    moved = true;
                } else {
                    nextIndex++;
                }
            }

            if (!moved) {
                instance.status = ApprovalStatus.APPROVED;
            }
        }

        return instance;
    }

    checkConditions(conditions, formData) {
        if (!conditions || conditions.length === 0) return true;

        return conditions.every(condition => {
            const fieldValue = parseFloat(formData[condition.field]) || 0;
            const conditionValue = parseFloat(condition.value);

            switch (condition.operator) {
                case '==': return fieldValue === conditionValue;
                case '>': return fieldValue > conditionValue;
                case '<': return fieldValue < conditionValue;
                case '>=': return fieldValue >= conditionValue;
                case '<=': return fieldValue <= conditionValue;
                default: return true;
            }
        });
    }

    getMyPendingApprovals() {
        return this.instances.filter(instance => {
            if (instance.status !== ApprovalStatus.PENDING) return false;
            const workflow = this.getWorkflow(instance.workflowId);
            if (!workflow) return false;
            const currentNode = workflow.nodes[instance.currentNodeIndex];
            return currentNode?.assignees?.some(a => a.id === this.currentUser.id);
        });
    }

    getMyApplications() {
        return this.instances.filter(i => i.applicant.id === this.currentUser.id);
    }
}

const db = new Database();

// ==================== 工具函数 ====================
const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// ==================== 子组件：用户选择器 ====================
const UserSelector = ({ selectedUsers, onChange, multi = true }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const users = db.getUsers();

    const toggleUser = (user) => {
        if (multi) {
            const exists = selectedUsers.find(u => u.id === user.id);
            if (exists) {
                onChange(selectedUsers.filter(u => u.id !== user.id));
            } else {
                onChange([...selectedUsers, user]);
            }
        } else {
            onChange([user]);
            setShowDropdown(false);
        }
    };

    return (
        <div className="relative">
            <div className="border rounded-lg p-2 min-h-[42px] cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                {selectedUsers.length === 0 ? (
                    <span className="text-gray-400">选择审批人</span>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map(user => (
                            <span key={user.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                {user.name} ({user.role})
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {users.map(user => (
                        <div
                            key={user.id}
                            onClick={() => toggleUser(user)}
                            className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedUsers.find(u => u.id === user.id) ? 'bg-blue-50' : ''
                                }`}
                        >
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.role} - {user.department}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ==================== 子组件：节点编辑器 ====================
const NodeEditor = ({ nodes, setNodes, selectedNode, setSelectedNode }) => {
    const [editingNode, setEditingNode] = useState(null);

    const addNode = () => {
        const newNode = {
            id: generateId(),
            name: '新审批节点',
            type: NodeType.APPROVAL,
            assignees: [],
            conditions: [],
            actions: ['approve', 'reject'],
            order: nodes.length
        };
        setNodes([...nodes, newNode]);
    };

    const updateNode = (id, updates) => {
        setNodes(nodes.map(node => node.id === id ? { ...node, ...updates } : node));
        if (selectedNode?.id === id) {
            setSelectedNode({ ...selectedNode, ...updates });
        }
    };

    const deleteNode = (id) => {
        setNodes(nodes.filter(node => node.id !== id));
        if (selectedNode?.id === id) setSelectedNode(null);
    };

    const moveNode = (index, direction) => {
        const newNodes = [...nodes];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= nodes.length) return;
        [newNodes[index], newNodes[targetIndex]] = [newNodes[targetIndex], newNodes[index]];
        newNodes.forEach((node, idx) => node.order = idx);
        setNodes(newNodes);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">流程节点配置</h2>
                <button
                    onClick={addNode}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    添加节点
                </button>
            </div>

            {nodes.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>暂无节点，点击上方按钮添加</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {nodes.map((node, index) => (
                        <div
                            key={node.id}
                            className={`border rounded-lg p-4 cursor-pointer transition ${selectedNode?.id === node.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => setSelectedNode(node)}
                        >
                            {editingNode === node.id ? (
                                <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="text"
                                        value={node.name}
                                        onChange={(e) => updateNode(node.id, { name: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="节点名称"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingNode(null)}
                                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                        >
                                            <Check size={16} />
                                            保存
                                        </button>
                                        <button
                                            onClick={() => setEditingNode(null)}
                                            className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
                                        >
                                            <X size={16} />
                                            取消
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{node.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {node.assignees.length > 0 ? `${node.assignees.length} 位审批人` : '未设置审批人'}
                                                {node.conditions && node.conditions.length > 0 && ` · ${node.conditions.length} 个条件`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveNode(index, 'up');
                                            }}
                                            disabled={index === 0}
                                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveNode(index, 'down');
                                            }}
                                            disabled={index === nodes.length - 1}
                                            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                                        >
                                            ↓
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingNode(node.id);
                                            }}
                                            className="p-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNode(node.id);
                                            }}
                                            className="p-2 text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ==================== 子组件：条件配置器 ====================
const ConditionEditor = ({ node, updateNode }) => {
    const [newCondition, setNewCondition] = useState({ field: '', operator: '>', value: '' });

    if (!node) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-500 text-center">请选择一个节点进行配置</p>
            </div>
        );
    }

    const addCondition = () => {
        if (newCondition.field && newCondition.value) {
            updateNode(node.id, {
                conditions: [...(node.conditions || []), { ...newCondition, id: generateId() }]
            });
            setNewCondition({ field: '', operator: '>', value: '' });
        }
    };

    const removeCondition = (id) => {
        updateNode(node.id, {
            conditions: (node.conditions || []).filter(c => c.id !== id)
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">节点详细配置</h2>

            {/* 审批人配置 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">审批人设置</h3>
                <UserSelector
                    selectedUsers={node.assignees || []}
                    onChange={(users) => updateNode(node.id, { assignees: users })}
                    multi={true}
                />
                <p className="text-sm text-gray-500 mt-2">
                    支持多选，任一审批人通过即可进入下一节点
                </p>
            </div>

            {/* 流转条件配置 */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">流转条件（可选）</h3>
                <p className="text-sm text-gray-600 mb-3">
                    设置条件后，只有满足条件的申请才会进入此节点
                </p>
                <div className="grid grid-cols-12 gap-2 mb-3">
                    <input
                        type="text"
                        value={newCondition.field}
                        onChange={(e) => setNewCondition({ ...newCondition, field: e.target.value })}
                        className="col-span-4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="字段名（如：金额）"
                    />
                    <select
                        value={newCondition.operator}
                        onChange={(e) => setNewCondition({ ...newCondition, operator: e.target.value })}
                        className="col-span-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="==">等于 (==)</option>
                        <option value=">">大于 (&gt;)</option>
                        <option value="<">小于 (&lt;)</option>
                        <option value=">=">大于等于 (≥)</option>
                        <option value="<=">小于等于 (≤)</option>
                    </select>
                    <input
                        type="text"
                        value={newCondition.value}
                        onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
                        className="col-span-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="值"
                    />
                    <button
                        onClick={addCondition}
                        className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        添加
                    </button>
                </div>
                <div className="space-y-2">
                    {(node.conditions || []).map((condition) => (
                        <div
                            key={condition.id}
                            className="flex items-center justify-between bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg"
                        >
                            <span className="text-gray-700">
                                当 <strong>{condition.field}</strong> {condition.operator} <strong>{condition.value}</strong> 时执行
                            </span>
                            <button
                                onClick={() => removeCondition(condition.id)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ==================== 子组件：流程可视化 ====================
const FlowVisualization = ({ nodes }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">流程预览</h2>
            <div className="flex items-start gap-4 overflow-x-auto pb-4">
                <div className="flex flex-col items-center min-w-max">
                    <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
                        开始
                    </div>
                    <div className="text-xs text-gray-500 mt-2">发起申请</div>
                </div>

                {nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <div className="flex items-center pt-6">
                            <ChevronRight className="text-gray-400" size={28} />
                        </div>
                        <div className="flex flex-col items-center min-w-max">
                            <div className="bg-blue-500 text-white rounded-lg px-6 py-4 min-w-[160px] shadow-lg">
                                <div className="font-semibold text-center mb-2">{node.name}</div>
                                <div className="text-xs opacity-90 space-y-1">
                                    <div className="flex items-center gap-1 justify-center">
                                        <User size={12} />
                                        <span>{node.assignees.length > 0 ? `${node.assignees.length}人` : '未设置'}</span>
                                    </div>
                                    {node.conditions && node.conditions.length > 0 && (
                                        <div className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-center">
                                            {node.conditions.length} 个条件
                                        </div>
                                    )}
                                </div>
                            </div>
                            {node.assignees.length > 0 && (
                                <div className="text-xs text-gray-600 mt-2 text-center max-w-[160px]">
                                    {node.assignees.map(a => a.name).join('、')}
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}

                <div className="flex items-center pt-6">
                    <ChevronRight className="text-gray-400" size={28} />
                </div>
                <div className="flex flex-col items-center min-w-max">
                    <div className="bg-gray-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
                        结束
                    </div>
                    <div className="text-xs text-gray-500 mt-2">流程完成</div>
                </div>
            </div>
        </div>
    );
};

// ==================== 子组件：创建申请表单 ====================
const CreateApplicationForm = ({ workflow, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: workflow?.type || ApprovalType.EXPENSE,
        amount: '',
        description: '',
        startDate: '',
        endDate: '',
        days: ''
    });

    const handleSubmit = () => {
        if (!formData.title) {
            alert('请填写标题');
            return;
        }
        onSubmit(formData);
    };

    const renderFormFields = () => {
        switch (formData.type) {
            case ApprovalType.EXPENSE:
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">报销金额（元）*</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入报销金额"
                            />
                        </div>
                    </>
                );
            case ApprovalType.LEAVE:
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">开始日期*</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">结束日期*</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">请假天数*</label>
                            <input
                                type="number"
                                value={formData.days}
                                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入请假天数"
                            />
                        </div>
                    </>
                );
            case ApprovalType.CONTRACT:
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">合同金额（元）*</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入合同金额"
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">发起申请</h2>
                    <p className="text-gray-600 mt-1">流程：{workflow?.name}</p>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">申请类型*</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {Object.entries(ApprovalType).map(([key, value]) => (
                                <option key={key} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">申请标题*</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="请输入申请标题"
                        />
                    </div>

                    {renderFormFields()}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">详细说明*</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            rows="4"
                            placeholder="请详细描述申请内容"
                        />
                    </div>
                </div>

                <div className="p-6 border-t flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        <Send size={20} />
                        提交申请
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==================== 子组件：审批进度展示 ====================
const ApprovalProgress = ({ instance, workflow, onApprove }) => {
    const [comment, setComment] = useState('');
    const currentUser = db.getCurrentUser();

    if (!instance || !workflow) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-500 text-center">请选择一个审批实例</p>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case ApprovalStatus.APPROVED:
                return <CheckCircle className="text-green-500" size={24} />;
            case ApprovalStatus.REJECTED:
                return <XCircle className="text-red-500" size={24} />;
            case ApprovalStatus.PENDING:
                return <Clock className="text-yellow-500" size={24} />;
            default:
                return <AlertCircle className="text-gray-400" size={24} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case ApprovalStatus.APPROVED:
                return '已通过';
            case ApprovalStatus.REJECTED:
                return '已拒绝';
            case ApprovalStatus.PENDING:
                return '待审批';
            default:
                return '未知状态';
        }
    };

    const currentNode = workflow.nodes[instance.currentNodeIndex];
    const canApprove = instance.status === ApprovalStatus.PENDING &&
        currentNode?.assignees?.some(a => a.id === currentUser.id);

    const handleAction = (action) => {
        if (!comment && action === 'reject') {
            alert('拒绝时必须填写意见');
            return;
        }
        onApprove(instance.id, action, comment);
        setComment('');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">审批详情</h2>

            {/* 申请信息 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <span className="text-gray-600">申请编号：</span>
                        <span className="font-semibold">{instance.id}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">申请类型：</span>
                        <span className="font-semibold">{instance.formData.type}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">申请人：</span>
                        <span className="font-semibold">{instance.applicant.name} ({instance.applicant.department})</span>
                    </div>
                    <div>
                        <span className="text-gray-600">申请时间：</span>
                        <span className="font-semibold">{instance.createTime}</span>
                    </div>
                </div>
                <div className="mb-2">
                    <span className="text-gray-600">申请标题：</span>
                    <span className="font-semibold">{instance.formData.title}</span>
                </div>
                <div className="mb-2">
                    <span className="text-gray-600">详细说明：</span>
                    <p className="text-gray-700 mt-1">{instance.formData.description}</p>
                </div>
                {instance.formData.amount && (
                    <div>
                        <span className="text-gray-600">金额：</span>
                        <span className="font-semibold text-red-600 text-lg">¥{instance.formData.amount}</span>
                    </div>
                )}
                {instance.formData.days && (
                    <div>
                        <span className="text-gray-600">天数：</span>
                        <span className="font-semibold">{instance.formData.days} 天</span>
                    </div>
                )}
                <div className="mt-4 pt-4 border-t border-blue-200">
                    <span className="text-gray-600">当前状态：</span>
                    <span className={`font-bold text-lg ml-2 ${instance.status === ApprovalStatus.APPROVED ? 'text-green-600' :
                        instance.status === ApprovalStatus.REJECTED ? 'text-red-600' :
                            'text-yellow-600'
                        }`}>
                        {getStatusText(instance.status)}
                    </span>
                </div>
            </div>

            {/* 审批操作区 */}
            {canApprove && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="text-yellow-600" size={20} />
                        待您审批
                    </h3>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">审批意见</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            rows="3"
                            placeholder="请输入审批意见（拒绝时必填）"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleAction('approve')}
                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={20} />
                            通过
                        </button>
                        <button
                            onClick={() => handleAction('reject')}
                            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                        >
                            <XCircle size={20} />
                            拒绝
                        </button>
                    </div>
                </div>
            )}

            {/* 审批历史时间线 */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-4">审批历史</h3>
                <div className="space-y-4">
                    {instance.history.map((record, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                {getStatusIcon(record.status)}
                                {index < instance.history.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-gray-300 mt-2 min-h-[40px]"></div>
                                )}
                            </div>
                            <div className="flex-1 pb-6">
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-800">{record.nodeName}</h4>
                                        <span className="text-sm text-gray-500">{record.time}</span>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <div className="text-gray-600">
                                            审批人：<span className="font-medium text-gray-800">{record.assignee}</span>
                                        </div>
                                        <div className="text-gray-600">
                                            操作：
                                            <span className={`font-medium ml-1 ${record.status === ApprovalStatus.APPROVED ? 'text-green-600' :
                                                record.status === ApprovalStatus.REJECTED ? 'text-red-600' :
                                                    'text-yellow-600'
                                                }`}>
                                                {getStatusText(record.status)}
                                            </span>
                                        </div>
                                        {record.comment && (
                                            <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                                                <span className="text-gray-600">意见：</span>
                                                <span className="text-gray-800">{record.comment}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ==================== 子组件：审批列表 ====================
const ApprovalList = ({ instances, workflows, onSelect, title }) => {
    const getStatusBadge = (status) => {
        const styles = {
            [ApprovalStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
            [ApprovalStatus.APPROVED]: 'bg-green-100 text-green-800',
            [ApprovalStatus.REJECTED]: 'bg-red-100 text-red-800',
            [ApprovalStatus.DRAFT]: 'bg-gray-100 text-gray-800'
        };
        const texts = {
            [ApprovalStatus.PENDING]: '待审批',
            [ApprovalStatus.APPROVED]: '已通过',
            [ApprovalStatus.REJECTED]: '已拒绝',
            [ApprovalStatus.DRAFT]: '草稿'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
                {texts[status]}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

            {instances.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>暂无数据</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {instances.map((instance) => {
                        const workflow = workflows.find(w => w.id === instance.workflowId);
                        return (
                            <div
                                key={instance.id}
                                onClick={() => onSelect(instance)}
                                className="border rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg">{instance.formData.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {instance.formData.type} · {instance.applicant.name} · {instance.createTime}
                                        </p>
                                    </div>
                                    {getStatusBadge(instance.status)}
                                </div>
                                {instance.formData.amount && (
                                    <div className="text-red-600 font-semibold">
                                        金额：¥{instance.formData.amount}
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 mt-2">
                                    流程：{workflow?.name || '未知流程'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ==================== 主组件 ====================
const ApprovalFlowSystem = () => {
    const [activeTab, setActiveTab] = useState('design');
    const [activeSubTab, setActiveSubTab] = useState('myApproval');
    const [currentUser, setCurrentUser] = useState(db.getCurrentUser());
    const [workflows, setWorkflows] = useState([]);
    const [currentWorkflow, setCurrentWorkflow] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [instances, setInstances] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [workflowName, setWorkflowName] = useState('');

    useEffect(() => {
        // 加载示例数据
        const sampleWorkflow = {
            id: 'wf_001',
            name: '通用审批流程',
            type: ApprovalType.EXPENSE,
            nodes: [
                {
                    id: 'node_1',
                    name: '部门主管审批',
                    type: NodeType.APPROVAL,
                    assignees: [db.getUsers()[1]],
                    conditions: [],
                    order: 0
                },
                {
                    id: 'node_2',
                    name: '财务审批',
                    type: NodeType.APPROVAL,
                    assignees: [db.getUsers()[2]],
                    conditions: [{ id: 'c1', field: '金额', operator: '>', value: '1000' }],
                    order: 1
                }
            ],
            createTime: new Date().toLocaleString('zh-CN')
        };

        db.saveWorkflow(sampleWorkflow);
        setWorkflows([sampleWorkflow]);
        setCurrentWorkflow(sampleWorkflow);
        setNodes(sampleWorkflow.nodes);
    }, []);

    const handleSaveWorkflow = () => {
        if (!workflowName.trim()) {
            alert('请输入流程名称');
            return;
        }

        const workflow = {
            id: currentWorkflow?.id || `wf_${Date.now()}`,
            name: workflowName,
            type: ApprovalType.EXPENSE,
            nodes: nodes,
            createTime: currentWorkflow?.createTime || new Date().toLocaleString('zh-CN')
        };

        db.saveWorkflow(workflow);
        setWorkflows(db.getWorkflows());
        setCurrentWorkflow(workflow);
        alert('流程保存成功！');
    };

    const handleCreateApplication = (formData) => {
        const instance = db.createInstance(currentWorkflow.id, formData);
        if (instance) {
            setInstances(db.getInstances());
            setShowCreateForm(false);
            alert('申请提交成功！');
            setActiveTab('approval');
            setActiveSubTab('myApplication');
        }
    };

    const handleApproval = (instanceId, action, comment) => {
        const result = db.processApproval(instanceId, action, comment);
        if (result) {
            setInstances(db.getInstances());
            setSelectedInstance(result);
            alert(`审批${action === 'approve' ? '通过' : '拒绝'}成功！`);
        }
    };

    const updateNode = (id, updates) => {
        const newNodes = nodes.map(node => node.id === id ? { ...node, ...updates } : node);
        setNodes(newNodes);
        if (selectedNode?.id === id) {
            setSelectedNode({ ...selectedNode, ...updates });
        }
    };

    const switchUser = (userId) => {
        db.setCurrentUser(userId);
        setCurrentUser(db.getCurrentUser());
        setInstances(db.getInstances());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* 顶部导航栏 */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">审批流管理系统</h1>
                            <p className="text-gray-600 mt-1">企业级审批流程配置与管理平台</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-600">当前用户</div>
                                <select
                                    value={currentUser.id}
                                    onChange={(e) => switchUser(e.target.value)}
                                    className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                >
                                    {db.getUsers().map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.role})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 主标签页 */}
                <div className="bg-white rounded-lg shadow-lg mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('design')}
                            className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === 'design'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            🔧 流程设计
                        </button>
                        <button
                            onClick={() => setActiveTab('approval')}
                            className={`flex-1 px-6 py-4 font-semibold transition relative ${activeTab === 'approval'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            📋 审批中心
                            {db.getMyPendingApprovals().length > 0 && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {db.getMyPendingApprovals().length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* 流程设计 */}
                {activeTab === 'design' && (
                    <>
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">流程名称</label>
                                    <input
                                        type="text"
                                        value={workflowName}
                                        onChange={(e) => setWorkflowName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="请输入流程名称"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveWorkflow}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                                >
                                    <Save size={20} />
                                    保存流程
                                </button>
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Play size={20} />
                                    发起审批
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <NodeEditor
                                nodes={nodes}
                                setNodes={setNodes}
                                selectedNode={selectedNode}
                                setSelectedNode={setSelectedNode}
                            />
                            <ConditionEditor
                                node={selectedNode}
                                updateNode={updateNode}
                            />
                        </div>

                        <FlowVisualization nodes={nodes} />
                    </>
                )}

                {/* 审批中心 */}
                {activeTab === 'approval' && (
                    <>
                        <div className="bg-white rounded-lg shadow-lg mb-6">
                            <div className="flex border-b">
                                <button
                                    onClick={() => setActiveSubTab('myApproval')}
                                    className={`flex-1 px-6 py-4 font-semibold transition relative ${activeSubTab === 'myApproval'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    待我审批
                                    {db.getMyPendingApprovals().length > 0 && (
                                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                            {db.getMyPendingApprovals().length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveSubTab('myApplication')}
                                    className={`flex-1 px-6 py-4 font-semibold transition ${activeSubTab === 'myApplication'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    我的申请
                                </button>
                                <button
                                    onClick={() => setActiveSubTab('allApproval')}
                                    className={`flex-1 px-6 py-4 font-semibold transition ${activeSubTab === 'allApproval'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                        }`}
                                >
                                    全部审批
                                </button>
                            </div>
                        </div>

                        {selectedInstance ? (
                            <div>
                                <button
                                    onClick={() => setSelectedInstance(null)}
                                    className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
                                >
                                    ← 返回列表
                                </button>
                                <ApprovalProgress
                                    instance={selectedInstance}
                                    workflow={workflows.find(w => w.id === selectedInstance.workflowId)}
                                    onApprove={handleApproval}
                                />
                            </div>
                        ) : (
                            <div>
                                {activeSubTab === 'myApproval' && (
                                    <ApprovalList
                                        instances={db.getMyPendingApprovals()}
                                        workflows={workflows}
                                        onSelect={setSelectedInstance}
                                        title="待我审批"
                                    />
                                )}
                                {activeSubTab === 'myApplication' && (
                                    <ApprovalList
                                        instances={db.getMyApplications()}
                                        workflows={workflows}
                                        onSelect={setSelectedInstance}
                                        title="我的申请"
                                    />
                                )}
                                {activeSubTab === 'allApproval' && (
                                    <ApprovalList
                                        instances={instances}
                                        workflows={workflows}
                                        onSelect={setSelectedInstance}
                                        title="全部审批"
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* 创建申请表单弹窗 */}
                {showCreateForm && (
                    <CreateApplicationForm
                        workflow={currentWorkflow}
                        onSubmit={handleCreateApplication}
                        onCancel={() => setShowCreateForm(false)}
                    />
                )}

                {/* 使用说明 */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 系统功能说明</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">🔧 流程设计模块</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• 配置审批节点和审批人</li>
                                <li>• 设置流转条件（基于字段值）</li>
                                <li>• 可视化预览流程</li>
                                <li>• 保存并发起审批</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">📋 审批中心模块</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• 待我审批：查看并处理待审批项</li>
                                <li>• 我的申请：跟踪我发起的申请</li>
                                <li>• 全部审批：查看所有审批记录</li>
                                <li>• 实时审批进度追踪</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">👤 用户身份切换</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• 可切换不同用户身份测试</li>
                                <li>• 模拟真实审批场景</li>
                                <li>• 支持多级审批流程</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">⚙️ 核心特性</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• 状态驱动的流程引擎</li>
                                <li>• 条件路由自动判断</li>
                                <li>• 完整的审批历史记录</li>
                                <li>• 支持多种申请类型</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalFlowSystem;
一个真实可用的企业级审批系统。以下是详细的技术文档：

```
┌─────────────────────────────────────────────────┐
│          ApprovalFlowSystem (主应用)              │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      Database (数据管理层)                 │  │
│  │  - users (用户数据)                        │  │
│  │  - workflows (流程定义)                    │  │
│  │  - instances (审批实例)                    │  │
│  │  - currentUser (当前登录用户)              │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      业务逻辑层                             │  │
│  │  - 流程创建与保存                           │  │
│  │  - 审批实例创建                             │  │
│  │  - 审批流转处理                             │  │
│  │  - 条件判断引擎                             │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      UI 组件层                              │  │
│  │  - NodeEditor (节点编辑器)                 │  │
│  │  - ConditionEditor (条件配置器)            │  │
│  │  - FlowVisualization (流程可视化)          │  │
│  │  - ApprovalProgress (审批进度)             │  │
│  │  - ApprovalList (审批列表)                 │  │
│  │  - CreateApplicationForm (申请表单)        │  │
│  │  - UserSelector (用户选择器)               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

1. Database 类（模拟数据库）
```
class Database {
  users          // 用户列表（7个测试用户）
  workflows      // 流程定义列表
  instances      // 审批实例列表
  currentUser    // 当前登录用户
  
  // 核心方法
  - getUsers()                    // 获取所有用户
  - getCurrentUser()              // 获取当前用户
  - setCurrentUser(userId)        // 切换用户
  - saveWorkflow(workflow)        // 保存流程
  - createInstance(workflowId, formData)  // 创建审批实例
  - processApproval(instanceId, action, comment) // 处理审批
  - checkConditions(conditions, formData)  // 条件判断引擎
  - getMyPendingApprovals()       // 获取待我审批
  - getMyApplications()           // 获取我的申请
}
```

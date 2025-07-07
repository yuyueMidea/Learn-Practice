import React, { useState } from 'react'
import { Form, Input, Select, Button, Table, Card } from 'antd'

const { Option } = Select

// ✅ 表格列配置
const columns = [
    { title: '设备编号', dataIndex: 'deviceId' },
    { title: '时间', dataIndex: 'timestamp' },
    { title: '运行状态', dataIndex: 'status' },
    { title: '压力(bar)', dataIndex: 'pressure' },
    { title: '温度(°C)', dataIndex: 'temperature' },
    { title: '电流(A)', dataIndex: 'current' },
]

// 不同用户的过滤字段配置
const userRoleFilterFields = {
    admin: ['deviceId', 'status', 'pressure', 'temperature'],
    operator: ['deviceId', 'status'],
    viewer: ['deviceId'],
}
// 字段类型映射（可扩展）
const fieldTypeMap = {
    deviceId: { type: 'input' },
    status: { type: 'select', options: ['运行', '待机', '故障'] },
    timestamp: { type: 'rangePicker' },
    pressure: { type: 'number' },
    temperature: { type: 'number' },
}
  
// 工具方法
const generateFilterConfig = (columns, role = 'admin') => {
    const allowedFields = userRoleFilterFields[role] || []
    return columns
        .filter(col => allowedFields.includes(col.dataIndex))
        .map(col => {
        const base = fieldTypeMap[col.dataIndex] || { type: 'input' }
            return {
                label: col.title,
                field: col.dataIndex,
                ...base,
            }
        })
}
// const role = 'admin' // 可从登录信息中获取
// const filterConfig = generateFilterConfig(columns, role)

// console.log({filterConfig})
  
// ✅ 筛选配置
/* const filterConfig = [
  { label: '设备编号', field: 'deviceId', type: 'input' },
  { label: '运行状态', field: 'status', type: 'select', options: ['运行', '待机', '故障'] },
] */



// ✅ 模拟数据：24 条，每台设备多条记录
const mockData = Array.from({ length: 20 }, (_, i) => {
  const statuses = ['运行', '待机', '故障']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  return {
    deviceId: `KA10${Math.floor(i % 4) + 1}`, // KA101 - KA104
    timestamp: `2025-07-06 ${String(i % 24).padStart(2, '0')}:00:00`,
    status: randomStatus,
    pressure: +(6 + Math.random()).toFixed(2),
    temperature: +(60 + Math.random() * 10).toFixed(2),
    current: +(30 + Math.random() * 5).toFixed(2),
  }
})

const DeviceQueryPage = () => {
  const [form] = Form.useForm()
  const [filteredData, setFilteredData] = useState([])

  // ✅ 查询按钮逻辑：过滤 mockData
  const handleSearch = () => {
    const values = form.getFieldsValue()
    const { deviceId, status, pressure, temperature } = values

    const result = mockData.filter(item => {
      const matchDevice = deviceId ? item.deviceId.toLowerCase().includes(deviceId.toLowerCase()) : true
      const matchStatus = status ? item.status === status : true
      const matchpressure = pressure ? String(item.pressure).includes(pressure) : true
      const matchtemperature = temperature ? String(item.temperature).includes(temperature) : true
      return matchDevice && matchStatus && matchpressure && matchtemperature
    })

    setFilteredData(result)
  }

  const [filterConfig, setFilterCfg] = useState([])

  const handleSelChange = (crole)=>{
      const fConfig = generateFilterConfig(columns, crole)
    //   console.log({crole},  fConfig)
      setFilterCfg(fConfig)
  }

  const renderFilterField = (item) => {
    switch (item.type) {
      case 'input':
        return <Input placeholder={`请输入${item.label}`} allowClear />
      case 'number':
        return <Input placeholder={`请输入${item.label}`} allowClear />
      case 'select':
        return (
          <Select placeholder={`请选择${item.label}`} allowClear>
            {item.options.map(opt => (
              <Option key={opt} value={opt}>{opt}</Option>
            ))}
          </Select>
        )
      default:
        return null
    }
  }

  return (
    <Card title="空压机数据查询（Mock + 条件过滤）" style={{ margin: 24 }}>
        <div>
            <span>请选择角色</span>
            <Select placeholder={`请选择角色`} onChange={handleSelChange}>
                {['admin', 'operator', 'viewer'].map(opt => (
                <Option key={opt} value={opt}>{opt}</Option>
                ))}
            </Select>
        </div>
        { filterConfig.length>0 && <Form form={form} layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
            {filterConfig.map((item) => (
            <Form.Item name={item.field} label={item.label} key={item.field}>
                {renderFilterField(item)}
            </Form.Item>
            ))}
            <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
            </Form.Item>
        </Form> }

      <Table rowKey={(record) => `${record.deviceId}-${record.timestamp}`}
        columns={columns}
        rowClassName={() => 'custom-row'}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </Card>
  )
}

export default DeviceQueryPage

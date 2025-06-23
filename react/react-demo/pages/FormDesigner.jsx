import React, { useState, useRef } from 'react';
import FormRender from 'form-render';
import { 
  Button, 
  message, 
  Modal, 
  Input, 
  Select, 
  Switch, 
  Divider,
  Tabs,
  Collapse,
  Space,
  Drawer
} from 'antd';

import { 
  SaveOutlined, 
  PlusOutlined, 
  DeleteOutlined,
  SettingOutlined,
  CopyOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const FullFeaturedFormDesigner = () => {
  const [schema, setSchema] = useState({
    type: 'object',
    displayType: 'row',
    properties: {},
  });
  
  const [formData, setFormData] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [fieldSettingsVisible, setFieldSettingsVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [formName, setFormName] = useState('');
  const formListRef = useRef([]);

  // 添加新字段
  const addField = (type = 'string') => {
    const fieldName = `field_${Date.now()}`;
    const newField = {
      title: '新字段',
      type,
    };
    
    if (type === 'array') {
      newField.items = { type: 'string' };
    }
    
    setSchema({
      ...schema,
      properties: {
        ...schema.properties,
        [fieldName]: newField,
      },
    });
    setSelectedField(fieldName);
    setFieldSettingsVisible(true);
  };

  // 删除字段
  const deleteField = (fieldName) => {
    const newProperties = { ...schema.properties };
    delete newProperties[fieldName];
    setSchema({
      ...schema,
      properties: newProperties,
    });
    message.success('字段已删除');
  };

  // 复制字段
  const duplicateField = (fieldName) => {
    const newFieldName = `${fieldName}_copy_${Date.now()}`;
    setSchema({
      ...schema,
      properties: {
        ...schema.properties,
        [newFieldName]: { ...schema.properties[fieldName] },
      },
    });
    message.success('字段已复制');
  };

  // 保存表单配置
  const saveForm = () => {
    if (!formName.trim()) {
      message.warning('请输入表单名称');
      return;
    }
    
    const newForm = {
      id: Date.now(),
      name: formName,
      schema,
      createdAt: new Date().toISOString(),
    };
    
    formListRef.current = [...formListRef.current, newForm];
    setSaveModalVisible(false);
    setFormName('');
    message.success('表单配置已保存');
  };

  // 加载表单配置
  const loadForm = (form) => {
    setSchema(form.schema);
    setFormData({});
    message.success('表单配置已加载');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* 左侧边栏 */}
      <div style={{ width: 280, padding: 16, background: '#f0f2f5', overflow: 'auto' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="字段" key="1">
            <div style={{ marginBottom: 16 }}>
              <h4>基础字段</h4>
              <Space wrap>
                <Button onClick={() => addField('string')}>文本</Button>
                <Button onClick={() => addField('number')}>数字</Button>
                <Button onClick={() => addField('boolean')}>开关</Button>
              </Space>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: 16 }}>
              <h4>选择字段</h4>
              <Space wrap>
                <Button onClick={() => addField('select')}>下拉</Button>
                <Button onClick={() => addField('radio')}>单选</Button>
                <Button onClick={() => addField('checkbox')}>多选</Button>
              </Space>
            </div>
            
            <Divider />
            
            <div>
              <h4>其他字段</h4>
              <Space wrap>
                <Button onClick={() => addField('date')}>日期</Button>
                <Button onClick={() => addField('array')}>列表</Button>
              </Space>
            </div>
          </TabPane>
          
          <TabPane tab="表单列表" key="2">
            <Button 
              type="primary" 
              onClick={() => setSaveModalVisible(true)}
              style={{ marginBottom: 16, width: '100%' }}
            >
              保存当前表单
            </Button>
            
            <Collapse>
              {formListRef.current.map(form => (
                <Panel header={form.name} key={form.id}>
                  <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                    创建于: {new Date(form.createdAt).toLocaleString()}
                  </div>
                  <Space>
                    <Button 
                      size="small" 
                      onClick={() => loadForm(form)}
                    >
                      加载
                    </Button>
                  </Space>
                </Panel>
              ))}
            </Collapse>
          </TabPane>
        </Tabs>
      </div>
      
      {/* 主设计区 */}
      <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <h2>表单设计器</h2>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={() => setSaveModalVisible(true)}
          >
            保存表单
          </Button>
        </div>
        
        <div style={{ background: '#fff', padding: 24, borderRadius: 4 }}>
          <FormRender
            schema={schema}
            formData={formData}
            onChange={setFormData}
            onItemClick={(name) => {
              setSelectedField(name);
              setFieldSettingsVisible(true);
            }}
          />
        </div>
      </div>
      
      {/* 字段设置面板 */}
      <Drawer
        title="字段设置"
        visible={fieldSettingsVisible}
        onClose={() => setFieldSettingsVisible(false)}
        width={400}
        extra={
          <Space>
            <Button 
              icon={<CopyOutlined />} 
              onClick={() => duplicateField(selectedField)}
            >
              复制
            </Button>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => {
                deleteField(selectedField);
                setFieldSettingsVisible(false);
              }}
            >
              删除
            </Button>
          </Space>
        }
      >
        {selectedField && schema.properties[selectedField] && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label>字段标识</label>
              <Input value={selectedField} disabled />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label>字段标题</label>
              <Input
                value={schema.properties[selectedField].title}
                onChange={(e) => {
                  setSchema({
                    ...schema,
                    properties: {
                      ...schema.properties,
                      [selectedField]: {
                        ...schema.properties[selectedField],
                        title: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label>字段类型</label>
              <Select
                style={{ width: '100%' }}
                value={schema.properties[selectedField].type}
                onChange={(value) => {
                  setSchema({
                    ...schema,
                    properties: {
                      ...schema.properties,
                      [selectedField]: {
                        ...schema.properties[selectedField],
                        type: value,
                      },
                    },
                  });
                }}
              >
                <Select.Option value="string">文本</Select.Option>
                <Select.Option value="number">数字</Select.Option>
                <Select.Option value="boolean">布尔值</Select.Option>
                <Select.Option value="date">日期</Select.Option>
                <Select.Option value="array">列表</Select.Option>
              </Select>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label>是否必填</label>
              <Switch
                checked={schema.properties[selectedField].required || false}
                onChange={(checked) => {
                  setSchema({
                    ...schema,
                    properties: {
                      ...schema.properties,
                      [selectedField]: {
                        ...schema.properties[selectedField],
                        required: checked,
                      },
                    },
                  });
                }}
              />
            </div>
            
            {schema.properties[selectedField].type === 'array' && (
              <div style={{ marginBottom: 16 }}>
                <label>列表项类型</label>
                <Select
                  style={{ width: '100%' }}
                  value={schema.properties[selectedField].items?.type || 'string'}
                  onChange={(value) => {
                    setSchema({
                      ...schema,
                      properties: {
                        ...schema.properties,
                        [selectedField]: {
                          ...schema.properties[selectedField],
                          items: { type: value },
                        },
                      },
                    });
                  }}
                >
                  <Select.Option value="string">文本</Select.Option>
                  <Select.Option value="number">数字</Select.Option>
                </Select>
              </div>
            )}
          </div>
        )}
      </Drawer>
      
      {/* 保存表单模态框 */}
      <Modal
        title="保存表单配置"
        visible={saveModalVisible}
        onOk={saveForm}
        onCancel={() => setSaveModalVisible(false)}
      >
        <Input
          placeholder="输入表单名称"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default FullFeaturedFormDesigner;
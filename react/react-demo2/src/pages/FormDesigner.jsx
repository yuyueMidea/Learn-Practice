import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Form, Input, Button, Select, Switch, InputNumber, Row, Col, Divider, Card, Tabs , message, Upload,Modal } from 'antd';
import { 
    CloseOutlined,
    SaveOutlined,
    UploadOutlined,
    DownloadOutlined
  } from '@ant-design/icons';

const { TabPane } = Tabs;

// 表单组件定义
const FORM_COMPONENTS = [
  {
    type: 'input',
    name: '单行文本',
    icon: '📝',
    defaultSchema: {
      type: 'string',
      title: '单行文本',
      component: 'Input',
      required: false,
      placeholder: '请输入'
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: '📄',
    defaultSchema: {
      type: 'string',
      title: '多行文本',
      component: 'Textarea',
      required: false,
      placeholder: '请输入'
    }
  },
  {
    type: 'number',
    name: '数字输入',
    icon: '🔢',
    defaultSchema: {
      type: 'number',
      title: '数字输入',
      component: 'InputNumber',
      required: false,
      placeholder: '请输入数字'
    }
  },
  {
    type: 'select',
    name: '下拉选择',
    icon: '📋',
    defaultSchema: {
      type: 'string',
      title: '下拉选择',
      component: 'Select',
      required: false,
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: '🔘',
    defaultSchema: {
      type: 'boolean',
      title: '开关',
      component: 'Switch',
      required: false
    }
  }
];

// 可拖拽组件项
const ComponentItem = ({ data }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'formItem',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className="component-item"
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: 'move',
        padding: '8px',
        margin: '4px 0',
        border: '1px dashed #ddd',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span style={{ marginRight: '8px', fontSize: '16px' }}>{data.icon}</span>
      <span>{data.name}</span>
    </div>
  );
};

// 设计区域字段项
const FormFieldItem = ({ fieldName, fieldSchema, onRemove, onSelect, isSelected, onPropertyChange }) => {
  const [, drag] = useDrag({
    type: 'formField',
    item: { fieldName }
  });

  const [, drop] = useDrop({
    accept: 'formField',
    drop: (item) => {
      // 实现字段排序功能
      console.log(`Move ${item.fieldName} to ${fieldName}`);
    }
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={() => onSelect(fieldName)}
      style={{
        padding: '12px',
        margin: '8px 0',
        border: `1px solid ${isSelected ? '#1890ff' : '#eee'}`,
        borderRadius: '4px',
        backgroundColor: isSelected ? '#e6f7ff' : '#fff',
        cursor: 'move',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
          {fieldSchema.title}
          {fieldSchema.required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
        </label>
        <CloseOutlined
          onClick={(e) => {
            e.stopPropagation();
            onRemove(fieldName);
          }}
          style={{ color: '#ff4d4f', cursor: 'pointer' }}
        />
      </div>
      
      {renderPreview(fieldSchema)}
      
      {isSelected && (
        <div style={{ marginTop: '12px' }}>
          <Divider style={{ margin: '8px 0' }} />
          <PropertyEditor fieldSchema={fieldSchema} onPropertyChange={onPropertyChange} />
        </div>
      )}
    </div>
  );
};

// 预览渲染
const renderPreview = (schema) => {
  const commonProps = {
    placeholder: schema.placeholder,
    disabled: true,
    style: { width: '100%' }
  };

  switch (schema.component) {
    case 'Input':
      return <Input {...commonProps} />;
    case 'Textarea':
      return <Input.TextArea {...commonProps} />;
    case 'InputNumber':
      return <InputNumber {...commonProps} style={{ width: '100%' }} />;
    case 'Select':
      return (
        <Select {...commonProps}>
          {schema.options?.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
          ))}
        </Select>
      );
    case 'Switch':
      return <Switch disabled checked={false} />;
    default:
      return null;
  }
};

// 属性编辑器
const PropertyEditor = ({ fieldSchema, onPropertyChange }) => {
  return (
    <Form layout="vertical" size="small">
      <Form.Item label="字段标题">
        <Input
          value={fieldSchema.title}
          onChange={(e) => onPropertyChange('title', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="占位文本">
        <Input
          value={fieldSchema.placeholder}
          onChange={(e) => onPropertyChange('placeholder', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="是否必填">
        <Switch
          checked={fieldSchema.required}
          onChange={(checked) => onPropertyChange('required', checked)}
        />
      </Form.Item>
      
      {fieldSchema.component === 'Select' && (
        <Form.Item label="选项配置">
          <Button
            type="dashed"
            block
            onClick={() => {
              const newOptions = [...(fieldSchema.options || []), { label: '新选项', value: `opt_${Date.now()}` }];
              onPropertyChange('options', newOptions);
            }}
          >
            添加选项
          </Button>
          {(fieldSchema.options || []).map((opt, index) => (
            <div key={index} style={{ display: 'flex', margin: '8px 0', gap: '8px' }}>
              <Input
                value={opt.label}
                onChange={(e) => {
                  const newOptions = [...fieldSchema.options];
                  newOptions[index].label = e.target.value;
                  onPropertyChange('options', newOptions);
                }}
                placeholder="选项文本"
              />
              <Input
                value={opt.value}
                onChange={(e) => {
                  const newOptions = [...fieldSchema.options];
                  newOptions[index].value = e.target.value;
                  onPropertyChange('options', newOptions);
                }}
                placeholder="选项值"
              />
              <Button
                danger
                onClick={() => {
                  const newOptions = fieldSchema.options.filter((_, i) => i !== index);
                  onPropertyChange('options', newOptions);
                }}
              >
                删除
              </Button>
            </div>
          ))}
        </Form.Item>
      )}
    </Form>
  );
};

// 设计区域
const DesignArea = ({ 
  schema, 
  onSchemaChange, 
  selectedField, 
  onSelectField,
  onRemoveField,
  onPropertyChange
}) => {
  const [, drop] = useDrop({
    accept: 'formItem',
    drop: (item) => {
      const fieldName = `field_${Date.now()}`;
      const newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          [fieldName]: { ...item.defaultSchema }
        }
      };
      onSchemaChange(newSchema);
      onSelectField(fieldName);
    }
  });

  return (
    <div 
      ref={drop} 
      style={{ 
        minHeight: '400px', 
        padding: '16px', 
        backgroundColor: '#fafafa',
        borderRadius: '4px'
      }}
    >
      {Object.keys(schema.properties || {}).length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          color: '#999'
        }}>
          <p>从左侧拖拽组件到此处</p>
        </div>
      ) : (
        <div>
          {Object.entries(schema.properties || {}).map(([fieldName, fieldSchema]) => (
            <FormFieldItem
              key={fieldName}
              fieldName={fieldName}
              fieldSchema={fieldSchema}
              onRemove={onRemoveField}
              onSelect={onSelectField}
              isSelected={selectedField === fieldName}
              onPropertyChange={(key, value) => onPropertyChange(fieldName, key, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Schema查看器
const SchemaViewer = ({ schema }) => {
  const [activeTab, setActiveTab] = useState('schema');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
  };

  return (
    <Card 
      title="Schema配置" 
      extra={<Button onClick={handleCopy}>复制Schema</Button>}
      style={{ marginTop: '16px' }}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="JSON" key="schema">
          <pre style={{ 
            maxHeight: '300px', 
            overflow: 'auto',
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px'
          }}>
            {JSON.stringify(schema, null, 2)}
          </pre>
        </TabPane>
        <TabPane tab="预览" key="preview">
          <FormPreview schema={schema} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

// 表单预览
const FormPreview = ({ schema }) => {
  const [form] = Form.useForm();
  const handleSubmit = (vals)=>{
    console.log('vals: ', vals)
  }

  const renderField = (fieldName, fieldSchema) => {
    const commonProps = {
      placeholder: fieldSchema.placeholder
    };

    switch (fieldSchema.component) {
      case 'Input':
        return <Input {...commonProps} />;
      case 'Textarea':
        return <Input.TextArea {...commonProps} />;
      case 'InputNumber':
        return <InputNumber {...commonProps} style={{ width: '100%' }} />;
      case 'Select':
        return (
          <Select {...commonProps}>
            {fieldSchema.options?.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
            ))}
          </Select>
        );
      case 'Switch':
        return <Switch />;
      default:
        return null;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {Object.entries(schema.properties || {}).map(([fieldName, fieldSchema]) => (
        <Form.Item
          key={fieldName}
          label={fieldSchema.title}
          name={fieldName}
          required={fieldSchema.required}
          rules={[
            { 
              required: fieldSchema.required,
              message: `请输入${fieldSchema.title}`
            }
          ]}
        >
          {renderField(fieldName, fieldSchema)}
        </Form.Item>
      ))}
      <Form.Item>
        {/* <Button type="primary" onClick={handleSubmit}>提交</Button> */}
        <Button 
              type="primary" 
              htmlType="submit"
            >
              提交
            </Button>
      </Form.Item>
    </Form>
  );
};

// 新增 ActionBar 组件
const ActionBar = ({ 
    schema, 
    onLoadSchema,
    onSaveSchema
  }) => {
    const [fileList, setFileList] = useState([]);
    const fileInputRef = useRef(null);
  
    const handleSave = () => {
      onSaveSchema();
      message.success('表单已保存到本地');
    };
  
    const handleDownload = () => {
      const dataStr = JSON.stringify(schema, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportName = `form-schema-${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportName);
      linkElement.click();
    };
  
    const beforeUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          onLoadSchema(json);
          message.success('表单加载成功');
        } catch (err) {
          message.error('文件格式错误');
        }
      };
      reader.readAsText(file);
      return false; // 阻止自动上传
    };
  
    return (
      <div style={{ 
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        <div>
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            showUploadList={false}
            accept=".json"
          >
            <Button icon={<UploadOutlined />}>加载表单</Button>
          </Upload>
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            style={{ marginLeft: '8px' }}
            icon={<UploadOutlined />}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".json"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  beforeUpload(e.target.files[0]);
                  e.target.value = ''; // 重置input，允许重复选择同一文件
                }
              }}
            />
            选择文件
          </Button>
        </div>
        
        <div>
          <Button 
            icon={<SaveOutlined />} 
            onClick={handleSave}
            style={{ marginRight: '8px' }}
          >
            保存到本地存储
          </Button>
          
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={handleDownload}
          >
            导出为JSON
          </Button>
        </div>
      </div>
    );
  };

// 主设计器组件
const FormDesigner = () => {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {}
  });
  const [selectedField, setSelectedField] = useState(null);

  //newadd
//   const [previewVisible, setPreviewVisible] = useState(false);

  // 保存到本地存储
  const handleSaveSchema = () => {
    localStorage.setItem('form-schema', JSON.stringify(schema));
  };

  // 加载已有schema
  const handleLoadSchema = (loadedSchema) => {
    Modal.confirm({
      title: '确认加载表单',
      content: '这将覆盖当前表单，是否继续？',
      onOk: () => {
        setSchema(loadedSchema);
        setSelectedField(null);
      }
    });
  };

  const handlePropertyChange = (fieldName, key, value) => {
    const newSchema = {
      ...schema,
      properties: {
        ...schema.properties,
        [fieldName]: {
          ...schema.properties[fieldName],
          [key]: value
        }
      }
    };
    setSchema(newSchema);
  };

  const handleRemoveField = (fieldName) => {
    const newProperties = { ...schema.properties };
    delete newProperties[fieldName];
    
    const newSchema = {
      ...schema,
      properties: newProperties
    };
    
    setSchema(newSchema);
    if (selectedField === fieldName) {
      setSelectedField(null);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>表单设计器</h1>
        
        <ActionBar 
          schema={schema} 
          onSaveSchema={handleSaveSchema}
          onLoadSchema={handleLoadSchema}
        />
        
        <Row gutter={16}>
          <Col span={6}>
            <Card title="组件列表" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '8px' }}>
                {FORM_COMPONENTS.map(comp => (
                  <ComponentItem key={comp.type} data={comp} />
                ))}
              </div>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card title="设计区域">
              <DesignArea
                schema={schema}
                onSchemaChange={setSchema}
                selectedField={selectedField}
                onSelectField={setSelectedField}
                onRemoveField={handleRemoveField}
                onPropertyChange={handlePropertyChange}
              />
            </Card>
          </Col>
          
          <Col span={6}>
            <Card title="属性配置" style={{ marginBottom: '16px' }}>
              {selectedField ? (
                <PropertyEditor
                  fieldSchema={schema.properties[selectedField]}
                  onPropertyChange={(key, value) => 
                    handlePropertyChange(selectedField, key, value)
                  }
                />
              ) : (
                <div style={{ color: '#999', textAlign: 'center', padding: '16px 0' }}>
                  请选择字段进行配置
                </div>
              )}
            </Card>
            
            <SchemaViewer schema={schema} />
          </Col>
        </Row>
      </div>
    </DndProvider>
  );
};

export default FormDesigner;
// PropertyPanel.jsx
import React from 'react';
import { Form, Input, Switch, InputNumber } from 'antd';

const PropertyPanel = ({ selectedField, onPropertyChange }) => {
  if (!selectedField) return <div>请选择字段</div>;

  return (
    <Form layout="vertical">
      <Form.Item label="字段标题">
        <Input
          value={selectedField.title}
          onChange={e => onPropertyChange('title', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="占位文本">
        <Input
          value={selectedField.placeholder}
          onChange={e => onPropertyChange('placeholder', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="是否必填">
        <Switch
          checked={selectedField.required}
          onChange={checked => onPropertyChange('required', checked)}
        />
      </Form.Item>
      {/* 根据组件类型显示不同配置项 */}
      {selectedField.component === 'Select' && (
        <Form.Item label="选项配置">
          {/* 选项编辑实现 */}
        </Form.Item>
      )}
    </Form>
  );
};
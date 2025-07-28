// FormPreview.jsx
import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const FormPreview = ({ schema }) => {
  const [form] = Form.useForm();

  const renderField = (fieldName, fieldSchema) => {
    const commonProps = {
      placeholder: fieldSchema.placeholder
    };

    switch (fieldSchema.component) {
      case 'Input':
        return <Input {...commonProps} />;
      case 'Select':
        return (
          <Select {...commonProps}>
            {fieldSchema.options.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Form form={form} layout="vertical">
      {Object.entries(schema.properties || {}).map(([fieldName, fieldSchema]) => (
        <Form.Item
          key={fieldName}
          label={fieldSchema.title}
          name={fieldName}
          required={fieldSchema.required}
        >
          {renderField(fieldName, fieldSchema)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary">提交</Button>
      </Form.Item>
    </Form>
  );
};
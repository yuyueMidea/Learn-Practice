import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { ROLES } from '../config/roles';
import useAuthStore from '../store/authStore';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login, isAuthenticated ,currentUser } = useAuthStore();
  const history = useHistory();
  const location = useLocation();
  
  const onFinish = (values) => {
    login({
      username: values.username,
      role: values.role
    });
    // 跳转到来源页面或首页
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  };
  const getauthClick=()=>{
    console.log('=======', isAuthenticated ,currentUser)
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1 style={{ textAlign: 'center' }}>系统登录</h1>
      <button onClick={getauthClick}>getisAuth</button>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        
        <Form.Item name="role" rules={[{ required: true }]}>
          <Select placeholder="选择角色">
            <Select.Option value={ROLES.ADMIN}>管理员</Select.Option>
            <Select.Option value={ROLES.OPERATOR}>操作员</Select.Option>
            <Select.Option value={ROLES.GUEST}>访客</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
import React from 'react';
import { List, Tag } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const AlertList = ({ alerts }) => {
  return (
    <div className="alert-list">
      <h2>报警记录</h2>
      <List
        itemLayout="horizontal"
        dataSource={alerts}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<WarningOutlined style={{ color: 'red' }} />}
              title={<Tag color="red">HIGH</Tag>}
              description={`${item.message} - ${item.timestamp}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AlertList;
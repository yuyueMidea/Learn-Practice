import React from 'react';
import { Card, Progress, Tag } from 'antd';

const StatusPanel = ({ data }) => {
  const statusColor = {
    normal: 'green',
    warning: 'orange',
    danger: 'red'
  };
  
  return (
    <Card title="设备状态">
      <div className="status-item">
        <h3>运行状态</h3>
        <Tag color={statusColor[data.status] || 'blue'}>
          {data.status.toUpperCase()}
        </Tag>
      </div>
      
      <div className="status-item">
        <h3>功率消耗</h3>
        <Progress 
          percent={data.power} 
          status={data.power > 90 ? 'exception' : 'normal'}
        />
        <span>{data.power} kW</span>
      </div>
      
      <div className="status-item">
        <h3>流量</h3>
        <Progress 
          percent={(data.flowRate / 100) * 100} 
          format={() => `${data.flowRate} m³/min`}
        />
      </div>
      
      <div className="status-item">
        <h3>综合效率</h3>
        <Progress 
          type="circle" 
          percent={85} 
          width={80}
          status={data.temperature > 80 || data.pressure > 8 ? 'exception' : 'normal'}
        />
      </div>
    </Card>
  );
};

export default StatusPanel;
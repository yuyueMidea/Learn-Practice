// src/pages/Dashboard/BiDashboard.tsx
import { Row, Col, Card, Tabs } from 'antd';
// import {
//   LineChart, 
//   BarChart,
//   PieChart,
//   LiquidChart,
//   RadarChart
// } from '@ant-design/charts';

import { Bar, Line, Liquid, Pie, Radar } from '@ant-design/charts';

const SalesDashboard = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="销售趋势">
          <Line {...lineConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="实时指标">
          <Liquid {...liquidConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="区域销售">
          <Bar {...barConfig} />
        </Card>
      </Col>
    </Row>
  );
const UserAnalysis  = () => (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title="用户画像雷达图">
          <Radar {...radarConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="区域销售">
          <Bar {...barConfig} />
        </Card>
      </Col>
    </Row>
  );

const tabItems = [
  {
    key: '1',
    label: '销售看板',
    children: <SalesDashboard />,
  },
  {
    key: '2',
    label: '用户分析',
    children: <UserAnalysis />,
  },
];


export default function BiDashboard() {
  return (
    <div className="bi-dashboard">
        <Tabs items={tabItems} />
      {/* <Tabs defaultActiveKey="1">
        <TabPane tab="销售看板" key="1">
          <SalesDashboard />
        </TabPane>
        <TabPane tab="用户分析" key="2">
          <h1>用户分析</h1>
        </TabPane>
      </Tabs> */}
    </div>
  );
}


// 数据区域
const lineData = [
    { month: '1月', value: 125 },
    { month: '2月', value: 180 },
    { month: '3月', value: 120 },
    { month: '4月', value: 140 },
    { month: '5月', value: 110 },
    { month: '6月', value: 130 },
    { month: '7月', value: 190 },
    { month: '8月', value: 180 },
    { month: '9月', value: 160 },
    { month: '10月', value: 230 },
    { month: '11月', value: 170 },
    { month: '12月', value: 280 },
    // ...其他月份数据
];
  
const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    yAxis: { label: { formatter: (v: any) => `${v}万` }},
    color: ['#1979C9', '#D62A0D', '#FAA219'],
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    point: { size: 4, shape: 'diamond' },
};
const pieData = [
    { type: '电子产品', value: 27 },
    { type: '家居用品', value: 25 },
    { type: '其他用品', value: 23 },
    { type: '环保用品', value: 25 },
    // ...其他品类数据
];
  
const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: { fontSize: '28px' },
        formatter: () => '总销售额\n1,280万',
      },
    },
};
const barData = [
    { region: '华东', value: 420 },
    { region: '华北', value: 380 },
    { region: '华nan', value: 220 },
    { region: '华xi', value: 180 },
    // ...其他区域数据
];
  
const barConfig = {
    data: barData,
    xField: 'value',
    yField: 'region',
    seriesField: 'region',
    legend: { position: 'top-left' },
    meta: {
      value: { alias: '销售额(万)' },
      region: { alias: '大区' },
    },
    barWidthRatio: 0.6,
    conversionTag: {},
};

const liquidConfig = {
    percent: 0.65,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: { length: 128 },
    statistic: {
      title: { formatter: () => '目标完成率' },
      content: {
        style: { fontSize: '24px' },
        formatter: () => '65%',
      },
    },
};

const radarData = [
    { name: '活跃度', value: 80 },
    { name: '留存率', value: 65 },
    { name: 'case率', value: 75 },
    { name: 'test率', value: 86 },
    { name: 'test2率', value: 67 },
    // ...其他维度数据
];
  
const radarConfig = {
    data: radarData,
    xField: 'name',
    yField: 'value',
    area: {},
    radius: 0.8,
    startAngle: Math.PI / 4,
    scale: { value: { min: 0, max: 100 }},
    axis: { value: { grid: { line: { type: 'circle' }}}},
    point: { size: 3 },
};
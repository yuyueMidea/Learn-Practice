import React from 'react';
import { FixedSizeList as List } from 'react-window';

// 模拟数据
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  title: `项目 ${i}`,
  content: `这是第 ${i} 个项目的内容...`
}));

const Row = ({ index, style, data }) => {
  const item = data[index];
  return (
    <div 
      style={{
        ...style,
        borderBottom: '1px solid #ccc',
        padding: '2px 11px',
        backgroundColor: index % 2 ? '#f9f9f9' : 'white'
      }}
    >
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </div>
  );
};

const VirtualListWithData = () => (
    <>
        <h3>万行数据展示</h3>
        <List
            height={600}
            itemCount={items.length}
            itemSize={60}  // 每项高度
            width="100%"
            itemData={items} // 传递数据
        >
            {Row}
        </List>
    </>
);

export default VirtualListWithData;
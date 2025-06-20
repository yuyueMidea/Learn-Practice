// src/pages/DraggableTable.tsx
import { useCallback, useState } from 'react';
import { Table } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableRow } from '@/components/DraggableRow';
import { DragOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const DraggableTable = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {key:'4', name:'zhangsan', age:33, address:'beijing1'},
    {key:'5', name:'lisi', age:44, address:'beijing2'},
    {key:'6', name:'wangwu', age:55, address:'guangzhou1'},
  ]);

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex];
      setData((prevData) => {
        const newData = [...prevData];
        newData.splice(dragIndex, 1);
        newData.splice(hoverIndex, 0, dragRow);
        return newData;
      });
    },
    [data]
  );
  
  const columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 60,
        render: () => (
          <DragOutlined style={{ cursor: 'move', color: '#999' }} />
        ),
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={data}
        components={{
          body: {
            row: (props: any) => (
              <DraggableRow
                {...props}
                index={props['data-row-key']}
                moveRow={moveRow}
              />
            ),
          },
        }}
        rowKey="key"
        onRow={(record, index) => ({
          index,
          'data-row-key': index,
        } as React.HTMLAttributes<any>)}
      />
    </DndProvider>
  );
};

export default DraggableTable;
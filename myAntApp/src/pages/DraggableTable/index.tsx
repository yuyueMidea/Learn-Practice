import React, { useRef, useState, useCallback } from 'react'
import { Table, Button } from 'antd'
import update from 'immutability-helper'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const type = 'DraggableBodyRow'

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef()
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) return {}
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      }
    },
    drop: item => {
      moveRow(item.index, index)
    },
  })

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

const DragTable = () => {
  const [data, setData] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      key: i.toString(),
      name: `任务 ${i + 1}`,
      age: 20 + i,
      address: `城市 ${i + 1}`,
    }))
  )

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  const components = {
    body: {
      row: DragableBodyRow,
    },
  }

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragRow = data[dragIndex]
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      })
    )
  }, [data])

  const onReset = () => {
    setData(
      Array.from({ length: 6 }, (_, i) => ({
        key: i.toString(),
        name: `任务 ${i + 1}`,
        age: 20 + i,
        address: `城市 ${i + 1}`,
      }))
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Button onClick={onReset} style={{ marginBottom: 16 }}>重置顺序</Button>
      <Table
        columns={columns}
        dataSource={data}
        components={components}
        pagination={false}
        rowKey="key"
        onRow={(record, index) => ({
          index,
          moveRow,
        })}
        bordered
      />
    </DndProvider>
  )
}

export default DragTable

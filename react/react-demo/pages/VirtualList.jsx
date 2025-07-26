import { FixedSizeList as List } from 'react-window'

// 模拟大数据
const items = new Array(10000).fill(null).map((_, i) => `Item #${i}`)

const Row = ({ index, style }) => (
  <div style={style} className="p-2 border-b border-gray-200">
    {items[index]}
  </div>
)

export default function VirtualList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">虚拟长列表</h2>
      <List
        height={400}         // 可视区域高度
        itemCount={items.length}
        itemSize={35}        // 每项高度
        width={'100%'}
      >
        {Row}
      </List>
    </div>
  )
}

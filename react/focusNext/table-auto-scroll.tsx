import { useState, useRef, useEffect } from 'react';

const TableAutoScroll = () => {
  const [data, setData] = useState([]);
  const [targetRow, setTargetRow] = useState('');
  const [targetCol, setTargetCol] = useState('');
  const [highlightCell, setHighlightCell] = useState(null);
  const tableContainerRef = useRef(null);

  // 生成模拟数据
  useEffect(() => {
    const mockData = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `用户${i + 1}`,
      age: 20 + (i % 50),
      email: `user${i + 1}@example.com`,
      phone: `138${String(i).padStart(8, '0')}`,
      address: `地址信息第${i + 1}行`
    }));
    setData(mockData);
  }, []);

  // 方法1: 使用 scrollIntoView (推荐)
  const scrollToRowMethod1 = (rowIndex, colKey) => {
    const rowElement = document.querySelector(`[data-row-index="${rowIndex}"]`);
    if (rowElement) {
      rowElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // 高亮目标单元格
      setHighlightCell({ row: rowIndex, col: colKey });
      setTimeout(() => setHighlightCell(null), 2000);
    }
  };

  // 方法2: 使用 ref + scrollTo
  const scrollToRowMethod2 = (rowIndex, colKey) => {
    if (tableContainerRef.current) {
      const rowHeight = 50; // 每行高度
      const headerHeight = 50; // 表头高度
      const scrollTop = rowIndex * rowHeight;
      
      tableContainerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });

      // 高亮目标单元格
      setHighlightCell({ row: rowIndex, col: colKey });
      setTimeout(() => setHighlightCell(null), 2000);
    }
  };

  // 方法3: 使用 Element.scrollIntoView + 偏移调整
  const scrollToRowMethod3 = (rowIndex, colKey) => {
    const cellElement = document.querySelector(
      `[data-row-index="${rowIndex}"] [data-col-key="${colKey}"]`
    );
    
    if (cellElement) {
      // 先滚动到行
      cellElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

      // 高亮目标单元格
      setHighlightCell({ row: rowIndex, col: colKey });
      setTimeout(() => setHighlightCell(null), 2000);
    }
  };

  const handleScroll = () => {
    const row = parseInt(targetRow);
    const col = targetCol;

    if (isNaN(row) || row < 0 || row >= data.length) {
      alert('请输入有效的行号 (0-99)');
      return;
    }

    if (!col) {
      alert('请输入列名');
      return;
    }

    // 默认使用方法1
    scrollToRowMethod1(row, col);
  };

  const columns = ['name', 'age', 'email', 'phone', 'address'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          表格自动滚动示例
        </h1>

        {/* 控制面板 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">滚动控制</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目标行 (0-99)
              </label>
              <input
                type="number"
                value={targetRow}
                onChange={(e) => setTargetRow(e.target.value)}
                placeholder="例如: 50"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32"
                min="0"
                max="99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目标列
              </label>
              <select
                value={targetCol}
                onChange={(e) => setTargetCol(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40"
              >
                <option value="">选择列</option>
                {columns.map(col => (
                  <option key={col} value={col}>
                    {col === 'name' ? '姓名' : 
                     col === 'age' ? '年龄' : 
                     col === 'email' ? '邮箱' : 
                     col === 'phone' ? '电话' : '地址'}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleScroll}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              滚动到目标
            </button>
            <button
              onClick={() => scrollToRowMethod1(0, 'name')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              回到顶部
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>💡 提示：输入行号和列名，点击"滚动到目标"按钮</p>
            <p>例如：行号 50，列名 email，将滚动到第50行的邮箱列</p>
          </div>
        </div>

        {/* 表格容器 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            ref={tableContainerRef}
            className="overflow-auto"
            style={{ maxHeight: '500px' }}
          >
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    序号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    年龄
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    邮箱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    电话
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                    地址
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    data-row-index={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rowIndex}
                    </td>
                    {columns.map(col => (
                      <td
                        key={col}
                        data-col-key={col}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 transition-all duration-300 ${
                          highlightCell?.row === rowIndex && highlightCell?.col === col
                            ? 'bg-yellow-200 font-bold scale-105 shadow-lg'
                            : ''
                        }`}
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 实现说明 */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">实现方法说明</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800">方法1: scrollIntoView (当前使用)</h3>
              <p>使用原生 API，简单高效，自动处理滚动容器</p>
              <code className="block mt-2 bg-gray-100 p-2 rounded text-xs">
                element.scrollIntoView({'{'}behavior: 'smooth', block: 'center'{'}'})
              </code>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">方法2: ref + scrollTo</h3>
              <p>通过计算位置精确控制滚动，适合固定行高的表格</p>
              <code className="block mt-2 bg-gray-100 p-2 rounded text-xs">
                containerRef.current.scrollTo({'{'}top: rowIndex * rowHeight{'}'})
              </code>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-800">方法3: 精确定位单元格</h3>
              <p>直接滚动到具体单元格，支持水平和垂直方向</p>
              <code className="block mt-2 bg-gray-100 p-2 rounded text-xs">
                cellElement.scrollIntoView({'{'}block: 'center', inline: 'center'{'}'})
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAutoScroll;
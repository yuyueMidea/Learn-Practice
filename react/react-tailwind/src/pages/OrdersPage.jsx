const OrdersPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">订单管理</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">这里是订单管理页面的内容区域。</p>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">订单 #{1000 + i}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">客户：张三{i} | 金额：¥{(i * 123).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  i % 3 === 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : i % 3 === 1
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {i % 3 === 0 ? '已完成' : i % 3 === 1 ? '处理中' : '待处理'}
                </span>
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                  查看
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

export default OrdersPage
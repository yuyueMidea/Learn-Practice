const AnalyticsPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">数据分析</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">这里是数据分析页面的内容区域。</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {['销售趋势', '用户增长', '转化率分析', '收入统计'].map((title, i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
              <div className="h-40 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">图表区域</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

export default AnalyticsPage
const ProductsPage = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">商品管理</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">这里是商品管理页面的内容区域。</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">商品 {i}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">商品描述信息，包含价格、库存等详细信息。</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium">
                查看详情 →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )


export default ProductsPage
const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">系统设置</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-8">
      <p className="text-gray-600 dark:text-gray-400 mb-6">这里是系统设置页面的内容区域。</p>
      
      <div className="space-y-6">
        {[
          { title: '基本设置', desc: '网站基本信息、SEO设置等' },
          { title: '用户权限', desc: '用户角色、权限管理' },
          { title: '支付配置', desc: '支付方式、接口配置' },
          { title: '通知设置', desc: '邮件、短信通知配置' },
          { title: '安全设置', desc: '密码策略、登录限制' },
          { title: '系统维护', desc: '数据备份、日志管理' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
              配置 →
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)
export default SettingsPage;
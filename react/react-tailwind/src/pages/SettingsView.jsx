import { Bell, CreditCard, Globe, Moon, Shield, Sun } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../store/authStore";

export default function SettingsView() {
    const { darkMode, toggleDarkMode } = useAuthStore();
    
    const toggleTheme = () => {
        toggleDarkMode()
    };
    
    return (
        <div className="p-6 max-w-4xl">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>账户设置</h2>
          
          <div className="space-y-6">
            {[
              {
                title: '外观设置',
                items: [
                  {
                    icon: darkMode ? Sun : Moon,
                    label: '主题模式',
                    description: '切换浅色/深色主题',
                    action: (
                      <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                      >
                        {darkMode ? '切换到浅色' : '切换到深色'}
                      </button>
                    )
                  }
                ]
              },
              {
                title: '通知设置',
                items: [
                  {
                    icon: Bell,
                    label: '推送通知',
                    description: '接收系统和应用通知',
                    action: (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    )
                  }
                ]
              },
              {
                title: '安全设置',
                items: [
                  {
                    icon: Shield,
                    label: '修改密码',
                    description: '更新您的登录密码',
                    action: (
                      <button className={`px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}>
                        修改密码
                      </button>
                    )
                  },
                  {
                    icon: Globe,
                    label: '两步验证',
                    description: '为账户添加额外安全保护',
                    action: (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                        启用
                      </button>
                    )
                  }
                ]
              },
              {
                title: '账单设置',
                items: [
                  {
                    icon: CreditCard,
                    label: '付款方式',
                    description: '管理支付方式和账单信息',
                    action: (
                      <button className={`px-4 py-2 rounded-lg border ${
                        darkMode 
                          ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}>
                        管理
                      </button>
                    )
                  }
                ]
              }
            ].map((section, sectionIndex) => (
              <div key={sectionIndex} className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                          </div>
                        </div>
                        {item.action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
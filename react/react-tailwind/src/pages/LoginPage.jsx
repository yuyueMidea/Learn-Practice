import { Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../store/authStore";

export default function LoginPage() {
    const [role] = useState('')
    const [username, setusername] = useState('')
    
    const { login, darkMode, toggleDarkMode } = useAuthStore();
      // 登录/登出
      const handleLogin = () => {
        login({
            username: username,
            role: role
        })
        // setCurrentView('dashboard');
      };
      // 主题切换
    const toggleTheme = () => {
        toggleDarkMode()
    };
    const handleSelectChange = (v)=>{
        console.log(v)
    }
    return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>欢迎登录</h2>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>请输入您的登录信息</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              UserName
            </label>
            <input value={username} onChange={e=>setusername(e.target.value)} type="text" className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              UserRole
            </label>
            <select value={role} onChange={e=>handleSelectChange(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none cursor-pointer`}>
                  {['admin', 'operator', 'guest'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
          </div>
       
          
          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            登录
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={toggleTheme}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
          >
            {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {darkMode ? '浅色模式' : '深色模式'}
          </button>
        </div>
      </div>
    </div>
  );
}
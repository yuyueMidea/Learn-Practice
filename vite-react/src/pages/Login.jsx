// Login.jsx
import { useState } from 'react';
import useAuthStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorTxt, setErrorTxt] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  // const login = useAuthStore((state) => state.login);
  const {user, mockLoginApi} = useAuthStore();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true);
    setErrorTxt('')
    try {
      e.preventDefault();
      // 模拟登录API调用
      const response = await mockLoginApi(username, password)
      console.log(user, 'response_: ', response)
      navigate('/');    //登录完成了自动跳转首页界面
    } catch (error2) {
      console.error('err_: ', error2)
      setErrorTxt(error2 instanceof Error ? error2.message : '登录失败')
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      Username: <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        className='border p-2 m-2 rounded shadow-2xs'
        />
      Password: <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 m-2 rounded shadow-2xs'
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">Login</button>
      {/* <h1 className='text-green-300 p-2 m-2'>{ loading ? 'Loading...' : '' }</h1> */}
      <div class="bg-white p-6 rounded-lg shadow">
        { loading ?
          <div class="flex justify-center items-center">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          : 'Please Login'
        }
      </div>
      <div className='bg-white p-6 rounded-lg shadow text-red-500 m-2'>{ errorTxt }</div>
    </form>
  );
};

export default Login;
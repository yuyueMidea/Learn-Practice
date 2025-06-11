import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import GoodsList from './GoodsList'
function Article({title, content, active}) {
  return (
    <div style={{margin:11, padding:5, border:'1px solid red'}}>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>active: {active ? 'True': 'FFF'}</p>
    </div>
  )
}
// 下面的children,footer是通过插槽的方式传递给组件，jsx中直接写就行
function List({title, children, footer=<div>默认footer内容</div>  }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {children}
      </ul>
      {footer}
    </>
  )
}
function Detail({onActive}) {
  const [status, setStatus] = useState(true)
  function handleClick() {
    setStatus(!status)
    onActive(status)
    console.warn('子组件自己点击切换状态，handleClick==', status)
  }
  return (
    <>
      <button onClick={handleClick}>按钮: {status?1:0}</button>
      <p style={{display: status ? 'block' :'none'}}>Detail的内容</p>
    </>
  )
}
function App() {
  const [count, setCount] = useState(0)
  const [childValue, setChildValue] = useState('');
  // 回调函数，接收子组件传递的值
  const handleChildChange = (newValue) => {
    console.warn('received: ', newValue)
    setChildValue(newValue);
  };
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/* <Article title='标签1' content='内容1' active/> */}
      {/* <Article title='标签2' content='内容2' /> */}
      {/* <List title='列表1' footer={<p>footer1</p>}>
        <li>内容1</li>
        <li>内容2</li>
      </List>
      <List title='列表2' >
        <li>内容a</li>
        <li>内容b</li>
      </List> */}
      <p>父组件接收到的值: {childValue? '111': '000'}</p>
      <Detail onActive={handleChildChange}></Detail>
      <h4>子组件</h4>
      <GoodsList/>
    </>
  )
}

export default App

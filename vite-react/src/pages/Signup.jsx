import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);
  const [num,setnum] = useState(0);
  const [pos,setpos] = useState({x:0,y:0})

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'red'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
      <p>num: {num}
        <button onClick={()=>{
            // setnum( num+5)
            setnum(c=>c+18)
            // setnum(66)
        }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">增加数字</button>
      </p>
      <p>
        <span style={{'display':'inline-block', 'minWidth':'220px'}}>坐标位置 {`x: ${pos.x}, y: ${pos.y}`}</span>
        
        <button onClick={()=>{
            let {x,y} = pos;
            // console.warn(333, {x,y})
            setpos({
                x: x+4,
                y: y+7
            })
        }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4">改变坐标</button>
      </p>
    </>
  );
}
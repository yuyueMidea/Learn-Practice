import { useState } from "react"

export default function Score() {
    const [score, setscore] = useState(4);
    const [isPaused, setisPaused] = useState(false);
    function increment() {
        setscore(s => s+1)
    }
    return(
        <>
            <p>
                <button className="btn" onClick={()=> increment() }>+1</button>
                <button className="btn" onClick={()=> {
                    increment();
                    increment();
                    increment();
                } }>+3</button>
                <span>Score: {score}</span>
            </p>
            <hr />
            <div className="perWrapper">
                {isPaused ? <p>待会见!</p> : <Counter />}
                
                <label htmlFor="chk1">
                    <input type="checkbox" name="" id="chk1" value={isPaused} onChange={(e)=>setisPaused(e.target.checked)} />
                    休息一下(触发渲染会使得子组件state重置){isPaused?'T': 'F'}
                </label>
            </div>
        </>
    )
}

function Counter() {
    const [count, setCount] = useState(0);
    return(
        <div className="perWrapper">
            <h2>count: {count}</h2>
            <button className="btn" onClick={()=>setCount(v=>v+1)}>加一</button>
        </div>
    )
}
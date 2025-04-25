import { useState } from "react"

export default function Score() {
    const [score, setscore] = useState(4)
    function increment() {
        setscore(s => s+1)
    }
    return(
        <>
            <button onClick={()=> increment() }>+1</button>
            <button onClick={()=> {
                increment();
                increment();
                increment();
            } }>+3</button>
            <h2>Score: {score}</h2>
        </>
    )
}
import { useState } from "react"

export default function Movingdot() {
    const [pos, setpos] = useState({x:0,y:0})
    function handleMove(e) {
        setpos({x: e.clientX, y: e.clientY})
    }
    return(
        <div className="perWrapper" style={{position:'relative', width: '90vw', height: '90vh'}}
            onPointerMove={e=>handleMove(e)}>
            <div style={{position:'absolute', width:20,height:20,left:-10,top:-10,
                background:'red', borderRadius:'50%',
                transform: `translate(${pos.x}px, ${pos.y}px)` }}></div>
        </div>
    )
}
export default function Toolbar() {
    function handleClick1() {
        
        alert('=btn1, handleClick1=')
    }
    function handleClick2() {
        alert('=btn2,handleClick222=')
    }
    return(
        <div onClick={()=> {alert('click-toolbar')}} style={{'background': 'grey', padding:'5px'}}>
            {/* 按鈕点击的时候，阻止事件传播，调用 e.stopPropagation()，阻止事件进一步冒泡 */}
            <button onClick={e=>{
                e.stopPropagation()
                handleClick1()
            }}>btn1</button>
            <button onClick={handleClick2}>btn2</button>
        </div>
    )
}
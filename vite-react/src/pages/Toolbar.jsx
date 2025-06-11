export default function Toolbar() {
    function handleClick1() {
        alert('=点击了按钮一=')
    }
    function handleClick2() {
        alert('=点击了按钮二=')
    }
    return(
        <div onClick={()=> {alert('click-toolbar')}} style={{'background': 'grey', padding:'5px'}}>
            <p>按鈕点击的时候，阻止事件传播，调用 e.stopPropagation()，阻止事件进一步冒泡</p>
            
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={e=>{
                e.stopPropagation()
                handleClick1()
            }}>按钮一（阻止冒泡）</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition m-4" onClick={handleClick2}>按钮二</button>
        </div>
    )
}
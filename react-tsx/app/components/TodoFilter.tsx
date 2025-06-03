function TodoFilter({ setFilter }: any) {
    return (
        <div className="btnWrapper">
            <button onClick={()=> setFilter('all') }>全部</button>
            <button onClick={()=> setFilter('active') }>待办</button>
            <button onClick={()=> setFilter('completed') }>已完成</button>
        </div>
    )
}

export default TodoFilter
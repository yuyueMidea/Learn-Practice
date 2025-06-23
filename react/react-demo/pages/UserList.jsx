import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userDataStore"

export default function UserList() {
    // 获取用户数据
    const { users, addUser, updateUser, deleteUser, getAllUsers, getUsersByName } = useUserStore();
    // console.log('users_: ', users)
    const navigate = useNavigate();
    const handleEdit =(eid)=>{
        navigate(`/user/${eid}`);  // 动态路由跳转
    }
    const handleDelete = (did) =>{
        console.log('dic_: ', did)
        deleteUser(did)
    }
    const handleAdd = () =>{
        navigate('/user/addNew')
    }
    
    return (
        <div className="userlist_wrapper">
            <h1>用户列表
                <button onClick={handleAdd} >新增</button>
            </h1>
            <ul>
                {users.map(user =>(
                    <li className="useritem_wrapper" key={user.id}>
                        <span>{ user.id }</span>
                        <span>{ user.name }</span>
                        <span>{ user.age }</span>
                        <span>{ user.email }</span>
                        <div className="operation_btns">
                            <button onClick={()=>handleEdit(user.id)} className="editBtn">编辑</button>
                            <button onClick={()=>handleDelete(user.id)} className="deleteBtn">删除</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
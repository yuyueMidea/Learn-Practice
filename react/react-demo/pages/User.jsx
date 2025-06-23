import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUserStore } from "../stores/userDataStore";

// 生成随机ID的方法，入参是位数，比如16位ID
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

export default function User() {
    // URL 如 /detail?id=123
    const { id } = useParams();
    console.log('detail_uid: ', id)
    // 获取用户数据
    const { getUsersById } = useUserStore();
    let userInfo = {}
    if(id ==='addNew') {
        userInfo = {
            id: generateRandomString(16),
            name: '',
            age: '',
            email: '',
        }
    } else {
        userInfo = getUsersById(id) ? getUsersById(id)[0] : {}
    }
    console.log( 'userInfo__: ', userInfo )
    return (
      <div className="u_detail">
        <p>当前查看的用户ID: {id}</p>
        <FormEdit cuser={userInfo} editType={id} />
      </div>
    );
}


function FormEdit({cuser, editType}) {
    console.log(cuser,99999, editType)
    const { addUser, updateUser } = useUserStore();
    const [user, setUser] = useState(cuser);
    const navigate = useNavigate()
    const submitEdit = (conUser)=>{
        console.log('submitEdit=======', conUser)
        if(editType ==='addNew') {
            addUser(conUser)
        } else {
            updateUser(conUser)
        }
        navigate(`/userlist`);  // 数据更新完成后，路由跳转到列表页
    }
    return (
        <div className="form_wrapper">
            <h2>用户详情: { JSON.stringify(user) }</h2>
            <p>
                <span>id</span>
                <input type="text" value={user.id} disabled />
            </p>
            <p>
                <span>name</span>
                <input type="text" value={user.name} onChange={e=>setUser({...user, name: e.target.value})} />
            </p>
            <p>
                <span>age</span>
                <input type="text" value={user.age} onChange={e=>setUser({...user, age: e.target.value})} />
            </p>
            <p>
                <span>email</span>
                <input type="text" value={user.email} onChange={e=>setUser({...user, email: e.target.value})} />
            </p>
            <p>
                <span></span>
                <button onClick={()=>submitEdit(user)}>submit</button>
            </p>
        </div>
    )
}
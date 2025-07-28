import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter1',
    initialState: {
        countValue: 0,
        menuName: 'home',
        userlist: [
            {id: 'jAz2eNMLotvFdyAm', name: 'zhangsna', age: 33},
            {id: 'n1GI6ehA6jIJ6fsP', name: 'lisi', age: 45},
            {id: 'BxnVFxhurKeCzltj', name: 'wangwu', age: 65},
        ]
    },
    reducers: {
        increment: (state) => {
            state.countValue +=1
        },
        decrement: (state) => {
            state.countValue -=1
        },
        reset: (state) => {
            state.countValue = 0;
        },
        setMenuName: (state, actions) => {
            state.menuName = actions.payload;
        },
        addToUserList: (state, action) => {
            state.userlist = state.userlist.concat(action.payload);
        },
        updateUser: (state, action) => {
            state.userlist = state.userlist.map(item =>
                item.id===action.payload.id ? action.payload : item
            )
        },
        deleteUserByID: (state, action) => {
            state.userlist = state.userlist.filter(c=>c.id !== action.payload);
        },
    }
})

export const { increment, decrement, reset, setMenuName, addToUserList, updateUser, deleteUserByID } = counterSlice.actions;

export default counterSlice.reducer;
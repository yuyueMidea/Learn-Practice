import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userName: '',
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            console.log(action)
            state.userName = action.payload;
            state.isAuthenticated = true;
        },
        logOut: (state)=>{
            state.userName = '';
            state.isAuthenticated = false;
        }
    }
})


export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"admin",
    initialState: {
        adminToken:null,
      },
      
    reducers:{
       
        LOGIN:(state,action)=>{
            
             state.adminToken = action.payload
            
        },
        LOGOUT:(state,action)=>{
            
            state.adminToken=null
        },
      
    }
})

export const {LOGIN,LOGOUT} = userSlice.actions

export const selectAdminToken=(state)=>state.admin.adminToken;



export default userSlice.reducer;
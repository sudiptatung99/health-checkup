
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState: {
        userToken:null,
        image:null,
        firstName:null
      },
      
    reducers:{
       
        LOGIN:(state,action)=>{
            
             state.userToken = action.payload.userToken
            
        },
        LOGOUT:(state,action)=>{
            
            state.userToken=null
        },
        IMAGE:(state,action)=>{
            state.image = action.payload.image
           
        },
        NAME:(state,action)=>{
            
            state.firstName = action.payload.firstName
        }
      
    }
})

export const {LOGIN,LOGOUT,IMAGE,NAME} = userSlice.actions

export const selectUserToken=(state)=>state.user.userToken;
export const selectUserFirstName=(state)=>state.user.firstName;
export const selectUserImage=(state)=>state.user.image;

export default userSlice.reducer;
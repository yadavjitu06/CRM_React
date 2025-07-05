import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../confiq/axiosInstance";
import Login from "../../pages/auth/Login";

export const login=createAsyncThunk('/Auth/login',async(data)=>{
 try{ const responce =axiosInstance.post("auth/signin",data)
return responce;}catch(error){
  console.log("printing Error",error);
// return error
}
})



export const signup=createAsyncThunk('/Auth/signup',async(data)=>{
 try{ const responce =axiosInstance.post("auth/signup",data);
return responce;
}catch(error){
  console.log("printing Error",error);
// return error
}
})

const initialState={
    role:localStorage.getItem("role")||"",
    data:JSON.parse(localStorage.getItem("data"))||undefined,
    token:localStorage.getItem("token")||"",
    isLoggedIn:localStorage.getItem("isLoggedIn")||false
}
const authSlice = createSlice({
name :"auth",
initialState,
reducers:{},

extraReducers:(builder)=>{
  builder.addCase(login.fulfilled,(state,action)=>{

    // if(action.payload?.status!="201"||!action.payload)return
    if(!action.payload)return;
    state.isLoggedIn=(action.payload?.data?.token!=undefined);
    state.data=action.payload?.data?.userData;
    state.token=action.payload?.data?.token;
    state.role=action.payload?.userData?.userType;
    localStorage.setItem("role",action.payload?.data?.userData?.userType);
    localStorage.setItem("isLoggedIn",(action.payload?.data?.token!=undefined));
    localStorage.setItem("data",JSON.stringify(action.payload?.data?.userData));
    localStorage.setItem("token",action.payload?.data?.token);
  })
  
}
})


export default authSlice.reducer
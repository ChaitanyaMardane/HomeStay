import API from "../utils/axios";

 
export const  registerUser= async (data)=>{
    const res = await API.post("/api/auth/register",data);
    console.log(res);
    
    return res.data;
}

export const loginUser= async (data)=>{
    const res = await API.post("/api/auth/login",data);
    console.log(res.data);
    
    return res.data;
}


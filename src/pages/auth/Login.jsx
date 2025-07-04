import { useState } from "react";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/Slices/AuthSlice";

function Login() {



const dispatch=useDispatch();



function   handleInputChange(e){
const {name,value}=e.target
setLoginDetails({
  ...loginDetails,
  [name]:value
})
   

}


const [loginDetails ,setLoginDetails]=useState({
  email:"",
  password:"",
})

function onSubmit(){
  if(!loginDetails.email||!loginDetails.password)return;
  console.log(loginDetails)
const responce = dispatch(login(loginDetails));
console.log(responce);
}
  
  return (
     <div className="flex justify-center items-center h-[90vh]">
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Login</h2>
                    </div>
                    <div className="w-full">
                        <input 
                            
                            name="email"
                            autoComplete="one-time-code" 
                            type="text" 
                            placeholder="email ..."
                           onChange={handleInputChange}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            
                            name="password"
                            autoComplete="one-time-code"  
                            type="password" 
                            placeholder="password" 
                          onChange={handleInputChange}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full card-actions mt-4">
                        <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
  );
}
export default Login;

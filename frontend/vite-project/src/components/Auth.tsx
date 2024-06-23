import axios from "axios";
import { SignupInput} from "blog_project_common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";


export const Auth = ({type}:{type:"signin" | "signup"}) => {
    // const [userName,setUserName]=useState("");
    // const [email,setEmail]=useState("");
    // const [password,setPassword]=useState("");
    const [postInputs,setPostInputs] = useState<SignupInput>({
       name:"",
       email:"",
       password:""
    })
    const navigate = useNavigate();
    async function sendRequest(){
       try{
        console.log(postInputs);
        const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin" ? "signin":"signup"}`,{
            ...postInputs
        })
        console.log(response);
        const jw = response.data;
        console.log(jw);
        if(jw.jwt){
        localStorage.setItem("token",jw.jwt);
        navigate("/blogs");
        }
    } catch(e){
        alert(e)
    }
       }

  return <div className=" h-screen flex justify-center flex-col ">
    <div className="flex justify-center">
        <div className=" px-10">
            <div className="text-3xl font-extrabold pl-5"> 
                Create an Account
            </div>
            <div className="opacity-45 pl-5">
                {type === "signin" ? "Dont have an account ? " :"Already have a account ?"}
                <Link to={type === "signin" ? "/signup": "/signin"} className="underline">{type === "signin" ? " Signup" : " Signin"}</Link>
            </div>
            {type === "signup" ? <LabelledInput key="name" label="Username" placeholder="Enter your username" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/> : null}
            <LabelledInput key="email" label="Email" placeholder="Enter your Email" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                        email:e.target.value
                })
            }}/>
             <LabelledInput key="password" label="Password" type={"password"} placeholder="Enter your Password" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }}/>
            
            <button onClick={sendRequest} type="button" className="w-full mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" :"Signin"}</button>
           
        
        </div>
    </div>
</div>
}

interface LabelledInputType {
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) =>void
    type?:string
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black pt-3">{label}</label>
            <input type={type||"text"} onChange={onChange}  className=" border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}
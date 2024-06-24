import { useEffect } from "react";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    const navigate= useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token")){
           navigate("/blogs")
       }
   },[])
   
    return <div className="grid lg:grid-cols-2">
       <div>
            <Auth type={"signin"}/>
       </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
}
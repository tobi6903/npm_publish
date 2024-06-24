import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { useEffect, useState } from "react";

export default function Signup(){
    const navigate= useNavigate()
    const [isLoading,setIsLoading]=useState(false)
   
    useEffect(()=>{
        if(localStorage.getItem("token")){
           navigate("/blogs")
       }
   },[])
    return <div className="grid lg:grid-cols-2">
       <div>
            <Auth type={"signup"}/>
       </div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
}
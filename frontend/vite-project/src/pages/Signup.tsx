import { useNavigate } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { useEffect} from "react";

export default function Signup(){
    const navigate= useNavigate()
   
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
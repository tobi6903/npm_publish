import axios from "axios"
import { AppBar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Publish(){
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    return <div>
        <AppBar/>
        <Title onChange={(e)=>setTitle(e.target.value)}/>
       <div >
        <TextEditor onChange={(e)=>setDescription(e.target.value)}/>
       </div>
       <div className="max-w-2xl  mx-auto min-w-xl">
       <button type="submit" onClick={async ()=>{
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content:description
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        navigate(`/blog/${response.data.id}`)
       }} className="inline-flex items-center mt-3 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
           Publish post
       </button>
       </div>
       
    </div>
}

function Title({onChange}:{onChange:(e:ChangeEvent<HTMLInputElement>)=>void}){
    return <form className="max-w-2xl mx-auto min-w-xl mt-4"> 
    {/* <label  className="block mb-2 text-md font-semibold text-black">Title</label> */}
    <input type="text"  onChange={onChange} className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title of blog"/>
  </form>
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLInputElement>)=>void}){

    return <form className="max-w-2xl  mx-auto min-w-xl">
           <div className="mt-2 bg-white rounded-b-lg">
               {/* <label  className="font-semibold">Body</label> */}
               {/* @ts-ignore */}
               <textarea onChange={onChange} rows={Number("8")} className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write an article..." required ></textarea>
           </div>
    
       
    </form>
    
}
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/Appbar.tsx";
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton.tsx";
import { useBlogs } from "../hooks/hooks.tsx";
import { useEffect } from "react";

export const Blogs =()=>{

    const {loading,blogs}=useBlogs();

    const navigate = useNavigate();
    console.log(localStorage.getItem("token"));
    useEffect(()=>{
        if(localStorage.getItem("token")=== null){
           navigate("/signin")
       }
   },[])
    if(loading){
        return <div className="flex flex-col justify-center">
            <div><BlogSkeleton/></div>
            <div><BlogSkeleton/></div>
            <div><BlogSkeleton/></div>
            <div><BlogSkeleton/></div>
        </div> 
    }
    return <div>
            <AppBar/>
    <div className="flex justify-center">
        <div className=" max-w-screen-md">
            {blogs.map(blog=>
                <BlogCard id ={blog.id} key={blog.id} title={blog.title}
                     content={blog.content}
                     authorName={blog.author.name || "Anonymous"}
                      publishedDate="16th june"  />
            )}
        </div>
    </div>
    </div> 
}
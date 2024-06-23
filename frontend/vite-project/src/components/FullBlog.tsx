// 
import { AppBar } from "./Appbar"
import { Avator } from "./BlogCard"
interface Blog {
    "content" : string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}
export const FullBlog =({blog}: {blog:Blog}) => {
        console.log(blog)
    return <div>
        <AppBar />        
        <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 ml-6 max-w-screen-md">
           <div className=" text-3xl font-semibold mt-5">
            {blog.title} 
           </div>
           <div className="text-slate-500 pt-2 pb-2">
                Posted on 15th July 2024
           </div>
           <div className="">
            {blog.content}
           </div>
        </div>
        <div>
            {/* <div className="col-span-1 ml-6 mt-5 font-semibold">
            <Avator name={blog.author.name} size={4}/>
            <div>
            Author : {blog.author.name || "Anonymous"}
            </div>
            <div>
                Very good author , Read his blogs
            </div>
            </div> */}
            <div className="col-span-1 ml-6 mt-5 font-semibold">
            <div className="pl-3">
                Author
            </div>
            <div className="flex w-full">
            <Avator name={blog.author.name || ""} size={4}/>
            <div className="pl-2">
                {blog.author.name || "Anonymous"}
            </div>
            </div>
            <div className="font-extralight">
                Very good author , Read his blogs
            </div>
            </div>
            
        </div>
    </div>
    </div>
}
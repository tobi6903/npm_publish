import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks/hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/Appbar";


export default function Blog(){
    const {id} =useParams();
    console.log(id);
    const {loading,blog} = useBlog({
        id:id  || ""
    });
    if(loading){
        return <div>
          <AppBar/>
           <BlogSkeleton/>
        </div>
    }
    return <div>
        {/* @ts-ignore */}
        <FullBlog blog={blog}/>
    </div>
}
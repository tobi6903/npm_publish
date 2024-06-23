import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName :string;
    title:string;
    content :string;
    publishedDate:string;
    id:string
}

export const BlogCard = ({authorName,
    title,
    content,
    publishedDate,
    id}:
    BlogCardProps
) =>{
    
    return <Link to={`/blog/${id}`}>
    <div className="border-b p-3 mt-2 cursor-pointer">
        <div className="flex ">
            <div className="flex justify-center flex-col">
                <Avator size={5} name={authorName}/>
            </div> 
            <div className="font-extralight mx-1">
                {authorName}
            </div> 
            <div className="flex justify-center flex-col">
            <div className="opacity-45 text-sm ">
                {publishedDate}
            </div>
            </div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "...."}
        </div>
        <div className="text-slate-400 text-sm">
            {`${Math.ceil(content.length/100)} minute(s)`} 
        </div>
       
    </div>
    </Link>
}


export function Avator({name,size} : {name :string,size:number}){

    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="text-sm font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    
}
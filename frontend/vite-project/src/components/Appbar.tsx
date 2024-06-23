import { Link } from "react-router-dom"
import { Avator } from "./BlogCard"

export const AppBar = () =>{

    return <div className="border-b 
    flex justify-between px-10 py-2">
        <Link to={"/blogs"}><div className="text-3xl font-bold cursor-pointer">
            Medium
        </div></Link>
        
        <div >
        <Link to="/publish"><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button></Link>
            <Avator size={10} name="Vasista"/>
            {/* // Recoil (store User details) */}
        </div>
    </div>
}
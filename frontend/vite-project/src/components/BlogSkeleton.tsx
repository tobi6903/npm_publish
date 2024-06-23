
export function BlogSkeleton(){

    return <div className="border-b p-3 mt-2 cursor-pointer">
    <div className="flex ">
        <div className="flex justify-center flex-col">
        <div className="h-4 w-4 bg-gray-200 rounded-full  mb-4"></div>
        </div> 
        <div className="font-extralight mx-1">
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div> 
        <div className="flex justify-center flex-col">
        <div className="opacity-45 text-sm ">
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        </div>
    </div>
    <div className="text-xl font-semibold">
    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
    <div className="text-md font-thin">
    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
    <div className="text-slate-400 text-sm">
    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
   
    <div className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
    </div>
    </div>
    
}
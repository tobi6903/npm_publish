import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'
import { createBlogInput, updateBlogInput } from 'blog_project_common'
const blogRouter = new Hono<{
    Bindings :{
      DATABASE_URL:string
      JWT_SECRET:string
    },
    Variables:{
        userId:string
    }

  }>()

blogRouter.use("/*",async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    try{
        const decoded=await verify(authHeader,c.env.JWT_SECRET);
        //@ts-ignore
        c.set("userId",decoded.id);
       await next();
        console.log("hi there")
    }
    catch(e){
        return c.json({
            msg:"Error while logging in"
        })
    }

})

// blogRouter.use("/*",async (c,next)=>{
//     const authHeader = await c.req.header("authorization") || "";
//         const user=await verify(authHeader,c.env.JWT_SECRET);
//         if(user){
//         //@ts-ignore   
//         c.set("userId",user.id);
//         next();
//         }
//         else{
//         return c.json({
//             msg:"Error while logging in"
//         })
//     }

// })


blogRouter.post("/",async (c) => {
    const body=await c.req.json();
    const authorId = c.get("userId");
    console.log(body);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const {success}=createBlogInput.safeParse(body);
      if(!success){
        return c.json({
            msg:"Wrong form of input"
        })
      }
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
            
        }
    })
    return c.json({
        id:blog.id
    })
})

blogRouter.put("/",async (c)=>{
    const body=await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
   const {success}= updateBlogInput.safeParse(body);
    if(!success){
        return c.json({
            msg:"wrong form of input"
        })
    }
    const blog = await prisma.post.update({
        where:{
            id : body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json({
        id:blog.id
    })
})


blogRouter.get("/get/:id",async (c)=>{
    const id = c.req.param("id") || "";
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog=await prisma.post.findFirst({
            where :{
                id:id
            },
            select:{
                title:true,
                content:true,
                id:true ,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }
    catch(e){
        return c.json({
            msg:"Error while fetching"
        })
    }
})

//Todo : pagination
blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
   const blogs= await prisma.post.findMany({
    select:{
        content:true,
        title:true,
        id:true,
        author:{
            select:{
                name:true
            }
        }
    }
   });

   return c.json({
    blogs
   })
})

 export default blogRouter;
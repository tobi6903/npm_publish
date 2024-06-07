import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { z } from "zod"

const userRouter = new Hono<{
    Bindings :{
      DATABASE_URL:string
      JWT_SECRET:string
    }
  }>()

  userRouter.post('/signup',async(c)=>{

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    try{
    
      const user = await prisma.user.create({
        data:{
          email:body.email,
          name:body.name,
          password:body.password
        }
      })
      console.log(user);
      const jwt = await sign({id:user.id},c.env.JWT_SECRET);
      return c.json({
        jwt
      })
    }
    catch(e){
      c.status(411)
      return c.json({
        msg:"Error while logging in"
      })
    }
  
  })
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({msg:"error while logging in"});
    }
  
   const jwt = await sign({
      id:user.id
    },c.env.JWT_SECRET);
  
    return c.json({jwt})
  }
  catch(e){
    return c.json({
      msg:"error while logging in"
    })
  }
  })

  export default userRouter;
import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { z } from "zod"
import { signinInput, signupInput } from "blog_project_common"

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
    
    const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        msg:"Wrong form of inputs"
      })
    }
    try{
      console.log(body);
      const user = await prisma.user.create({
        data:{
          email:body.email,
          name:body.name,
          password:body.password
        }
      })
      // console.log(user);
      const jwt = await sign({id:user.id},c.env.JWT_SECRET);
      return c.json({
        jwt
      })
    }
    catch(e){
      c.status(411)
      console.log(e);
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
    // console.log(body);
    const {success}=signinInput.safeParse(body);
    console.log(signinInput.safeParse(body));
    console.log(success);
    if(!success){
      return c.json({
        msg:"wrong form of message"
      })
    }
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
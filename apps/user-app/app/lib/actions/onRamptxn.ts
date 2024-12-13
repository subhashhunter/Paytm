"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createonRampTransactions(amount:number,provider:string){
    const session=await getServerSession(authOptions);
    const token=Math.random().toString();
    const userId=session?.user?.id
    if(!userId)
    {
        return{
            message:"you are not logged in"
        }
    }
  await  prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:amount*100,
            startTime:new Date(),
            provider,
            status:"Processing",
            token:token

        }
    })
    return{
        message:"onRampTransaction is added"
    }

}
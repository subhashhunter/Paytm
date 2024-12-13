import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"


export default async function Home(){
    const session=await getServerSession(authOptions)
    const user=await prisma.user.findFirst({
       where:{
        number:session.user?.number || ""
       }
    })
    return <div>
       <p>Name: {user?.id}</p>
    </div>
}
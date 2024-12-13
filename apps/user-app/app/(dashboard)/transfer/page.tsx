import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { AddmoneyCard } from "../../../components/AddmoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
async function getbalance(){
    const session= await getServerSession(authOptions);
    const balance=await prisma.balance.findFirst({
        where:{
            userId: Number(session?.user?.id)
        }
    })
    return{
        amount:balance?.amount|| 0,
        locked:balance?.amount || 0
    } 
}
async function getonRampTransactions(){
    const session=await getServerSession(authOptions);
    const Txns=await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session?.user?.id)
        }

    })
    return Txns.map(t=>({
        time:t.startTime,
        status:t.status,
         amount:t.amount,
        provider:t.provider
    }))
}

export default async function(){
    const balance=await getbalance();
    const Transactions=await getonRampTransactions();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6]  font-bold pt-8 mb-8">
          Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
            <AddmoneyCard></AddmoneyCard>
            </div>
            <div>
            <BalanceCard amount={balance.amount } locked={balance.locked}></BalanceCard>
            
            <div className="pt-4">
                <OnRampTransactions Transactions={Transactions} ></OnRampTransactions>
            </div>
            </div>
        </div>
    </div>
}
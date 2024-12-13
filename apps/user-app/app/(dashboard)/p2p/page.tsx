import { SendCard } from "../../../components/Sendmoney";
import { getServerSession } from "next-auth";
 import { authOptions } from "../../lib/auth";
 import prisma from "@repo/db/client";
import { TransferMoney } from "../../../components/transferMoneyCard";

 async function getTransferMoney(){
  const session=await getServerSession(authOptions);
  const sent=await prisma.p2pTransfer.findMany({
    where:{
      fromUserId:Number(session?.user?.id)
    }
   })
  return sent.map(t=>({
    timestamp: t.timestamp,
    amount:t.amount
  })
 )}
export default async function P2P(){
   const send=await getTransferMoney();
   return (
    <div className="w-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <SendCard />
        </div>
        <div>
          <TransferMoney Transfer={send} />
        </div>
      </div>
    </div>
  );
  

}
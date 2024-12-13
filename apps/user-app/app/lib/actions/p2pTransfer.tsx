"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        return {
            message: "Error while sending"
        };
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        };
    }

    await prisma.$transaction(async (tx) => {
        // Ensure from user's balance exists
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        let fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
        });

        if (!fromBalance) {
            throw new Error(`Balance record not found for user: ${from}`);
        }

        // Ensure to user's balance exists
        let toBalance = await tx.balance.findUnique({
            where: { userId: toUser.id },
        });

        if (!toBalance) {
           
    if (!toBalance) {
      // Create a balance record for the recipient if missing
      toBalance = await tx.balance.create({
          data: {
              userId: toUser.id,
              amount: 0, // Initialize balance with 0
              locked: 0,
          },
      });
  }
        }

        // Check for sufficient balance
        if (fromBalance.amount < amount) {
            throw new Error("Insufficient funds");
        }

        // Perform the transfer
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });
        await tx.p2pTransfer.create({
            data:{
                toUserId:toUser.id,
                fromUserId:Number(from),
                amount,
                timestamp:new Date()
            }
        })
    });
    
}

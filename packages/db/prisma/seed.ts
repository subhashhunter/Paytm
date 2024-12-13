import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma=new PrismaClient();
async function main(){
    const alice=await prisma.user.upsert({
        where:{number:'1111111111'},
        update:{},
        create:{
            number:'1111111111',
            password:await bcrypt.hash('alice',10),
            name:'alice',
            Balance:{
                create:{
                    amount:1000000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    provider:"HDFC Bank",
                    amount:20000,
                    token:"123"
                }
            }
        }
        
    })
    const bob=await prisma.user.upsert({
        where:{number:'1111111111'},
        update:{},
        create:{
            number:'1111111111',
            password:await bcrypt.hash('bob',10),
            name:'bob',
            Balance:{
                create:{
                    amount:2000000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    provider:"HDFC bank",
                    token:"token_2"
                }
            }
        }
    })
    console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
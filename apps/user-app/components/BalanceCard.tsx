import { Card } from "@repo/ui/card"

export const  BalanceCard=({amount,locked}:{
    amount:number,
    locked:number
})=>{
    return <Card title="Balance">
        <div className="flex justify-between border-b pb-2 border-slate-300">
        <div>
            Unlocked balance
        </div>
        <div>
            {amount/100} INR
        </div>
        </div>
        <div className="flex justify-between border-b py-2 border-slate-300">
        <div >
           Total locked balance
        </div>
        <div>
            {locked/100} INR
        </div>
        </div>
        <div className="flex justify-between border-b py-2 border-slate-300">
        <div >
           Total  balance
        </div>
        <div>
            {(amount+locked)/100}INR
        </div>
        </div>
    </Card>
}
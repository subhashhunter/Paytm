import { Card } from "@repo/ui/card"

export const OnRampTransactions=({Transactions}:{
    Transactions:{
        time:Date,
        amount:number,
        status:string,
        provider:string
        
    }[]
})=>{
    if(!Transactions.length)
    {
        return <Card title="Recent Trnasactions">
            <div className="text-md text-slate-400 text-centre pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {Transactions.map(t=><div className="flex justify-between">
              <div>
                <div className="text-sm">
                    Recived INR
                </div>
                <div className="text-xs text-slate-600">
                    {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {t.amount/100}
              </div>
            </div>)}
        </div>
    </Card>
}
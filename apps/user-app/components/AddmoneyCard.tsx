"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"




import { createonRampTransactions } from "../app/lib/actions/onRamptxn"
const SUPPORTED_BANK=[
    {
        name:"HDFC Bank",
        redirectUrl:"https://netbanking.hdfcbank.com"
    },
    {
        name:"Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
    }
]
export const AddmoneyCard=()=>{
    const [redirectUrl,setRedirectUrl]=useState(SUPPORTED_BANK[0]?.redirectUrl)
    const [amount,setAmount]=useState(0);
    const [provider,setProvider]=useState(SUPPORTED_BANK[0]?.name || "")
    return  <Card title="Add money">
        <div className="w-full">
            <TextInput label="Amount" placeholder="Amount" onChange={(value)=>{
                setAmount(Number(value))
            }}></TextInput>
        
        <div className="py-2 text-left">
            Bank
        </div>
        <Select onSelect={(value)=>{
            setRedirectUrl(SUPPORTED_BANK.find(x=>x.name===value)?.redirectUrl ||"")
            setProvider(SUPPORTED_BANK.find(x=>x.name===value)?.name || "")
        }} options={SUPPORTED_BANK.map(x=>({
            key:x.name,
            value:x.name
        }))}></Select>
        <div className="pt-4 flex justify-center">
         <Button onClick={async()=>{
            await createonRampTransactions(amount*100,provider)
            window.location.href=redirectUrl || "";
        }}>Add money</Button>
        </div>
        </div>
        </Card>
}
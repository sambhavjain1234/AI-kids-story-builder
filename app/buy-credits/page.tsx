"use client"
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import { user } from '@nextui-org/theme';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

function BuyCredits () {
    const Options=[
        {
            id:1,
            price:50,
            credits:10
        },{
            id:2,
            price:150,
            credits:50
        },{
            id:3,
            price:200,
            credits:80
        },
        {
            id:4,
            price:250,
            credits:111
        }
    ]
//₹₹₹₹₹₹₹₹₹₹₹₹₹₹₹
const notify = (msg:string) => toast(msg);
const notifyError=(msg:string) => toast(msg);
const [selectedPrice,setSelectedPrice]=useState<number>(0);
const {userDetail,setUserDetail}=useContext(UserDetailContext)
const [selectedOption,setSelectedOption]=useState<number>(0);
const rotue =useRouter();
useEffect(()=>{
    if(selectedOption!=0)
        {
            const price=Options[selectedOption-1].price;
            console.log(price);
            setSelectedPrice(price)
        }
},[selectedOption])
        const OnPaymentSucsess=async()=>{
          const result=await db.update(Users)
          .set({
            credit:Options[selectedOption].credits+userDetail.credits
          }).where(eq(Users.userEmail,userDetail.userEmail));
          if(result){
            notify("Credits added");
            setUserDetail((prev:any)=>({
              ...prev,
              ['credit']:Options[selectedOption].credits+userDetail.credits
  
            }))
            rotue.replace('/dashboard');
        }
        else{
            notifyError('server error')
        }
        }

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40 text-center'> 
    <h2 className='text-4xl font-bold text-primary'>
        Add More Credits</h2>
        <div className='grid grid-cols-1 mt-10 md:grid-cols-2 gap-10 items-center justify-center'>
             <div>
                {Options.map((option,index)=>(
                    <div className={`p-6 my-3 border bg-primary 
                    text-center rounded-lg text-white 
                    cursor-pointer hover:scale-105 transition-all ${selectedOption==option.id&&'bg-black'}`}
                     onClick={()=>setSelectedOption(option.id)}>
                        <h2>Get {option.credits} Credits= {option.credits} Story</h2>
                        <h2 className='font-bold text-2xl'>₹{option.price}</h2>
                    </div>
                ))}
             </div>
             <div>
            {selectedPrice>0&& <PayPalButtons style={{ layout: "vertical" }}
             disabled={!selectedOption||selectedOption==0} 
                             //@ts-ignore

             onApprove={()=>OnPaymentSucsess()
             }onCancel={()=>notifyError("payment cancled")}
             createOrder={(data,actions)=>{
                //@ts-ignore
                return actions.order.create({
                    purchase_units:[
                        {    
                            //@ts-ignore
                            amount:{
                                value:selectedPrice.toFixed(2),
                                currency_code:'USD'
                            }
                        }
                    ]
                })
             }}
             
             />}

             </div>
        </div>
     </div>
  )
}

export default BuyCredits 
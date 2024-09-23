"use client"
import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import "./globals.css";
import {useUser} from '@clerk/nextjs'
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { UserDetailContext } from './_context/UserDetailContext';
function Provider ({children}:{children:React.ReactNode}){

  const [userDetail,setUserDetail]=useState<any>();
  const {user}=useUser();
  
   useEffect(()=>{
    user&&saveNewUserIfNotExist();
   },[user])

  const saveNewUserIfNotExist=async()=>{
    //check if user already exist
         const userResp=await db.select().from(Users)
         .where(eq(Users.userEmail,user?.primaryEmailAddress?.emailAddress??''))  
         console.log("Exisiting User",userResp);
    //if not will add new user to db
    if(!userResp[0])
    {
      const result=await db.insert(Users).values({
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userImage:user?.imageUrl,
        userName:user?.fullName
      }).returning({
        userEmail:Users.userEmail,
        userImage:Users.userImage,
        userName:Users.userName,
        credit:Users.credit
      })
      console.log("new user",result[0]);
      
      setUserDetail(result[0]);
    }
    else{
      setUserDetail(userResp[0])
    }



  }


  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
              <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??'' }}>

    <NextUIProvider>
      {/* {Header} */}
        <Header/>
     {children}
     <ToastContainer />
  </NextUIProvider>
  </PayPalScriptProvider>
  </UserDetailContext.Provider> 
  )
}

export default Provider
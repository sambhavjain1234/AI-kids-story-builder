"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button, Image } from '@nextui-org/react'
import Link from 'next/link'
import React, { useContext } from 'react'

function DashboardHeader() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext)
  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
    <h2 className='font-bold text-3xl'>My Stories</h2>
    <div className='flex gap-3 items-center'>
        <Image src={'/coin.png'} alt='coin'width={30} height={30}/>
        <span className='text-2xl'>{userDetail?.credit} Credit Left</span>
        <Link href={'/buy-credits'}> 
        <Button className='bg-blue-500'>Buy More Credits</Button>
        </Link>
    </div>
    </div>
  )
}

export default DashboardHeader
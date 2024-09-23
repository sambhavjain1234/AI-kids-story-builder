"use client"
import React, { useState } from 'react'
import Image from "next/image";
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';
function Header() {

        const {user,isSignedIn} =useUser();

        const MenuList = [{
            name :'Home',
            path:'/'
        },{
            name :'Create Story',
            path:'/create_story'
        },{
            name :'Explore Stories',
            path:'/explore'
        },{
            name :'Contact Us',
            path:'/contact_us'
        },]
const [isMenuopen,setIsMenuopen]=useState(false);
  return (
<Navbar maxWidth = 'full' onMenuOpenChange={setIsMenuopen}>
    <NavbarMenuToggle aria-label={isMenuopen ? "Close menu":"Open menu"} 
    className='sm:hidden'/>
<NavbarContent>
    <NavbarBrand>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl text-primary ml-3'>Kidly Tales</h2>
    </NavbarBrand>
</NavbarContent>
<NavbarContent justify='center'className='hidden sm:flex'>
{MenuList.map((item,index)=>(
    <NavbarItem className='text-xl text-primary font-medium hover:underline mx-2'>
      <Link href={item.path}>
      {item.name}
      </Link>
    </NavbarItem>
))}
</NavbarContent>
<NavbarContent justify='end'className=' justify-end' >
    <Link href={'/dashboard'}>
    <Button color='primary'>

        { isSignedIn?
    'Dashboard':'Get Started'
}
    </Button> 
    </Link>
    <UserButton/>  
</NavbarContent>
<NavbarContent>
    <NavbarMenu>
       {MenuList.map((item,index)=> (
        <NavbarMenuItem>
            <Link href={item.path}>
            {item.name}
            </Link>
        </NavbarMenuItem>
       )
    
    )} 
    </NavbarMenu>
</NavbarContent>
</Navbar>  
)
}

export default Header
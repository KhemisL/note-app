"use client"
import { Button } from '@/components/ui/button'
import { HandCoins, LogInIcon, LogOut, Settings, ChartNoAxesCombined } from 'lucide-react'
import React from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from 'next/navigation'

export default function LoginButton() {
  const {data: session} = useSession()
  
  return (
    <>
    {session ? 
      (<DropdownMenu>
        <DropdownMenuTrigger asChild className='cursor-pointer'>
               <Image className='rounded-full' width={40} height={40} src={session.user?.image || '/images/default-avatar.png'} alt="User Avatar" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/dashboard/payment")}>
          <ChartNoAxesCombined /> Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/dashboard/payment")}>
            <HandCoins /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/dashboard/settings")}>
            <Settings /> Setting
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
            <LogOut /> Logout
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>)
      : 
      (<Button onClick={()=> signIn()}>
        Login
        <LogInIcon />
      </Button>)}
    
    
</>
  )
}

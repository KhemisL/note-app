"use client"
import React from 'react'
import { Notebook, HandCoins, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export default function DashboardNav() {
    const pathName = usePathname()

    const menu = [
        {
            name: "Notes",
            icon: Notebook,
            path: "/dashboard/notes"
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/dashboard/settings"
        },
        {
            name: "Billing",
            icon: HandCoins,
            path: "/dashboard/payment"
        },

    ]
  return (
    <nav className='flex md:flex-col md:h-full md:w-16 w-full lg:w-40 gap-2'>
        {menu.map((link, index) => {
            const isActive = pathName.startsWith(link.path)
            return (
                <Link key={index} href={link.path}>
                    <div className={`flex items-center justify-center lg:justofy-start gap-2 cursor-pointer lg:p-3 p-2 
                        hover:bg-orange-500/50 hover:text-white text-sm font-bold rounded-md ${isActive && "bg-orange-500 text-white"}`}>
                        <link.icon className='w-4' />
                        <span className='hidden lg:block'>{link.name}</span>
                    </div>
                </Link>
            )
        })}
    </nav>
  )
}

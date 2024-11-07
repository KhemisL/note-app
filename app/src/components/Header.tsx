
import { NotebookPen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme/ThemeToggle'
import LoginButton from './LoginButton'

export default function Header() {
  return (
    <nav className='w-full flex items-center justify-around border-b border-gray-300 py-2'>
        <Link href='/' className='flex items-center justyfi-center text-2xl font-bold'>
            <div className='px-2'>
                NoteNow
            </div>
            <NotebookPen />
        </Link>
        <div className='gap-2 flex items-center justify-center'>
            <LoginButton />
            <ThemeToggle />
        </div>
       
    </nav>
  )
}

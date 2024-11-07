"use client"
import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteNote } from '@/lib/actionNotes'
import { toast } from 'react-toastify'
interface IDeleteBtn {
  id: string
}
export default function ButtonNoteDelete({id}: IDeleteBtn) {
  return (
    <form action={deleteNote}>
        <Input type='hidden' name="id" value={id} />
        <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white mt-1" onClick={() => toast.success("Note has been delete")}>
            <Trash2 className='w-5 h-5' />
        </Button>
        
    </form>
  )
}
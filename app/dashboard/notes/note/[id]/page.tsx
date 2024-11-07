"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createNote, updateNote } from '@/lib/actionNotes'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'
import { getNote } from '@/lib/actionNotes'

interface IParams {
  id: string,
  title: string,
  description: string,
  completed: boolean
}

interface IUpdatePageProps {
  params: IParams
}
export default async function NotePageUpdate({params}: IUpdatePageProps) {

  const note = await getNote(params.id)

  return (
    <Card>
        <form action={updateNote} onSubmit={(()=> toast.success("Note has been updated"))}>
        <Input type='hidden' name="id" value={note?.id as string} />
            <CardHeader>
                <CardTitle>Update your note</CardTitle>
                <CardDescription>Few word for don't forget</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-5'>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text' id='title' required name='title' defaultValue={note?.title as string} placeholder='Type your title here' />
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='description'>Description</Label>
                    <Textarea defaultValue={note?.description as string} placeholder="Type your note here" id='description' name='description' />
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='completed'>Completed | Discard</Label>
                    <Input defaultChecked={note?.completed as boolean} type='checkbox' id='completed' name='completed' className='w-4 cursor-pointer' />
                </div>

            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button type='button' className='bg-red-500 hover:bg-red-600 text-white'>
                    <Link href="/dashboard/notes">Discard</Link>
                </Button>
                <Button type='submit' className='bg-orange-500 hover:bg-orange-600 text-white'>
                    Update note
                </Button>
            </CardFooter>
        </form>
    </Card>
  )
}

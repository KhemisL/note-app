"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React from 'react'
import { createNote } from "@/lib/actionNotes"
import { toast } from 'react-toastify'
export default function CreateNotes() {
  return (
    <Card>
        <form action={createNote} onSubmit={(()=> toast.success("Note Created"))}>
            <CardHeader>
                <CardTitle>New note</CardTitle>
                <CardDescription>Few word for don't forget</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-5'>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text' id='title' required name='title' placeholder='Type your title here' />
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='description'>Description</Label>
                    <Textarea placeholder="Type your note here" id='description' name='description' />
                </div>
                <div className="gap-y-2 flex flex-col">
                    <Label htmlFor='completed'>Completed | Discard</Label>
                    <Input type='checkbox' id='completed' name='completed' className='w-4 cursor-pointer' />
                </div>

            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button type='button' className='bg-red-500 hover:bg-red-600 text-white'>
                    <Link href="/dashboard/notes">Discard</Link>
                </Button>
                <Button type='submit' className='bg-orange-500 hover:bg-orange-600 text-white'>
                    Create note
                </Button>
            </CardFooter>
        </form>
    </Card>
  )
}

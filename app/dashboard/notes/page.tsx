import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getUser } from '@/lib/actionUsers'
import { getAllNote } from '@/lib/actionNotes'
import { Divide, File, FilePenLine, PenIcon } from 'lucide-react'
import ButtonNoteDelete from '@/app/src/components/ButtonNoteDelete'
// import ButtonNoteDelete from "@/app/src/components/ButtonNotedelete."
export default async function Notes() {
  const user = await getUser()
  const data = await getAllNote(user?.id as string)
  
  return (
              <section>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Note</CardTitle>
                        <CardDescription>Don't forget your idea, take note</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>
                            <Link href="/dashboard/notes/create">
                              Create new note
                            </Link>
                          </Button>
                    </CardFooter>

                    {data.length < 1 ? (
                      <div className="flex flex-col items-center justify-center border-t border-dashed p-5">No note has been created.</div>
                        ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch p-5">
                      {data.map((item, index) => (
                        <Card key={index} className="h-full flex flex-col relative">
                          <CardHeader className='flex flex-row items-center justify-between'>
                            <CardTitle>{item.title}</CardTitle>
                            <Link href={`/dashboard/notes/note/${item.id}`}>
                              <PenIcon className='cursor-pointer w-5 h-5 absolute top-4 right-8' />
                            </Link>
                            
                          </CardHeader>
                          <CardContent className="flex flex-col gap-y-5 flex-grow">
                            <p className="line-clamp-4 gap-y-2 flex flex-col">{item.description}</p>
                          </CardContent>
                          <CardFooter className='flex flex-row items-end justify-between'>
                            <p className='text-muted-foreground'> Write {new Intl.DateTimeFormat('fr-FR', {
                              dateStyle: "medium"
                            }).format(new Date(item.createAt))}</p>
                            <ButtonNoteDelete id={item.id} />
                          </CardFooter>
                          
                        </Card>
                      ))}
                      </div>
                      )}
                </Card> 
              </section>
  )
}

"use server"

import { prisma } from "./db"
import { getUser } from "./actionUsers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createNote = async (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const completed = formData.get("completed")
    const user = await getUser()
    const userId = user?.id as string

    await prisma.notes.create({
        data: {
            userId: userId,
            title: title,
            description: description,
            completed: completed === "on"
        }
    })
    redirect('/dashboard/notes')
}

export const getAllNote = async (userId: string) => {
    const data  = await prisma.notes.findMany({
        where: { userId: userId},
        orderBy: {
            createAt: "desc"
        }
    })

    return data
}

export const deleteNote = async (formdata: FormData) => {
    const id = formdata.get("id") as string

    await prisma.notes.delete({
        where: { id }
    })
    revalidatePath("/")
}

export const getNote = async (id : string) => {
    const note = prisma.notes.findUnique({
        where: {id: id}
    })

    return note
}

export const updateNote = async (formData: FormData) => {

        try {
            const id = formData.get("id") as string
            const title = formData.get("title") as string
            const description = formData.get("description") as string
            const completed = formData.get("completed")
        
            if (title !== null || description !== null ) {
                await prisma.notes.update({
                    where: {id},
                    data: {
                        id: id,
                        title: title,
                        description: description,
                        completed: completed === "on"
                    }
                })
            }  
        } catch (error) {
            console.log(error);
            
        }finally {
            redirect('/dashboard/notes')
        }
}
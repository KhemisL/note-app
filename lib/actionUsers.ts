"use server"

import { prisma } from "./db"
import { getServerSession } from "next-auth"
import { authOptions } from "./AuthOptions"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function getUser() {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || !session.user.id) {
        redirect("../")
    }

    const id = session.user.id as string
    return await prisma.user.findUnique({
        where: { id }
    })
}

export async function updateUser(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized")
    }

    const id = session.user.id as string
    const userName = formData.get("name") as string

    if (userName) {
        await prisma.user.update({
            where: { id },
            data: { name: userName }
        })
        revalidatePath("/")
    }
}

export const deleteUser = async () => {
    const session = await getServerSession(authOptions)

    const userId = session?.user.id as string

    if(!session?.user || !session || !session?.user.id) redirect("../")

        await prisma.user.deleteMany({
            where: {stripeCustomerId: userId}
        })

        await prisma.subscription.deleteMany({
            where: {userId: userId}
        })

        await prisma.session.deleteMany({
            where: {userId: userId}
        })

        await prisma.account.deleteMany({
            where: {userId: userId}
        })
}
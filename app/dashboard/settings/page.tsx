"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUser, updateUser } from "@/lib/actionUsers"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { deleteUser } from "@/lib/actionUsers"

export default function Settings() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        async function fetchData() {
            const data = await getUser()
            setUser(data)
        }
        fetchData()
    }, [])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        
        await updateUser(formData)
        const updatedUser = await getUser() 
        setUser(updatedUser) 
        toast.success("User Updated")
    }


    return (
        <section>
            <form action={updateUser} onSubmit={handleSubmit} className="mb-4">
                <Input type="hidden" name="id" value={user?.id} />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Global settings</CardTitle>
                        <CardDescription>Update your personal information for save</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user?.image && <Image width={70} height={70} src={user?.image} alt="Avatar" className="rounded-full mb-4" />}
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="idUser">ID</Label>
                            <Input type="text" name="idUser" id="idUser" disabled defaultValue={user?.id || ""} />
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" name="name" id="name" defaultValue={user?.name || ""} />
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" name="email" id="email" disabled defaultValue={user?.email || ""} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </Card>
            </form>
            <form action={deleteUser}>
                <Input type="hidden" name="id" value={user?.id} />
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Advanced settings</CardTitle>
                        <CardDescription>Click on the button for remove your account</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="bg-red-500 hover:bg-red-600">Delete account</Button>
                    </CardFooter>
                </Card> 
            </form>
        </section>
    )
}

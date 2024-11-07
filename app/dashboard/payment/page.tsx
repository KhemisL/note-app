import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getUser } from '@/lib/actionUsers'
import Image from 'next/image'
import badgePremium from "@/app/src/images/badge-premium.png"
import { createCustomerPortal, createSubscription, getDataStripeUser } from '@/lib/actionStripe'
export default async function Payment() {

  const user = await getUser()
  const dataStripe = await getDataStripeUser(user?.id as string)
  const itemsPremium = [
    {name: "Hébergement web fiable et sécurisé"},
    {name: "Conception Responsive et conviviale"},
    {name: "Fonctionnalité avancées"},
    {name: "Support technique et mise à jour "},
  ]

  if (dataStripe?.status === "active") {
    return(
      <div className="max-w-lg mx-auto space-y-4 mt-3">
        <Card className='flex flex-col'>
          <CardContent className='py-8'>
            <div>
              <h3 className="uppercase bg-orange-900/20 text-md text-orange-500 p-3 rounded-md">Pass premium</h3>
              <p className="mt-4 text-sm text-muted-foreground">Modify your plan</p>
              <Image src={badgePremium} width={80} height={80} alt='baldge premium' className='block my-4' />
              <form action={createCustomerPortal} className='w-full mt-4'>
              <Button className='bg-orange-500 hover:bg-orange-600 text-white w-full'>Modify your subscription</Button>
            </form>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="max-w-lg mx-auto space-y-4 mt-3">
      <Card className='flex flex-col'>
        <CardContent className='py-8'>
          <div>
            <h3 className="uppercase bg-orange-900/20 text-md text-orange-500 p-3 rounded-md">Pass premium</h3>
          </div>
          <div className="mt-4 text-6xl">
            <span className='font-bold'>19,99</span> <span className="text-muted-foreground text-sm">/mois</span>
          </div>
          <p className="mt-4 text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <div className="flex-1 flex-col justify-between px-6 py-4 bg-secondary rounded-lg m-1 space-t-6 p-3 mt-4">
            <ul className="space-y-3">
              {itemsPremium.map((item, index) => (
                <li key={index} className='flex items-center text-muted-foreground gap-2'>
                  <span>✅</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
            <form action={createSubscription} className='w-full mt-4'>
              <Button className='bg-orange-500'>Devenir membre premium</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

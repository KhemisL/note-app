import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BadgeCheck } from 'lucide-react'
import Link from 'next/link'
export default function SucessPage() {
  return (
    <section className="w-full h-screen text-center">
        <Card className='w-[400px] mx-auto p-4'>
            <BadgeCheck className='w-full text-green-500 text-center mb-3' />
            <h1 className="text-xl mb-2 text-center uppercase">Payment sucessfull</h1>
            <p className="text-muted-foreground">Your are now premium menbre</p>
            <Button className='bg-orange-500 text-white hover:bg-orange_600'>
                <Link href={"/dashboard/payment"}>
                    biolling your subscription
                </Link>
            </Button>
        </Card>
    </section>
  )
}

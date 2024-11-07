import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { error } from "console";

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("stripe-signature") as string;

    let e: Stripe.Event
    try {
        e = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);

    } catch (error: unknown) {
        return new Response('Erreur webhook stripe', { status: 400})
    }

    const session = e.data.object as Stripe.Checkout.Session

    if (e.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        const customerId = String(session.customer)

        const user = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId
            },
        })

        if(!user) throw new Error('Utilisateur inexistant')

            await prisma.subscription.create({
                data: {
                    stripeSubscriptionId: subscription.id,
                    userId: user.id,
                    currentPeriodStart: subscription.current_period_start,
                    currentPeriodEnd: subscription.current_period_end,
                    status: subscription.status,
                    planId: subscription.items.data[0].plan.id,
                    interval: String(subscription.items.data[0].plan.interval)
                }
            })
    }
    if(e.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                planId: subscription.items.data[0].plan.id,
                currentPeriodStart: subscription.current_period_start,
                currentPeriodEnd: subscription.current_period_end,
                status: subscription.status,
            }
        })
    }
    return new Response(null, { status: 200})
}
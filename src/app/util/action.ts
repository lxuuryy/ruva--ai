'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function addFreeCredits(){
    const user = await currentUser();
    
    if(!user){
        return {success:false, error: 'User not found'}
    }

    await clerkClient.users.updateUserMetadata(user.id, {
        publicMetadata: {
            credits: 10
        }
    })

    return {success:true, error:null}
}

export async function deductCredits(){
    const user = await currentUser();

    const credits = user?.publicMetadata?.credits as number;
    
    if(!user){
        return {success:false, error: 'User not found'}
    }

    await clerkClient.users.updateUserMetadata(user.id, {
        publicMetadata: {
            credits: credits - 1
        }
    })

    return {success:true, error:null}
}

type LineItem = Stripe.Checkout.SessionCreateParams.LineItem

export async function createStripeCheckoutSession(lineItems: LineItem[]) {
    const user = await currentUser()
    if (!user) {
      return { sessionId: null, checkoutError: 'You need to sign in first.' }
    }
  
    const origin = 'https://ruva-ai.vercel.app' as string
  
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: lineItems,
      success_url: `${origin}/checkout?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
      customer_email: user.emailAddresses[0].emailAddress
    })
  
    return { sessionId: session.id, checkoutError: null }
  }
  
  export async function retrieveStripeCheckoutSession(sessionId: string) {
    if (!sessionId) {
      return { success: false, error: 'No session ID provided.' }
    }
  
    const user = await currentUser()
    if (!user) {
      return { success: false, error: 'You need to sign in first.' }
    }
  
    const previousCheckoutSessionIds = Array.isArray(
      user.publicMetadata.checkoutSessionIds
    )
      ? user.publicMetadata.checkoutSessionIds
      : []
  
    if (previousCheckoutSessionIds.includes(sessionId)) {
      return {
        success: true,
        error: null
      }
    }
  
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    })
  
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        credits: 100,
        checkoutSessionIds: [...previousCheckoutSessionIds, sessionId],
        stripeCustomerId: session.customer,
        stripeSubscriptionId:
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id,
        stripeCurrentPeriodEnd:
          typeof session.subscription === 'string'
            ? undefined
            : session.subscription?.current_period_end
      }
    })
  
    return { success: true, error: null }
  }
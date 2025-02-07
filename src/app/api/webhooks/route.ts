// app/api/webhooks/route.ts
import { NextResponse } from 'next/server';
import { sanityClient } from '../../../sanity/lib/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Updated to current stable version
});

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata?.sanityOrderId) {
      return NextResponse.json({ error: 'Missing order ID in metadata' }, { status: 400 });
    }

    const sanityOrderId = session.metadata.sanityOrderId;

    try {
      await sanityClient
        .patch(sanityOrderId)
        .set({ status: 'paid' })
        .commit();
      
      console.log(`Updated order ${sanityOrderId} status to paid`);
    } catch (error) {
      console.error('Error updating Sanity order:', error);
      return NextResponse.json({ error: 'Error updating order status' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic'; // Recommended for webhooks
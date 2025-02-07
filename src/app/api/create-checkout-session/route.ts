/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { sanityClient } from '../../../sanity/lib/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    const { cartItems, customerDetails, subtotal } = await request.json();

    // Create Sanity order
    const order = await sanityClient.create({
      _type: 'order',
      customer: customerDetails,
      items: cartItems.map((item: any) => ({
        product: { _type: 'reference', _ref: item.id },
        quantity: item.quantity,
        ...(item.size && { size: item.size }),
        ...(item.color && { color: item.color }),
      })),
      subtotal,
      paymentMethod: 'stripe',
      status: 'pending',
    }).catch((error: any) => {
      console.error('Sanity error:', error);
      throw new Error('Failed to create order');
    });

    // Rest of Stripe session code...
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment failed' },
      { status: 500 }
    );
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { sanityClient } from '../../../sanity/lib/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export async function POST(request: Request) {
  try {
    const { cartItems, customerDetails, subtotal } = await request.json();

    // Create Sanity order
    const order = await sanityClient.create({
      _type: 'order',
      customer: customerDetails,
      items: cartItems.map((item: { id: any; quantity: any; size: any; color: any; }) => ({
        product: {
          _type: 'reference',
          _ref: item.id,
        },
        quantity: item.quantity,
        ...(item.size && { size: item.size }),
        ...(item.color && { color: item.color }),
      })),
      subtotal,
      paymentMethod: 'stripe',
      status: 'pending',
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map((item: { name: any; image: any; price: number; quantity: any; }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        sanityOrderId: order._id
      },
      customer_email: customerDetails.email,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
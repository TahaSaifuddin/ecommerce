
import { NextResponse } from 'next/server';
import { sanityClient } from '../../../sanity/lib/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { message: 'Request body is required' },
        { status: 400 }
      );
    }

    const order = await sanityClient.create({
      ...body,
      _type: 'order',
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Error creating order' },
      { status: 500 }
    );
  }
}
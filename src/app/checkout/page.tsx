/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

type CustomerDetailsType = Record<
  "email" | "firstName" | "lastName" | "streetAddress" | "city" | "state" | "country",
  string
> & { phone: number };

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'banking' | 'cod'>('banking');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsType>({
    email: "",
    firstName: "",
    lastName: "",
    phone: 0,
    streetAddress: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value,
    }));
  };

  const handleCheckout = async () => {
    if (paymentMethod === 'cod') {
      try {
        const orderData = {
          _type: 'order',
          customer: customerDetails,
          items: cartItems.map(item => ({
            product: {
              _type: 'reference',
              _ref: item.id, // Assuming item.id is a Sanity product ID
            },
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
          subtotal,
          paymentMethod: 'cod',
          status: 'pending',
        };

        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          clearCart();
          window.location.href = '/thank-you';
        } else {
          throw new Error('Failed to create COD order');
        }
      } catch (error) {
        console.error('COD Error:', error);
        alert('Error placing COD order');
      }
    } else {
      const stripe = await stripePromise;
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartItems,
            customerDetails,
            subtotal,
            paymentMethod: 'banking',
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }
  
        // Verify content type before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format');
        }
  
        const session = await response.json();
  
        if (!session?.id) {
          throw new Error('Invalid session response');
        }
  
        const result = await stripe?.redirectToCheckout({ 
          sessionId: session.id 
        });
  
        if (result?.error) {
          alert(result.error.message);
        } else {
          clearCart();
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert(
          error instanceof Error 
            ? error.message 
            : 'Error processing payment'
        );
      }
    }
  };

     
  return (
    <div>
      <Navbar />
      <section id="contact" className="py-16 text-center">
        <div className="relative">
          <Image
            src="/images/cover.jpg"
            alt="Checkout Cover"
            width={500}
            height={200}
            className="w-full h-72 object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4 text-black">Checkout</h2>
            <p className="text-black text-lg">Home &gt; Checkout</p>
          </div>
        </div>
      </section>

      <div className="font-sans px-8 lg:px-16 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Customer Details</h2>
            {Object.entries(customerDetails).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label htmlFor={key} className="block text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={key}
                  type={key === 'phone' ? 'number' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
            ))}
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg shadow space-y-6">
            <h2 className="text-2xl font-semibold">Your Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm">
                      {item.quantity} x Rs. {item.price.toLocaleString()}
                    </p>
                    {item.size && <p className="text-sm">Size: {item.size}</p>}
                    {item.color && (
                      <div className="flex items-center gap-2">
                        <span 
                          className="inline-block w-4 h-4 rounded-full border"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Options</h3>
              <label className="block">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="banking"
                  checked={paymentMethod === 'banking'}
                  onChange={(e) => setPaymentMethod('banking')}
                />
                Online Banking
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod('cod')}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleCheckout}
                className="w-2/5 mt-6 bg-yellow-50 border border-black text-black py-3 rounded-md font-semibold hover:bg-yellow-100"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
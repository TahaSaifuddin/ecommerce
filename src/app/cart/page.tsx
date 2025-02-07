"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { FiTrash2 } from "react-icons/fi";

// Add this validation function
const isValidColor = (color: string) => {
  const style = new Option().style;
  style.color = color;
  return style.color !== '';
};

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


const handleCheckout = () => {
  if (cartItems.length > 0) {
    router.push("/checkout"); 
  } else {
    alert("Your cart is empty!");
  }
};

  return (
    <div>
      <Navbar />
      <section id="contact" className="py-16 text-center">
        <div className="relative">
          <Image
            src="/images/cover.jpg"
            alt="Instagram Cover"
            width={500}
            height={500}
            className="w-full h-72 object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold mb-4 text-black">Cart</h2>
            <p className="text-black text-lg">Home &gt; Cart</p>
          </div>
        </div>
      </section>

      <div className="font-sans px-8 lg:px-16 py-8">
        <nav className="py-4 text-gray-600">
          <Link href="/" className="hover:underline">Home</Link> / <span>Cart</span>
        </nav>

        <h1 className="text-4xl font-bold mb-8">Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-yellow-50">
                    <tr>
                      <th className="p-8">Product</th>
                      <th className="p-8">Price</th>
                      <th className="p-8">Size</th>
                      <th className="p-8">Color</th>
                      <th className="p-8">Quantity</th>
                      <th className="p-8">Subtotal</th>
                      <th className="p-8">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-4 flex items-center space-x-4">
                          <div className="relative w-24 h-24">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/fallback-image.jpg';
                              }}
                            />
                          </div>
                          <span>{item.name}</span>
                        </td>
                        <td className="p-4">Rs. {item.price.toLocaleString()}</td>
                        <td className="p-4">{item.size}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-block w-6 h-6 rounded-full border border-gray-300"
                              style={{ 
                                backgroundColor: isValidColor(item.color) ? item.color : '#e5e7eb'
                              }}
                            ></span>
                            <span className="text-sm">{item.color}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                            className="w-16 text-center border rounded-lg"
                          />
                        </td>
                        <td className="p-4 font-bold">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Totals remains unchanged */}
            <div className="bg-yellow-50 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleCheckout}
                  className="w-2/5 mt-6 bg-yellow-50 text-gray-800 border border-black py-3 rounded-md font-semibold hover:bg-yellow-100"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        )}
      </div>
      
      {/* Rest of the component remains the same */}
      <section className="bg-red-50 h-72 flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center py-20 px-16">
              <h3 className="text-3xl font-semibold mb-2 ">Free Delivery</h3>
              <p className="text-gray-500 text-xl">For all orders over $50, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center py-20 px-16">
              <h3 className="text-3xl font-semibold mb-2">90 Days Return</h3>
              <p className="text-gray-500 text-xl">If goods have problems, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center py-20 px-16">
              <h3 className="text-3xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-500 text-xl">100% secure payment, consectetur adipiscing elit.</p>
            </div> 
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
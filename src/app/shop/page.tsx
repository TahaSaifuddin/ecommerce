'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { sanityClient } from '@/sanity/lib/client';
import groq from 'groq';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[]; // Ensure array of images
}

const query = groq`
  *[_type == "shop"]{
    _id,
    name,
    price,
    "images": images[].asset->url
  }
`;

const Shop = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data: Product[] = await sanityClient.fetch(query);
      console.log('Fetched Products:', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  fetchData();
}, []);

  if (!products) {
    return <p>Loading products...</p>;
  }

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
            <h2 className="text-4xl font-bold mb-4 text-black">Shop</h2>
            <p className="text-black text-lg">Home &gt; Shop</p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <header className="py-6 bg-white shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Shop</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <span>Showing {products.length} results</span>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 px-4 py-2 rounded-lg">Filter</button>
              <select className="bg-gray-100 px-4 py-2 rounded-lg">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                images={product.images && product.images.length > 0 ? product.images : ['/images/placeholder.png']}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-yellow-400 px-4 py-2 rounded-lg">1</button>
            <button className="bg-gray-100 px-4 py-2 rounded-lg">2</button>
            <button className="bg-gray-100 px-4 py-2 rounded-lg">3</button>
            <button className="bg-gray-100 px-4 py-2 rounded-lg">Next</button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;

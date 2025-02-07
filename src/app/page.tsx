'use client';

import React from "react";
import Image from "next/image";
import Footer from '@/app/components/Footer';
import Blog from "./components/Blog";
import HeroFeatured from "./components/Featured";
import Link from "next/link";


const HomePage = () => {
  return (
    <div>
    
      <HeroFeatured />
     

      {/* Blogs Section */}
      <Blog />

      {/* Instagram Section */}
      <section id="contact" className="py-16 text-center">
        <div className="relative">
          <Image
            src="/images/cover.jpg"
            alt="Instagram Cover"
            width={500}
            height={500}
            className="w-full h-3/4 object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4 ">Our Instagram</h2>
            <p className="text-black">Follow us for inspiration.</p>
            <button className="mt-4 px-6 py-2 bg-gray-100 text-black font-semibold 
            rounded-full shadow-md hover:bg-gray-200">
              <Link href="">Follow Us</Link>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

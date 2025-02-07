/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { sanityClient } from "@/sanity/lib/client";
import groq from "groq";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: any[];
  isHero: boolean;
  isFeatured: boolean;
  isTopPick: boolean;
  isSpotlight: boolean;
}

const HERO_QUERY = groq`
  *[_type == "product" && isHero == true][0] {
    _id,
    name,
    description,
    "images": images[].asset->url,
    price,
    isHero
  }
`;

const FEATURED_QUERY = groq`
  *[_type == "product" && (isFeatured == true || isTopPick == true || isSpotlight == true)] {
    _id,
    name,
    price,
    "images": images[].asset->url,
    isFeatured,
    isTopPick,
    isSpotlight
  }
`;

const HeroFeatured = () => {
  const [heroProduct, setHeroProduct] = useState<Product | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topPicks, setTopPicks] = useState<Product[]>([]);
  const [spotlightProducts, setSpotlightProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroData, featuredData] = await Promise.all([
          sanityClient.fetch(HERO_QUERY),
          sanityClient.fetch(FEATURED_QUERY),
        ]);

        setHeroProduct(heroData);
        setFeaturedProducts(featuredData.filter((p: Product) => p.isFeatured));
        setTopPicks(featuredData.filter((p: Product) => p.isTopPick));
        setSpotlightProducts(featuredData.filter((p: Product) => p.isSpotlight));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-yellow-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      {heroProduct && (
        <section className="h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left">
          <div>
            <h1 className="text-5xl font-semibold mb-2 max-w-xs break-words">{heroProduct.name}</h1>
            <p className="text-lg font-light mb-6">{heroProduct.description}</p>
            <Link href={`/shopProduct/${heroProduct._id}`}>
              <button className="bg-yellow-50 text-black py-2 px-6 border border-black rounded hover:bg-yellow-100  transition-all">
                Shop Now
              </button>
            </Link>
          </div>
          <div>
            {heroProduct.images?.[0] && (
              <Image
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                width={600}
                height={600}
                className="rounded"
              />
            )}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="text-center bg-orange-50 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {featuredProducts.map((product) => (
            <div key={product._id} className="p-4 rounded flex flex-col items-center">
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="rounded"
                />
              )}
              <h3 className="font-bold text-xl">{product.name}</h3>
              <p className="text-gray-500 mb-4">${product.price}</p>
              <Link href={`/shopProduct/${product._id}`}>
                <button className=" text-gray-500 py-2 rounded hover:underline transition-all">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Top Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {topPicks.map((product) => (
            <div key={product._id} className="bg-gray-100 rounded">
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="rounded"
                />
              )}
              <h3 className="font-bold mt-2">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
              <Link
                  href='/shopProduct'
              >
                  <button className="text-gray-500 mt-2 hover:underline">View Details</button>
                </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Products */}
      <section className="bg-yellow-50 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-4/5 mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
          {spotlightProducts.map((product) => (
            <div key={product._id} >
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="rounded"
                />
              )}
             <div className="text-right">
             <h3 className="lg:text-right">{product.name}</h3>
             <p className="text-lg font-normal">${product.price}</p>
             <Link href={`/shopProduct/${product._id}`}>
             <button className="bg-yellow-50 border border-black text-black py-2 px-4 rounded mt-4 hover:bg-yellow-100">
                 Shop Now
            </button>
         </Link>
      </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroFeatured;
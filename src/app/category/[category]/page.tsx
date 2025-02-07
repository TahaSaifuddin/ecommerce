"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  sku: string;
  tags: string[];
  description: string;
  images: string[];
  category: string;
}

const CategoryPage = () => {
  const pathname = usePathname();
  const category = pathname.split("/").pop();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = groq`
          *[_type == "product" && category == $category] {
            _id,
            name,
            description,
            price,
            sku,
            tags,
            category,
            "images": images[].asset->url
          }
        `;
        const data: Product[] = await sanityClient.fetch(query, { category });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 rounded flex flex-col items-center">
            {product.images?.length > 0 && (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={350}
                height={350}
                className="rounded mb-4 object-cover"
              />
            )}
            <h3 className="font-bold text-xl">{product.name}</h3>
            <p className="text-gray-500">${product.price}</p>
            <Link href={`/shopProduct/${product._id}`}>
              <button className="text-yellow-600 mt-2 hover:underline">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
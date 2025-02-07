'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  images: string[]; // Array of image URLs
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, images }) => {
  // Use the first image as the thumbnail, or fallback to a placeholder
  const thumbnail = images.length > 0 ? images[0] : '/images/placeholder.png';

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative w-64 h-64 mb-4">
        <Image
          src={thumbnail}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-center text-xl font-semibold text-gray-800">{name}</h3>

      {/* Product Price */}
      <p className="text-center text-lg font-medium text-gray-600">Rs. {price}</p>

      {/* View Details Button */}
      <Link href={`/shop/${id}`}>  
  <button className="w-full bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
    View Details
  </button>
</Link>
    </div>
  );
};

export default ProductCard;
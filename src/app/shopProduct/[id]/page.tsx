"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "@/app/context/CartContext";
import { sanityClient } from "@/sanity/lib/client";
import groq from "groq";

interface Product {
  _id: number;
  name: string;
  price: number;
  description: string;
  sku: string;
  category: string;
  tags: string[];
  colors: string[];
  sizes: string[];
  images: string[];
  reviews: number;
}

const PRODUCT_QUERY = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    name,
    price,
    description,
    sku,
    category,
    tags,
    colors,
    sizes,
    "images": images[].asset->url,
    reviews
  }
`;

const ShopProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await sanityClient.fetch(PRODUCT_QUERY, { id });
        if (productData) {
          setProduct({
            ...productData,
            colors: productData.colors || ["Default"],
            sizes: productData.sizes || ["M", "L", "XL"],
            tags: productData.tags || [],
          });
          setSelectedColor(productData.colors?.[0] || "");
          setSelectedSize(productData.sizes?.[0] || "");
          setSelectedImage(productData.images?.[0] || "");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: selectedImage,
        alt: product.name,
        size: selectedSize, // Add selected size
        color: selectedColor, // Add selected color
      };
      addToCart(cartItem);
      alert(`Added ${quantity} ${product.name}(s) to the cart!`);
    }
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
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
            <h2 className="text-3xl font-bold mb-4 text-black">Shop</h2>
            <p className="text-black text-lg">Home &gt; Product</p>
          </div>
        </div>
      </section>
      <div className="container justify-items-center mx-auto px-4 py-10">
        <nav className="text-gray-500 text-sm mb-4">
          <span>Home &gt; Shop &gt; {product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-start">
            <div className="w-full mb-4">
              <Image
                src={selectedImage}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg w-full shadow-lg"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                    selectedImage === image ? "border-yellow-500" : "hover:border-yellow-500"
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-500 mb-4">Rs. {product.price.toLocaleString()}</p>
            <p className="text-yellow-500 mb-4">★★★★★ {product.reviews} Customer Reviews</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size ? "bg-white text-black border border-black" : "text-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedColor === color ? "bg-white text-black border border-black" : "text-gray-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-white text-black border border-black py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <div className="mt-8 text-gray-500">
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Tags:</strong> {product.tags.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopProduct;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaHeart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Products",
    subItems: [
      { name: "Shop", href: "/shop" },
      {
        name: "Category",
        subItems: [
          { name: "Bedroom", href: "/category/bedroom" },
          { name: "Living Room", href: "/category/livingRoom" },
          { name: "Hallway", href: "/category/hallway" },
          { name: "Dining Room", href: "/category/diningRoom" },
        ],
      },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const actionItems = [
  { name: "Search", href: "/search", icon: <FaSearch className="text-xl" /> },
  { name: "Wishlist", href: "/wishlist", icon: <FaHeart className="text-xl" /> },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { cartItems = [] } = useCart();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProductsDropdown = () => setProductsDropdownOpen(!productsDropdownOpen);

  return (
    <header>
      <nav className="bg-transparent text-gray-800 py-4 px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div className="text-2xl font-bold">
            <Link href="/" className="hover:underline">
              Brand
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) =>
              item.subItems ? (
                <div key={item.name} className="relative group">
                  <button
                    className="hover:underline focus:outline-none"
                    onClick={toggleProductsDropdown}
                  >
                    {item.name}
                  </button>
                  {productsDropdownOpen && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 w-48">
                      {item.subItems.map((subItem) =>
                        subItem.subItems ? (
                          <div key={subItem.name} className="relative group">
                            <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              {subItem.name}
                            </span>
                            <div className="absolute left-full top-0 mt-0 bg-white border rounded-lg shadow-lg p-2 w-48 hidden group-hover:block">
                              {subItem.subItems.map((nestedItem) => (
                                <Link
                                  key={nestedItem.name}
                                  href={nestedItem.href}
                                  className="block px-4 py-2 hover:bg-gray-100"
                                >
                                  {nestedItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {subItem.name}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/account" className="hover:underline">
              <FaUser className="text-xl" />
            </Link>
            {actionItems.map(({ name, href, icon }) => (
              <Link key={name} href={href} className="hover:underline">
                {icon}
              </Link>
            ))}
            <Link href="/cart" className="relative hover:underline">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="block md:hidden text-xl focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="flex flex-col mt-4 space-y-4 md:hidden">
            {navItems.map((item) =>
              item.subItems ? (
                <div key={item.name} className="flex flex-col">
                  <button
                    onClick={toggleProductsDropdown}
                    className="hover:underline focus:outline-none"
                  >
                    {item.name}
                  </button>
                  {productsDropdownOpen && (
                    <div className="pl-4 flex flex-col space-y-2">
                      {item.subItems.map((subItem) =>
                        subItem.subItems ? (
                          <div key={subItem.name} className="flex flex-col">
                            <span className="font-medium">{subItem.name}</span>
                            <div className="pl-4 space-y-1">
                              {subItem.subItems.map((nestedItem) => (
                                <Link
                                  key={nestedItem.name}
                                  href={nestedItem.href}
                                  className="hover:underline"
                                >
                                  {nestedItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link key={subItem.name} href={subItem.href} className="hover:underline">
                            {subItem.name}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              )
            )}

            {/* Action Icons in Mobile */}
            <div className="flex space-x-4">
              <Link href="/account" className="hover:underline">
                <FaUser className="text-xl" />
              </Link>
              {actionItems.map(({ name, href, icon }) => (
                <Link key={name} href={href} className="hover:underline">
                  {icon}
                </Link>
              ))}
              <Link href="/cart" className="relative hover:underline">
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

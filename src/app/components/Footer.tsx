
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-12 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600">
          {/* Address */}
          <div className='font-semibold text-gray-400 mt-20'>
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>
          </div>
          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-400 mb-2">Links</h4>
            <ul>
              <li className='mt-7 text-gray-800 font-semibold'>Home</li>
              <li className='mt-7 text-gray-800 font-semibold'>Shop</li>
              <li className='mt-7 text-gray-800 font-semibold'>About</li>
              <li className='mt-7 text-gray-800 font-semibold'>Contact</li>
            </ul>
          </div> {/* Help */}
          <div>
            <h4 className="font-bold text-gray-400 mb-2">Help</h4>
            <ul>
              <li className='mt-7 text-gray-800 font-semibold'>Payment Options</li>
              <li className='mt-7 text-gray-800 font-semibold'>Returns</li>
              <li className='mt-7 text-gray-800 font-semibold'>Privacy Policies</li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-400 mb-2">Newsletter</h4>
            <div className="flex items-center border-b border-gray-400">
              <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-full md:w-3/4 mt-3 py-2 outline-none bg-transparent placeholder-gray-500"
               />
              <button className=" text-gray-800 px-4 py-2 mt-3 rounded-r-lg font-semibold">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 ml-32 mr-32" >
          <hr className="border-gray-500" />
        </div>
        <div className="text-left ml-32 underline-offset-8 font-semibold text-gray-800 mt-8">
          <p>&copy; 2024 Meubel House. All rights reserved</p>
        </div>
      </footer>
    )
}
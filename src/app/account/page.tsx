import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const AccountPage: React.FC = () => {
  return (
    <div>
        <Navbar/>
        <section id="contact" className=" text-center">
                <div className='relative'>
                  <Image
                    src="/images/cover.jpg"
                    alt="Instagram Cover"
                    width={500}
                    height={100}
                    className="w-screen h-96 object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-semibold mb-2 text-black">Account</h2>
                    <p className="text-black text-lg">Home &gt; Account</p>
                  </div>
                </div>
              </section>
    <div className=" min-h-screen flex- justify-center">
      <div>
        <div className=" ml-10 px-10 py-10 grid grid-cols-2 md:grid-cols-2/4 ">
          {/* Login Section */}
          <div>
            <h2 className="text-4xl font-semibold mb-6">Log In</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username or email address
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-2/3 px-4 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-2/3 px-4 py-3 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                />
              </div>

              <div className="flex items-center mb-8">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-black border border-black rounded hover: focus:ring-black"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-1/3 bg-white text-black border border-black py-3 px-4 rounded-md hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Log In
              </button>

              <p className="text-sm text-center text-gray-500">
                <a href="#" className="text-black hover:underline">
                  Lost Your Password?
                </a>
              </p>
            </form>
          </div>

          {/* Register Section */}
          <div className='mr-20 mt-2'>
            <h2 className="text-4xl font-semibold mb-4">Register</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-2/3 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
              </div>

              <p className="mb-4 text-lg text-gray-500">
                A link to set a new password will be sent to your email address.
              </p>

              <p className="mb-6 text-lg text-gray-500">
                Your personal data will be used to support your experience throughout this website, to manage
                access to your account, and for other purposes described in our
                <a href="#" className="text-black hover:underline">
                  {' '}privacy policy
                </a>.
              </p>

              <button
                type="submit"
                className="w-1/3  bg-white text-black border border-black py-3 px-4 rounded-md
                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <section className="bg-red-50 h-72 flex">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center py-20 px-16">
                <h3 className="text-3xl font-semibold mb-2 ">Free Delivery</h3>
                <p className="text-gray-500 text-xl">For all orders over $50,consectetur adipiscing elit.</p>
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
    <Footer/>
  </div>
  );
};

export default AccountPage;

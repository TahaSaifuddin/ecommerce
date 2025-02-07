import React from "react";
import Image from "next/image";


const Blog = () => {
   
    return (
         <section id="blog" className="py-16 px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Our Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-4 rounded">
                <Image src="/images/blog1.jpg" alt="Blog 1" width={500} height={400} className="rounded" />
                <h3 className="font-bold mt-2">Design Tips</h3>
                <p className="text-gray-500">Learn how to design your space.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <Image src="/images/blog2.jpg" alt="Blog 2" width={500} height={500} className="rounded" />
                <h3 className="font-bold mt-2">Workspace Hacks</h3>
                <p className="text-gray-500">Optimize your home office.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <Image src="/images/blog3.jpg" alt="Blog 3" width={500} height={400} className="rounded" />
                <h3 className="font-bold mt-2">Minimalist Living</h3>
                <p className="text-gray-500">Embrace a minimalist lifestyle.</p>
              </div>
            </div>
          </section>
    );
};
export default Blog
import { sanityClient } from "@/sanity/lib/client";
import { ContactForm } from "./ContactForm"; // Import form component
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import groq from "groq";
import Footer from "../components/Footer";
import Image from "next/image";

// Define ContactInfo type
interface ContactInfo {
  address: string;
  phoneMobile: string;
  phoneHotline: string;
  workingTimeWeekdays: string;
  workingTimeWeekends: string;
}

// GROQ query for contact info
const query = groq`
  *[_type == "contactInfo"][0]{
    address,
    phoneMobile,
    phoneHotline,
    workingTimeWeekdays,
    workingTimeWeekends
  }
`;

// Fetch contact info from Sanity
async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    return await sanityClient.fetch<ContactInfo>(query);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  if (!contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Contact information is currently unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section id="contact" className="py-16 text-center">
             <div className="relative">
               <Image
                 src="/images/cover.jpg"
                 alt="Checkout Cover"
                 width={500}
                 height={200}
                 className="w-full h-72 object-cover opacity-40"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <h2 className="text-4xl font-bold mb-4 text-black">Contact</h2>
                 <p className="text-black text-lg">Home &gt; Contact</p>
               </div>
             </div>
           </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Get In Touch With Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            For more information about our products and services, please feel free to drop us an email.
            Our staff is always here to help you out.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div>
              <div className="flex items-start space-x-4 mb-8">
                <FaMapMarkerAlt className="text-2xl text-black" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-8">
                <FaPhoneAlt className="text-2xl text-black" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>Mobile: {contactInfo.phoneMobile}</p>
                  <p>Hotline: {contactInfo.phoneHotline}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaClock className="text-2xl text-black" />
                <div>
                  <h3 className="font-semibold">Working Time</h3>
                  <p>Monday - Friday: {contactInfo.workingTimeWeekdays}</p>
                  <p>Saturday - Sunday: {contactInfo.workingTimeWeekends}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    <Footer/>
    </div>
  );
}

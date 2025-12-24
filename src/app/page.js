"use client";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import services from "@/lib/servicesData";

export default function HomePage() {
  return (
    <div className="space-y-16">

     
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.jpg"
            alt="Care.xyz Logo"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Care.xyz - Reliable Care Services
        </h1>
        <p className="text-xl md:text-2xl">
          Making caregiving easy, secure, and accessible for everyone.
        </p>
      </section>

   
<section className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center">
 
  <img
    src="/images/3.jpg"
    alt="About Care.xyz"
    className="absolute inset-0 w-full h-full object-cover"
  />


  <div className="absolute inset-0 bg-black/50"></div>

 
  <div className="relative z-10 max-w-5xl px-6 text-center text-white">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      About Us
    </h2>
    <p className="text-lg md:text-xl">
      Care.XYZ is a web application that helps users book reliable and trusted care
      services for children, elderly people, or sick individuals. Users can easily
      book services based on their required time duration and location. The goal of
      Care.IO is to make caregiving simple, safe, and accessible for everyone.
    </p>
  </div>
</section>


 
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-gray-700 text-lg">
            “Care.xyz helped me find a reliable babysitter for my child. The service is fast, secure, and trustworthy!” – Jane D.
          </p>
          <p className="text-gray-700 text-lg">
            “Elderly care service is fantastic. The caretakers are professional and caring.” – Ahmed R.
          </p>
          <div className="flex justify-center space-x-8 mt-6">
            <div>
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">1200+</p>
              <p className="text-gray-600">Bookings Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600">Trusted Caretakers</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

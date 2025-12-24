"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div>
          <h3 className="text-xl font-bold mb-4">Care.xyz</h3>
          <p className="text-gray-400">
            Reliable care services for children, elderly, and sick individuals. 
            Making caregiving simple, safe, and accessible for everyone.
          </p>
        </div>

      
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/service/baby-care" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="hover:text-white">
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-400">Email: support@care.xyz</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4">
           
            <Link href="#" className="hover:text-white">Facebook</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
            <Link href="#" className="hover:text-white">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Care.xyz. All rights reserved.
      </div>
    </footer>
  );
}

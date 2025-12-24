"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
   
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.jpg"
            alt="Care.xyz Logo"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Care.xyz
          </Link>
        </div>

     
        <div className="space-x-6 flex items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {user && (
            <Link
              href="/my-bookings"
              className="text-gray-700 hover:text-blue-600"
            >
              My Bookings
            </Link>
          )}
          
          {!user ? (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              {user.photoURL && (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-gray-500 hidden md:inline">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-700 mb-6">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );
}

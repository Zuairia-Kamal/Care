"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-bookings";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Confirm Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

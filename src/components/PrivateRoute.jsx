"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return user ? children : null;
}

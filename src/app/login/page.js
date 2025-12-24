// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth, googleProvider } from "@/lib/firebase";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { useAuth } from "@/context/AuthContext";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/my-bookings";

//   const { user, loading } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!loading && user) {
//       router.push(redirect);
//     }
//   }, [user, loading, redirect, router]);

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push(redirect);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push(redirect);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleEmailLogin} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Email</label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold">Password</label>
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>

//       <div className="my-4 text-center text-gray-500">OR</div>

//       <button
//         onClick={handleGoogleLogin}
//         className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
//       >
//         Login with Google
//       </button>

//       <p className="mt-4 text-center text-gray-600">
//         Don't have an account?{" "}
//         <a href="/register" className="text-blue-600 hover:underline">
//           Register
//         </a>
//       </p>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-bookings";

  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push(redirect);
    }
  }, [user, loading, redirect, router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch (err) {
      console.error("Login Error:", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many login attempts. Try again later.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push(redirect);
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-4 text-center text-gray-500">OR</div>

      <button
        onClick={handleGoogleLogin}
        disabled={submitting}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
      >
        {submitting ? "Logging in..." : "Login with Google"}
      </button>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}

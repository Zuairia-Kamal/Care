// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useAuth } from "@/context/AuthContext";

// export default function RegisterPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get("redirect") || "/my-bookings";

//   const { user, loading } = useAuth();

//   const [nid, setNid] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!loading && user) {
//       router.push(redirect);
//     }
//   }, [user, loading, redirect, router]);

//   const validatePassword = (pw) => {
//     const hasUpper = /[A-Z]/.test(pw);
//     const hasLower = /[a-z]/.test(pw);
//     const hasMinLength = pw.length >= 6;
//     return hasUpper && hasLower && hasMinLength;
//   };

//   // const handleRegister = async (e) => {
//   //   e.preventDefault();
//   //   setError("");

//   //   if (!validatePassword(password)) {
//   //     setError(
//   //       "Password must be at least 6 characters and include 1 uppercase and 1 lowercase letter."
//   //     );
//   //     return;
//   //   }

//   //   try {
//   //     const userCredential = await createUserWithEmailAndPassword(
//   //       auth,
//   //       email,
//   //       password
//   //     );

//   //     // Set display name
//   //     await updateProfile(userCredential.user, { displayName: name });

//   //     router.push(redirect);
//   //   } catch (err) {
//   //     setError(err.message);
//   //   }
//   // };
// const handleRegister = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!validatePassword(password)) {
//     setError(
//       "Password must be at least 6 characters and include 1 uppercase and 1 lowercase letter."
//     );
//     return;
//   }

//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     await updateProfile(userCredential.user, { displayName: name });

//     // Optional: Save NID & Contact in Firestore
//     // await setDoc(doc(db, "users", userCredential.user.uid), {
//     //   nid,
//     //   contact,
//     //   name,
//     //   email
//     // });

//     router.push(redirect);
//   } catch (err) {
//     console.error("Firebase Auth Error:", err);
//     if (err.code === "auth/email-already-in-use") {
//       setError("This email is already registered.");
//     } else if (err.code === "auth/invalid-email") {
//       setError("Invalid email address.");
//     } else if (err.code === "auth/weak-password") {
//       setError("Password is too weak. Minimum 6 characters.");
//     } else {
//       setError(err.message);
//     }
//   }
// };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
//       )}

//       <form onSubmit={handleRegister} className="space-y-4">
//         <div>
//           <label className="block font-semibold">NID Number</label>
//           <input
//             type="text"
//             required
//             value={nid}
//             onChange={(e) => setNid(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold">Full Name</label>
//           <input
//             type="text"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border p-2 rounded"
//           />
//         </div>

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
//           <label className="block font-semibold">Contact Number</label>
//           <input
//             type="text"
//             required
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
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
//           <p className="text-gray-500 text-sm mt-1">
//             At least 6 characters, 1 uppercase, 1 lowercase
//           </p>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>

//       <p className="mt-4 text-center text-gray-600">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-600 hover:underline">
//           Login
//         </a>
//       </p>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-bookings";

  const { user, loading } = useAuth();

  const [nid, setNid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push(redirect);
    }
  }, [user, loading, redirect, router]);

  const validatePassword = (pw) => {
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasMinLength = pw.length >= 6;
    return hasUpper && hasLower && hasMinLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters and include 1 uppercase and 1 lowercase letter."
      );
      return;
    }

    setSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      await updateProfile(userCredential.user, { displayName: name });

      router.push(redirect);
    } catch (err) {
      console.error("Registration Error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Try logging in instead.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Weak password. Try a stronger one.");
          break;
        default:
          setError("Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block font-semibold">NID Number</label>
          <input
            type="text"
            required
            value={nid}
            onChange={(e) => setNid(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

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
          <label className="block font-semibold">Contact Number</label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
          <p className="text-gray-500 text-sm mt-1">
            At least 6 characters, 1 uppercase, 1 lowercase
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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

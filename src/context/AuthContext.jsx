// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";
// import { onAuthStateChanged } from "firebase/auth";

// /**
//  * AuthContext stores authentication state
//  * and makes it available across the app
//  */
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Listen for Firebase authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /**
//  * Custom hook to access auth state
//  */
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// //////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/lib/firebase";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// //////////////////////////////////////////////////////////////////////////////

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        try {
          // 🔹 Fetch user role from MongoDB
          const res = await fetch(`/api/users?email=${firebaseUser.email}`);
          const dbUser = await res.json();

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: dbUser?.role || "user", // ✅ default safety
          });
        } catch (error) {
          console.error("Auth role fetch failed:", error);
          setUser({
            email: firebaseUser.email,
            role: "user",
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

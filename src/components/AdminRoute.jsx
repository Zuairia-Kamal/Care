// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AdminRoute({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       router.push("/");
//     }
//   }, [user, loading, router]);

//   if (loading || !user || user.role !== "admin") return null;

//   return children;
// }

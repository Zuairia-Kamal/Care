// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function AdminBookingsPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [bookings, setBookings] = useState([]);

//   // 🔐 Protect admin route
//   useEffect(() => {
//     if (!loading && user?.role !== "admin") {
//       router.push("/");
//     }
//   }, [user, loading, router]);

//   useEffect(() => {
//     fetch("/api/booking")
//       .then(res => res.json())
//       .then(data => setBookings(data));
//   }, []);

//   const updateStatus = async (id, status) => {
//     await fetch(`/api/booking/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });

//     setBookings(bookings.map(b =>
//       b._id === id ? { ...b, status } : b
//     ));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Booking Control</h1>

//       {bookings.map(b => (
//         <div key={b._id} className="border p-4 mb-4 rounded">
//           <h2 className="font-semibold">{b.serviceName}</h2>
//           <p>User: {b.email}</p>
//           <p>Status: <strong>{b.status}</strong></p>

//           <div className="mt-2 space-x-2">
//             <button
//               onClick={() => updateStatus(b._id, "Confirmed")}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               Confirm
//             </button>

//             <button
//               onClick={() => updateStatus(b._id, "Completed")}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               Complete
//             </button>

//             <button
//               onClick={() => updateStatus(b._id, "Cancelled")}
//               className="bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

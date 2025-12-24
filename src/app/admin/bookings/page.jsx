// "use client";

// import { useEffect, useState } from "react";
// import AdminRoute from "@/components/AdminRoute";

// export default function AdminBookingsPage() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetch("/api/booking")
//       .then((res) => res.json())
//       .then(setBookings);
//   }, []);

//   const updateStatus = async (id, status) => {
//     await fetch(`/api/booking/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });

//     setBookings((prev) =>
//       prev.map((b) =>
//         b._id === id ? { ...b, status } : b
//       )
//     );
//   };

//   return (
//     <AdminRoute>
//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           Admin – Manage Bookings
//         </h1>

//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-white p-4 rounded shadow mb-4"
//           >
//             <h2 className="font-semibold">{b.serviceName}</h2>
//             <p>User: {b.userEmail}</p>
//             <p>Status: <b>{b.status}</b></p>

//             <div className="mt-2 space-x-2">
//               <button
//                 onClick={() => updateStatus(b._id, "Confirmed")}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Confirm
//               </button>

//               <button
//                 onClick={() => updateStatus(b._id, "Completed")}
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 Complete
//               </button>

//               <button
//                 onClick={() => updateStatus(b._id, "Cancelled")}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </AdminRoute>
//   );
// }

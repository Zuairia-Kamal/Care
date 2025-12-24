// import clientPromise from "@/lib/mongodb";

// export async function GET(req) {
//   console.log("GET /api/booking called");
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     const client = await clientPromise;
//     const db = client.db("Care");

//     const bookings = await db
//       .collection("bookings")
//       .find({ userEmail: email })
//       .sort({ createdAt: -1 })
//       .toArray();

//     return new Response(JSON.stringify(bookings), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Booking GET Error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const booking = await req.json();
//     const client = await clientPromise;
//     const db = client.db("Care");

//     const result = await db.collection("bookings").insertOne({
//       userEmail: booking.userEmail,
//       serviceId: booking.serviceId,
//       serviceName: booking.serviceName,
//       duration: booking.duration,
//       location: booking.location,
//       totalCost: booking.totalCost,
//       status: "Pending",
//       createdAt: new Date(),
//     });

//     return new Response(
//       JSON.stringify({ success: true, bookingId: result.insertedId }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Booking POST Error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


// zuairiakamal_db_user
// LSq3p9QqGRBCceC2
// mongodb+srv://zuairiakamal_db_user:LSq3p9QqGRBCceC2@cluster0.o8v5v2r.mongodb.net/?appName=Cluster0
// npm install mongodb
// ////////////////////////////////////////////////////////////////////////////////////////////////////

// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// // GET /api/booking?email=user@email.com
// export const GET = async (request) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json([], { status: 200 });
//     }

//     const bookings = await bookingsCollection
//       .find({ email })
//       .toArray();

//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error("Fetch bookings error:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch bookings" },
//       { status: 500 }
//     );
//   }
// };

// // (Optional) POST /api/booking
// export const POST = async (request) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const body = await request.json();

//     const result = await bookingsCollection.insertOne({
//       ...body,
//       status: "Pending",
//       createdAt: new Date(),
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to create booking" },
//       { status: 500 }
//     );
//   }
// };
// //////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// const ADMIN_EMAIL = "admin@care.xyz"; // change to your admin email

// export default function AdminBookingsPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [bookings, setBookings] = useState([]);

//   // 🔒 Admin protection
//   useEffect(() => {
//     if (!loading) {
//       if (!user || user.email !== ADMIN_EMAIL) {
//         router.push("/");
//       }
//     }
//   }, [user, loading, router]);

//   // 📥 Fetch ALL bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       const res = await fetch("/api/booking");
//       const data = await res.json();
//       setBookings(data);
//     };
//     fetchBookings();
//   }, []);

//   // 🔁 Update booking status
//   const updateStatus = async (id, status) => {
//     await fetch(`/api/booking/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });

//     setBookings((prev) =>
//       prev.map((b) => (b._id === id ? { ...b, status } : b))
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin – All Bookings</h1>

//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="border rounded p-4 mb-4 bg-white shadow"
//         >
//           <p><strong>User:</strong> {b.userEmail}</p>
//           <p><strong>Service:</strong> {b.serviceName}</p>
//           <p><strong>Duration:</strong> {b.duration}</p>
//           <p><strong>Total:</strong> ${b.totalCost}</p>
//           <p><strong>Status:</strong> {b.status}</p>

//           <div className="mt-3 flex gap-2">
//             {b.status === "Pending" && (
//               <button
//                 onClick={() => updateStatus(b._id, "Confirmed")}
//                 className="bg-green-600 text-white px-3 py-1 rounded"
//               >
//                 Confirm
//               </button>
//             )}

//             {b.status === "Confirmed" && (
//               <button
//                 onClick={() => updateStatus(b._id, "Completed")}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 Complete
//               </button>
//             )}

//             <button
//               onClick={() => updateStatus(b._id, "Cancelled")}
//               className="bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    // If you want to fetch bookings for a specific user, extract email from query
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    const query = email ? { email } : {};
    const bookings = await bookingsCollection.find(query).toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
  }
};
export const POST = async (request) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const body = await request.json();

    const booking = {
      email: body.email,
      serviceId: body.serviceId,
      serviceName: body.serviceName,
      duration: body.duration,
      location: body.location,
      totalCost: body.totalCost,
      status: "Pending",
      createdAt: new Date(),
    };

    await bookingsCollection.insertOne(booking);

    return NextResponse.json({ message: "Booking created", booking }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create booking" }, { status: 500 });
  }
};

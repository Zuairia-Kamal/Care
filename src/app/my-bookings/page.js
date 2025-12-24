"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   if (!user) return;

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch(`/api/booking?email=${user.email}`);

//       if (!res.ok) {
//         throw new Error("Failed to fetch bookings");
//       }

//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       console.error("Fetch bookings error:", err);
//       setBookings([]); 
//     } finally {
//       setLoading(false); 
//     }
//   };

//   fetchBookings();
// }, [user]);

useEffect(() => {
  if (!user) return;

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/booking?email=${user.email}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [user]);


  const handleCancel = async (id) => {
  await fetch(`/api/booking/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Cancelled" }),
  });

  setBookings(bookings =>
    bookings.map(b =>
      b._id === id ? { ...b, status: "Cancelled" } : b
    )
  );
};



  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">{b.serviceName}</h2>
                  <p>
                    <strong>Duration:</strong> {b.duration} day(s)
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {b.location.division}, {b.location.district},{" "}
                    {b.location.city}, {b.location.area} - {b.location.address}
                  </p>
                  <p>
                    <strong>Total Cost:</strong> ${b.totalCost}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        b.status === "Pending"
                          ? "text-yellow-500"
                          : b.status === "Confirmed"
                          ? "text-green-500"
                          : b.status === "Completed"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-2">
                  <button
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    onClick={() =>
                      alert(
                        `Booking Details:\nService: ${b.serviceName}\nDuration: ${b.duration} day(s)\nTotal: $${b.totalCost}\nStatus: ${b.status}`
                      )
                    }
                  >
                    View Details
                  </button>
                  {b.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleCancel(b._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
                {/* <div className="mt-4 md:mt-0 flex space-x-2">
  <button
    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
    onClick={() =>
      alert(
        `Service: ${b.serviceName}\nDuration: ${b.duration} day(s)\nTotal: $${b.totalCost}\nStatus: ${b.status}`
      )
    }
  >
    View Details
  </button>

  {b.status === "Pending" && (
    <button
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      onClick={() => handleCancel(b._id)}
    >
      Cancel Booking
    </button>
  )}
</div> */}

              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}

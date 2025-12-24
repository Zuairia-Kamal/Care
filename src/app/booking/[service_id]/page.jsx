


"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import services from "@/lib/servicesData";
import toast from "react-hot-toast";

export default function BookingPage() {
  const { service_id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const service = services.find(
    (s) => String(s.id) === String(service_id)
  );

  const [duration, setDuration] = useState(1);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/booking/${service_id}`);
    }
  }, [user, loading, router, service_id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!service) return <p className="text-center mt-10">Service not found</p>;

  const totalCost = duration * service.price;

  const handleBooking = async () => {
    try {
      const bookingData = {
        email: user.email, 
        serviceId: service.id,
        serviceName: service.name,
        duration,
        location: { address },
        totalCost,
        status: "Confirm",
      };

      
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!bookingRes.ok) throw new Error("Booking failed");

      
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          serviceName: service.name,
          duration,
          totalCost,
        }),
      });

      if (!emailRes.ok) throw new Error("Email failed");

  
      toast.success("Booking confirmed! Invoice sent 📧");


      setTimeout(() => {
        router.push("/my-bookings");
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Book {service.name}
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="font-semibold block">Duration (Days)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <textarea
          placeholder="Full Address"
          className="border p-2 rounded w-full"
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="text-lg font-semibold">
          Total Cost: ${totalCost}
        </p>

        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

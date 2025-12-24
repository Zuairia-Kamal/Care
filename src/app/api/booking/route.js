
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
      status: "Confirm",
      createdAt: new Date(),
    };

    await bookingsCollection.insertOne(booking);

    return NextResponse.json({ message: "Booking created", booking }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create booking" }, { status: 500 });
  }
};

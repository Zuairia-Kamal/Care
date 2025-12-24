

// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";


// export const GET = async (req) => {
//   try {
//     const db = await connectDB();
//     const bookings = db.collection("bookings");

//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) return NextResponse.json([]);

//     const data = await bookings.find({ email }).toArray();
//     return NextResponse.json(data);
//   } catch (err) {
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// };

// export const PATCH = async (req, { params }) => {
//   const { status } = await req.json();
//   const db = await connectDB();

//   await db.collection("bookings").updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: { status } }
//   );

//   return NextResponse.json({ success: true });
// };

// export const POST = async (request) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const body = await request.json();

//     const booking = {
//       email: body.email,
//       serviceId: body.serviceId,
//       serviceName: body.serviceName,
//       duration: body.duration,
//       location: body.location,
//       totalCost: body.totalCost,
//       status: "Confirm",
//       createdAt: new Date(),
//     };

//     await bookingsCollection.insertOne(booking);

//     return NextResponse.json(
//       { message: "Booking created", booking },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Failed to create booking" },
//       { status: 500 }
//     );
//   }
// };
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: fetch bookings (optionally filter by email)
export const GET = async (request) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

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

// POST: create a new booking
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

// PATCH: update booking status
export const PATCH = async (req, { params }) => {
  try {
    const { status } = await req.json();
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update booking error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
};

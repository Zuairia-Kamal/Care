// import { connectDB } from "@/lib/connectDB";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// export const DELETE = async (request, { params }) => {
//   const db = await connectDB();
//   const bookingsCollection = db.collection("bookings");
//   try {
//     const resp = await bookingsCollection.deleteOne({
//       _id: new ObjectId(params.id),
//     });
//     return NextResponse.json({ message: "deleted the booking", response: resp });
//   } catch (error) {
//     return NextResponse.json({ message: "Something Went Wrong" });
//   }
// };

// export const PATCH = async (request, { params }) => {
//   const db = await connectDB();
//   const bookingsCollection = db.collection("bookings");
//   const updateDoc = await request.json();
//   try {
//     const resp = await bookingsCollection.updateOne(
//       { _id: new ObjectId(params.id) },
//       {
//         $set: {
//           ...updateDoc
//         },
//       },
//       {
//         upsert : true
//       }
//     );
//     return NextResponse.json({ message: "updated the booking", response: resp });
//   } catch (error) {
//     return NextResponse.json({ message: "Something Went Wrong" });
//   }
// };

// export const GET = async (request, { params }) => {
//   const db = await connectDB();
//   const bookingsCollection = db.collection("bookings");
//   try {
//     const resp = await bookingsCollection.findOne({
//       _id: new ObjectId(params.id),
//     });
//     return NextResponse.json({ message: "booking found", 
//       data: resp });
//   } catch (error) {
//     return NextResponse.json({ message: "Something Went Wrong" });
//   }
// };
// ////////////////

// import { connectDB } from "@/lib/connectDB";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// // GET /api/booking/:id
// export const GET = async (request, { params }) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const booking = await bookingsCollection.findOne({
//       _id: new ObjectId(params.id),
//     });

//     if (!booking) {
//       return NextResponse.json(
//         { message: "Booking not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(booking);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch booking" },
//       { status: 500 }
//     );
//   }
// };

// // PATCH /api/booking/:id
// export const PATCH = async (request, { params }) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const updateData = await request.json();

//     const result = await bookingsCollection.updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: updateData }
//     );

//     return NextResponse.json({ updated: result.modifiedCount === 1 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to update booking" },
//       { status: 500 }
//     );
//   }
// };

// // DELETE /api/booking/:id
// export const DELETE = async (request, { params }) => {
//   try {
//     const db = await connectDB();
//     const bookingsCollection = db.collection("bookings");

//     const result = await bookingsCollection.deleteOne({
//       _id: new ObjectId(params.id),
//     });

//     return NextResponse.json({ deleted: result.deletedCount === 1 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to delete booking" },
//       { status: 500 }
//     );
//   }
// };
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export const GET = async (req) => {
  try {
    const db = await connectDB();
    const bookings = db.collection("bookings");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json([]);

    const data = await bookings.find({ email }).toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
};
// export async function PATCH(req, { params }) {
//   const db = await connectDB();
//   const bookings = db.collection("bookings");

//   const { status } = await req.json();

//   const result = await bookings.updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: { status } }
//   );

//   return NextResponse.json({ success: true });
// }

// export const PATCH = async (req, { params }) => {
//   try {
//     const { status } = await req.json();
//     const db = await connectDB();
//     const bookings = db.collection("bookings");

//     await bookings.updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: { status } }
//     );

//     return NextResponse.json({ message: "Status updated" });
//   } catch (error) {
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// };

export const PATCH = async (req, { params }) => {
  const { status } = await req.json();
  const db = await connectDB();

  await db.collection("bookings").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { status } }
  );

  return NextResponse.json({ success: true });
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

    return NextResponse.json(
      { message: "Booking created", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
};

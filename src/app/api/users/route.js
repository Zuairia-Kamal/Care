import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const db = await connectDB();
    const users = db.collection("users");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await users.findOne({ email });

    return NextResponse.json(user || {});
  } catch (error) {
    return NextResponse.json({ error: "User fetch failed" }, { status: 500 });
  }
};

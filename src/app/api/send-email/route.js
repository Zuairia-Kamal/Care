
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { email, serviceName, duration, totalCost } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Booking Invoice - Care.xyz",
      html: `
        <h2>Booking Confirmed</h2>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Duration:</strong> ${duration} day(s)</p>
        <p><strong>Total:</strong> $${totalCost}</p>
        <p>Status: Pending</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}

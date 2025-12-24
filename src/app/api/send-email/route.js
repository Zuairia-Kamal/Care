// import nodemailer from "nodemailer";

// /**
//  * POST: Send booking invoice email
//  * Body example:
//  * {
//  *   email: "user@gmail.com",
//  *   serviceName: "Baby Sitting Service",
//  *   duration: 3,
//  *   totalCost: 300
//  * }
//  */
// export async function POST(req) {
//   try {
//     const { email, serviceName, duration, totalCost } = await req.json();

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Gmail App Password
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Care.xyz Booking Invoice",
//       html: `
//         <h2>Booking Confirmed</h2>
//         <p>Thank you for booking with <strong>Care.xyz</strong>.</p>
//         <hr />
//         <p><strong>Service:</strong> ${serviceName}</p>
//         <p><strong>Duration:</strong> ${duration} day(s)</p>
//         <p><strong>Total Cost:</strong> $${totalCost}</p>
//         <br />
//         <p>Status: <strong>Pending</strong></p>
//         <br />
//         <p>We will contact you shortly to confirm your booking.</p>
//         <p>— Care.xyz Team</p>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return Response.json(
//       { success: true, message: "Invoice email sent successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// export const runtime = "nodejs"; // Required for server-side Node APIs

// export async function POST(req) {
//   try {
//     const { email, serviceName, duration, totalCost } = await req.json();

//     // Debug: log incoming request data
//     console.log("Sending email with data:", { email, serviceName, duration, totalCost });

//     if (!email || !serviceName || !duration || !totalCost) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields in request" },
//         { status: 400 }
//       );
//     }

//     // Configure Nodemailer with explicit SMTP
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // true for 465, false for 587
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Must be Gmail App Password if 2FA enabled
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Care.xyz Booking Invoice",
//       html: `
//         <h2>Booking Confirmed</h2>
//         <p>Thank you for booking with <strong>Care.xyz</strong>.</p>
//         <hr />
//         <p><strong>Service:</strong> ${serviceName}</p>
//         <p><strong>Duration:</strong> ${duration} day(s)</p>
//         <p><strong>Total Cost:</strong> $${totalCost}</p>
//         <br />
//         <p>Status: <strong>Pending</strong></p>
//         <br />
//         <p>We will contact you shortly.</p>
//         <p>— Care.xyz Team</p>
//       `,
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email sent successfully:", info.response);

//     return NextResponse.json({ success: true, info: info.response });
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
// /////////////////////////
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

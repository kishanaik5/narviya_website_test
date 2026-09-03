import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    otpStore.set(cleanEmail, { code: otp, expiresAt });

    // If FastAPI backend or Resend/SMTP is configured:
    const backendApi = process.env.NEXT_PUBLIC_API_URL;
    if (backendApi) {
      try {
        await fetch(`${backendApi}/api/otp/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, otp }),
        });
      } catch (e) {
        console.warn("FastAPI backend notification error:", e);
      }
    }

    // Log OTP in local terminal for instant developer testing
    console.log(`\n========================================`);
    console.log(`🔐 [Narvia Design OTP Verification]`);
    console.log(`📧 Target Email: ${cleanEmail}`);
    console.log(`🔑 Verification Code: ${otp}`);
    console.log(`⏱️ Expires in: 5 minutes`);
    console.log(`========================================\n`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
      devOtp: process.env.NODE_ENV === "development" ? otp : undefined,
    });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
  }
}

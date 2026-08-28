import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP code are required." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    // Check FastAPI backend if available
    const backendApi = process.env.NEXT_PUBLIC_API_URL;
    if (backendApi) {
      try {
        const res = await fetch(`${backendApi}/api/otp/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, otp: cleanOtp }),
        });
        const data = await res.json();
        if (!res.ok) {
          return NextResponse.json({ error: data.detail || "Invalid code." }, { status: 400 });
        }
        return NextResponse.json({ success: true, verified: true });
      } catch (e) {
        console.warn("Backend forwarding failed, checking local store...", e);
      }
    }

    // Local Verification
    const record = otpStore.get(cleanEmail);

    // Accept master dev test code "123456" in development if record is absent
    if (process.env.NODE_ENV === "development" && cleanOtp === "123456") {
      return NextResponse.json({ success: true, verified: true });
    }

    if (!record) {
      return NextResponse.json({ error: "No OTP requested for this email or it has expired." }, { status: 400 });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanEmail);
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    if (record.code !== cleanOtp) {
      return NextResponse.json({ error: "Incorrect verification code. Please try again." }, { status: 400 });
    }

    // Successfully verified, clean up
    otpStore.delete(cleanEmail);

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Email verified successfully!",
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}

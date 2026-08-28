// In-memory OTP storage module
export interface OtpRecord {
  code: string;
  expiresAt: number;
}

const globalStore = globalThis as unknown as {
  __narvia_otp_map?: Map<string, OtpRecord>;
};

if (!globalStore.__narvia_otp_map) {
  globalStore.__narvia_otp_map = new Map<string, OtpRecord>();
}

export const otpStore = globalStore.__narvia_otp_map;

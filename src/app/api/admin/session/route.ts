import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSessionToken, getAdminCredentials } from '@/lib/adminStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const { valid, username } = verifyAdminSessionToken(token);
    const activeAdminInfo = getAdminCredentials();

    if (!valid || !username) {
      return NextResponse.json({
        authenticated: false,
        isCustomCredentials: activeAdminInfo.isCustom,
      });
    }

    return NextResponse.json({
      authenticated: true,
      username,
      activeAdminUsername: activeAdminInfo.username,
      isCustomCredentials: activeAdminInfo.isCustom,
    });
  } catch (error) {
    console.error('Error checking admin session:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Server error checking session' },
      { status: 500 }
    );
  }
}

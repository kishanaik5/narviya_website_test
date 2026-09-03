import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyAdminSessionToken,
  getAdminCredentials,
  verifyAdminCredentials,
  updateAdminCredentials,
  createAdminSessionToken,
} from '@/lib/adminStore';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const { valid } = verifyAdminSessionToken(token);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in first.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newUsername, newPassword } = body || {};

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password, new username, and new password are all required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const currentCreds = getAdminCredentials();
    const isCurrentPasswordCorrect = verifyAdminCredentials(currentCreds.username, currentPassword);

    if (!isCurrentPasswordCorrect) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 400 }
      );
    }

    // Save updated credentials
    updateAdminCredentials(newUsername.trim(), newPassword);

    // Update session token with new username
    const newToken = createAdminSessionToken(newUsername.trim());
    cookieStore.set({
      name: 'admin_session',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      message: 'Admin credentials updated successfully.',
      username: newUsername.trim(),
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update admin credentials.' },
      { status: 500 }
    );
  }
}

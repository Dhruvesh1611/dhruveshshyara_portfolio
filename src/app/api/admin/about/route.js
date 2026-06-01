import { NextResponse } from 'next/server';
import { getAbout, saveAbout, logActivity } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(getAbout());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    saveAbout(body);
    logActivity('Updated', 'profile', 'About Info');
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}

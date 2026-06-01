import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(getSettings());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const settings = getSettings();
    saveSettings({ ...settings, ...body });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

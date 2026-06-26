import { NextResponse } from 'next/server';
import { getHackathons, saveHackathons, logActivity, generateId } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    let hackathons = getHackathons();

    if (search) {
      hackathons = hackathons.filter(h =>
        h.title?.toLowerCase().includes(search) ||
        h.description?.toLowerCase().includes(search)
      );
    }

    hackathons.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return NextResponse.json(hackathons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const hackathons = getHackathons();

    const newHackathon = {
      ...body,
      id: generateId(),
      displayOrder: hackathons.length + 1,
      status: body.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    hackathons.push(newHackathon);
    saveHackathons(hackathons);
    logActivity('Created', 'hackathon', newHackathon.title);

    return NextResponse.json(newHackathon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hackathon' }, { status: 500 });
  }
}

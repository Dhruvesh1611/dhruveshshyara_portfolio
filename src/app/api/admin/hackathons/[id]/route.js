import { NextResponse } from 'next/server';
import { getHackathons, saveHackathons, logActivity } from '@/lib/data';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const hackathons = getHackathons();

    const index = hackathons.findIndex(h => h.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    const updatedHackathon = {
      ...hackathons[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    hackathons[index] = updatedHackathon;
    saveHackathons(hackathons);
    logActivity('Updated', 'hackathon', updatedHackathon.title);

    return NextResponse.json(updatedHackathon);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hackathon' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    let hackathons = getHackathons();

    const hackathon = hackathons.find(h => h.id === id);
    if (!hackathon) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    hackathons = hackathons.filter(h => h.id !== id);
    saveHackathons(hackathons);
    logActivity('Deleted', 'hackathon', hackathon.title);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hackathon' }, { status: 500 });
  }
}

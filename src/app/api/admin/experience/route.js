import { NextResponse } from 'next/server';
import { getExperience, saveExperience, logActivity, generateId } from '@/lib/data';

export async function GET() {
  try {
    const exp = getExperience();
    exp.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return NextResponse.json(exp);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const exp = getExperience();
    const newExp = {
      ...body,
      id: generateId(),
      displayOrder: exp.length + 1,
      createdAt: new Date().toISOString(),
    };
    exp.push(newExp);
    saveExperience(exp);
    logActivity('Created', 'experience', newExp.company || newExp.position);
    return NextResponse.json(newExp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

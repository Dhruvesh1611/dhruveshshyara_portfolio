import { NextResponse } from 'next/server';
import { getExperience, saveExperience, logActivity } from '@/lib/data';

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const exp = getExperience();
  const index = exp.findIndex(e => e.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  exp[index] = { ...exp[index], ...body, id: exp[index].id };
  saveExperience(exp);
  logActivity('Updated', 'experience', exp[index].company || exp[index].position);
  return NextResponse.json(exp[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const exp = getExperience();
  const item = exp.find(e => e.id === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  saveExperience(exp.filter(e => e.id !== id));
  logActivity('Deleted', 'experience', item.company || item.position);
  return NextResponse.json({ success: true });
}

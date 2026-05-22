import { NextResponse } from 'next/server';
import { getSkills, saveSkills, logActivity } from '@/lib/data';

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const skills = getSkills();
  const index = skills.findIndex(s => s.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  skills[index] = { ...skills[index], ...body, id: skills[index].id };
  saveSkills(skills);
  logActivity('Updated', 'skill', skills[index].name);
  return NextResponse.json(skills[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const skills = getSkills();
  const skill = skills.find(s => s.id === id);
  if (!skill) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  saveSkills(skills.filter(s => s.id !== id));
  logActivity('Deleted', 'skill', skill.name);
  return NextResponse.json({ success: true });
}

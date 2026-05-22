import { NextResponse } from 'next/server';
import { getSkills, saveSkills, logActivity, generateId } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    let skills = getSkills();
    if (search) skills = skills.filter(s => s.name?.toLowerCase().includes(search));
    if (category) skills = skills.filter(s => s.category === category);
    skills.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const skills = getSkills();
    const newSkill = {
      ...body,
      id: generateId(),
      displayOrder: skills.length + 1,
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
    };
    skills.push(newSkill);
    saveSkills(skills);
    logActivity('Created', 'skill', newSkill.name);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

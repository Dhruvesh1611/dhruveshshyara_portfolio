import { NextResponse } from 'next/server';
import { getSkills, saveSkills } from '@/lib/data';

export async function PUT(request) {
  try {
    const { order } = await request.json();
    const skills = getSkills();
    const reordered = order.map((id, idx) => {
      const skill = skills.find(s => s.id === id);
      return skill ? { ...skill, displayOrder: idx + 1 } : null;
    }).filter(Boolean);
    saveSkills(reordered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 });
  }
}

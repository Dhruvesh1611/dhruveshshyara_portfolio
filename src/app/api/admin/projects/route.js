import { NextResponse } from 'next/server';
import { getProjects, saveProjects, logActivity, generateId } from '@/lib/data';
import slugify from 'slugify';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    let projects = getProjects();

    if (search) {
      projects = projects.filter(p =>
        p.title?.toLowerCase().includes(search) ||
        p.description?.toString().toLowerCase().includes(search) ||
        p.tags?.some(t => t.toLowerCase().includes(search))
      );
    }
    if (category) {
      projects = projects.filter(p => p.category === category);
    }
    if (status) {
      projects = projects.filter(p => p.status === status);
    }

    projects.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const projects = getProjects();

    const newProject = {
      ...body,
      id: generateId(),
      slug: body.slug || slugify(body.title || '', { lower: true, strict: true }),
      displayOrder: projects.length + 1,
      status: body.status || 'draft',
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.push(newProject);
    saveProjects(projects);
    logActivity('Created', 'project', newProject.title);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

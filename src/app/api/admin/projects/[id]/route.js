import { NextResponse } from 'next/server';
import { getProjects, saveProjects, logActivity } from '@/lib/data';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const projects = getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    projects[index] = {
      ...projects[index],
      ...body,
      id: projects[index].id,
      updatedAt: new Date().toISOString(),
    };

    saveProjects(projects);
    logActivity('Updated', 'project', projects[index].title);

    return NextResponse.json(projects[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const projects = getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
    logActivity('Deleted', 'project', project.title);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

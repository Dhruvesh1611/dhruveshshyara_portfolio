import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getProjects, getCertificates, getSkills, getMedia, getMessages, getActivity } from '@/lib/data';

export async function GET() {
  try {
    const projects = getProjects();
    const certificates = getCertificates();
    const skills = getSkills();
    const media = getMedia();
    const messages = getMessages();
    const activity = getActivity();

    const featuredCount =
      projects.filter(p => p.featured).length +
      certificates.filter(c => c.featured).length +
      skills.filter(s => s.featured).length;

    return NextResponse.json({
      stats: {
        projects: projects.length,
        certificates: certificates.length,
        skills: skills.length,
        featured: featuredCount,
        media: media.length,
        messages: messages.length,
      },
      activity: activity.slice(0, 10),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

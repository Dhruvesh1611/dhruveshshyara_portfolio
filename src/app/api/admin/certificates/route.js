import { NextResponse } from 'next/server';
import { getCertificates, saveCertificates, logActivity, generateId } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    let certs = getCertificates();
    if (search) {
      certs = certs.filter(c => c.title?.toLowerCase().includes(search) || c.issuer?.toLowerCase().includes(search));
    }
    certs.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return NextResponse.json(certs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const certs = getCertificates();
    const newCert = {
      ...body,
      id: generateId(),
      displayOrder: certs.length + 1,
      status: body.status || 'published',
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    certs.push(newCert);
    saveCertificates(certs);
    logActivity('Created', 'certificate', newCert.title);
    return NextResponse.json(newCert, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}

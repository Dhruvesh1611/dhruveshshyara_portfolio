import { NextResponse } from 'next/server';
import { getCertificates, saveCertificates, logActivity } from '@/lib/data';

export async function GET(request, { params }) {
  const { id } = await params;
  const certs = getCertificates();
  const cert = certs.find(c => c.id === id);
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cert);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const certs = getCertificates();
  const index = certs.findIndex(c => c.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  certs[index] = { ...certs[index], ...body, id: certs[index].id, updatedAt: new Date().toISOString() };
  saveCertificates(certs);
  logActivity('Updated', 'certificate', certs[index].title);
  return NextResponse.json(certs[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const certs = getCertificates();
  const cert = certs.find(c => c.id === id);
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  saveCertificates(certs.filter(c => c.id !== id));
  logActivity('Deleted', 'certificate', cert.title);
  return NextResponse.json({ success: true });
}

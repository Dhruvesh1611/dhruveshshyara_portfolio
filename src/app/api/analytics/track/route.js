import { NextResponse } from 'next/server';
import { getAnalytics, saveAnalytics, generateId } from '@/lib/data';
import crypto from 'crypto';

// Parse device type from user agent
function getDeviceType(ua) {
  if (!ua) return 'desktop';
  const lower = ua.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(lower)) return 'tablet';
  if (/mobile|iphone|ipod|android.*mobile|blackberry|opera mini|iemobile/i.test(lower)) return 'mobile';
  return 'desktop';
}

// Parse browser name from user agent
function getBrowser(ua) {
  if (!ua) return 'Unknown';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  return 'Other';
}

// Generate anonymous visitor hash from IP
function hashVisitor(ip) {
  const salt = 'portfolio-analytics-2026';
  return crypto.createHash('sha256').update(`${ip}-${salt}`).digest('hex').substring(0, 12);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { path, referrer } = body;

    if (!path || path.startsWith('/admin')) {
      return NextResponse.json({ ok: true }, { status: 204 });
    }

    const ua = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const device = getDeviceType(ua);
    const browser = getBrowser(ua);
    const visitorId = hashVisitor(ip);
    const now = new Date();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD

    const analytics = getAnalytics();

    // Add page view record
    const pageView = {
      id: generateId(),
      path,
      referrer: referrer || '',
      device,
      browser,
      visitorId,
      timestamp: now.toISOString(),
    };

    analytics.pageViews.unshift(pageView);

    // Prune to last 1000 records
    if (analytics.pageViews.length > 1000) {
      analytics.pageViews.length = 1000;
    }

    // Update summary
    const summary = analytics.summary;
    summary.totalVisits = (summary.totalVisits || 0) + 1;

    // Top pages
    if (!summary.topPages) summary.topPages = {};
    summary.topPages[path] = (summary.topPages[path] || 0) + 1;

    // Device breakdown
    if (!summary.deviceBreakdown) summary.deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    summary.deviceBreakdown[device] = (summary.deviceBreakdown[device] || 0) + 1;

    // Browser breakdown
    if (!summary.browserBreakdown) summary.browserBreakdown = {};
    summary.browserBreakdown[browser] = (summary.browserBreakdown[browser] || 0) + 1;

    // Daily visits
    if (!summary.dailyVisits) summary.dailyVisits = {};
    summary.dailyVisits[dateKey] = (summary.dailyVisits[dateKey] || 0) + 1;

    // Unique visitors (track in a set-like approach)
    const existingVisitors = new Set(analytics.pageViews.map(pv => pv.visitorId));
    summary.uniqueVisitors = existingVisitors.size;

    saveAnalytics(analytics);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return new NextResponse(null, { status: 204 });
  }
}

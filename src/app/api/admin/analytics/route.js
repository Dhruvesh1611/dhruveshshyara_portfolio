import { NextResponse } from 'next/server';
import { getAnalytics, getProjects, getCertificates, getSkills, getExperience, getActivity } from '@/lib/data';

export async function GET() {
  try {
    const analytics = getAnalytics();
    const projects = getProjects();
    const certificates = getCertificates();
    const skills = getSkills();
    const experience = getExperience();
    const activity = getActivity();

    const summary = analytics.summary || {};
    const pageViews = analytics.pageViews || [];

    // Compute today's visits
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = (summary.dailyVisits && summary.dailyVisits[today]) || 0;

    // Last 30 days chart data
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      last30Days.push({
        date: key,
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visits: (summary.dailyVisits && summary.dailyVisits[key]) || 0,
      });
    }

    // Top pages (sorted by views)
    const topPages = Object.entries(summary.topPages || {})
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Avg visits per day (over the days we have data)
    const daysWithData = Object.keys(summary.dailyVisits || {}).length || 1;
    const avgPerDay = Math.round((summary.totalVisits || 0) / daysWithData * 10) / 10;

    // Recent visits
    const recentVisits = pageViews.slice(0, 20).map(pv => ({
      id: pv.id,
      path: pv.path,
      device: pv.device,
      browser: pv.browser,
      timestamp: pv.timestamp,
      referrer: pv.referrer,
    }));

    // Content stats
    const contentStats = {
      projects: projects.length,
      projectsFeatured: projects.filter(p => p.featured).length,
      certificates: certificates.length,
      certificatesFeatured: certificates.filter(c => c.featured).length,
      skills: skills.length,
      skillsFeatured: skills.filter(s => s.featured).length,
      experience: experience.length,
      totalActivities: activity.length,
    };

    return NextResponse.json({
      overview: {
        totalVisits: summary.totalVisits || 0,
        todayVisits,
        uniqueVisitors: summary.uniqueVisitors || 0,
        avgPerDay,
      },
      dailyChart: last30Days,
      topPages,
      deviceBreakdown: summary.deviceBreakdown || { desktop: 0, mobile: 0, tablet: 0 },
      browserBreakdown: summary.browserBreakdown || {},
      recentVisits,
      contentStats,
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

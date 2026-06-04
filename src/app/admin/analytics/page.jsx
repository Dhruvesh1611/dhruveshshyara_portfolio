'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import {
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineFolder,
  HiOutlineAcademicCap,
  HiOutlineLightningBolt,
  HiOutlineBriefcase,
  HiOutlineRefresh,
  HiOutlineExternalLink,
} from 'react-icons/hi';

// Device icon component
function DeviceIcon({ type, size = 16 }) {
  if (type === 'mobile') return <HiOutlineDeviceMobile size={size} />;
  if (type === 'tablet') return <HiOutlineDeviceMobile size={size} />;
  return <HiOutlineDesktopComputer size={size} />;
}

// SVG Donut Chart component
function DonutChart({ data, colors, size = 160 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="60" fill="none" stroke="var(--admin-surface-3)" strokeWidth="20" />
        <text x="80" y="80" textAnchor="middle" dominantBaseline="central" fill="var(--admin-text-muted)" fontSize="14">No data</text>
      </svg>
    );
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 160 160" className="analytics-donut">
      {data.map((item, i) => {
        const pct = item.value / total;
        const dashLen = circumference * pct;
        const dashOffset = circumference * offset;
        offset += pct;
        return (
          <circle
            key={i}
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={colors[i]}
            strokeWidth="20"
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={-dashOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease' }}
          />
        );
      })}
      <text x="80" y="74" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="22" fontWeight="700">{total}</text>
      <text x="80" y="94" textAnchor="middle" dominantBaseline="central" fill="var(--admin-text-muted)" fontSize="11">total</text>
    </svg>
  );
}

export default function AnalyticsPage() {
  const { status } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/admin/analytics');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAnalytics();
    }
  }, [status]);

  if (status !== 'authenticated') return null;

  const overview = data?.overview || {};
  const dailyChart = data?.dailyChart || [];
  const topPages = data?.topPages || [];
  const deviceBreakdown = data?.deviceBreakdown || { desktop: 0, mobile: 0, tablet: 0 };
  const browserBreakdown = data?.browserBreakdown || {};
  const recentVisits = data?.recentVisits || [];
  const contentStats = data?.contentStats || {};

  const maxDailyVisits = Math.max(...dailyChart.map(d => d.visits), 1);
  const deviceData = [
    { label: 'Desktop', value: deviceBreakdown.desktop || 0 },
    { label: 'Mobile', value: deviceBreakdown.mobile || 0 },
    { label: 'Tablet', value: deviceBreakdown.tablet || 0 },
  ];
  const deviceColors = ['#6366f1', '#8b5cf6', '#06b6d4'];
  const deviceTotal = deviceData.reduce((s, d) => s + d.value, 0);

  const browserEntries = Object.entries(browserBreakdown).sort((a, b) => b[1] - a[1]);
  const maxBrowserCount = browserEntries.length > 0 ? browserEntries[0][1] : 1;
  const browserColors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f97316', '#4ade80', '#f87171'];

  const formatPath = (path) => {
    if (path === '/') return 'Home';
    return path.replace(/^\//, '').replace(/\//g, ' / ').replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-subtitle">Portfolio performance & visitor insights</p>
        </div>
        <button
          className="admin-btn admin-btn--secondary"
          onClick={() => fetchAnalytics(true)}
          disabled={refreshing}
          style={{ marginTop: 4 }}
        >
          <HiOutlineRefresh size={18} className={refreshing ? 'analytics-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="admin-empty-state">
          <div className="admin-loading-spinner" style={{ margin: '0 auto 16px' }}></div>
          <p className="admin-empty-state-desc">Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* ── Google Analytics Banner ── */}
          <div className="analytics-ga-banner">
            <div className="analytics-ga-banner-left">
              <div className="analytics-ga-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.84 2.9984V21.0016C22.84 22.104 21.944 23 20.8416 23H3.1584C2.056 23 1.16 22.104 1.16 21.0016V2.9984C1.16 1.896 2.056 1 3.1584 1H20.8416C21.944 1 22.84 1.896 22.84 2.9984Z" fill="#F9AB00"/>
                  <path d="M22.84 2.9984V21.0016C22.84 22.104 21.944 23 20.8416 23H12V1H20.8416C21.944 1 22.84 1.896 22.84 2.9984Z" fill="#E37400"/>
                  <rect x="4" y="15" width="4" height="5" rx="1" fill="white"/>
                  <rect x="10" y="10" width="4" height="10" rx="1" fill="white"/>
                  <rect x="16" y="5" width="4" height="15" rx="1" fill="white"/>
                </svg>
              </div>
              <div className="analytics-ga-info">
                <span className="analytics-ga-title">Google Analytics 4</span>
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
                  <span className="analytics-ga-status analytics-ga-status--active">
                    <span className="analytics-ga-dot"></span>
                    Connected — Tracking real visitors on dhruveshshyara.in
                  </span>
                ) : (
                  <span className="analytics-ga-status analytics-ga-status--inactive">
                    Not configured — Add your Measurement ID to enable
                  </span>
                )}
              </div>
            </div>
            <div className="analytics-ga-actions">
              {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn--primary"
                >
                  <HiOutlineExternalLink size={16} />
                  Open GA Dashboard
                </a>
              ) : (
                <a
                  href="https://analytics.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn--secondary"
                >
                  <HiOutlineExternalLink size={16} />
                  Set Up Google Analytics
                </a>
              )}
            </div>
          </div>

          {!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <div className="analytics-setup-guide">
              <h4 className="analytics-setup-title">⚡ Quick Setup (2 minutes)</h4>
              <ol className="analytics-setup-steps">
                <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">analytics.google.com</a> and create a GA4 property</li>
                <li>Copy your <strong>Measurement ID</strong> (starts with <code>G-</code>)</li>
                <li>Add to your <code>.env.local</code>: <code>NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX</code></li>
                <li>Also add it to your Vercel environment variables and redeploy</li>
              </ol>
            </div>
          )}

          {/* ── Overview Stat Cards ── */}
          <div className="analytics-stats-grid">
            <div className="analytics-stat-card analytics-stat-card--purple">
              <div className="analytics-stat-card-icon"><HiOutlineEye size={24} /></div>
              <div className="analytics-stat-card-info">
                <span className="analytics-stat-card-value">{overview.totalVisits?.toLocaleString() || 0}</span>
                <span className="analytics-stat-card-label">Total Visits</span>
              </div>
            </div>
            <div className="analytics-stat-card analytics-stat-card--blue">
              <div className="analytics-stat-card-icon"><HiOutlineCalendar size={24} /></div>
              <div className="analytics-stat-card-info">
                <span className="analytics-stat-card-value">{overview.todayVisits?.toLocaleString() || 0}</span>
                <span className="analytics-stat-card-label">Today</span>
              </div>
            </div>
            <div className="analytics-stat-card analytics-stat-card--green">
              <div className="analytics-stat-card-icon"><HiOutlineUserGroup size={24} /></div>
              <div className="analytics-stat-card-info">
                <span className="analytics-stat-card-value">{overview.uniqueVisitors?.toLocaleString() || 0}</span>
                <span className="analytics-stat-card-label">Unique Visitors</span>
              </div>
            </div>
            <div className="analytics-stat-card analytics-stat-card--yellow">
              <div className="analytics-stat-card-icon"><HiOutlineTrendingUp size={24} /></div>
              <div className="analytics-stat-card-info">
                <span className="analytics-stat-card-value">{overview.avgPerDay || 0}</span>
                <span className="analytics-stat-card-label">Avg / Day</span>
              </div>
            </div>
          </div>

          {/* ── Daily Visits Chart ── */}
          <div className="analytics-widget analytics-chart-widget">
            <div className="admin-widget-header">
              <h3 className="admin-widget-title">Visits — Last 30 Days</h3>
              <span className="analytics-chart-total">{dailyChart.reduce((s, d) => s + d.visits, 0)} total</span>
            </div>
            <div className="analytics-bar-chart">
              {dailyChart.map((day, i) => (
                <div key={i} className="analytics-bar-col" title={`${day.label}: ${day.visits} visits`}>
                  <div className="analytics-bar-wrapper">
                    <div
                      className="analytics-bar"
                      style={{
                        height: `${Math.max((day.visits / maxDailyVisits) * 100, day.visits > 0 ? 4 : 0)}%`,
                        animationDelay: `${i * 30}ms`,
                      }}
                    />
                  </div>
                  {i % 5 === 0 && (
                    <span className="analytics-bar-label">{day.label.split(' ')[0]}<br />{day.label.split(' ')[1]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Two Column Grid: Top Pages + Devices ── */}
          <div className="analytics-two-col">
            {/* Top Pages */}
            <div className="analytics-widget">
              <div className="admin-widget-header">
                <h3 className="admin-widget-title">Top Pages</h3>
              </div>
              {topPages.length === 0 ? (
                <div className="analytics-empty-mini">
                  <HiOutlineGlobe size={24} />
                  <p>No page views yet</p>
                </div>
              ) : (
                <div className="analytics-top-pages">
                  {topPages.map((page, i) => (
                    <div key={i} className="analytics-top-page">
                      <div className="analytics-top-page-header">
                        <span className="analytics-top-page-rank">#{i + 1}</span>
                        <span className="analytics-top-page-name">{formatPath(page.path)}</span>
                        <span className="analytics-top-page-count">{page.views}</span>
                      </div>
                      <div className="analytics-progress-track">
                        <div
                          className="analytics-progress-bar"
                          style={{
                            width: `${(page.views / (topPages[0]?.views || 1)) * 100}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Device & Browser Breakdown */}
            <div className="analytics-widget">
              <div className="admin-widget-header">
                <h3 className="admin-widget-title">Devices & Browsers</h3>
              </div>
              <div className="analytics-device-section">
                <div className="analytics-donut-wrapper">
                  <DonutChart data={deviceData} colors={deviceColors} />
                </div>
                <div className="analytics-device-legend">
                  {deviceData.map((d, i) => (
                    <div key={i} className="analytics-legend-item">
                      <span className="analytics-legend-dot" style={{ background: deviceColors[i] }} />
                      <span className="analytics-legend-label">{d.label}</span>
                      <span className="analytics-legend-value">{d.value}</span>
                      <span className="analytics-legend-pct">
                        {deviceTotal > 0 ? Math.round((d.value / deviceTotal) * 100) : 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {browserEntries.length > 0 && (
                <div className="analytics-browser-section">
                  <h4 className="analytics-section-title">Browsers</h4>
                  {browserEntries.map(([browser, count], i) => (
                    <div key={browser} className="analytics-browser-row">
                      <span className="analytics-browser-name">{browser}</span>
                      <div className="analytics-browser-bar-track">
                        <div
                          className="analytics-browser-bar"
                          style={{
                            width: `${(count / maxBrowserCount) * 100}%`,
                            background: browserColors[i % browserColors.length],
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      </div>
                      <span className="analytics-browser-count">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Recent Visits Table ── */}
          <div className="analytics-widget" style={{ marginTop: 24 }}>
            <div className="admin-widget-header">
              <h3 className="admin-widget-title">Recent Visits</h3>
              <span className="analytics-chart-total">{recentVisits.length} latest</span>
            </div>
            {recentVisits.length === 0 ? (
              <div className="analytics-empty-mini">
                <HiOutlineEye size={24} />
                <p>No visits recorded yet. Visit your portfolio to generate data!</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Device</th>
                      <th>Browser</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.map((visit) => (
                      <tr key={visit.id}>
                        <td>
                          <span className="admin-table-title">{formatPath(visit.path)}</span>
                        </td>
                        <td>
                          <span className="analytics-device-badge">
                            <DeviceIcon type={visit.device} size={14} />
                            {visit.device}
                          </span>
                        </td>
                        <td>{visit.browser}</td>
                        <td>
                          <span className="analytics-time-cell">{timeAgo(visit.timestamp)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ── Content Overview ── */}
          <div className="analytics-widget" style={{ marginTop: 24 }}>
            <div className="admin-widget-header">
              <h3 className="admin-widget-title">Content Overview</h3>
            </div>
            <div className="analytics-content-grid">
              <div className="analytics-content-card">
                <div className="analytics-content-icon analytics-content-icon--purple">
                  <HiOutlineFolder size={22} />
                </div>
                <div className="analytics-content-info">
                  <span className="analytics-content-value">{contentStats.projects || 0}</span>
                  <span className="analytics-content-label">Projects</span>
                </div>
                <span className="analytics-content-featured">{contentStats.projectsFeatured || 0} featured</span>
              </div>
              <div className="analytics-content-card">
                <div className="analytics-content-icon analytics-content-icon--blue">
                  <HiOutlineAcademicCap size={22} />
                </div>
                <div className="analytics-content-info">
                  <span className="analytics-content-value">{contentStats.certificates || 0}</span>
                  <span className="analytics-content-label">Certificates</span>
                </div>
                <span className="analytics-content-featured">{contentStats.certificatesFeatured || 0} featured</span>
              </div>
              <div className="analytics-content-card">
                <div className="analytics-content-icon analytics-content-icon--green">
                  <HiOutlineLightningBolt size={22} />
                </div>
                <div className="analytics-content-info">
                  <span className="analytics-content-value">{contentStats.skills || 0}</span>
                  <span className="analytics-content-label">Skills</span>
                </div>
                <span className="analytics-content-featured">{contentStats.skillsFeatured || 0} featured</span>
              </div>
              <div className="analytics-content-card">
                <div className="analytics-content-icon analytics-content-icon--yellow">
                  <HiOutlineBriefcase size={22} />
                </div>
                <div className="analytics-content-info">
                  <span className="analytics-content-value">{contentStats.experience || 0}</span>
                  <span className="analytics-content-label">Experience</span>
                </div>
                <span className="analytics-content-featured">{contentStats.totalActivities || 0} activities</span>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}

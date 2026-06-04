'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef('');

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;
    // Don't double-track the same path
    if (lastTracked.current === pathname) return;

    lastTracked.current = pathname;

    // Fire and forget
    const track = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: typeof document !== 'undefined' ? document.referrer : '',
          }),
        });
      } catch (_) {
        // Silently fail — analytics should never block the user
      }
    };

    // Small delay to avoid tracking during rapid navigation
    const timer = setTimeout(track, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// TypeScript interface for Lytics
declare global {
  interface Window {
    jstag: {
      pageView: () => void;
      identify: (userId: string, userData?: any) => void;
      send: (eventName: string, eventData?: any) => void;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      getid: () => string;
      setid: (userId: string) => void;
    };
  }
}

interface LyticsTrackerProps {
  userId?: string;
  userData?: Record<string, any>;
}

function LyticsTrackerInner({ userId, userData }: LyticsTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.pageView();
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // Identify user if userId is provided
    if (typeof window !== 'undefined' && window.jstag && userId) {
      window.jstag.identify(userId, userData);
    }
  }, [userId, userData]);

  // Helper functions for tracking custom events
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send(eventName, eventData);
    }
  };

  const trackUserAction = (action: string, details?: Record<string, any>) => {
    trackEvent('user_action', {
      action,
      page: pathname,
      timestamp: new Date().toISOString(),
      ...details
    });
  };

  const trackNewsView = (newsId: string, newsTitle: string, category?: string) => {
    trackEvent('news_view', {
      news_id: newsId,
      news_title: newsTitle,
      category,
      page: pathname,
      timestamp: new Date().toISOString()
    });
  };

  const trackNewsClick = (newsId: string, newsTitle: string, category?: string) => {
    trackEvent('news_click', {
      news_id: newsId,
      news_title: newsTitle,
      category,
      page: pathname,
      timestamp: new Date().toISOString()
    });
  };

  const trackCategoryView = (category: string) => {
    trackEvent('category_view', {
      category,
      page: pathname,
      timestamp: new Date().toISOString()
    });
  };

  const trackLanguageSwitch = (fromLanguage: string, toLanguage: string) => {
    trackEvent('language_switch', {
      from_language: fromLanguage,
      to_language: toLanguage,
      page: pathname,
      timestamp: new Date().toISOString()
    });
  };

  const trackEmailSubscription = (email: string, source?: string) => {
    trackEvent('email_subscription', {
      email,
      source,
      page: pathname,
      timestamp: new Date().toISOString()
    });
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).lyticsTracker = {
        trackEvent,
        trackUserAction,
        trackNewsView,
        trackNewsClick,
        trackCategoryView,
        trackLanguageSwitch,
        trackEmailSubscription
      };
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}

export default function LyticsTracker(props: LyticsTrackerProps) {
  return (
    <Suspense fallback={null}>
      <LyticsTrackerInner {...props} />
    </Suspense>
  );
}

// Export helper functions for use in other components
export const lyticsHelpers = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send(eventName, eventData);
    }
  },
  
  trackNewsView: (newsId: string, newsTitle: string, category?: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('news_view', {
        news_id: newsId,
        news_title: newsTitle,
        category,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  },
  
  trackNewsClick: (newsId: string, newsTitle: string, category?: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('news_click', {
        news_id: newsId,
        news_title: newsTitle,
        category,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  },
  
  trackCategoryView: (category: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('category_view', {
        category,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  },
  
  trackLanguageSwitch: (fromLanguage: string, toLanguage: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('language_switch', {
        from_language: fromLanguage,
        to_language: toLanguage,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  },
  
  trackEmailSubscription: (email: string, source?: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('email_subscription', {
        email,
        source,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  }
}; 
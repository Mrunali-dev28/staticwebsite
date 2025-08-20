'use client';

import React from 'react';
import { BreakingAlert } from '@/lib/contentstack';
import { translateToHindi } from '@/lib/contentstack-helpers';

// Import Lytics helpers for tracking
const lyticsHelpers = {
  trackNewsClick: (newsId: string, newsTitle: string, category: string) => {
    if (typeof window !== 'undefined' && window.jstag) {
      window.jstag.send('news_click', {
        news_id: newsId,
        news_title: newsTitle,
        category,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  }
};

interface BreakingAlertProps {
  breakingAlerts: BreakingAlert[];
  currentLanguage?: string;
  locale?: 'en' | 'hi';
}

export default function BreakingAlertComponent({ breakingAlerts, currentLanguage = 'English', locale = 'en' }: BreakingAlertProps) {
  if (!breakingAlerts || breakingAlerts.length === 0) {
    return null;
  }

  // Handle "Go to Site" click - redirect to specific entry
  const handleGoToSiteClick = (alert: BreakingAlert) => {
    // Track the click
    lyticsHelpers.trackNewsClick(
      alert.uid,
      alert.title,
      'breaking_alert_go_to_site'
    );

    // Redirect to the specific entry (blt35f13c9354f221a8) from read_more_page content type
    const targetEntryId = 'blt35f13c9354f221a8';
    const readMoreUrl = `/${locale}/read-more/${targetEntryId}`;
    console.log('Redirecting to specific entry:', readMoreUrl);
    window.location.href = readMoreUrl;
  };

  // Determine the home page URL based on language
  const getHomePageUrl = () => {
    return currentLanguage === 'Hindi' ? '/hi' : '/en';
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 mb-6 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <h3 className="font-bold text-lg">{locale === 'hi' ? 'तोड़फोड़ समाचार' : 'Breaking News'}</h3>
              <div className="text-red-100 text-sm">
                {breakingAlerts.length} {locale === 'hi' ? 'अलर्ट' : 'alert'}{breakingAlerts.length !== 1 ? (locale === 'hi' ? 'सक्रिय' : 's') : ''} {locale === 'hi' ? 'सक्रिय' : 'active'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {breakingAlerts.map((alert) => (
            <div key={alert.uid} className="bg-red-500 bg-opacity-30 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{translateToHindi(alert.title, locale)}</h4>
                  {alert.rich_text_editor && (
                    <div className="text-red-100 text-sm mb-2"
                         dangerouslySetInnerHTML={{ __html: translateToHindi(alert.rich_text_editor, locale) }}>
                    </div>
                  )}
                  {alert.link && alert.link.url ? (
                    <a 
                      href={alert.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-200 hover:text-white text-sm font-medium transition-colors cursor-pointer"
                    >
                      {locale === 'hi' ? 'और पढ़ें →' : 'Read More →'}
                    </a>
                  ) : alert.title.toLowerCase().includes('monsoon') || 
                       alert.title.toLowerCase().includes('flood') || 
                       alert.title.toLowerCase().includes('बाढ़') || 
                       alert.title.toLowerCase().includes('मानसून') || 
                       alert.title.toLowerCase().includes('rain') || 
                       alert.title.toLowerCase().includes('बारिश') ? (
                    <button 
                      onClick={() => handleGoToSiteClick(alert)}
                      className="inline-flex items-center text-red-200 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none p-0"
                    >
                      {locale === 'hi' ? 'साइट पर जाएं →' : 'Go to Site →'}
                    </button>
                  ) : (
                    <span className="inline-flex items-center text-red-200 text-sm font-medium opacity-50">
                      {locale === 'hi' ? 'कोई लिंक उपलब्ध नहीं' : 'No link available'}
                    </span>
                  )}
                </div>
                {alert.boolean && (
                  <span className="bg-green-500 px-2 py-1 rounded text-xs font-bold ml-2">
                    {locale === 'hi' ? 'सत्यापित' : 'VERIFIED'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
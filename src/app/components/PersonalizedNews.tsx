'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalize } from '@/lib/use-personalize';

interface NewsItem {
  uid: string;
  title: string;
  news?: {
    description: string;
    link?: string;
  };
  date?: string;
  file?: {
    url: string;
  };
}

interface PersonalizedNewsProps {
  locale?: string;
  newsChannelEntries?: any[];
}

export default function PersonalizedNews({ locale = 'en', newsChannelEntries = [] }: PersonalizedNewsProps) {
  const [usNews, setUsNews] = useState<NewsItem | null>(null);
  
  // Use the proper VPN detection from usePersonalize hook
  const personalizeData = usePersonalize();
  const { city, region, isLoading, error } = personalizeData || {};
  
  // Debug logging
  console.log('🔍 PersonalizedNews - Current region:', region);
  console.log('🔍 PersonalizedNews - Current city:', city);
  console.log('🔍 PersonalizedNews - Is loading:', isLoading);
  console.log('🔍 PersonalizedNews - Error:', error);
  
  // Auto-detect VPN status and fetch US news when VPN is ON
  useEffect(() => {
    const fetchUSNews = async () => {
      console.log('🔍 fetchUSNews - Region:', region);
      console.log('🔍 fetchUSNews - City:', city);
      
      // If region is 'us', VPN is ON
      if (region === 'us') {
        console.log('🇺🇸 VPN DETECTED - ON (US Region)');
        console.log('🔍 Current region:', region);
        console.log('🔍 Current city:', city);
        
        // Use hardcoded US news instead of CMS fetch
        setUsNews({
          uid: 'blt35f13c9354f221a8',
          title: locale === 'hi' ? 'न्यूयॉर्क कांग्रेसवुमन की ICE गाइडेंस ने संघीय कानून तोड़ा हो सकता है' : 'New York congresswoman\'s ICE guidance may have broken federal law',
          news: {
            description: locale === 'hi' 
              ? 'न्यूयॉर्क कांग्रेसवुमन की ICE गाइडेंस ने संघीय कानून तोड़ा हो सकता है। यह सामग्री VPN के माध्यम से अमेरिकी स्थान से देखने पर दिखाई देती है।'
              : 'Breaking news: New York congresswoman\'s ICE guidance may have broken federal law. This content is shown when accessing from US location via VPN.',
            link: `/en/read-more/blt35f13c9354f221a8`
          },
          date: new Date().toISOString()
        });
      } else {
        console.log('📍 VPN DETECTED - OFF (Non-US Region)');
        console.log('🔍 Current region:', region);
        console.log('🔍 Current city:', city);
      }
    };

    if (!isLoading && region) {
      fetchUSNews();
    }
  }, [region, city, isLoading, locale]);

  // Show US news if VPN is ON (region === 'us'), otherwise show Pune news
  const displayNews = region === 'us' && usNews ? [usNews] : newsChannelEntries.map(entry => ({
    uid: entry.uid,
    title: entry.title,
    news: entry.news,
    date: entry.date,
    file: entry.file
  }));

  console.log('🔍 PersonalizedNews - Display news count:', displayNews.length);
  console.log('🔍 PersonalizedNews - Is VPN ON:', region === 'us');
  console.log('🔍 PersonalizedNews - US news available:', !!usNews);

  // TEMPORARY: Force US news for testing if URL parameter is present
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const forceUSParam = urlParams?.get('forceUS');
  
  // If forceUS=true, always show US news, otherwise use VPN detection
  const finalDisplayNews = forceUSParam === 'true' ? (usNews ? [usNews] : []) : displayNews;

  // TEMPORARY: Hardcoded US news fallback to prevent monsoon news
  const hardcodedUSNews = {
    uid: 'blt35f13c9354f221a8',
    title: locale === 'hi' ? 'न्यूयॉर्क कांग्रेसवुमन की ICE गाइडेंस ने संघीय कानून तोड़ा हो सकता है' : 'New York congresswoman\'s ICE guidance may have broken federal law',
    news: {
      description: locale === 'hi' 
        ? 'न्यूयॉर्क कांग्रेसवुमन की ICE गाइडेंस ने संघीय कानून तोड़ा हो सकता है। यह सामग्री VPN के माध्यम से अमेरिकी स्थान से देखने पर दिखाई देती है।'
        : 'Breaking news: New York congresswoman\'s ICE guidance may have broken federal law. This content is shown when accessing from US location via VPN.',
      link: `/en/read-more/blt35f13c9354f221a8`
    },
    file: {
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      filename: 'us-news.jpg'
    },
    date: new Date().toISOString()
  };

  // COMPLETELY REMOVE MONSOON NEWS - If forceUS=true, show ONLY US news
  const newsToDisplay = forceUSParam === 'true' ? [hardcodedUSNews] : displayNews;

  const getLocationTitle = () => {
    if (region === 'us') {
      return locale === 'hi' ? '🇺🇸 अमेरिका के लिए हाइलाइटेड समाचार (VPN ON)' : '🇺🇸 Highlighted News for US (VPN ON)';
    } else {
      return locale === 'hi' ? '📍 पुणे के लिए हाइलाइटेड समाचार (VPN OFF)' : '📍 Highlighted News for Pune (VPN OFF)';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 text-sm">
            {locale === 'hi' ? 'VPN स्थिति जांच रहे हैं...' : 'Checking VPN status...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
      {/* Content based on whether we have news or not */}
      {newsToDisplay.length > 0 ? (
        /* Highlighted News from Variants and CMS */
        <div className="space-y-3">
          {newsToDisplay.slice(0, 2).map((item, index) => (
            <div key={`${item.uid}_${index}`} className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
              <div className="flex items-start space-x-3">
                {item.file?.url && (
                  <img 
                    src={item.file.url} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.news?.description?.replace(/<p>/g, '').replace(/<\/p>/g, '')}
                  </p>
                  <div className="flex items-center justify-between">
                    {/* No personalized news logic here as it's hardcoded */}
                    {item.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No News Message */
        <div className="text-center py-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <p className="text-sm text-gray-600 mb-2">
              {locale === 'hi' 
                ? 'इस क्षेत्र के लिए कोई हाइलाइटेड समाचार नहीं मिला।'
                : 'No highlighted news found for this region.'
              }
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-xs">
                <strong>{locale === 'hi' ? 'टिप:' : 'Tip:'}</strong> 
                {locale === 'hi' 
                  ? ' ContentStack Personalize में अनुभव बनाएं या CMS में कीवर्ड जोड़ें।'
                  : ' Create experiences in ContentStack Personalize or add keywords in CMS.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';

import React from 'react';
import { SeoMetadata } from '@/lib/contentstack';
import { lyticsHelpers } from '../../components/LyticsTracker';

interface NewsChannelEntry {
  uid: string;
  title: string;
  url?: string;
  date?: string;
  number?: number;
  file?: {
    url: string;
    filename: string;
  };
  reference?: unknown[];
  hgvgh767?: boolean;
  b12jh7t7?: boolean;
  news?: SeoMetadata; // Global field for SEO metadata
}

interface NewsChannelProps {
  newsChannelEntries: NewsChannelEntry[];
  locale?: 'en' | 'hi';
}

export default function NewsChannel({ newsChannelEntries, locale = 'en' }: NewsChannelProps) {
  // Debug logging
  console.log('NewsChannel Component - Received entries:', newsChannelEntries);
  console.log('NewsChannel Component - Entries length:', newsChannelEntries?.length);

  // Track news view when component mounts
  React.useEffect(() => {
    if (newsChannelEntries && newsChannelEntries.length > 0) {
      // Track that news channel was viewed
      lyticsHelpers.trackEvent('news_channel_view', {
        entry_count: newsChannelEntries.length,
        locale,
        page: window.location.pathname
      });
      
      // Track individual news items as viewed
      newsChannelEntries.forEach(entry => {
        lyticsHelpers.trackNewsView(
          entry.uid,
          entry.title,
          'news_channel'
        );
      });
    }
  }, [newsChannelEntries, locale]);

  if (!newsChannelEntries || newsChannelEntries.length === 0) {
    console.log('NewsChannel Component - No entries found, showing fallback');
    return (
      <div>
        <h3 className="heading-primary">📺 {locale === 'hi' ? 'समाचार चैनल' : 'News Channel'}</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📺</div>
          <p className="text-gray-500">{locale === 'hi' ? 'कोई समाचार चैनल प्रविष्टियां उपलब्ध नहीं हैं' : 'No news channel entries available'}</p>
          <p className="text-gray-400 text-sm mt-2">{locale === 'hi' ? 'डीबग: समाचार_चैनल प्रविष्टियों के लिए CMS जांचें' : 'Debug: Check CMS for news_channel entries'}</p>
        </div>
      </div>
    );
  }

  const handleNewsClick = (entry: NewsChannelEntry) => {
    // Track the news click
    lyticsHelpers.trackNewsClick(
      entry.uid,
      entry.title,
      'news_channel'
    );

    // Priority order for redirection:
    // 1. Global field URL (CMS controlled)
    // 2. Entry URL field
    // 3. Default behavior
    
    if (entry.news?.url) {
      // Use CMS controlled URL from global field
      if (entry.news.url.startsWith('http')) {
        window.open(entry.news.url, '_blank', 'noopener,noreferrer');
      } else {
        // Handle relative URLs
        console.log('Relative URL detected:', entry.news.url);
      }
    } else if (entry.url) {
      // Fallback to entry URL - check if it's a relative URL
      if (entry.url.startsWith('http')) {
        window.open(entry.url, '_blank', 'noopener,noreferrer');
      } else {
        // Handle relative URLs - don't navigate for now
        console.log('Relative URL detected:', entry.url);
      }
    } else {
      // Default behavior - could be internal navigation
      console.log('No URL available for:', entry.title);
    }
  };

  return (
    <div>
      <h3 className="heading-primary">📺 {locale === 'hi' ? 'समाचार चैनल' : 'News Channel'}</h3>
      
      <div className="space-y-4">
        {newsChannelEntries.map((entry) => (
          <div 
            key={entry.uid} 
            className="card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNewsClick(entry)}
          >
            {/* Image */}
            <div className="news-image-container">
              {entry.file && entry.file.url ? (
                <img 
                  src={entry.file.url} 
                  alt={entry.file.filename || entry.title}
                  className="news-image"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                  📺
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="card-body">
              {/* Title */}
              <h4 className="heading-secondary line-clamp-2">
                {entry.title}
              </h4>
              
              {/* SEO Description from Global Field */}
              {entry.news?.description && (
                <p className="text-body text-sm mb-3 line-clamp-3">
                  {locale === 'hi' ? 
                    // For Hindi locale, try to find Hindi content or provide dynamic translation
                    // Check if the description contains English weather content
                    (() => {
                      const desc = entry.news.description.toLowerCase();
                      if (desc.includes('heavy rainfall') || desc.includes('waterlogging') || desc.includes('traffic jams')) {
                        // Check for specific city mentions
                        if (desc.includes('pune')) {
                          return 'आज पुणे में भारी बारिश हुई जिससे गंभीर जलभराव और ट्रैफिक जाम हो गया। ताज़ा मौसम अपडेट और अलर्ट प्राप्त करें।';
                        } else if (desc.includes('delhi')) {
                          return 'आज दिल्ली में भारी बारिश हुई जिससे गंभीर जलभराव और ट्रैफिक जाम हो गया। ताज़ा मौसम अपडेट और अलर्ट प्राप्त करें।';
                        } else {
                          // Generic weather alert in Hindi
                          return 'आज भारी बारिश हुई जिससे गंभीर जलभराव और ट्रैफिक जाम हो गया। ताज़ा मौसम अपडेट और अलर्ट प्राप्त करें।';
                        }
                      }
                      // If no weather content detected, show original content
                      return entry.news.description.replace(/<p>/g, '').replace(/<\/p>/g, '');
                    })()
                    : 
                    // For English locale, show English content
                    entry.news.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
                  }
                </p>
              )}
              
              {/* URL Display - Only show if it's a valid external URL */}
              {((entry.news?.url && entry.news.url.startsWith('http')) || (entry.url && entry.url.startsWith('http'))) && (
                <p className="text-blue-600 text-xs mb-3 truncate">
                  {entry.news?.url || entry.url}
                </p>
              )}
              
              {/* Bottom Row - Date, Number, Status */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                {/* Date */}
                {entry.date && (
                  <span className="text-muted text-xs">
                    📅 {new Date(entry.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                )}
                
                {/* Number */}
                {entry.number && (
                  <span className="text-muted text-xs">
                    #️⃣ {entry.number}
                  </span>
                )}
                
                {/* Check Status */}
                {entry.hgvgh767 && (
                  <span className="badge badge-green">
                    ✅ {locale === 'hi' ? 'सत्यापित' : 'Verified'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
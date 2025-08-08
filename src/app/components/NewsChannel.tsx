'use client';

import React from 'react';
import { NewsChannel as NewsChannelType, SeoMetadata } from '@/lib/contentstack';

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

  if (!newsChannelEntries || newsChannelEntries.length === 0) {
    console.log('NewsChannel Component - No entries found, showing fallback');
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📺 {locale === 'hi' ? 'समाचार चैनल' : 'News Channel'}</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📺</div>
          <p className="text-gray-500">{locale === 'hi' ? 'कोई समाचार चैनल प्रविष्टियां उपलब्ध नहीं हैं' : 'No news channel entries available'}</p>
          <p className="text-gray-400 text-sm mt-2">{locale === 'hi' ? 'डीबग: समाचार_चैनल प्रविष्टियों के लिए CMS जांचें' : 'Debug: Check CMS for news_channel entries'}</p>
        </div>
      </div>
    );
  }

  const handleNewsClick = (entry: NewsChannelEntry) => {
    // Priority order for redirection:
    // 1. Global field URL (CMS controlled)
    // 2. Entry URL field
    // 3. Default behavior
    
    if (entry.news?.url) {
      // Use CMS controlled URL from global field
      window.open(entry.news.url, '_blank', 'noopener,noreferrer');
    } else if (entry.url) {
      // Fallback to entry URL
      window.open(entry.url, '_blank', 'noopener,noreferrer');
    } else {
      // Default behavior - could be internal navigation
      console.log('No URL available for:', entry.title);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">📺 {locale === 'hi' ? 'समाचार चैनल' : 'News Channel'}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {newsChannelEntries.map((entry) => (
          <div 
            key={entry.uid} 
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = 'white';
            }}
            onClick={() => handleNewsClick(entry)}
          >
            {/* Image */}
            {entry.file && (
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{
                  width: '100%',
                  height: '160px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={entry.file.url} 
                    alt={entry.file.filename}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Content */}
            <div>
              {/* Title */}
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                lineHeight: '1.25'
              }}>
                {entry.title}
              </h4>
              
              {/* SEO Description from Global Field */}
              {entry.news?.description && (
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  lineHeight: '1.5'
                }}>
                  {entry.news.description}
                </p>
              )}
              
              {/* URL Display */}
              {(entry.news?.url || entry.url) && (
                <p style={{
                  color: '#2563eb',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {entry.news?.url || entry.url}
                </p>
              )}
              
              {/* Bottom Row - Date, Number, Status */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '1px solid #f3f4f6',
                marginTop: '0.5rem'
              }}>
                {/* Date */}
                {entry.date && (
                  <span style={{
                    color: '#6b7280',
                    fontSize: '0.75rem'
                  }}>
                    📅 {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </span>
                )}
                
                {/* Number */}
                {entry.number && (
                  <span style={{
                    color: '#4b5563',
                    fontSize: '0.75rem'
                  }}>
                    #️⃣ {entry.number}
                  </span>
                )}
                
                {/* Check Status */}
                {entry.hgvgh767 && (
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
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
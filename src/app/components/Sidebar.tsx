'use client';

import React from 'react';
import { SidebarNews } from '@/lib/contentstack';
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

interface SidebarProps {
  sidebarNews: SidebarNews[];
  locale?: 'en' | 'hi';
}

export default function Sidebar({ sidebarNews, locale = 'en' }: SidebarProps) {
  // Debug logging
  console.log('Sidebar Component - Received sidebar news:', sidebarNews);
  console.log('Sidebar Component - News length:', sidebarNews?.length);
  if (sidebarNews && sidebarNews.length > 0) {
    console.log('Sidebar Component - First news item:', sidebarNews[0]);
    console.log('Sidebar Component - First news file:', sidebarNews[0].file);
  }

  const handleSidebarNewsClick = (news: SidebarNews) => {
    // Track the sidebar news click
    lyticsHelpers.trackNewsClick(
      news.uid,
      news.title,
      'sidebar_news'
    );

    // Priority order for redirection:
    // 1. Link field URL (CMS controlled)
    // 2. URL field
    // 3. Default behavior - navigate to read-more page
    
    if (news.link?.url) {
      // Use CMS controlled URL from link field
      if (news.link.url.startsWith('http')) {
        window.open(news.link.url, '_blank', 'noopener,noreferrer');
      } else {
        // Handle relative URLs
        window.location.href = news.link.url;
      }
    } else if (news.url) {
      // Fallback to URL field
      if (news.url.startsWith('http')) {
        window.open(news.url, '_blank', 'noopener,noreferrer');
      } else {
        // Handle relative URLs
        window.location.href = news.url;
      }
    } else {
      // Default behavior - navigate to read-more page
      const readMoreUrl = `/${locale}/read-more/${news.uid}`;
      console.log('Navigating to read-more page:', readMoreUrl);
      window.location.href = readMoreUrl;
    }
  };
  
  return (
    <aside className="card">
      <div className="card-header">
        <h3 className="heading-primary">
          📰 {locale === 'hi' ? 'नवीनतम अपडेट' : 'Latest Updates'}
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {sidebarNews.length > 0 ? (
          sidebarNews.map((news) => (
            <article 
              key={news.uid} 
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleSidebarNewsClick(news)}
            >
              <div className="space-y-3">
                {/* Always show image container - with fallback if no image */}
                <div className="sidebar-image-container">
                  {news.file && news.file.url ? (
                    <img 
                      src={news.file.url} 
                      alt={news.file.filename || news.title}
                      className="sidebar-image"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      📰
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="heading-secondary line-clamp-2">
                    {translateToHindi(news.title, locale)}
                  </h4>
                  {news.descrption && (
                    <div className="text-body text-sm line-clamp-3" 
                         dangerouslySetInnerHTML={{ __html: translateToHindi(news.descrption, locale) }}>
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="badge badge-red">
                      {locale === 'hi' ? 'तोड़फोड़' : 'Breaking'}
                    </span>
                    <span className="text-blue-600 text-sm font-medium">
                      {locale === 'hi' ? 'पढ़ें →' : 'Read →'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📰</div>
            <p className="text-muted text-sm">
              {locale === 'hi' ? 'इस समय कोई साइडबार समाचार उपलब्ध नहीं है' : 'No sidebar news available at the moment'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
} 
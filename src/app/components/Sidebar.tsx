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
      // Default behavior - navigate to sidebar news detail page
      const sidebarNewsUrl = `/${locale}/sidebar-news/${news.uid}`;
      console.log('Navigating to sidebar news page:', sidebarNewsUrl);
      window.location.href = sidebarNewsUrl;
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
        {(() => {
          // Find the first entry that has an image
          const newsWithImage = sidebarNews.find(news => news.file && news.file.url);
          
          if (newsWithImage) {
            return (
              <article 
                key={newsWithImage.uid} 
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleSidebarNewsClick(newsWithImage)}
              >
                <div className="space-y-3">
                  {/* Show image container */}
                  <div className="sidebar-image-container">
                    <img 
                      src={newsWithImage.file!.url} 
                      alt={newsWithImage.file!.filename || newsWithImage.title}
                      className="sidebar-image"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="heading-secondary line-clamp-2">
                      {translateToHindi(newsWithImage.title, locale)}
                    </h4>
                    {newsWithImage.descrption && (
                      <div className="text-body text-sm line-clamp-3" 
                           dangerouslySetInnerHTML={{ __html: translateToHindi(newsWithImage.descrption, locale) }}>
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
            );
          } else {
            return (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📰</div>
                <p className="text-muted text-sm">
                  {locale === 'hi' ? 'इस समय कोई साइडबार समाचार उपलब्ध नहीं है' : 'No sidebar news available at the moment'}
                </p>
              </div>
            );
          }
        })()}
      </div>
    </aside>
  );
} 
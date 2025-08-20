'use client';

import React from 'react';
import { NewUpdate } from '@/lib/contentstack';
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

interface NewUpdateProps {
  newUpdates: NewUpdate[];
  locale?: 'en' | 'hi';
}

export default function NewUpdateWidget({ newUpdates, locale = 'en' }: NewUpdateProps) {
  const handleNewUpdateClick = (update: NewUpdate) => {
    // Track the new update click
    lyticsHelpers.trackNewsClick(
      update.uid,
      update.title,
      'new_update'
    );

    // For now, just log the click - you can add navigation logic later
    console.log('New update clicked:', update);
  };
  
  return (
    <aside className="card">
      <div className="card-header">
        <h3 className="heading-primary">
          🔄 {locale === 'hi' ? 'नया अपडेट' : 'New Update'}
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {newUpdates.length > 0 ? (
          newUpdates.map((update) => (
            <article 
              key={update.uid} 
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleNewUpdateClick(update)}
            >
              <div className="space-y-3">
                {/* Image container */}
                {update.file && update.file.url && (
                  <div className="new-update-image-container">
                    <img 
                      src={update.file.url} 
                      alt={update.file.filename || update.title}
                      className="new-update-image"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="heading-secondary line-clamp-2">
                    {translateToHindi(update.title, locale)}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="badge badge-blue">
                      {locale === 'hi' ? 'नया' : 'New'}
                    </span>
                    <span className="text-blue-600 text-sm font-medium">
                      {locale === 'hi' ? 'देखें →' : 'View →'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">🔄</div>
            <p className="text-muted text-sm">
              {locale === 'hi' ? 'इस समय कोई नया अपडेट उपलब्ध नहीं है' : 'No new updates available at the moment'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

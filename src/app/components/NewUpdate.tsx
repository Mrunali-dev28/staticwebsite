'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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

  const handleReadButtonClick = () => {
    // Navigate to the specific sidebar news entry
    const targetEntryId = 'blt54a9e6762def9a93';
    const targetUrl = `/${locale}/sidebar-news/${targetEntryId}`;
    console.log('Navigating to:', targetUrl);
    router.push(targetUrl);
  };
  
  // Debug logging
  console.log('🔍 NewUpdateWidget received data:', {
    count: newUpdates?.length || 0,
    updates: newUpdates?.map((update: any) => ({
      uid: update.uid,
      title: update.title,
      type: update._content_type_uid || 'unknown'
    }))
  });
  
  return (
    <aside className="card">
      <div className="card-header">
        <h3 className="heading-primary">
          🔄 {locale === 'hi' ? 'नया अपडेट' : 'New Update'}
        </h3>
        {/* Debug info */}
        <div className="text-xs text-gray-500 mt-1">
          Found {newUpdates?.length || 0} updates
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {newUpdates && newUpdates.length > 0 ? (
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadButtonClick();
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                    >
                      {locale === 'hi' ? 'पढ़ें' : 'Read'}
                    </button>
                  </div>
                  {/* Debug info */}
                  <div className="text-xs text-gray-400">
                    UID: {update.uid} | Type: {(update as any)._content_type_uid || 'unknown'}
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
            {/* Debug info */}
            <div className="text-xs text-gray-400 mt-2">
              Data received: {newUpdates ? 'Array with ' + newUpdates.length + ' items' : 'No data'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

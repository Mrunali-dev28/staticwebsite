import React from 'react';
import { LiveUpdate, NewsAuthor } from '@/lib/contentstack';
import { translateToHindi } from '@/lib/contentstack-helpers';

interface LiveUpdatesProps {
  liveUpdates: LiveUpdate[];
  authors?: NewsAuthor[];
  locale?: string;
}

// Content comes directly from CMS with proper locale

export default function LiveUpdates({ liveUpdates, authors = [], locale = 'en' }: LiveUpdatesProps) {
  if (!liveUpdates || liveUpdates.length === 0) {
    return null;
  }

  // Helper function to get random author
  const getRandomAuthor = () => {
    if (authors.length === 0) return null;
    return authors[Math.floor(Math.random() * authors.length)];
  };

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="live-updates-header">
        <div className="live-indicator">
          <div className="live-dot"></div>
          <h3 className="font-bold text-base">{translateToHindi('LIVE UPDATES', locale)}</h3>
        </div>
        <span className="text-sm bg-red-700 px-3 py-1 rounded-full">
          {liveUpdates.length} {translateToHindi('updates', locale)}
        </span>
      </div>

      {/* Updates List - Each update as separate card */}
      <div className="space-y-4">
        {liveUpdates.map((update, index) => {
          const author = getRandomAuthor();
          return (
            <div 
              key={update.uid} 
              className={`update-card ${
                index === 0 ? 'border-red-200 bg-red-50' : ''
              }`}
            >
              {/* Update Header */}
              <div className={`update-header ${
                index === 0 ? 'bg-red-100' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-600">
                      {translateToHindi('Update #', locale)}{index + 1}
                    </span>
                    {index === 0 && (
                      <span className="badge badge-red">
                        {translateToHindi('LATEST', locale)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>🕒</span>
                    <span>{translateToHindi('Just now', locale)}</span>
                  </div>
                </div>
              </div>

              {/* Update Content */}
              <div className="update-content">
                <h4 className="heading-secondary line-clamp-2">
                  {translateToHindi(update.title, locale)}
                </h4>
              </div>

              {/* Update Footer */}
              <div className={`update-footer ${
                index === 0 ? 'bg-red-50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  {author ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👤</span>
                      <span className="font-medium text-gray-700">{translateToHindi(author.title, locale)}</span>
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 
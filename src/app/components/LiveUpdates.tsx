import React from 'react';
import { LiveUpdate, NewsAuthor } from '@/lib/contentstack';

interface LiveUpdatesProps {
  liveUpdates: LiveUpdate[];
  authors?: NewsAuthor[];
}

export default function LiveUpdates({ liveUpdates, authors = [] }: LiveUpdatesProps) {
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
      <div className="bg-red-600 text-white px-6 py-4 rounded-t-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h3 className="font-bold text-base">LIVE UPDATES</h3>
          </div>
          <span className="text-sm bg-red-700 px-3 py-1 rounded-full">
            {liveUpdates.length} updates
          </span>
        </div>
      </div>

      {/* Updates List - Each update as separate card */}
      <div className="space-y-4">
        {liveUpdates.map((update, index) => {
          const author = getRandomAuthor();
          return (
            <div 
              key={update.uid} 
              className={`border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
                index === 0 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Update Header */}
              <div className={`px-6 py-3 rounded-t-lg ${
                index === 0 ? 'bg-red-100' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-600">
                      Update #{index + 1}
                    </span>
                    {index === 0 && (
                      <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full">
                        LATEST
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>🕒</span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>

              {/* Update Content */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 text-base leading-tight mb-3">
                  {update.title}
                </h4>
              </div>

              {/* Update Footer */}
              <div className={`px-6 py-3 rounded-b-lg text-sm text-gray-500 ${
                index === 0 ? 'bg-red-50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  {author ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👤</span>
                      <span className="font-medium text-gray-700">{author.title}</span>
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
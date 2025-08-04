import React from 'react';
import Image from 'next/image';

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
  reference?: unknown;
  hgvgh767?: boolean;
  b12jh7t7?: boolean;
}

interface NewsChannelProps {
  newsChannelEntries: NewsChannelEntry[];
}

export default function NewsChannel({ newsChannelEntries }: NewsChannelProps) {
  if (!newsChannelEntries || newsChannelEntries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📺 News Channel</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📺</div>
          <p className="text-gray-500">No news channel entries available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">📺 News Channel</h3>
      
      <div className="space-y-4">
        {newsChannelEntries.map((entry) => (
          <div key={entry.uid} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Image */}
              {entry.file && (
                <div className="flex-shrink-0">
                  <Image 
                    src={entry.file.url} 
                    alt={entry.file.filename}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg mb-2">
                  {entry.title}
                </h4>
                
                {/* URL */}
                {entry.url && (
                  <p className="text-blue-600 text-sm mb-2">
                    <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {entry.url}
                    </a>
                  </p>
                )}
                
                {/* Date */}
                {entry.date && (
                  <p className="text-gray-500 text-sm mb-2">
                    📅 {new Date(entry.date).toLocaleDateString()}
                  </p>
                )}
                
                {/* Number */}
                {entry.number && (
                  <p className="text-gray-600 text-sm mb-2">
                    #️⃣ {entry.number}
                  </p>
                )}
                

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
import React from 'react';
import Image from 'next/image';
import { SidebarNews } from '@/lib/contentstack';

interface SidebarProps {
  sidebarNews: SidebarNews[];
  locale?: 'en' | 'hi';
}

export default function Sidebar({ sidebarNews, locale = 'en' }: SidebarProps) {
  return (
    <aside className="w-full bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-200">
        📰 {locale === 'hi' ? 'नवीनतम अपडेट' : 'Latest Updates'}
      </h3>
      
      <div className="divide-y divide-gray-100">
        {sidebarNews.length > 0 ? (
          sidebarNews.map((news) => (
            <article key={news.uid} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="space-y-3">
                {news.file && (
                  <div className="w-full">
                    <Image 
                      src={news.file.url} 
                      alt={news.file.filename}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {news.title}
                  </h4>
                  {news.descrption && (
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {news.descrption}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {locale === 'hi' ? 'तोड़फोड़' : 'Breaking'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📰</div>
            <p className="text-gray-500 text-sm">
              {locale === 'hi' ? 'इस समय कोई साइडबार समाचार उपलब्ध नहीं है' : 'No sidebar news available at the moment'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
} 
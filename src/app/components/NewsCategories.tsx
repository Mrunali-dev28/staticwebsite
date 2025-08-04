import React from 'react';
import Image from 'next/image';
import { NewsCategory } from '@/lib/contentstack';

interface NewsCategoriesProps {
  newsCategories: NewsCategory[];
}

export default function NewsCategories({ newsCategories }: NewsCategoriesProps) {
  if (!newsCategories || newsCategories.length === 0) {
    return (
      <aside className="w-full bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-200">
          📂 समाचार श्रेणियां
        </h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📂</div>
          <p className="text-gray-500 text-sm">
            इस समय कोई श्रेणियां उपलब्ध नहीं हैं
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-200">
        📂 समाचार श्रेणियां
      </h3>
      
      <div className="divide-y divide-gray-100">
        {newsCategories.map((category) => (
          <article key={category.uid} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="space-y-3">
              {category.file && (
                <div className="w-full">
                  <Image 
                    src={category.file.url} 
                    alt={category.file.filename}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {category.title}
                </h4>
                {category.rich_text_editor && (
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {category.rich_text_editor}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  {category.url && (
                    <a 
                      href={category.url}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      श्रेणी देखें →
                    </a>
                  )}
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    श्रेणी
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
} 
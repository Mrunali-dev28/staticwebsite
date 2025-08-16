import React from 'react';
import Image from 'next/image';
import { NewsCategory } from '@/lib/contentstack';

interface NewsCategoriesProps {
  newsCategories: NewsCategory[];
  locale?: 'en' | 'hi';
}

export default function NewsCategories({ newsCategories, locale = 'en' }: NewsCategoriesProps) {
  // Debug logging
  console.log('NewsCategories Component - Received categories:', newsCategories);
  console.log('NewsCategories Component - Categories length:', newsCategories?.length);
  if (newsCategories && newsCategories.length > 0) {
    console.log('NewsCategories Component - First category:', newsCategories[0]);
    console.log('NewsCategories Component - First category file:', newsCategories[0].file);
  }
  
  if (!newsCategories || newsCategories.length === 0) {
    return (
      <aside className="card">
        <div className="card-header">
          <h3 className="heading-primary">
            📂 {locale === 'hi' ? 'समाचार श्रेणियां' : 'News Categories'}
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">📂</div>
          <p className="text-muted text-sm">
            {locale === 'hi' ? 'इस समय कोई श्रेणियां उपलब्ध नहीं हैं' : 'No categories available at the moment'}
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="card">
      <div className="card-header">
        <h3 className="heading-primary">
          📂 {locale === 'hi' ? 'समाचार श्रेणियां' : 'News Categories'}
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {newsCategories.map((category) => (
          <article key={category.uid} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="space-y-3">
              {/* Always show image container - with fallback if no image */}
              <div className="featured-image-container">
                {category.file && category.file.url ? (
                  <img 
                    src={category.file.url} 
                    alt={category.title}
                    className="featured-image"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    📂
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h4 className="heading-secondary line-clamp-2">
                  {category.title}
                </h4>
                {/* Show description only for English locale */}
                {locale === 'en' && category.rich_text_editor && (
                  <p className="text-body text-sm line-clamp-3">
                    {category.rich_text_editor}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
} 
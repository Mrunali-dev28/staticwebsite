'use client';
import React from 'react';
import PersonalizedNews from './PersonalizedNews';

interface PersonalizedNewsWrapperProps {
  locale?: 'en' | 'hi';
}

export default function PersonalizedNewsWrapper({ locale = 'en' }: PersonalizedNewsWrapperProps) {
  console.log('🔍 PersonalizedNewsWrapper: Rendering with locale:', locale);
  return (
    <React.Suspense fallback={
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 text-sm">
            {locale === 'hi' ? 'समाचार लोड हो रहे हैं...' : 'Loading news...'}
          </span>
        </div>
      </div>
    }>
      <PersonalizedNews locale={locale} />
    </React.Suspense>
  );
} 
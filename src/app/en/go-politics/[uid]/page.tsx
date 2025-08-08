import React from 'react';
import Link from 'next/link';
import { fetchGoToPoliticsByUID } from '@/lib/contentstack-helpers';
import type { GoToPolitics } from '@/lib/contentstack';

interface GoPoliticsPageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function GoPoliticsPage({ params }: GoPoliticsPageProps) {
  const { uid } = await params;
  
  // Fetch the go to politics page content
  const politicsPage = await fetchGoToPoliticsByUID(uid) as GoToPolitics | null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/en" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {politicsPage?.title || 'Politics News'}
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Updates */}
          {politicsPage?.updates && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {politicsPage.updates}
                </p>
              </div>
            </div>
          )}

          {/* Latest News */}
          {politicsPage?.latest_news && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
              <div 
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: politicsPage.latest_news }}
              />
            </div>
          )}

          {/* URL Information */}
          {politicsPage?.url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Related Links</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <a 
                  href={politicsPage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {politicsPage.url}
                </a>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/en" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/en/politics-news" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              🏛️ More Politics News
            </Link>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              📰 Latest Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
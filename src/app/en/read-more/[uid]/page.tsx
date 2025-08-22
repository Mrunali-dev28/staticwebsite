import React from 'react';
import Link from 'next/link';
import { fetchReadMorePageByUID, fetchNewUpdateByUID } from '@/lib/contentstack-helpers';
import type { ReadMorePage as ReadMorePageType, NewUpdate as NewUpdateType } from '@/lib/contentstack';

interface ReadMorePageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function ReadMorePage({ params }: ReadMorePageProps) {
  const { uid } = await params;
  
  // Try to fetch the read more page content first
  const readMorePage = await fetchReadMorePageByUID(uid) as ReadMorePageType | null;
  let newUpdate = null;
  
  // If read more page not found, try to fetch as new update
  if (!readMorePage) {
    newUpdate = await fetchNewUpdateByUID(uid) as NewUpdateType | null;
  }

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
            {readMorePage?.title || newUpdate?.title || 'Read More Page'}
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* New Update Content */}
          {newUpdate && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Latest Update</h2>
              
              {/* Image */}
              {newUpdate.file && newUpdate.file.url && (
                <div className="mb-6">
                  <img 
                    src={newUpdate.file.url} 
                    alt={newUpdate.file.filename || newUpdate.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {newUpdate.title}
              </h3>
              
              {/* Description */}
              {newUpdate.description && (
                <div 
                  className="prose max-w-none text-gray-700 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: newUpdate.description }}
                />
              )}
              
              {/* Rich Text Content */}
              {newUpdate.rich_text_editor && (
                <div 
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: newUpdate.rich_text_editor }}
                />
              )}
            </div>
          )}
          
          {/* Latest Updates (for read more pages) */}
          {readMorePage?.latest_updates && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
              <div 
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: readMorePage.latest_updates }}
              />
            </div>
          )}

          {/* Emergency Contacts */}
          {readMorePage?.emergency_contacts && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-lg font-semibold text-red-800 mb-2">
                  Emergency Number: {readMorePage.emergency_contacts}
                </p>
                <p className="text-gray-700">
                  Call this number for immediate assistance during emergencies.
                </p>
              </div>
            </div>
          )}

          {/* URL Information */}
          {readMorePage?.url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Related Links</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <a 
                  href={readMorePage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {readMorePage.url}
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
            {readMorePage?.emergency_contacts && (
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                📞 Emergency: {readMorePage.emergency_contacts}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import { notFound } from 'next/navigation';
import { fetchSidebarNewsByUID } from '@/lib/contentstack-helpers';
import { SidebarNews } from '@/lib/contentstack';
import { translateToHindi } from '@/lib/contentstack-helpers';

interface SidebarNewsPageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function SidebarNewsPage({ params }: SidebarNewsPageProps) {
  const { uid } = await params;

  try {
    // Fetch the specific sidebar news entry
    const sidebarNewsEntry = await fetchSidebarNewsByUID(uid);

    if (!sidebarNewsEntry) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {translateToHindi(sidebarNewsEntry.title, 'hi')}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>📰 साइडबार समाचार</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image */}
            {sidebarNewsEntry.file && sidebarNewsEntry.file.url && (
              <div className="w-full h-96 relative">
                <img
                  src={sidebarNewsEntry.file.url}
                  alt={sidebarNewsEntry.file.filename || sidebarNewsEntry.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {translateToHindi(sidebarNewsEntry.title, 'hi')}
              </h2>

              {/* Description */}
              {sidebarNewsEntry.descrption && (
                <div className="prose prose-lg max-w-none mb-6">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: translateToHindi(sidebarNewsEntry.descrption, 'hi') 
                    }}
                  />
                </div>
              )}



              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <span className="badge badge-red">
                  तोड़फोड़
                </span>
                <a 
                  href="/hi"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  ← समाचार पर वापस जाएं
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching sidebar news entry:', error);
    notFound();
  }
}

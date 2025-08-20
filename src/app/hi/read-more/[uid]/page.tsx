import React from 'react';
import Link from 'next/link';
import { fetchHindiReadMorePageByUID, fetchNewUpdateByUID } from '@/lib/contentstack-helpers';
import type { ReadMorePage as ReadMorePageType, NewUpdate as NewUpdateType } from '@/lib/contentstack';

interface ReadMorePageProps {
  params: Promise<{
    uid: string;
  }>;
}

export default async function ReadMorePage({ params }: ReadMorePageProps) {
  const { uid } = await params;
  
  // Try to fetch the Hindi read more page content first
  let readMorePage = await fetchHindiReadMorePageByUID(uid) as ReadMorePageType | null;
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
            href="/hi" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← होम पर वापस जाएं
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {readMorePage?.title === 'Monsoon news' ? 'मानसून समाचार' : (readMorePage?.title || newUpdate?.title || 'और पढ़ें पेज')}
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* New Update Content */}
          {newUpdate && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">नवीनतम अपडेट</h2>
              
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
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>नोट:</strong> यह सामग्री अभी अंग्रेजी में है। कृपया CMS में हिंदी में अनुवाद करें।
                </p>
              </div>
            </div>
          )}
          
          {/* Latest Updates (for read more pages) */}
          {readMorePage?.latest_updates && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">नवीनतम अपडेट</h2>
              <div 
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: readMorePage.latest_updates }}
              />
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>नोट:</strong> यह सामग्री अभी अंग्रेजी में है। कृपया CMS में हिंदी में अनुवाद करें।
                </p>
              </div>
            </div>
          )}

          {/* Emergency Contacts */}
          {readMorePage?.emergency_contacts && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">आपातकालीन संपर्क</h2>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-lg font-semibold text-red-800 mb-2">
                  आपातकालीन नंबर: {readMorePage.emergency_contacts}
                </p>
                <p className="text-gray-700">
                  आपातकाल के दौरान तत्काल सहायता के लिए इस नंबर पर कॉल करें।
                </p>
              </div>
            </div>
          )}

          {/* URL Information */}
          {readMorePage?.url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">संबंधित लिंक</h2>
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
              href="/hi" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← होम पर वापस जाएं
            </Link>
            {readMorePage?.emergency_contacts && (
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                📞 आपातकाल: {readMorePage.emergency_contacts}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
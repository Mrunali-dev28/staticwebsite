import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchMonsoonNewsByUID, listAllNewsChannelEntries, debugContentstackEntry } from '@/lib/contentstack-helpers';
import { MonsoonNews } from '@/lib/contentstack';
import BackButton from '@/components/BackButton';

export default async function MonsoonNewsPage() {
  // First, let's debug the Contentstack API to find the correct content type
  const debugResult = await debugContentstackEntry('blt35f13c9354f221a8');
  
  // Get all available entries for fallback
  const allEntries = await listAllNewsChannelEntries();
  
  // Try to fetch the specific monsoon news entry
  let monsoonNews = await fetchMonsoonNewsByUID('blt35f13c9354f221a8') as MonsoonNews | null;
  
  // If the specific entry doesn't exist, use the first available entry
  if (!monsoonNews && allEntries.length > 0) {
    console.log('Using first available entry as monsoon news');
    monsoonNews = allEntries[0] as MonsoonNews;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <BackButton 
            href="/en" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            fallbackText="Back"
          >
            ← Back to Home
          </BackButton>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {monsoonNews?.title || 'Monsoon Flood Alert'}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>🚨 Breaking News</span>
            <span>•</span>
            <span>{monsoonNews?.location || 'Mumbai & Pune'}</span>
            <span>•</span>
            <span>Weather Alert</span>
            {monsoonNews?.date && (
              <>
                <span>•</span>
                <span>{new Date(monsoonNews.date).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Alert Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h2 className="text-2xl font-bold">
                  {monsoonNews?.severity || 'Heavy Rain Warning'}
                </h2>
                <p className="text-red-100">
                  {monsoonNews?.location ? `Issued for ${monsoonNews.location}` : 'Issued for Mumbai and Pune'}
                </p>
              </div>
            </div>
            <div className="bg-red-500 bg-opacity-30 p-4 rounded-lg">
              <p className="text-lg">
                {monsoonNews?.description || '⚠️ Heavy rain warning issued for Mumbai and Pune. Stay indoors and avoid unnecessary travel.'}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          {monsoonNews?.file && (
            <div className="mb-6">
              <Image 
                src={monsoonNews.file.url} 
                alt={monsoonNews.file.filename}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* News Content */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Latest Updates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🌧️ Rainfall Intensity</h4>
                <p className="text-gray-700">
                  {monsoonNews?.weather_updates || 'Heavy to very heavy rainfall expected in Mumbai and Pune regions with isolated extremely heavy rainfall.'}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Safety Advisory</h4>
                <p className="text-gray-700">
                  {monsoonNews?.safety_advisory || 'Citizens advised to stay indoors, avoid low-lying areas, and follow official weather updates.'}
                </p>
              </div>
            </div>

            {/* Rich Text Content */}
            {monsoonNews?.rich_text_editor && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Detailed Report</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: monsoonNews.rich_text_editor }}
                />
              </div>
            )}

            <h3 className="text-xl font-semibold mb-4">Affected Areas</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              {monsoonNews?.affected_areas && monsoonNews.affected_areas.length > 0 ? (
                monsoonNews.affected_areas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))
              ) : (
                <>
                  <li>Mumbai Metropolitan Region</li>
                  <li>Pune City and surrounding areas</li>
                  <li>Coastal Maharashtra</li>
                  <li>Western Ghats region</li>
                </>
              )}
            </ul>

            <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monsoonNews?.emergency_contacts && monsoonNews.emergency_contacts.length > 0 ? (
                  monsoonNews.emergency_contacts.map((contact, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800">{contact.title}</h4>
                      <p className="text-gray-600">{contact.number}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-800">Mumbai Emergency</h4>
                      <p className="text-gray-600">100 (Police) • 101 (Fire) • 108 (Ambulance)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Pune Emergency</h4>
                      <p className="text-gray-600">100 (Police) • 101 (Fire) • 108 (Ambulance)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📱 Stay Updated</h4>
              <p className="text-gray-700">
                Follow official weather updates from IMD and local authorities. 
                Download weather apps for real-time alerts and stay safe during monsoon season.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <BackButton 
              href="/en" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              fallbackText="Backup"
            >
              ← Back to Home
            </BackButton>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              📞 Emergency Helpline
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              📱 Weather App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

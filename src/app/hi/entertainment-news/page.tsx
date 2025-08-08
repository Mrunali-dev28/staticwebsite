import React from 'react';
import Link from 'next/link';
import {
  fetchHindiSidebarNews,
  fetchHindiBreakingAlerts,
  fetchHindiNewsAuthors,
  fetchHindiNewsChannelEntries,
  fetchHindiLiveUpdates,
  fetchHindiNewsCategories,
  fetchHindiEmailSubscription
} from '@/lib/contentstack-helpers';
import { SidebarNews, BreakingAlert, NewsAuthor, NewsCategory, LiveUpdate, EmailSubscription } from '@/lib/contentstack';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import BreakingAlertComponent from '../../components/BreakingAlert';
import LiveUpdates from '../../components/LiveUpdates';
import EmailSubscriptionComponent from '../../components/EmailSubscription';

export default async function HindiEntertainmentNewsPage() {
  try {
    const [
      sidebarNews,
      breakingAlerts,
      newsAuthors,
      newsChannelEntries,
      liveUpdates,
      newsCategories,
      emailSubscription
    ] = await Promise.all([
      fetchHindiSidebarNews(),
      fetchHindiBreakingAlerts(),
      fetchHindiNewsAuthors(),
      fetchHindiNewsChannelEntries(),
      fetchHindiLiveUpdates(),
      fetchHindiNewsCategories(),
      fetchHindiEmailSubscription()
    ]) as [any[], any[], any[], any[], LiveUpdate[], any[], EmailSubscription | null];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          globalSettings={[]}
          currentLanguage="Hindi"
        />

        {/* Breaking Alerts */}
        <BreakingAlertComponent breakingAlerts={breakingAlerts} locale="hi" />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link href="/hi" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← वापस होम पर जाएं
            </Link>
          </div>

          {/* Page Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🎬 मनोरंजन समाचार</h1>
            <p className="text-gray-600 text-lg">
              बॉलीवुड, हॉलीवुड और सेलिब्रिटी समाचार की ताज़ा जानकारी
            </p>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column - Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <Sidebar sidebarNews={sidebarNews} locale="hi" />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                
                {/* Entertainment News Content */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">ताज़ा मनोरंजन समाचार</h2>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        नई फिल्म रिलीज
                      </h3>
                      <p className="text-gray-600 mb-2">
                        बॉलीवुड की नई फिल्म ने बॉक्स ऑफिस पर धमाल मचाया...
                      </p>
                      <span className="text-sm text-gray-500">2 घंटे पहले</span>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        सेलिब्रिटी शादी
                      </h3>
                      <p className="text-gray-600 mb-2">
                        बॉलीवुड स्टार की शादी में ग्लैमर और ग्लिट्ज़...
                      </p>
                      <span className="text-sm text-gray-500">4 घंटे पहले</span>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        टीवी शो अपडेट
                      </h3>
                      <p className="text-gray-600 mb-2">
                        नए टीवी शो ने दर्शकों का ध्यान आकर्षित किया...
                      </p>
                      <span className="text-sm text-gray-500">6 घंटे पहले</span>
                    </div>
                  </div>
                </div>

                {/* Live Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                  <LiveUpdates liveUpdates={liveUpdates} />
                </div>
              </div>
            </div>

            {/* Right Column - News Categories */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">समाचार श्रेणियां</h3>
                <div className="space-y-2">
                  {newsCategories && newsCategories.length > 0 ? (
                    newsCategories.map((category, index) => (
                      <div key={category.uid || index} className="p-2 hover:bg-gray-50 rounded">
                        <Link href={`/hi/category/${category.uid}`} className="text-blue-600 hover:text-blue-800">
                          {category.title}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      <Link href="/hi/politics-news" className="block p-2 hover:bg-gray-50 rounded text-blue-600 hover:text-blue-800">
                        🏛️ राजनीति
                      </Link>
                      <Link href="/hi/sports-news" className="block p-2 hover:bg-gray-50 rounded text-green-600 hover:text-green-800">
                        ⚽ खेल
                      </Link>
                      <Link href="/hi/entertainment-news" className="block p-2 hover:bg-gray-50 rounded text-purple-600 hover:text-purple-800">
                        🎬 मनोरंजन
                      </Link>
                      <Link href="/hi/technology-news" className="block p-2 hover:bg-gray-50 rounded text-blue-600 hover:text-blue-800">
                        💻 तकनीक
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-8">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p>&copy; 2024 आज तक. सर्वाधिकार सुरक्षित.</p>
            </div>
            
            {/* Email Subscription */}
            <div className="mt-8">
              <EmailSubscriptionComponent emailSubscriptionData={emailSubscription} />
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error in HindiEntertainmentNewsPage:', error);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header globalSettings={[]} currentLanguage="Hindi" />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">आज तक</h1>
            <p className="text-xl text-gray-600 mb-8">समाचार और अपडेट के लिए आपका विश्वसनीय स्रोत</p>
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-semibold mb-4">ताज़ा समाचार</h2>
              <p className="text-gray-600">हम वर्तमान में अपनी सामग्री अपडेट कर रहे हैं। कृपया नवीनतम समाचार और अपडेट के लिए जल्द ही वापस जांचें।</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
} 
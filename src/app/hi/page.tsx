import React from 'react';
import Image from 'next/image';
import {
  fetchLanguageSwitchButton,
  fetchHindiNewsCategories,
  fetchHindiNewsAuthors,
  fetchHindiSidebarNews,
  fetchHindiBreakingAlerts,
  fetchHindiLiveUpdates,
  fetchHindiTrending,
  fetchHindiNewsChannelEntries,
  fetchHindiEmailSubscription,
  fetchHindiGlobalSettings,
  fetchContactByUID,
  translateToHindi
} from '@/lib/contentstack-helpers';
import { SidebarNews, BreakingAlert, NewsCategory, NewsAuthor, LiveUpdate, Trending, LanguageSwitchButton, EmailSubscription, GlobalSetting, Contact } from '@/lib/contentstack';

import Header from '../components/Header';
import NewsChannel from '../components/NewsChannel';
import Sidebar from '../components/Sidebar';
import NewsCategories from '../components/NewsCategories';
import LiveUpdates from '../components/LiveUpdates';
import BreakingAlertComponent from '../components/BreakingAlert';
import PersonalizedNewsWrapper from '../components/PersonalizedNewsWrapper';
import EmailSubscriptionComponent from '../components/EmailSubscription';

// Add ISR configuration for automatic revalidation
export const revalidate = 10; // Revalidate every 10 seconds for faster updates

export default async function HindiHomePage() {
  // Add cache busting timestamp
  const timestamp = Date.now();
  
  // Add cache control headers
  const headers = {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
  };
  
  try {
    // Fetch all Hindi content
    const [
      globalSettings,
      sidebarNews,
      breakingAlerts,
      newsCategories,
      newsAuthors,
      liveUpdates,
      newsChannelEntries,
      trendingData,
      languageSwitchButton,
      emailSubscription,
      contactData
    ] = await Promise.all([
      fetchHindiGlobalSettings(),
      fetchHindiSidebarNews(),
      fetchHindiBreakingAlerts(),
      fetchHindiNewsCategories(),
      fetchHindiNewsAuthors(),
      fetchHindiLiveUpdates(),
      fetchHindiNewsChannelEntries(),
      fetchHindiTrending(),
      fetchLanguageSwitchButton(),
      fetchHindiEmailSubscription(),
      fetchContactByUID('bltbfc790959321e33f')
    ]) as [
      GlobalSetting[],
      SidebarNews[],
      BreakingAlert[],
      NewsCategory[],
      NewsAuthor[],
      LiveUpdate[],
      Trending[],
      Trending[],
      LanguageSwitchButton | null,
      EmailSubscription | null,
      Contact | null
    ];

    // Fallback language switch button data for Hindi
    const fallbackHindiLanguageSwitchButton: LanguageSwitchButton = {
      uid: 'language_switch_button_hindi',
      title: 'भाषा',
      dropdown: ['हिंदी', 'ENGLISH'],
      choose_language: [
        {
          single_line: 'हिंदी',
          link: {
            title: 'हिंदी में रहें',
            url: '/hi'
          }
        },
        {
          single_line: 'English',
          link: {
            title: 'Switch to English',
            url: '/en'
          }
        }
      ]
    };

    // Use Hindi content directly (translations are handled in helper functions)
    const displayLanguageSwitchButton = languageSwitchButton || fallbackHindiLanguageSwitchButton;
    const displaySidebarNews = sidebarNews;
    const displayBreakingAlerts = breakingAlerts;
    const displayNewsCategories = newsCategories;
    const displayNewsAuthors = newsAuthors;
    
    // Simple fix: Only show first 2 updates for Hindi page
    const displayLiveUpdates = liveUpdates.slice(0, 2);
    
    const displayTrending = trendingData;
    const displayNewsChannelEntries = newsChannelEntries;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          globalSettings={globalSettings}
          languageSwitchButton={displayLanguageSwitchButton || undefined}
          currentLanguage="Hindi"
        />

        {/* Breaking Alerts */}
        <BreakingAlertComponent breakingAlerts={displayBreakingAlerts} locale="hi" />

        {/* Main Content Area - Hindi Version */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Trending Topics */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-800 text-base whitespace-nowrap">🔥 ट्रेंडिंग:</span>
              <div className="flex items-center gap-3 flex-1">
                {displayTrending && displayTrending.length > 0 ? (
                  <>
                    {displayTrending[0].modular_blocks && displayTrending[0].modular_blocks.length > 0 ? (
                      displayTrending[0].modular_blocks.map((block, index) => (
                        block.link && (
                          <div key={block.link._metadata?.uid || index} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <a 
                              href={block.link.href} 
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap"
                              title={block.link.description}
                            >
                              {block.link.title}
                            </a>
                          </div>
                        )
                      ))
                    ) : displayTrending[0]._embedded_items && Object.keys(displayTrending[0]._embedded_items).length > 0 ? (
                      Object.entries(displayTrending[0]._embedded_items).map(([key, items]) => (
                        items && items.length > 0 && items.map((item, index) => (
                          <div key={`${key}_${index}`} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                              {item.title || item.single_line || key}
                            </span>
                          </div>
                        ))
                      ))
                    ) : (
                      <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                          {displayTrending[0].title || 'ट्रेंडिंग समाचार'}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/hi/politics-news" className="text-red-600 hover:text-red-800 font-semibold text-sm whitespace-nowrap">🏛️ राजनीति</a>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/hi/entertainment-news" className="text-purple-600 hover:text-purple-800 font-semibold text-sm whitespace-nowrap">🎬 मनोरंजन</a>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/hi/technology-news" className="text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap">💻 तकनीक</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Personalized News */}
          <PersonalizedNewsWrapper locale="hi" newsChannelEntries={displayNewsChannelEntries} />

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column - News Channel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <NewsChannel 
                  newsChannelEntries={displayNewsChannelEntries} 
                  locale="hi" 
                  key={`news-channel-${timestamp}`}
                />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {/* Sidebar News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <Sidebar sidebarNews={displaySidebarNews} locale="hi" />
                </div>
                
                {/* News Categories */}
                <div className="bg-white rounded-lg shadow p-4">
                  <NewsCategories newsCategories={displayNewsCategories} locale="hi" />
                </div>
              </div>
            </div>

            {/* Right Column - Updates */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {/* Live Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                  <LiveUpdates liveUpdates={displayLiveUpdates} authors={displayNewsAuthors} locale="hi" />
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* Footer with Hindi content */}
        <footer className="bg-gray-800 text-white mt-8">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start">
              
              {/* Author Information */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">हमारी टीम</h3>
                {displayNewsAuthors && displayNewsAuthors.length > 0 ? (
                  <div className="space-y-4">
                    {displayNewsAuthors.slice(0, 3).map((author) => (
                      <div key={author.uid} className="flex items-center space-x-3">
                        {author.file ? (
                          <Image 
                            src={author.file.url} 
                            alt={author.file.filename}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-white text-sm">👤</span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">{translateToHindi(author.title, 'hi')}</div>
                          {author.rich_text_editor && (
                            <div className="text-xs text-gray-400 line-clamp-2">
                              {translateToHindi(author.rich_text_editor.replace(/<[^>]*>/g, ''), 'hi')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {displayNewsAuthors.length > 3 && (
                      <div className="text-sm text-gray-400 mt-2">
                        +{displayNewsAuthors.length - 3} और लेखक
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">राहुल शर्मा</div>
                        <div className="text-xs text-gray-400">राजनीतिक संवाददाता</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">प्रिया वर्मा</div>
                        <div className="text-xs text-gray-400">तकनीकी संपादक</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">अमित कुमार</div>
                        <div className="text-xs text-gray-400">खेल पत्रकार</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      +2 और लेखक
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="text-right">
                <h3 className="text-xl font-bold mb-4">संपर्क</h3>
                <div className="space-y-3">
                  {contactData ? (
                    <>
                      <h4 className="text-sm font-medium text-white">{contactData.title}</h4>
                      {contactData.rich_text_editor && (
                        <div className="text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: contactData.rich_text_editor }} />
                      )}
                      {contactData.single_line && <p className="text-xs text-gray-400">{contactData.single_line}</p>}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-end space-x-3">
                        <div>
                          <div className="text-sm font-medium text-white">ईमेल</div>
                          <div className="text-xs text-gray-400">info@mychannelsabsetej.com</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-xs">📧</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-3">
                        <div>
                          <div className="text-sm font-medium text-white">फोन</div>
                          <div className="text-xs text-gray-400">+1 (888) 888-6786</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                          <span className="text-white text-xs">📞</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-3">
                        <div>
                          <div className="text-sm font-medium text-white">पता</div>
                          <div className="text-xs text-gray-400">123 न्यूज़ स्ट्रीट, मीडिया सिटी</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-white text-xs">📍</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Email Subscription */}
            <div className="mt-8">
              <EmailSubscriptionComponent emailSubscriptionData={emailSubscription} />
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; 2024 मेरा चैनल सबसे तेज। सर्वाधिकार सुरक्षित।</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error loading Hindi page:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            कुछ गलत हो गया
          </h1>
          <p className="text-gray-600 mb-8">
            पेज लोड करने में समस्या आ रही है। कृपया पुनः प्रयास करें।
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            पेज रीलोड करें
          </button>
        </div>
      </div>
    );
  }
} 
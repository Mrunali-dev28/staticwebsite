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
  fetchHindiNewsChannelEntries
} from '@/lib/contentstack-helpers';
import { SidebarNews, BreakingAlert, NewsCategory, NewsAuthor, LiveUpdate, Trending, LanguageSwitchButton } from '@/lib/contentstack';

import Header from '../components/Header';
import NewsChannel from '../components/NewsChannel';
import Sidebar from '../components/Sidebar';
import NewsCategories from '../components/NewsCategories';

import LiveUpdates from '../components/LiveUpdates';
import BreakingAlertComponent from '../components/BreakingAlert';

export default async function HindiHomePage() {
  try {
    // NEW: Use the universal function for all Hindi content
    const [
      sidebarNews,
      breakingAlerts,
      newsCategories,
      newsAuthors,
      liveUpdates,
      newsChannelEntries,
      trendingData,
      languageSwitchButton
    ] = await Promise.all([
      fetchHindiSidebarNews(),
      fetchHindiBreakingAlerts(),
      fetchHindiNewsCategories(),
      fetchHindiNewsAuthors(),
      fetchHindiLiveUpdates(),
      fetchHindiNewsChannelEntries(),
      fetchHindiTrending(),
      fetchLanguageSwitchButton()
    ]) as [
      SidebarNews[],
      BreakingAlert[],
      NewsCategory[],
      NewsAuthor[],
      LiveUpdate[],
      Trending[],
      Trending[],
      LanguageSwitchButton | null
    ];

    // Debug: Log what content is being fetched
    console.log('DEBUG - Sidebar News Content:', sidebarNews.map(item => ({
      title: item.title,
      descrption: item.descrption
    })));
    console.log('DEBUG - Live Updates Content:', liveUpdates.map(item => ({
      title: item.title
    })));
    console.log('DEBUG - Breaking Alerts Content:', breakingAlerts.map(item => ({
      title: item.title,
      rich_text_editor: item.rich_text_editor
    })));
    console.log('DEBUG - News Categories Content:', newsCategories.map(item => ({
      title: item.title,
      uid: item.uid
    })));
    console.log('DEBUG - Language Switch Button:', languageSwitchButton);

    // Check if content is in Hindi or English
    const isHindiContent = (text: string): boolean => {
      if (!text) return false;
      const hindiRegex = /[\u0900-\u097F]/;
      return hindiRegex.test(text);
    };

    // Log content language detection
    sidebarNews.forEach((item, index) => {
      console.log(`Sidebar News ${index + 1}:`, {
        title: item.title,
        isHindi: isHindiContent(item.title),
        descrption: item.descrption,
        isHindiDesc: isHindiContent(item.descrption || '')
      });
    });

    // Force Hindi content for now (temporary fix)
    const hindiSidebarNews = sidebarNews.map(item => ({
      ...item,
      title: item.title.includes('Modi') ? '"मोदी और शाह ने एक ही दिन राष्ट्रपति से मुलाकात की... क्या 5 अगस्त से कोई संबंध है?"' : item.title,
      descrption: item.descrption?.includes('Modi') ? '<strong>मोदी और शाह ने एक ही दिन राष्ट्रपति से मुलाकात की... क्या 5 अगस्त से कोई संबंध है?</strong><br/>मानसून सत्र के दौरान, प्रधानमंत्री नरेंद्र मोदी और गृह मंत्री अमित शाह ने एक ही दिन राष्ट्रपति द्रौपदी मुर्मू से मुलाकात की।' : item.descrption
    }));

    const hindiLiveUpdates = liveUpdates.map(item => ({
      ...item,
      title: item.title.includes('Story') ? '"कहानी | कविता की बीमारी | स्टोरीबॉक्स विद जमशेद"' : 
             item.title.includes('iPhone') ? '"iPhone 16 Pro पर भारी छूट, iPhone 17 लॉन्च से पहले बदलाव"' :
             item.title.includes('scooty') ? '"वह स्कूटी पर था, हेलमेट पहने हुए... — महिला सांसद ने क्या बताया"' : item.title
    }));

    const hindiBreakingAlerts = breakingAlerts.map(item => ({
      ...item,
      title: item.title.includes('Monsoon') ? 'मानसून बाढ़ अलर्ट' : item.title,
      rich_text_editor: item.rich_text_editor?.includes('Heavy rain') ? '<p>⚠️ मुंबई और पुणे के लिए भारी बारिश की चेतावनी। घर के अंदर रहें।</p>' : item.rich_text_editor
    }));

    const hindiNewsChannelEntries = newsChannelEntries.map(item => ({
      ...item,
      title: item.title?.includes('Heavy Rain') ? '"दिल्ली में भारी बारिश: अलर्ट जारी"' : item.title
    }));

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

    // Fallback Hindi news categories if none found
    const fallbackHindiNewsCategories = [
      {
        uid: 'hindi-sports',
        title: 'खेल',
        rich_text_editor: 'क्रिकेट, फुटबॉल, टेनिस और अन्य खेलों की ताज़ा खबरें',
        url: '#',
        file: {
          filename: 'sports-hindi.jpg',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      }
    ];

    // Use Hindi content with fallback
    const displayLanguageSwitchButton = languageSwitchButton || fallbackHindiLanguageSwitchButton;
    const displaySidebarNews = hindiSidebarNews;
    const displayBreakingAlerts = hindiBreakingAlerts;
    const displayNewsCategories = newsCategories && newsCategories.length > 0 ? newsCategories : fallbackHindiNewsCategories;
    const displayNewsAuthors = newsAuthors;
    const displayLiveUpdates = hindiLiveUpdates;
    const displayTrending = trendingData;
    const displayNewsChannelEntries = hindiNewsChannelEntries;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          globalSettings={[]}
          languageSwitchButton={displayLanguageSwitchButton || undefined}
          currentLanguage="Hindi"
        />

        {/* Breaking Alerts */}
        <BreakingAlertComponent breakingAlerts={displayBreakingAlerts} />

        {/* Main Content Area - Hindi Version */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Trending Topics */}
          <div className="bg-gray-100 p-3 mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-semibold">ट्रेंडिंग:</span>
              {displayTrending && displayTrending.length > 0 && displayTrending[0].modular_blocks ? (
                displayTrending[0].modular_blocks.map((block, index) => (
                  block.link && (
                    <a 
                      key={block.link._metadata?.uid || index}
                      href={block.link.href} 
                      className="text-blue-600 hover:underline"
                    >
                      {block.link.title}
                    </a>
                  )
                ))
              ) : (
                <>
                  <a href="#" className="text-blue-600 hover:underline">राजनीति</a>
                  <a href="#" className="text-blue-600 hover:underline">खेल</a>
                  <a href="#" className="text-blue-600 hover:underline">मनोरंजन</a>
                  <a href="#" className="text-blue-600 hover:underline">तकनीक</a>
                </>
              )}
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column - News Channel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <NewsChannel newsChannelEntries={displayNewsChannelEntries} />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {/* Sidebar News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <Sidebar sidebarNews={displaySidebarNews} />
                </div>
                
                {/* News Categories - Below Latest News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <NewsCategories newsCategories={displayNewsCategories} />
                </div>
              </div>
            </div>

            {/* Right Column - Updates */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {/* Live Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                  <LiveUpdates liveUpdates={displayLiveUpdates} authors={displayNewsAuthors} />
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
                          <div className="text-sm font-medium text-white">{author.title}</div>
                          {author.rich_text_editor && (
                            <div className="text-xs text-gray-400 line-clamp-2">
                              {author.rich_text_editor.replace(/<[^>]*>/g, '')}
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

              {/* Contact Information - Right Corner */}
              <div className="text-right">
                <h3 className="text-xl font-bold mb-4">संपर्क</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <div className="text-sm font-medium text-white">ईमेल</div>
                      <div className="text-xs text-gray-400">info@aajtaknews.com</div>
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
                </div>
              </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; 2024 चैनल 24 न्यूज़। सर्वाधिकार सुरक्षित।</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error loading Hindi page:', error);
    
    // Error fallback UI with Hindi content
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
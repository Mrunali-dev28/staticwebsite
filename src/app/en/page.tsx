import React from 'react';
import { 
  fetchNewsItems, 
  fetchNewsChannelWithModularBlocks,
  fetchAllNewsChannelEntries,
  fetchGlobalSettings,
  fetchSidebarNews,
  fetchBreakingAlerts,
  fetchNewsCategories,
  fetchNewsAuthors,
  fetchLiveUpdates,
  fetchContact,
  fetchTrending,
  fetchLanguageSwitchButton
} from '@/lib/contentstack-helpers';
import { GlobalSetting, SidebarNews, BreakingAlert, NewsCategory, NewsAuthor, LiveUpdate, Contact, Trending, LanguageSwitchButton } from '@/lib/contentstack';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BreakingAlertComponent from '../components/BreakingAlert';
import NewsCategories from '../components/NewsCategories';
import NewsAuthors from '../components/NewsAuthors';
import LiveUpdates from '../components/LiveUpdates';
import NewsChannel from '../components/NewsChannel';

// Simplified interfaces
interface Author {
  uid: string;
  name: string;
  role: string;
}

interface Category {
  uid: string;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
}

interface NewsItem {
  uid: string;
  title: string;
  description?: string;
  category?: Category;
  author?: Author;
  published_date?: string;
}

interface NewsChannelEntry {
  title: string;
  url?: string;
  date?: string;
  boolean?: boolean;
  number?: number;
  link?: {
    title: string;
    url: string;
  };
  uid: string;
}

export default async function EnglishHomePage() {
  try {
    // Fetch all data from Contentstack
    const [
      newsItems,
      globalSettings,
      sidebarNews,
      breakingAlerts,
      newsCategories,
      newsAuthors,
      liveUpdates,
      newsChannelEntries,
      contactData,
      trendingData,
      languageSwitchButton
    ] = await Promise.all([
      fetchNewsItems(),
      fetchGlobalSettings(), // Use English global settings
      fetchSidebarNews(), // Use English sidebar news
      fetchBreakingAlerts(), // Use English breaking alerts
      fetchNewsCategories(), // Use English news categories
      fetchNewsAuthors(), // Use English news authors
      fetchLiveUpdates(), // Use English live updates
      fetchAllNewsChannelEntries(), // Use English news channel entries
      fetchContact(), // Use English contact data
      fetchTrending(), // Use English trending data
      fetchLanguageSwitchButton()
    ]) as [
      unknown[],
      GlobalSetting[],
      SidebarNews[],
      BreakingAlert[],
      NewsCategory[],
      NewsAuthor[],
      LiveUpdate[],
      NewsChannelEntry[],
      Contact[],
      Trending[],
      LanguageSwitchButton | null
    ];

    // Fallback language switch button data for testing
    const fallbackLanguageSwitchButton: LanguageSwitchButton = {
      uid: 'language_switch_button',
      title: 'Language',
      dropdown: ['ENGLISH', 'Hindi'],
      choose_language: [
        {
          single_line: 'English',
          link: {
            title: 'Switch to English',
            url: '/en'
          }
        },
        {
          single_line: 'हिंदी',
          link: {
            title: 'हिंदी में बदलें',
            url: '/hi'
          }
        }
      ]
    };

    // Use fallback if no language switch button from CMS
    const displayLanguageSwitchButton = languageSwitchButton || fallbackLanguageSwitchButton;

    // Get main entry or use fallback
    let mainEntry: NewsChannelEntry;
    try {
      const entryFromCMS = await fetchNewsChannelWithModularBlocks(
        process.env.ENTRYUID || 'blt0171967259c79e5c'
      ) as NewsChannelEntry;
      
      mainEntry = entryFromCMS || {
        title: "Channel 24 News",
        url: "https://channel24news.com",
        date: new Date().toISOString(),
        boolean: true,
        number: 24,
        link: { 
          title: "Watch Live Stream", 
          url: "https://live.channel24news.com" 
        },
        uid: "news_channel"
      };
    } catch {
      // Fallback data
      mainEntry = {
        title: "Channel 24 News",
        url: "https://channel24news.com", 
        date: new Date().toISOString(),
        boolean: true,
        number: 24,
        link: { 
          title: "Watch Live Stream", 
          url: "https://live.channel24news.com" 
        },
        uid: "news_channel"
      };
    }

    // Fallback data for development
    const fallbackNews: NewsItem[] = [
      {
        uid: 'n1',
        title: 'Breaking: Major Policy Changes Announced',
        description: 'Government announces significant policy reforms.',
        category: { 
          uid: 'c1', 
          title: 'Breaking News', 
          color: '#ef4444',
          icon: '🚨' 
        },
        published_date: '2024-01-15T10:30:00Z',
        author: { 
          uid: 'a1', 
          name: 'Sarah Johnson', 
          role: 'Chief Reporter' 
        }
      }
    ];

    // Fallback news categories data
    const fallbackNewsCategories: NewsCategory[] = [
      {
        uid: 'blt5dcdc6ba7662a2bb',
        title: 'Sports',
        rich_text_editor: 'Stay updated with the latest happenings in the world of sports, from cricket and football to tennis, kabaddi, and more. Get live scores, match highlights, expert analysis, and exclusive interviews with your favorite athletes. Whether it\'s IPL thrillers, Olympic milestones, or India\'s victories on the global stage — we\'ve got it all covered.',
        url: '#',
        file: {
          filename: 'sports.jpg',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      }
    ];



    const displayNews = (newsItems as NewsItem[]).length > 0 
      ? newsItems as NewsItem[] 
      : fallbackNews;

    // Use fallback news categories if none found in CMS
    const displayNewsCategories = (newsCategories as NewsCategory[]).length > 0 
      ? newsCategories as NewsCategory[] 
      : fallbackNewsCategories;



    return (
      <div className="min-h-screen bg-gray-50">
        
        {/* Header using Global Settings */}
        <Header globalSettings={globalSettings} languageSwitchButton={displayLanguageSwitchButton} currentLanguage="ENGLISH" />

        {/* Breaking Alerts */}
        <BreakingAlertComponent breakingAlerts={breakingAlerts} />

        {/* Main Content Area - English Version */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Trending Topics */}
          <div className="bg-gray-100 p-3 mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-semibold">Trending:</span>
              {trendingData && trendingData.length > 0 && trendingData[0].modular_blocks ? (
                trendingData[0].modular_blocks.map((block, index) => (
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
                  <a href="#" className="text-blue-600 hover:underline">Politics</a>
                  <a href="#" className="text-blue-600 hover:underline">Sports</a>
                  <a href="#" className="text-blue-600 hover:underline">Entertainment</a>
                  <a href="#" className="text-blue-600 hover:underline">Technology</a>
                </>
              )}
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column - News Channel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <NewsChannel newsChannelEntries={newsChannelEntries} />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {/* Sidebar News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <Sidebar sidebarNews={sidebarNews} />
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
                  <LiveUpdates liveUpdates={liveUpdates} authors={newsAuthors} />
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* Footer with Author Information */}
        <footer className="bg-gray-800 text-white mt-8">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start">
              
              {/* Author Information */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">Our Team</h3>
                {newsAuthors && newsAuthors.length > 0 ? (
                  <div className="space-y-4">
                    {newsAuthors.slice(0, 3).map((author) => (
                      <div key={author.uid} className="flex items-center space-x-3">
                        {author.file ? (
                          <img 
                            src={author.file.url} 
                            alt={author.file.filename}
                            className="w-10 h-10 rounded-full object-cover"
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
                    {newsAuthors.length > 3 && (
                      <div className="text-sm text-gray-400 mt-2">
                        +{newsAuthors.length - 3} more authors
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
                        <div className="text-sm font-medium text-white">John Smith</div>
                        <div className="text-xs text-gray-400">Political Correspondent</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Maria Garcia</div>
                        <div className="text-xs text-gray-400">Technology Editor</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Alex Johnson</div>
                        <div className="text-xs text-gray-400">Sports Journalist</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      +2 more authors
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information - Right Corner */}
              <div className="text-right">
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <div className="text-sm font-medium text-white">Email</div>
                      <div className="text-xs text-gray-400">info@aajtaknews.com</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs">📧</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <div className="text-sm font-medium text-white">Phone</div>
                      <div className="text-xs text-gray-400">+1 (888) 888-6786</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <span className="text-white text-xs">📞</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <div className="text-sm font-medium text-white">Address</div>
                      <div className="text-xs text-gray-400">123 News Street, Media City</div>
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
              <p>&copy; 2024 Channel 24 News. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    );

  } catch (error) {
    console.error('Error loading English page:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Channel 24 News
          </h1>
          <p className="text-gray-600 mb-6">
            Complete Contentstack integration in English!
          </p>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">✅ Features Implemented</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Text, URL, Date, Boolean, Number fields</li>
              <li>• Link fields and File assets</li>
              <li>• Reference fields and Taxonomy</li>
              <li>• Modular blocks support</li>
              <li>• Responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
} 
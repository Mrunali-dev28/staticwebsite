
import { 
  fetchAllNewsChannelEntries,
  fetchGlobalSettings,
  fetchSidebarNews,
  fetchBreakingAlerts,
  fetchNewsCategories,
  fetchNewsAuthors,
  fetchLiveUpdates,
  fetchTrending,
  fetchLanguageSwitchButton,
  fetchEmailSubscription,
  fetchContactByUID
} from '@/lib/contentstack-helpers';
import Image from 'next/image';
import { GlobalSetting, SidebarNews, BreakingAlert, NewsCategory, NewsAuthor, LiveUpdate, Trending, LanguageSwitchButton, EmailSubscription, Contact } from '@/lib/contentstack';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BreakingAlertComponent from '../components/BreakingAlert';
import NewsCategories from '../components/NewsCategories';
import LiveUpdates from '../components/LiveUpdates';
import NewsChannel from '../components/NewsChannel';
import EmailSubscriptionComponent from '../components/EmailSubscription';
import PersonalizedNewsWrapper from '../components/PersonalizedNewsWrapper';




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
      fetchGlobalSettings(), // Use English global settings
      fetchSidebarNews(), // Use English sidebar news
      fetchBreakingAlerts(), // Use English breaking alerts
      fetchNewsCategories(), // Use English news categories
      fetchNewsAuthors(), // Use English news authors
      fetchLiveUpdates(), // Use English live updates
      fetchAllNewsChannelEntries(), // Use English news channel entries
      fetchTrending(), // Use English trending data
      fetchLanguageSwitchButton(),
      fetchEmailSubscription(),
      fetchContactByUID('bltbfc790959321e33f')
    ]) as [
      GlobalSetting[],
      SidebarNews[],
      BreakingAlert[],
      NewsCategory[],
      NewsAuthor[],
      LiveUpdate[],
      NewsChannelEntry[],
      Trending[],
      LanguageSwitchButton | null,
      EmailSubscription | null,
      Contact | null
    ];

    // Debug trending data
    console.log('🔍 UI Debug - Trending data received:', trendingData);
    console.log('🔍 UI Debug - Trending data length:', trendingData?.length);
    if (trendingData && trendingData.length > 0) {
      console.log('🔍 UI Debug - First trending entry:', trendingData[0]);
      console.log('🔍 UI Debug - Modular blocks:', trendingData[0].modular_blocks);
      console.log('🔍 UI Debug - Embedded items:', trendingData[0]._embedded_items);
      console.log('🔍 UI Debug - Entry keys:', Object.keys(trendingData[0]));
    }

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

    // Fallback news categories data
    const fallbackNewsCategories: NewsCategory[] = [
      {
        uid: 'blt5dcdc6ba7662a2bb',
        title: 'Sports',
        rich_text_editor: 'Stay updated with the latest happenings in the world of sports, from cricket and football to tennis, kabaddi, and more. Get live scores, match highlights, expert analysis, and exclusive interviews with your favorite athletes. Whether it&apos;s IPL thrillers, Olympic milestones, or India&apos;s victories on the global stage — we&apos;ve got it all covered.',
        url: '#',
        file: {
          filename: 'sports.jpg',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      }
    ];





    // Use fallback news categories if none found in CMS
    const displayNewsCategories = (newsCategories as NewsCategory[]).length > 0 
      ? newsCategories as NewsCategory[] 
      : fallbackNewsCategories;



    return (
      <div className="min-h-screen bg-gray-50">
        
        {/* Header using Global Settings */}
        <Header globalSettings={globalSettings} languageSwitchButton={displayLanguageSwitchButton} currentLanguage="ENGLISH" />

        {/* Breaking Alerts */}
        <BreakingAlertComponent breakingAlerts={breakingAlerts} locale="en" />

        {/* Main Content Area - English Version */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Trending Topics */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-800 text-base whitespace-nowrap">🔥 Trending:</span>
              <div className="flex items-center gap-3 flex-1">
                {/* Debug: Show trending data info */}
                {trendingData && trendingData.length > 0 ? (
                  <>
                    {/* Show actual trending data if available */}
                    {trendingData[0].modular_blocks && trendingData[0].modular_blocks.length > 0 ? (
                      trendingData[0].modular_blocks.map((block, index) => (
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
                    ) : trendingData[0]._embedded_items && Object.keys(trendingData[0]._embedded_items).length > 0 ? (
                      /* Show embedded items if available */
                      Object.entries(trendingData[0]._embedded_items).map(([key, items]) => (
                        items && items.length > 0 && items.map((item, index) => (
                          <div key={`${key}_${index}`} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                              {item.title || item.single_line || key}
                            </span>
                          </div>
                        ))
                      ))
                    ) : (
                      /* Show trending entry title if no modular blocks or embedded items */
                      <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                          {trendingData[0].title || 'Trending News'}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/en/politics-news" className="text-red-600 hover:text-red-800 font-semibold text-sm whitespace-nowrap">🏛️ Politics</a>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/en/entertainment-news" className="text-purple-600 hover:text-purple-800 font-semibold text-sm whitespace-nowrap">🎬 Entertainment</a>
                    </div>
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <a href="/en/technology-news" className="text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap">💻 Technology</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

                      {/* Personalized News - Between Trending and News Layout */}
            <PersonalizedNewsWrapper locale="en" />

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column - News Channel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <NewsChannel newsChannelEntries={newsChannelEntries} locale="en" />
              </div>
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                {/* Sidebar News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <Sidebar sidebarNews={sidebarNews} locale="en" />
                </div>
                
                {/* News Categories - Below Latest News */}
                <div className="bg-white rounded-lg shadow p-4">
                  <NewsCategories newsCategories={displayNewsCategories} locale="en" />
                </div>
              </div>
            </div>

            {/* Right Column - Updates */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {/* Live Updates */}
                <div className="bg-white rounded-lg shadow p-4">
                  <LiveUpdates liveUpdates={liveUpdates} authors={newsAuthors} locale="en" />
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-8">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start">
              
              {/* Author Information */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">Our Team</h3>
                <div className="space-y-2">
                  {newsAuthors && newsAuthors.length > 0 ? (
                    newsAuthors.map((author, index) => (
                      <div key={author.uid || index} className="flex items-center space-x-3">
                        {author.file && (
                          <Image 
                            src={author.file.url} 
                            alt={author.file.filename}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{author.title}</p>
                          {author.rich_text_editor && (
                            <p className="text-sm text-gray-300">
                              {author.rich_text_editor.replace(/<[^>]*>/g, '')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AT</span>
                      </div>
                      <div>
                        <p className="font-semibold">My Channel Sabse Tej News Team</p>
                        <p className="text-sm text-gray-300">Dedicated to bringing you the latest news and updates</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex-1 text-right">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <div className="space-y-2 text-sm">
                  {contactData ? (
                    <>
                      <h4 className="font-semibold">{contactData.title}</h4>
                      {contactData.rich_text_editor && (
                        <div dangerouslySetInnerHTML={{ __html: contactData.rich_text_editor }} />
                      )}
                      {contactData.single_line && <p>{contactData.single_line}</p>}
                    </>
                  ) : (
                    <>
                      <p>Email: news@mychannelsabsetej.com</p>
                      <p>Phone: +91-11-1234-5678</p>
                      <p>Address: News Complex, New Delhi</p>
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
            <div className="border-t border-gray-700 mt-6 pt-6 text-center">
              <p>&copy; 2024 My Channel Sabse Tej. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error in EnglishHomePage:', error);
    
    // Fallback UI in case of error
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          globalSettings={[]}
          currentLanguage="ENGLISH"
        />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Aaj Tak</h1>
            <p className="text-xl text-gray-600 mb-8">Your trusted source for news and updates</p>
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
              <p className="text-gray-600">We&apos;re currently updating our content. Please check back soon for the latest news and updates.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
} 
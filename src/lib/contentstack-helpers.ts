import deliverySDK, { 
  GlobalSetting, 
  SidebarNews, 
  BreakingAlert,
  Contact,
  Trending,
  LanguageSwitchButton,
  EmailSubscription,
  NewsCategory,
  LiveUpdate
} from './contentstack';

// Helper functions for Contentstack SDK usage
// Updated to include new content types: Global Setting, Sidebar News, News Category, News Author, Breaking Alert

export async function fetchAuthors() {
  try {
    console.log('🔍 Fetching author from CMS...');
    const response = await deliverySDK
      .contentType('author')
      .entry()
      .includeReference(['profile_image'])
      .includeEmbeddedItems()
      .find();
    console.log('✅ Authors found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('Authors not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchNewsChannelEntry(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('news_channel')
      .entry(uid)
      .includeReference(['reference'])
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    return response;
  } catch {
    console.log('News channel entry not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchNewsItems() {
  try {
    console.log('🔍 Fetching kasjmir_news from CMS...');
    const response = await deliverySDK
      .contentType('kasjmir_news')
      .entry()
      .includeReference(['author', 'category', 'featured_image'])
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    console.log('✅ News items found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('News items not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchCategories() {
  try {
    console.log('🔍 Fetching category from CMS...');
    const response = await deliverySDK
      .contentType('category')
      .entry()
      .includeReference(['icon_image'])
      .includeEmbeddedItems()
      .find();
    console.log('✅ Categories found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('Categories not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchTaxonomies() {
  try {
    console.log('🔍 Fetching live_weather from CMS...');
    const response = await deliverySDK
      .contentType('live_weather')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ Live weather found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('Taxonomies not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchAllNewsChannelEntries() {
  try {
    console.log('Fetching all news channel entries...');
    const response = await deliverySDK
      .contentType('news_channel')
      .entry()
      .includeReference(['reference'])
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    console.log('News channel entries found:', response.entries?.length || 0);
    console.log('News channel entries data:', response.entries);
    return response.entries || [];
  } catch (error) {
    console.log('News channel entries not found in CMS, using fallback data');
    console.log('Error details:', error);
    return [];
  }
}

export async function fetchNewsChannelWithModularBlocks(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('news_channel')
      .entry(uid)
      .includeReference(['reference'])
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    return response;
  } catch {
    console.log('News channel with modular blocks not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchAssets() {
  try {
    const response = await deliverySDK
      .asset()
      .find();
    return response.assets || [];
  } catch {
    console.log('Assets not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchAsset(uid: string) {
  try {
    const response = await deliverySDK
      .asset(uid)
      .fetch();
    return response;
  } catch {
    console.log('Asset not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchNewsCategories() {
  try {
    console.log('🔍 Fetching news_catogory from CMS...');
    const response = await deliverySDK
      .contentType('news_catogory')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ News categories found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch (error: any) {
    console.log('News categories not found in CMS, using fallback data');
    console.log('Error details:', error?.message || 'Unknown error');
    // Return fallback categories
    return [
      {
        uid: 'fallback-sports',
        title: 'Sports',
        rich_text_editor: 'Latest sports news and updates',
        url: '#',
        file: {
          filename: 'sports.jpg',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      },
      {
        uid: 'fallback-politics',
        title: 'Politics',
        rich_text_editor: 'Political news and updates',
        url: '#',
        file: {
          filename: 'politics.jpg',
          url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
        }
      }
    ];
  }
}

export async function fetchNewsAuthors() {
  try {
    console.log('🔍 Fetching news_author from CMS...');
    const response = await deliverySDK
      .contentType('news_author')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ News authors found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('News authors not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchBreakingAlerts(): Promise<BreakingAlert[]> {
  try {
    console.log('🔍 Fetching breaking_alert from CMS...');
    const response = await deliverySDK
      .contentType('breaking_alert')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ Breaking alerts found in CMS:', response.entries?.length || 0, 'entries');
    return (response.entries || []) as BreakingAlert[];
  } catch {
    console.log('Breaking alerts not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchNewsCategory(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('news_catogory')
      .entry(uid)
      .includeEmbeddedItems()
      .fetch();
    return response;
  } catch {
    console.log('News category not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchNewsAuthor(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('news_author')
      .entry(uid)
      .includeEmbeddedItems()
      .fetch();
    return response;
  } catch {
    console.log('News author not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchBreakingAlert(uid: string): Promise<BreakingAlert | null> {
  try {
    const response = await deliverySDK
      .contentType('breaking_alert')
      .entry(uid)
      .includeEmbeddedItems()
      .fetch();
    return response as BreakingAlert;
  } catch {
    console.log('Breaking alert not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchContact(): Promise<Contact[]> {
  try {
    console.log('🔍 Fetching contact from CMS...');
    const response = await deliverySDK
      .contentType('contact')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ Contact data found in CMS:', response.entries?.length || 0, 'entries');
    return (response.entries || []) as Contact[];
  } catch {
    console.log('Contact data not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchContactByUID(uid: string): Promise<Contact | null> {
  try {
    console.log(`🔍 Fetching contact with UID: ${uid}`);
    const response = await deliverySDK
      .contentType('contact')
      .entry(uid)
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('✅ Contact found in CMS:', response);
    return response as Contact;
  } catch (error) {
    console.log('Contact not found in CMS, using fallback data');
    console.log('Error details:', error);
    return null;
  }
}

export async function fetchTrending(): Promise<Trending[]> {
  try {
    console.log('🔍 Fetching trending_bar from CMS...');
    console.log('🔍 Using deliverySDK:', typeof deliverySDK);
    console.log('🔍 Environment:', process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production');
    
    const response = await deliverySDK
      .contentType('trending_bar')
      .entry()
      .includeEmbeddedItems()
      .find();
    
    console.log('✅ Raw response:', response);
    console.log('✅ Response entries:', response.entries);
    console.log('✅ Trending data found in CMS:', response.entries?.length || 0, 'entries');
    
    // Log the actual response for debugging
    if (response.entries && response.entries.length > 0) {
      console.log('📋 Trending entries found:', response.entries.map((entry: any) => ({
        uid: entry.uid,
        title: entry.title,
        modular_blocks_count: entry.modular_blocks?.length || 0
      })));
    } else {
      console.log('❌ No trending entries found in response');
    }
    
    return (response.entries || []) as Trending[];
  } catch (error: any) {
    console.log('❌ Trending data not found in CMS, trying alternative content types...');
    
    // Try alternative content type names
    const alternativeContentTypes = ['trending', 'trending_news', 'trending_content'];
    
    for (const contentType of alternativeContentTypes) {
      try {
        console.log(`🔍 Trying content type: ${contentType}`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry()
          .includeEmbeddedItems()
          .find();
        
        if (response.entries && response.entries.length > 0) {
          console.log(`✅ Found trending data in ${contentType}:`, response.entries.length, 'entries');
          return (response.entries || []) as Trending[];
        }
      } catch (altError) {
        console.log(`❌ ${contentType} not found:`, altError);
      }
    }
    
    console.log('❌ No trending data found in any content type, returning empty array');
    console.log('❌ Error details:', error?.message || 'Unknown error');
    console.log('❌ Full error:', error);
    console.log('❌ Error stack:', error?.stack);
    
    // Return empty array instead of hardcoded fallback data
    return [] as Trending[];
  }
}

// NEW: Function to fetch a specific trending entry by UID
export async function fetchTrendingEntry(uid: string): Promise<Trending | null> {
  try {
    console.log(`🔍 Fetching trending entry with UID: ${uid}`);
    console.log('🔍 Environment:', process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production');
    
    // Try different content types for the specific entry
    const contentTypes = ['trending_bar', 'trending', 'trending_news', 'trending_content'];
    
    for (const contentType of contentTypes) {
      try {
        console.log(`🔍 Trying content type: ${contentType} for UID: ${uid}`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry(uid)
          .includeEmbeddedItems()
          .includeFallback()
          .fetch();
        
        console.log(`✅ Found trending entry in ${contentType}:`, response);
        return response as Trending;
      } catch (error) {
        console.log(`❌ Entry not found in ${contentType}:`, error);
      }
    }
    
    console.log(`❌ Trending entry with UID ${uid} not found in any content type`);
    return null;
  } catch (error) {
    console.log(`❌ Error fetching trending entry ${uid}:`, error);
    return null;
  }
}

// NEW: Function to fetch trending entries with specific criteria
export async function fetchTrendingWithCriteria(criteria: {
  title?: string;
  tags?: string[];
  limit?: number;
}): Promise<Trending[]> {
  try {
    console.log('🔍 Fetching trending entries with criteria:', criteria);
    
    // Try different content types
    const contentTypes = ['trending_bar', 'trending', 'trending_news', 'trending_content'];
    
    for (const contentType of contentTypes) {
      try {
        const response = await deliverySDK
          .contentType(contentType)
          .entry()
          .includeEmbeddedItems()
          .find();
        
        if (response.entries && response.entries.length > 0) {
          console.log(`✅ Found trending entries in ${contentType}:`, response.entries.length);
          
          let filteredEntries = response.entries;
          
          // Filter by title if provided
          if (criteria.title) {
            filteredEntries = filteredEntries.filter((entry: any) => 
              entry.title?.toLowerCase().includes(criteria.title!.toLowerCase())
            );
          }
          
          // Filter by tags if provided
          if (criteria.tags && criteria.tags.length > 0) {
            filteredEntries = filteredEntries.filter((entry: any) => {
              const entryTags = entry.tags || [];
              return criteria.tags!.some(tag => entryTags.includes(tag));
            });
          }
          
          // Apply limit if provided
          if (criteria.limit) {
            filteredEntries = filteredEntries.slice(0, criteria.limit);
          }
          
          return filteredEntries as Trending[];
        }
      } catch (error) {
        console.log(`❌ Error with ${contentType}:`, error);
      }
    }
    
    console.log('❌ No trending entries found with the specified criteria');
    return [];
  } catch (error) {
    console.log('❌ Error fetching trending entries with criteria:', error);
    return [];
  }
}

// NEW: Function to list all available trending entries
export async function listAllTrendingEntries(): Promise<{ uid: string; title: string; contentType: string }[]> {
  try {
    console.log('🔍 Listing all trending entries...');
    
    const contentTypes = ['trending_bar', 'trending', 'trending_news', 'trending_content'];
    const allEntries: { uid: string; title: string; contentType: string }[] = [];
    
    for (const contentType of contentTypes) {
      try {
        const response = await deliverySDK
          .contentType(contentType)
          .entry()
          .includeEmbeddedItems()
          .find();
        
        if (response.entries && response.entries.length > 0) {
          console.log(`✅ Found ${response.entries.length} entries in ${contentType}`);
          response.entries.forEach((entry: any) => {
            allEntries.push({
              uid: entry.uid,
              title: entry.title,
              contentType: contentType
            });
          });
        }
      } catch (error) {
        console.log(`❌ Error listing ${contentType}:`, error);
      }
    }
    
    console.log(`✅ Total trending entries found: ${allEntries.length}`);
    return allEntries;
  } catch (error) {
    console.log('❌ Error listing trending entries:', error);
    return [];
  }
}

export async function fetchGlobalSettings(): Promise<GlobalSetting[]> {
  try {
    console.log('🔍 Fetching global_setting from CMS...');
    const response = await deliverySDK
      .contentType('global_setting')
      .entry()
      .includeReference(['file'])
      .includeEmbeddedItems()
      .find();
    console.log('✅ Global settings found in CMS:', response.entries?.length || 0, 'entries');
    return (response.entries || []) as GlobalSetting[];
  } catch {
    console.log('Global settings not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchGlobalSetting(uid: string): Promise<GlobalSetting | null> {
  try {
    const response = await deliverySDK
      .contentType('global_setting')
      .entry(uid)
      .includeReference(['file'])
      .includeEmbeddedItems()
      .fetch();
    return response as GlobalSetting;
  } catch {
    console.log('Global setting not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchSidebarNews(): Promise<SidebarNews[]> {
  try {
    console.log('🔍 Fetching sidebar_news from CMS...');
    const response = await deliverySDK
      .contentType('sidebar_news')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ Sidebar news found in CMS:', response.entries?.length || 0, 'entries');
    return (response.entries || []) as SidebarNews[];
  } catch {
    console.log('Sidebar news not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchSidebarNewsItem(uid: string): Promise<SidebarNews | null> {
  try {
    const response = await deliverySDK
      .contentType('sidebar_news')
      .entry(uid)
      .includeEmbeddedItems()
      .fetch();
    return response as SidebarNews;
  } catch {
    console.log('Sidebar news item not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchLiveUpdates() {
  try {
    console.log('🔍 Fetching live_update from CMS...');
    const response = await deliverySDK
      .contentType('live_update')
      .entry()
      .includeEmbeddedItems()
      .find();
    console.log('✅ Live updates found in CMS:', response.entries?.length || 0, 'entries');
    return response.entries || [];
  } catch {
    console.log('Live updates not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchLiveUpdate(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('live_update')
      .entry(uid)
      .includeEmbeddedItems()
      .fetch();
    return response;
  } catch {
    console.log('Live update not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchImageByUID(uid: string) {
  try {
    const response = await deliverySDK
      .asset(uid)
      .fetch();
    return response;
  } catch {
    console.log('Image not found in CMS, using fallback data');
    return null;
  }
}

// NEW: Function to fetch Language Switch Button
export async function fetchLanguageSwitchButton(): Promise<LanguageSwitchButton | null> {
  try {
    const response = await deliverySDK
      .contentType('language_switch_button')
      .entry()
      .includeEmbeddedItems()
      .find();
    return (response.entries?.[0] || null) as LanguageSwitchButton;
  } catch {
    console.log('Language switch button not found in CMS, using fallback data');
    return null;
  }
}

// NEW: Universal function to fetch content for any locale
export async function fetchContentForLocale<T>(
  contentType: string, 
  locale: string = 'en-us',
  options: {
    includeReference?: string[];
    includeEmbeddedItems?: boolean;
    includeFallback?: boolean;
  } = {}
): Promise<T[]> {
  try {
    let query = deliverySDK
      .contentType(contentType)
      .entry()
      .locale(locale);

    if (options.includeReference) {
      query = query.includeReference(options.includeReference);
    }
    
    if (options.includeEmbeddedItems) {
      query = query.includeEmbeddedItems();
    }
    
    if (options.includeFallback) {
      query = query.includeFallback();
    }

    const response = await query.find();
    console.log(`Found ${contentType} content for locale: ${locale}`);
    return (response.entries || []) as T[];
  } catch {
    console.log(`${contentType} not found for locale: ${locale}, using fallback data`);
    return [];
  }
}

// NEW: Simplified Hindi content functions using the universal function
export async function fetchHindiGlobalSettings(): Promise<GlobalSetting[]> {
  return fetchContentForLocale<GlobalSetting>('global_setting', 'hi-in', {
    includeReference: ['file'],
    includeEmbeddedItems: true
  });
}

export async function fetchHindiNewsChannelEntries() {
  try {
    console.log('Fetching Hindi news channel entries...');
    
    // First try to fetch with Hindi locale
    let entries = await fetchContentForLocale('news_channel', 'hi-in', {
      includeReference: ['reference'],
      includeEmbeddedItems: true,
      includeFallback: true
    });
    
    console.log('Hindi news channel entries found:', entries?.length || 0);
    console.log('Hindi news channel entries data:', entries);
    
    // If no Hindi entries found, try with fallback to English
    if (!entries || entries.length === 0) {
      console.log('No Hindi entries found, trying English fallback...');
      entries = await fetchContentForLocale('news_channel', 'en-us', {
        includeReference: ['reference'],
        includeEmbeddedItems: true,
        includeFallback: true
      });
    }
    
    // Always apply Hindi translations to content (whether from Hindi or English fallback)
    if (entries && entries.length > 0) {
      entries = entries.map((entry: any) => ({
        ...entry,
        locale: 'hi-in', // Override locale to Hindi
        title: entry.title ? translateToHindi(entry.title) : entry.title,
        news: entry.news ? {
          ...entry.news,
          title: entry.news.title ? translateToHindi(entry.news.title) : entry.news.title,
          description: entry.news.description ? translateToHindi(entry.news.description) : entry.news.description
        } : entry.news
      }));
    }
    
    return entries || [];
  } catch (error) {
    console.log('Error fetching Hindi news channel entries:', error);
    return [];
  }
}

// Helper function to translate English content to Hindi
function translateToHindi(text: string): string {
  if (!text) return text;
  
  const translations: Record<string, string> = {
    // News Channel translations
    'Heavy Rain Hits Delhi: Alerts Issued': 'दिल्ली में भारी बारिश: अलर्ट जारी',
    'Heavy rainfall lashed Delhi today causing severe waterlogging and traffic jams. Get the latest weather updates and alerts.': 'आज दिल्ली में भारी बारिश हुई जिससे गंभीर जलभराव और ट्रैफिक जाम हो गया। ताज़ा मौसम अपडेट और अलर्ट प्राप्त करें।',
    'Delhi Rains: City Hit by Torrential Downpour, Traffic Disrupted': 'दिल्ली बारिश: शहर में मूसलाधार बारिश, ट्रैफिक बाधित',
    'Delhi Rains: City Hit by Torrential Downpour, Traffic Disrupted"': 'दिल्ली बारिश: शहर में मूसलाधार बारिश, ट्रैफिक बाधित',
    'My Channel': 'मेरा चैनल',
    'सबसे तेज़': 'सबसे तेज़',
    
    // Sidebar News translations
    'Modi and Shah meet the President on the same day... Is there any connection with August 5?': 'मोदी और शाह ने एक ही दिन राष्ट्रपति से मुलाकात की... क्या 5 अगस्त से कोई संबंध है?',
    'During the Monsoon Session, Prime Minister Narendra Modi and Home Minister Amit Shah met President Droupadi Murmu on the same day.': 'मानसून सत्र के दौरान, प्रधानमंत्री नरेंद्र मोदी और गृह मंत्री अमित शाह ने एक ही दिन राष्ट्रपति द्रौपदी मुर्मू से मुलाकात की।',
    '<strong>Modi and Shah meet the President on the same day... Is there any connection with August 5?</strong>\n<br/>During the Monsoon Session, Prime Minister Narendra Modi and Home Minister Amit Shah met President Droupadi Murmu on the same day.': '<strong>मोदी और शाह ने एक ही दिन राष्ट्रपति से मुलाकात की... क्या 5 अगस्त से कोई संबंध है?</strong>\n<br/>मानसून सत्र के दौरान, प्रधानमंत्री नरेंद्र मोदी और गृह मंत्री अमित शाह ने एक ही दिन राष्ट्रपति द्रौपदी मुर्मू से मुलाकात की।',
    
    // Breaking Alerts translations
    'Monsoon Flood Alert': 'मानसून बाढ़ अलर्ट',
    '⚠️ Heavy rain warning issued for Mumbai and Pune. Stay indoors.': '⚠️ मुंबई और पुणे के लिए भारी बारिश की चेतावनी जारी। घर के अंदर रहें।',
    '<p>⚠️ Heavy rain warning issued for Mumbai and Pune. Stay indoors.</p>': '<p>⚠️ मुंबई और पुणे के लिए भारी बारिश की चेतावनी जारी। घर के अंदर रहें।</p>',
    
    // Categories translations
    'Sports Update': 'खेल अपडेट',
    
    // Common translations
    'Breaking News': 'तोड़फोड़ समाचार',
    'Latest Updates': 'नवीनतम अपडेट',
    'News Categories': 'समाचार श्रेणियां',
    'Live Updates': 'लाइव अपडेट',
    'Our Team': 'हमारी टीम',
    'Contact': 'संपर्क',
    'Email': 'ईमेल',
    'Phone': 'फोन',
    'Address': 'पता',
    'Verified': 'सत्यापित',
    'LIVE': 'लाइव',
    'Alert': 'अलर्ट',
    'Active': 'सक्रिय',
    'Read More': 'और पढ़ें',
    'Trending': 'ट्रेंडिंग',
    'Politics': 'राजनीति',
    'Entertainment': 'मनोरंजन',
    'Technology': 'तकनीक',
    'Sports': 'खेल',
    'News Channel': 'समाचार चैनल',
    'All rights reserved': 'सर्वाधिकार सुरक्षित',
    'My Channel Sabse Tej': 'मेरा चैनल सबसे तेज',
    'Your Trusted News Source': 'आपका विश्वसनीय समाचार स्रोत',
    'Latest news and updates': 'ताज़ा खबरें और अपडेट्स',
    'Language': 'भाषा',
    
    // Sports translations
    'Stay updated with the latest happenings in the world of sports, from cricket and football to tennis, kabaddi, and more. Get live scores, match highlights, expert analysis, and exclusive interviews with your favorite athletes. Whether it\'s IPL thrillers, Olympic milestones, or India\'s victories on the global stage — we\'ve got it all covered.': 'खेल की दुनिया में नवीनतम घटनाओं से अपडेट रहें, क्रिकेट और फुटबॉल से लेकर टेनिस, कबड्डी और अधिक। लाइव स्कोर, मैच हाइलाइट्स, विशेषज्ञ विश्लेषण और अपने पसंदीदा एथलीटों के विशेष साक्षात्कार प्राप्त करें। चाहे वह IPL के रोमांचक मैच हों, ओलंपिक के मील के पत्थर हों, या वैश्विक मंच पर भारत की जीत — हमारे पास सब कुछ है।',
    
    // Live Updates translations
    '"Story | The Illness of Poetry | StoryBox with Jamshed"': '"कहानी | कविता की बीमारी | स्टोरीबॉक्स विद जमशेद"',
    '"Massive price cut on iPhone 16 Pro, changes made ahead of iPhone 17 launch"': '"iPhone 16 Pro पर भारी कीमत में कटौती, iPhone 17 लॉन्च से पहले बदलाव"',
    "'He was on a scooty, wearing a helmet…' — What the woman MP, victim of chain snatching near Parliament, revealed": "'वह स्कूटी पर था, हेलमेट पहने हुए…' — संसद के पास चेन स्नैचिंग की शिकार महिला सांसद ने क्या खुलासा किया",
    // UI Elements translations
    'LIVE UPDATES': 'लाइव अपडेट्स',
    'Update #1': 'अपडेट #1',
    'Update #2': 'अपडेट #2', 
    'Update #3': 'अपडेट #3',
    'Just now': 'अभी अभी',
    'LATEST': 'नवीनतम',
    // Author translations
    'Aarav Desai': 'आरव देसाई',
    'Aarav is a senior political correspondent with 8 years of experience in Indian national news and global affairs': 'आरव एक वरिष्ठ राजनीतिक संवाददाता हैं जिन्हें भारतीय राष्ट्रीय समाचार और वैश्विक मामलों में 8 वर्षों का अनुभव है',
    
    // Additional translations for dynamic content
    'Update #': 'अपडेट #',
    'updates': 'अपडेट्स',
    

    

    

    

  };
  
  // Check for exact match first
  if (translations[text]) {
    return translations[text];
  }
  
  // If no exact match, return original text
  return text;
}

export async function fetchHindiSidebarNews(): Promise<SidebarNews[]> {
  try {
    let entries = await fetchContentForLocale<SidebarNews>('sidebar_news', 'hi-in', {
      includeEmbeddedItems: true
    });
    
    // If no Hindi entries found, try with fallback to English
    if (!entries || entries.length === 0) {
      console.log('No Hindi sidebar news found, trying English fallback...');
      entries = await fetchContentForLocale<SidebarNews>('sidebar_news', 'en-us', {
        includeEmbeddedItems: true
      });
    }
    
    // Always apply Hindi translations to content
    if (entries && entries.length > 0) {
      entries = entries.map((entry: any) => ({
        ...entry,
        title: entry.title ? translateToHindi(entry.title) : entry.title,
        descrption: entry.descrption ? translateToHindi(entry.descrption) : entry.descrption
      }));
    }
    
    return entries || [];
  } catch (error) {
    console.log('Error fetching Hindi sidebar news:', error);
    return [];
  }
}

export async function fetchHindiBreakingAlerts(): Promise<BreakingAlert[]> {
  try {
    let entries = await fetchContentForLocale<BreakingAlert>('breaking_alert', 'hi-in', {
      includeEmbeddedItems: true
    });
    
    // If no Hindi entries found, try with fallback to English
    if (!entries || entries.length === 0) {
      console.log('No Hindi breaking alerts found, trying English fallback...');
      entries = await fetchContentForLocale<BreakingAlert>('breaking_alert', 'en-us', {
        includeEmbeddedItems: true
      });
    }
    
    // Always apply Hindi translations to content
    if (entries && entries.length > 0) {
      entries = entries.map((entry: any) => ({
        ...entry,
        title: entry.title ? translateToHindi(entry.title) : entry.title,
        rich_text_editor: entry.rich_text_editor ? translateToHindi(entry.rich_text_editor) : entry.rich_text_editor
      }));
    }
    
    return entries || [];
  } catch (error) {
    console.log('Error fetching Hindi breaking alerts:', error);
    return [];
  }
}

export async function fetchHindiNewsCategories() {
  try {
    let entries = await fetchContentForLocale<NewsCategory>('news_catogory', 'hi-in', {
      includeEmbeddedItems: true,
      includeFallback: true
    });
    
    // If no Hindi entries found, try with fallback to English
    if (!entries || entries.length === 0) {
      console.log('No Hindi news categories found, trying English fallback...');
      entries = await fetchContentForLocale<NewsCategory>('news_catogory', 'en-us', {
        includeEmbeddedItems: true,
        includeFallback: true
      });
    }
    
    // Always apply Hindi translations to content
    if (entries && entries.length > 0) {
      entries = entries.map((entry: any) => ({
        ...entry,
        title: entry.title ? translateToHindi(entry.title) : entry.title,
        rich_text_editor: entry.rich_text_editor ? translateToHindi(entry.rich_text_editor) : entry.rich_text_editor
      }));
    }
    
    return entries || [];
  } catch (error) {
    console.error('Error fetching Hindi news categories:', error);
    return [];
  }
}

export async function fetchHindiNewsAuthors() {
  return fetchContentForLocale('news_author', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiLiveUpdates() {
  try {
    let entries = await fetchContentForLocale<LiveUpdate>('live_update', 'hi-in', {
      includeEmbeddedItems: true,
      includeFallback: true
    });
    
    // If no Hindi entries found, try with fallback to English
    if (!entries || entries.length === 0) {
      console.log('No Hindi live updates found, trying English fallback...');
      entries = await fetchContentForLocale<LiveUpdate>('live_update', 'en-us', {
        includeEmbeddedItems: true,
        includeFallback: true
      });
    }
    
    // Always apply Hindi translations to content
    if (entries && entries.length > 0) {
      entries = entries.map((entry: any) => ({
        ...entry,
        title: entry.title ? translateToHindi(entry.title) : entry.title,
        description: entry.description ? translateToHindi(entry.description) : entry.description,
        content: entry.content ? translateToHindi(entry.content) : entry.content
      }));
    }
    
    console.log('DEBUG - Live Updates Content:', entries);
    return entries || [];
  } catch (error) {
    console.error('Error fetching Hindi live updates:', error);
    return [];
  }
}

export async function fetchHindiContact(): Promise<Contact[]> {
  return fetchContentForLocale<Contact>('contact', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiTrending(): Promise<Trending[]> {
  return fetchContentForLocale<Trending>('trending_bar', 'hi-in', {
    includeEmbeddedItems: true,
    includeFallback: true
  });
}

export async function fetchEmailSubscription(): Promise<EmailSubscription | null> {
  try {
    console.log('🔍 Fetching email_subscription from CMS...');
    const response = await deliverySDK
      .contentType('email_subscription')
      .entry('blt046e50cea91ab4cc')
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('✅ Email subscription found in CMS');
    return response as EmailSubscription;
  } catch {
    console.log('Email subscription not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchHindiEmailSubscription(): Promise<EmailSubscription | null> {
  try {
    const response = await deliverySDK
      .contentType('email_subscription')
      .entry('blt046e50cea91ab4cc')
      .locale('hi-in')
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    return response as EmailSubscription;
  } catch {
    console.log('Hindi email subscription not found in CMS, using fallback data');
    return null;
  }
}

export async function fetchMonsoonNewsByUID(uid: string) {
  try {
    console.log('Fetching monsoon news with UID:', uid);
    const response = await deliverySDK
      .contentType('news_channel')
      .entry(uid)
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Monsoon news found:', response);
    return response;
  } catch (error) {
    console.log('Monsoon news not found in CMS, using fallback data');
    console.log('Error details:', error);
    return null;
  }
}

export async function listAllNewsChannelEntries() {
  try {
    console.log('Listing all news channel entries...');
    const response = await deliverySDK
      .contentType('news_channel')
      .entry()
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    console.log('Available news channel entries:');
    response.entries?.forEach((entry: any, index) => {
      console.log(`${index + 1}. UID: ${entry.uid}, Title: ${entry.title}`);
    });
    return response.entries || [];
  } catch (error) {
    console.log('Error listing news channel entries:', error);
    return [];
  }
}

export async function fetchReadMorePageByUID(uid: string) {
  try {
    console.log('Fetching read_more_page with UID:', uid);
    const response = await deliverySDK
      .contentType('read_more_page')
      .entry(uid)
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Read more page found:', response);
    return response;
  } catch (error) {
    console.log('Read more page not found in CMS, using fallback data');
    console.log('Error details:', error);
    return null;
  }
}

export async function fetchHindiReadMorePageByUID(uid: string) {
  try {
    console.log('Fetching Hindi read_more_page with UID:', uid);
    const response = await deliverySDK
      .contentType('read_more_page')
      .entry(uid)
      .locale('hi-in')
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Hindi read more page found:', response);
    return response;
  } catch (error) {
    console.log('Hindi read more page not found in CMS, trying English fallback');
    // Try English as fallback
    try {
      const fallbackResponse = await deliverySDK
        .contentType('read_more_page')
        .entry(uid)
        .locale('en-us')
        .includeEmbeddedItems()
        .includeFallback()
        .fetch();
      console.log('Using English fallback for read more page');
      return fallbackResponse;
    } catch (fallbackError) {
      console.log('English fallback also failed for read more page');
      return null;
    }
  }
}

export async function fetchGoToPoliticsByUID(uid: string) {
  try {
    console.log('Fetching go_to_politics with UID:', uid);
    const response = await deliverySDK
      .contentType('go_to_politics')
      .entry(uid)
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Go to politics page found:', response);
    return response;
  } catch (error) {
    console.log('Go to politics page not found in CMS, using fallback data');
    console.log('Error details:', error);
    return null;
  }
}

export async function fetchHindiGoToPoliticsByUID(uid: string) {
  try {
    console.log('Fetching Hindi go_to_politics with UID:', uid);
    const response = await deliverySDK
      .contentType('go_to_politics')
      .entry(uid)
      .locale('hi-in')
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Hindi go to politics page found:', response);
    return response;
  } catch (error) {
    console.log('Hindi go to politics page not found in CMS, trying English fallback');
    // Try English as fallback
    try {
      const fallbackResponse = await deliverySDK
        .contentType('go_to_politics')
        .entry(uid)
        .locale('en-us')
        .includeEmbeddedItems()
        .includeFallback()
        .fetch();
      console.log('Using English fallback for go to politics page');
      return fallbackResponse;
    } catch (fallbackError) {
      console.log('English fallback also failed for go to politics page');
      return null;
    }
  }
}

export async function fetchTrendingByUID(uid: string) {
  try {
    console.log('Fetching trending with UID:', uid);
    const response = await deliverySDK
      .contentType('trending_bar')
      .entry(uid)
      .includeEmbeddedItems()
      .includeFallback()
      .fetch();
    console.log('Trending entry found:', response);
    return response;
  } catch (error) {
    console.log('Trending entry not found in CMS, using fallback data');
    console.log('Error details:', error);
    return null;
  }
}

// NEW: Function to fetch location-specific news from CMS
export async function fetchLocationSpecificNews(location: 'maharashtra' | 'delhi' | 'us') {
  try {
    console.log(`🔍 Fetching location-specific news for: ${location}`);
    
    // Fetch news channel entries and filter by location
    const response = await deliverySDK
      .contentType('news_channel')
      .entry()
      .includeReference(['reference'])
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    
    const allNews = response.entries || [];
    console.log(`📊 Total news entries found: ${allNews.length}`);
    
    // Enhanced location keywords for better filtering
    const locationKeywords = {
      maharashtra: [
        'pune', 'mumbai', 'maharashtra', 'marathi', 'western', 'vagholi',
        'nagpur', 'aurangabad', 'nashik', 'kolhapur', 'satara', 'sangli',
        'solapur', 'beed', 'latur', 'osmanabad', 'nanded', 'parbhani',
        'jalna', 'buldhana', 'washim', 'akola', 'amravati', 'yavatmal',
        'wardha', 'gadchiroli', 'chandrapur', 'bhandara', 'gondia',
        'ratnagiri', 'sindhudurg', 'raigad', 'thane', 'palghar', 'nashik',
        'dhule', 'nandurbar', 'jalgaon', 'ahmednagar', 'pune district',
        'mumbai city', 'mumbai suburban', 'thane district', 'raigad district'
      ],
      delhi: [
        'delhi', 'ncr', 'north', 'capital', 'central', 'new delhi',
        'gurgaon', 'noida', 'faridabad', 'ghaziabad', 'gurugram',
        'greater noida', 'sonipat', 'panipat', 'karnal', 'rohtak',
        'bhiwani', 'hisar', 'fatehabad', 'jind', 'sirsa', 'kaithal',
        'kurukshetra', 'yamunanagar', 'ambala', 'panchkula', 'chandigarh'
      ],
      us: [
        'united states', 'usa', 'america', 'american', 'us', 'ashburn',
        'new york', 'los angeles', 'chicago', 'houston', 'phoenix',
        'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose',
        'austin', 'jacksonville', 'fort worth', 'columbus', 'charlotte',
        'san francisco', 'indianapolis', 'seattle', 'denver', 'washington',
        'boston', 'el paso', 'nashville', 'detroit', 'oklahoma city',
        'portland', 'las vegas', 'memphis', 'louisville', 'baltimore',
        'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento',
        'atlanta', 'long beach', 'colorado springs', 'raleigh', 'miami',
        'omaha', 'oakland', 'minneapolis', 'tulsa', 'cleveland', 'wichita',
        'arlington', 'new orleans', 'bakersfield', 'tampa', 'honolulu',
        'anaheim', 'aurora', 'santa ana', 'corpus christi', 'riverside',
        'lexington', 'stockton', 'henderson', 'saint paul', 'st. paul',
        'saint louis', 'st. louis', 'cincinnati', 'pittsburgh', 'anchorage',
        'greensboro', 'plano', 'newark', 'durham', 'lincoln', 'orlando',
        'chula vista', 'jersey city', 'chandler', 'madison', 'laredo',
        'winston-salem', 'lubbock', 'baton rouge', 'garland', 'glendale',
        'reno', 'hialeah', 'chesapeake', 'scottsdale', 'north las vegas',
        'irving', 'fremont', 'irvine', 'birmingham', 'rochester',
        'san bernardino', 'spokane', 'gilbert', 'montgomery', 'boise',
        'richmond', 'des moines', 'modesto', 'fayetteville', 'akron',
        'tacoma', 'huntington beach', 'moreno valley', 'huntington park',
        'yonkers', 'columbus', 'yuma', 'evansville', 'billings',
        'south bend', 'kalamazoo', 'fargo', 'waterloo', 'davenport',
        'springfield', 'rockford', 'new haven', 'topeka', 'concord',
        'allen', 'vista', 'grand rapids', 'new bedford', 'west valley city',
        'provo', 'el monte', 'independence', 'lakewood', 'salem',
        'kalispell', 'bend', 'spokane valley', 'idaho falls', 'pocatello',
        'twin falls', 'nampa', 'meridian', 'caldwell', 'lewiston',
        'post falls', 'coeur d\'alene', 'moscow', 'pullman', 'kennewick',
        'pasco', 'richland', 'yakima', 'wenatchee', 'bellingham',
        'everett', 'olympia', 'vancouver', 'eugene', 'medford',
        'roseburg', 'coos bay', 'astoria', 'newport', 'corvallis',
        'albany', 'lebanon', 'sweet home', 'sublimity', 'stayton',
        'scio', 'lyons', 'mill city', 'gates', 'idanha', 'cascadia',
        'virginia', 'dc', 'district of columbia', 'maryland', 'delaware',
        'pennsylvania', 'new jersey', 'connecticut', 'rhode island',
        'massachusetts', 'vermont', 'new hampshire', 'maine', 'ohio',
        'indiana', 'illinois', 'michigan', 'wisconsin', 'minnesota',
        'iowa', 'missouri', 'kansas', 'nebraska', 'south dakota',
        'north dakota', 'montana', 'wyoming', 'colorado', 'new mexico',
        'arizona', 'utah', 'nevada', 'california', 'oregon', 'washington',
        'alaska', 'hawaii', 'texas', 'oklahoma', 'arkansas', 'louisiana',
        'mississippi', 'alabama', 'georgia', 'florida', 'south carolina',
        'north carolina', 'tennessee', 'kentucky', 'west virginia',
        'virginia', 'maryland', 'delaware', 'pennsylvania', 'new jersey',
        'new york', 'connecticut', 'rhode island', 'massachusetts',
        'vermont', 'new hampshire', 'maine'
      ]
    };
    
    const keywords = locationKeywords[location];
    console.log(`🔍 Filtering for location: ${location} with keywords:`, keywords.slice(0, 5), '...');
    
    const locationNews = allNews.filter((entry: any) => {
      const title = entry.title?.toLowerCase() || '';
      const description = entry.news?.description?.toLowerCase() || '';
      const content = `${title} ${description}`;
      
      const hasKeyword = keywords.some(keyword => content.includes(keyword));
      if (hasKeyword) {
        console.log(`✅ Found matching news for ${location}: "${entry.title}"`);
      }
      
      return hasKeyword;
    });
    
    console.log(`📊 Location-specific news found for ${location}:`, locationNews.length);
    
    // If no location-specific news found, return some general news for that region
    if (locationNews.length === 0) {
      console.log(`⚠️ No specific news found for ${location}, returning general news`);
      // Return first few entries as general news for the region
      return allNews.slice(0, 2);
    }
    
    return locationNews;
  } catch (error) {
    console.log(`❌ Location-specific news not found for ${location}, using fallback data`);
    console.log('Error details:', error);
    return [];
  }
}

// NEW: Function to fetch trending news for specific location
export async function fetchLocationTrendingNews(location: 'maharashtra' | 'delhi' | 'us') {
  try {
    console.log(`🔍 Fetching trending news for: ${location}`);
    
    // Fetch trending content and filter by location
    const response = await deliverySDK
      .contentType('trending_bar')
      .entry()
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    
    const allTrending = response.entries || [];
    console.log(`📊 Total trending entries found: ${allTrending.length}`);
    
    // Enhanced location keywords for trending content
    const locationKeywords = {
      maharashtra: [
        'pune', 'mumbai', 'maharashtra', 'marathi', 'western', 'vagholi',
        'nagpur', 'aurangabad', 'nashik', 'kolhapur', 'satara', 'sangli',
        'solapur', 'beed', 'latur', 'osmanabad', 'nanded', 'parbhani',
        'jalna', 'buldhana', 'washim', 'akola', 'amravati', 'yavatmal',
        'wardha', 'gadchiroli', 'chandrapur', 'bhandara', 'gondia',
        'ratnagiri', 'sindhudurg', 'raigad', 'thane', 'palghar', 'nashik',
        'dhule', 'nandurbar', 'jalgaon', 'ahmednagar', 'pune district',
        'mumbai city', 'mumbai suburban', 'thane district', 'raigad district'
      ],
      delhi: [
        'delhi', 'ncr', 'north', 'capital', 'central', 'new delhi',
        'gurgaon', 'noida', 'faridabad', 'ghaziabad', 'gurugram',
        'greater noida', 'sonipat', 'panipat', 'karnal', 'rohtak',
        'bhiwani', 'hisar', 'fatehabad', 'jind', 'sirsa', 'kaithal',
        'kurukshetra', 'yamunanagar', 'ambala', 'panchkula', 'chandigarh'
      ],
      us: [
        'united states', 'usa', 'america', 'american', 'us', 'ashburn',
        'new york', 'los angeles', 'chicago', 'houston', 'phoenix',
        'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose',
        'austin', 'jacksonville', 'fort worth', 'columbus', 'charlotte',
        'san francisco', 'indianapolis', 'seattle', 'denver', 'washington',
        'boston', 'el paso', 'nashville', 'detroit', 'oklahoma city',
        'portland', 'las vegas', 'memphis', 'louisville', 'baltimore',
        'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento',
        'atlanta', 'long beach', 'colorado springs', 'raleigh', 'miami',
        'omaha', 'oakland', 'minneapolis', 'tulsa', 'cleveland', 'wichita',
        'arlington', 'new orleans', 'bakersfield', 'tampa', 'honolulu',
        'anaheim', 'aurora', 'santa ana', 'corpus christi', 'riverside',
        'lexington', 'stockton', 'henderson', 'saint paul', 'st. paul',
        'saint louis', 'st. louis', 'cincinnati', 'pittsburgh', 'anchorage',
        'greensboro', 'plano', 'newark', 'durham', 'lincoln', 'orlando',
        'chula vista', 'jersey city', 'chandler', 'madison', 'laredo',
        'winston-salem', 'lubbock', 'baton rouge', 'garland', 'glendale',
        'reno', 'hialeah', 'chesapeake', 'scottsdale', 'north las vegas',
        'irving', 'fremont', 'irvine', 'birmingham', 'rochester',
        'san bernardino', 'spokane', 'gilbert', 'montgomery', 'boise',
        'richmond', 'des moines', 'modesto', 'fayetteville', 'akron',
        'tacoma', 'huntington beach', 'moreno valley', 'huntington park',
        'yonkers', 'columbus', 'yuma', 'evansville', 'billings',
        'south bend', 'kalamazoo', 'fargo', 'waterloo', 'davenport',
        'springfield', 'rockford', 'new haven', 'topeka', 'concord',
        'allen', 'vista', 'grand rapids', 'new bedford', 'west valley city',
        'provo', 'el monte', 'independence', 'lakewood', 'salem',
        'kalispell', 'bend', 'spokane valley', 'idaho falls', 'pocatello',
        'twin falls', 'nampa', 'meridian', 'caldwell', 'lewiston',
        'post falls', 'coeur d\'alene', 'moscow', 'pullman', 'kennewick',
        'pasco', 'richland', 'yakima', 'wenatchee', 'bellingham',
        'everett', 'olympia', 'vancouver', 'eugene', 'medford',
        'roseburg', 'coos bay', 'astoria', 'newport', 'corvallis',
        'albany', 'lebanon', 'sweet home', 'sublimity', 'stayton',
        'scio', 'lyons', 'mill city', 'gates', 'idanha', 'cascadia',
        'virginia', 'dc', 'district of columbia', 'maryland', 'delaware',
        'pennsylvania', 'new jersey', 'connecticut', 'rhode island',
        'massachusetts', 'vermont', 'new hampshire', 'maine', 'ohio',
        'indiana', 'illinois', 'michigan', 'wisconsin', 'minnesota',
        'iowa', 'missouri', 'kansas', 'nebraska', 'south dakota',
        'north dakota', 'montana', 'wyoming', 'colorado', 'new mexico',
        'arizona', 'utah', 'nevada', 'california', 'oregon', 'washington',
        'alaska', 'hawaii', 'texas', 'oklahoma', 'arkansas', 'louisiana',
        'mississippi', 'alabama', 'georgia', 'florida', 'south carolina',
        'north carolina', 'tennessee', 'kentucky', 'west virginia',
        'virginia', 'maryland', 'delaware', 'pennsylvania', 'new jersey',
        'new york', 'connecticut', 'rhode island', 'massachusetts',
        'vermont', 'new hampshire', 'maine'
      ]
    };
    
    const keywords = locationKeywords[location];
    console.log(`🔍 Filtering trending for location: ${location} with keywords:`, keywords.slice(0, 5), '...');
    
    const locationTrending = allTrending.filter((entry: any) => {
      const title = entry.title?.toLowerCase() || '';
      const description = entry.description?.toLowerCase() || '';
      const content = `${title} ${description}`;
      
      const hasKeyword = keywords.some(keyword => content.includes(keyword));
      if (hasKeyword) {
        console.log(`✅ Found matching trending for ${location}: "${entry.title}"`);
      }
      
      return hasKeyword;
    });
    
    console.log(`📊 Location trending news found for ${location}:`, locationTrending.length);
    
    // If no location-specific trending found, return some general trending for that region
    if (locationTrending.length === 0) {
      console.log(`⚠️ No specific trending found for ${location}, returning general trending`);
      // Return first few entries as general trending for the region
      return allTrending.slice(0, 2);
    }
    
    return locationTrending;
  } catch (error) {
    console.log(`❌ Location trending news not found for ${location}, using fallback data`);
    console.log('Error details:', error);
    return [];
  }
}

// NEW: Function to discover all available content types
export async function discoverContentTypes(): Promise<string[]> {
  try {
    console.log('🔍 Discovering all available content types...');
    
    // Common content type names to test
    const commonContentTypes = [
      'trending_bar',
      'trending',
      'trending_news', 
      'trending_content',
      'trending_topics',
      'trending_articles',
      'news_channel',
      'news',
      'article',
      'post',
      'content',
      'page',
      'global_setting',
      'sidebar_news',
      'breaking_alert',
      'live_update',
      'contact',
      'email_subscription',
      'news_catogory',
      'news_author',
      'author',
      'category',
      'monsoon_news',
      'read_more_page',
      'go_to_politics',
      'language_switch_button'
    ];
    
    const availableContentTypes: string[] = [];
    
    for (const contentType of commonContentTypes) {
      try {
        console.log(`🔍 Testing content type: ${contentType}`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry()
          .limit(1)
          .find();
        
        console.log(`✅ Content type ${contentType} exists with ${response.entries?.length || 0} entries`);
        availableContentTypes.push(contentType);
      } catch (error: any) {
        const errorMessage = error?.message || '';
        if (errorMessage.includes('not found') || errorMessage.includes('422')) {
          console.log(`❌ Content type ${contentType} does not exist`);
        } else {
          console.log(`⚠️ Content type ${contentType} error:`, errorMessage);
        }
      }
    }
    
    console.log(`✅ Available content types: ${availableContentTypes.join(', ')}`);
    return availableContentTypes;
  } catch (error) {
    console.log('❌ Error discovering content types:', error);
    return [];
  }
}

// NEW: Function to get trending-related content from any available content type
export async function fetchTrendingFromAnySource(): Promise<Trending[]> {
  try {
    console.log('🔍 Searching for trending content in all available content types...');
    
    const availableContentTypes = await discoverContentTypes();
    const allTrendingData: Trending[] = [];
    
    for (const contentType of availableContentTypes) {
      try {
        console.log(`🔍 Checking ${contentType} for trending content...`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry()
          .includeEmbeddedItems()
          .find();
        
        if (response.entries && response.entries.length > 0) {
          console.log(`✅ Found ${response.entries.length} entries in ${contentType}`);
          
          // Filter entries that might be trending-related
          const trendingEntries = response.entries.filter((entry: any) => {
            const title = entry.title?.toLowerCase() || '';
            const description = entry.description?.toLowerCase() || '';
            const content = `${title} ${description}`;
            
            // Keywords that might indicate trending content
            const trendingKeywords = [
              'trending', 'popular', 'hot', 'viral', 'breaking', 
              'latest', 'top', 'featured', 'highlighted', 'trend'
            ];
            
            return trendingKeywords.some(keyword => content.includes(keyword));
          });
          
          if (trendingEntries.length > 0) {
            console.log(`✅ Found ${trendingEntries.length} trending-related entries in ${contentType}`);
            allTrendingData.push(...trendingEntries as Trending[]);
          }
        }
      } catch (error) {
        console.log(`❌ Error checking ${contentType}:`, error);
      }
    }
    
    console.log(`✅ Total trending entries found: ${allTrendingData.length}`);
    return allTrendingData;
  } catch (error) {
    console.log('❌ Error fetching trending from any source:', error);
    return [];
  }
}



// Debug function to test Contentstack API directly
export async function debugContentstackEntry(uid: string) {
  try {
    console.log('🔍 Debug: Testing Contentstack API for UID:', uid);
    console.log('🔍 Debug: API Key:', process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY ? 'Present' : 'Missing');
    console.log('🔍 Debug: Delivery Token:', process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN ? 'Present' : 'Missing');
    console.log('🔍 Debug: Environment:', process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production');
    
    // Test with different content types
    const contentTypes = ['news_channel', 'monsoon_news', 'news', 'article'];
    
    for (const contentType of contentTypes) {
      try {
        console.log(`🔍 Debug: Trying content type: ${contentType}`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry(uid)
          .includeEmbeddedItems()
          .includeFallback()
          .fetch();
        console.log(`✅ Found entry in ${contentType}:`, response);
        return { contentType, data: response };
      } catch (error) {
        console.log(`❌ Not found in ${contentType}:`, error);
      }
    }
    
    console.log('❌ Entry not found in any content type');
    return null;
  } catch (error) {
    console.log('❌ Debug error:', error);
    return null;
  }
}

'use client';
import React, { useEffect, useState } from 'react';
import { usePersonalize } from '@/lib/use-personalize';
import { fetchLocationSpecificNews, fetchLocationTrendingNews, fetchHindiLiveUpdates, fetchLiveUpdates, fetchTrendingFromAnySource } from '@/lib/contentstack-helpers';
import { fetchUSNewsEntry, fetchUSNewsEntryHindi } from '@/lib/personalize-service';

interface PersonalizedNewsProps {
  locale?: 'en' | 'hi';
}

interface NewsItem {
  uid: string;
  title: string;
  news?: {
    description: string;
    link?: string;
  };
  date?: string;
  file?: {
    url: string;
  };
}



export default function PersonalizedNews({ locale = 'en' }: PersonalizedNewsProps) {
  console.log('🔍 PersonalizedNews: Component rendering with locale:', locale);
  
  // Move all hooks to the top level - never call hooks conditionally
  const [personalizedNews, setPersonalizedNews] = useState<NewsItem[]>([]);
  const [locationNews, setLocationNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  
  // Always call hooks at the top level
  const personalizeData = usePersonalize();
  
  const { city, region, manifest, isLoading, error, trackImpression } = personalizeData || {};
  
  // Get personalized content from variants AND location-specific news from CMS
  useEffect(() => {
    const fetchContent = async () => {
      if (!region) return;
      
      setIsLoadingNews(true);
      try {
        console.log('🔍 PersonalizedNews: Starting content fetch for region:', region);
        
        // 1. Get personalized content from ContentStack Personalize variants dynamically
        const personalizedContent: NewsItem[] = [];

        console.log('🔍 Debugging Personalize content...');
        console.log('Current region:', region);
        console.log('Current manifest:', manifest);
        console.log('Available experiences:', manifest?.experiences || []);

        // Dynamically process all experiences from manifest
        if (manifest?.experiences) {
          for (const experience of manifest.experiences) {
            const experienceId = experience.shortUid;
            console.log(`Experience ${experienceId}:`, experience);
            
            if (experience.activeVariantShortUid) {
              // Track impression for this experience
              trackImpression(experience.shortUid, experience.activeVariantShortUid);
              
              // Convert variant content to news item
              if (experience.content) {
                personalizedContent.push({
                  uid: `${experience.shortUid}_${experience.activeVariantShortUid}`,
                  title: experience.content.title || 'Personalized News',
                  news: {
                    description: experience.content.description || '',
                    link: experience.content.link
                  },
                  file: experience.content.image ? { url: experience.content.image } : undefined
                });
              }
            }
          }
        }

        console.log('📊 Personalized content found:', personalizedContent.length);

        // 2. Get location-specific news from CMS dynamically
        const location = region as 'maharashtra' | 'delhi' | 'us';
        console.log('🔍 Fetching location-specific news for:', location);
        
        let newsData: NewsItem[] = [];
        let trendingData: NewsItem[] = [];
        
        // For US region, ONLY show the specific US news entry - no other content
        if (region === 'us') {
          console.log('🇺🇸 US region detected, fetching ONLY US news entry for location-specific content...');
          const usNewsEntry = locale === 'hi' ? 
            await fetchUSNewsEntryHindi() : 
            await fetchUSNewsEntry();
          
          if (usNewsEntry && usNewsEntry.content) {
            console.log('✅ US news entry found for location-specific content:', usNewsEntry.content);
            newsData = [{
              uid: `us_news_location_${usNewsEntry.id}`,
              title: usNewsEntry.content.title || 'US News',
              news: {
                description: usNewsEntry.content.description || 'Latest news from the United States',
                link: usNewsEntry.content.link || '#'
              },
              file: usNewsEntry.content.image ? { url: usNewsEntry.content.image } : {
                url: 'https://via.placeholder.com/300x200/0066cc/ffffff?text=US+News'
              }
            }];
            console.log('✅ Added US news entry to location-specific content');
          } else {
            console.log('❌ US news entry not found, showing empty location-specific content for US region');
          }
        } else {
          // For other regions, use the existing location-specific news fetching
          const [locationNews, locationTrending] = await Promise.all([
            fetchLocationSpecificNews(location),
            fetchLocationTrendingNews(location)
          ]);
          newsData = locationNews as NewsItem[];
          trendingData = locationTrending as NewsItem[];
        }
        
        console.log('📊 Location news found:', newsData.length);
        console.log('📊 Location trending found:', trendingData.length);
        
        // 3. If no personalized content found, try fallback to Contentstack dynamically
        if (personalizedContent.length === 0) {
          console.log('🔄 No personalized content found, trying Contentstack fallback...');
          try {
            // For US region, ONLY fetch the specific US news entry - no fallback content
            if (region === 'us') {
              console.log('🇺🇸 US region: No fallback content needed, using only US news entry');
            } else {
              // For other regions, try to fetch fallback content from Contentstack
              const fallbackContent = await fetchTrendingFromAnySource();
              if (fallbackContent && fallbackContent.length > 0) {
                console.log('✅ Fallback content found from Contentstack:', fallbackContent.length);
                const fallbackNews = fallbackContent.slice(0, 3).map((item: any) => ({
                  uid: `fallback_${item.uid}`,
                  title: item.title || 'Latest News',
                  news: {
                    description: item.modular_blocks?.[0]?.link?.description || '',
                    link: item.modular_blocks?.[0]?.link?.href || '#'
                  },
                  file: undefined
                }));
                setPersonalizedNews(fallbackNews);
              } else {
                console.log('❌ No fallback content available from Contentstack');
              }
            }
          } catch (fallbackError) {
            console.error('❌ Error fetching fallback content:', fallbackError);
          }
        } else {
          // Set personalized content
          setPersonalizedNews(personalizedContent);
        }
        
        // Set location-specific news
        setLocationNews([...newsData, ...trendingData]);
        
      } catch (error) {
        console.error('❌ Error fetching personalized content:', error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchContent();
  }, [region, manifest, locale, trackImpression]);
  
  // Handle hook errors gracefully
  if (!personalizeData) {
    console.error('Error initializing usePersonalize');
    // Return fallback content if hook fails
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-blue-200 pb-2">
          {locale === 'hi' ? 'महाराष्ट्र के लिए हाइलाइटेड समाचार' : 'Highlighted News for Maharashtra'}
        </h3>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img 
                src="https://via.placeholder.com/300x200/0066cc/ffffff?text=Rain+Alert" 
                alt="Rain Alert"
                className="w-16 h-12 object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                MH - Heavy Rain Hits Pune: Alerts Issued
              </h4>
              <p className="text-xs text-gray-600">
                Heavy rainfall in Pune has led to flood alerts being issued across the city. Authorities have advised residents to stay indoors and avoid low-lying areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Add error boundary for runtime errors
  if (error) {
    console.error('PersonalizedNews error:', error);
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="text-red-600 text-center py-2 text-sm">
          {locale === 'hi' ? 'समाचार लोड करने में त्रुटि' : 'Error loading news'}
        </div>
      </div>
    );
  }



  const getLocationTitle = () => {
    if (region === 'maharashtra') {
      return locale === 'hi' ? 'महाराष्ट्र के लिए हाइलाइटेड समाचार' : 'Highlighted News for Maharashtra';
    } else if (region === 'delhi') {
      return locale === 'hi' ? 'दिल्ली के लिए हाइलाइटेड समाचार' : 'Highlighted News for Delhi';
    } else if (region === 'us') {
      return locale === 'hi' ? 'अमेरिका के लिए हाइलाइटेड समाचार' : 'Highlighted News for US';
    } else if (region === 'local') {
      return locale === 'hi' ? 'स्थानीय हाइलाइटेड समाचार' : 'Local Highlighted News';
    }
    return locale === 'hi' ? 'हाइलाइटेड समाचार' : 'Highlighted News';
  };



  // Simple Hindi translation function
  const translateToHindi = (text: string): string => {
    const translations: Record<string, string> = {
      'Massive price cut on iPhone 16 Pro, changes made ahead of iPhone 17 launch': 'iPhone 16 Pro पर भारी छूट, iPhone 17 लॉन्च से पहले बदलाव',
      'Story | The Illness of Poetry | StoryBox with Jamshed': 'कहानी | कविता की बीमारी | जमशेद के साथ स्टोरीबॉक्स',
      'Personalized content from Contentstack fallback': 'Contentstack से व्यक्तिगत सामग्री',
      'Personalized News': 'व्यक्तिगत समाचार',
      'Live Update': 'लाइव अपडेट',
      'Latest news update': 'ताजा समाचार अपडेट',
      'Highlighted News': 'हाइलाइटेड समाचार',
      'Personalized': 'व्यक्तिगत',
      'Highlighted': 'हाइलाइटेड'
    };
    
    return translations[text] || text;
  };

  // Function to fetch live updates with proper locale
  const fetchLiveUpdatesWithLocale = async (currentLocale: string) => {
    try {
      if (currentLocale === 'hi') {
        return await fetchHindiLiveUpdates();
      } else {
        return await fetchLiveUpdates();
      }
    } catch (error) {
      console.error('Error fetching live updates with locale:', error);
      return [];
    }
  };

  if (isLoading || isLoadingNews) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 text-sm">
            {locale === 'hi' ? 'समाचार लोड हो रहे हैं...' : 'Loading news...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="text-red-600 text-center py-2 text-sm">
          {locale === 'hi' ? 'समाचार लोड करने में त्रुटि' : 'Error loading news'}
        </div>
      </div>
    );
  }

  // Combine personalized variants with location news, prioritizing variants and removing duplicates
  const allHighlightedNews = [...personalizedNews, ...locationNews];
  
  // Remove duplicates based on title and description
  const uniqueNews = allHighlightedNews.reduce((acc, current) => {
    const isDuplicate = acc.some(item => 
      item.title === current.title && 
      item.news?.description === current.news?.description
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, [] as NewsItem[]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
      {/* Location Info */}
      {city && (
        <div className="mb-3">
          <p className="text-xs text-blue-700 font-medium">
            {locale === 'hi' ? '📍 आपका स्थान: ' : '📍 Your location: '}
            <span className="font-semibold">{city}</span>
            {locale === 'hi' ? ' (क्षेत्र: ' : ' (Region: '}
            <span className="font-semibold">{region}</span>)
          </p>
        </div>
      )}

      {/* Highlighted News Title */}
      <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-blue-200 pb-2">
        {getLocationTitle()}
      </h3>
      

      
      {/* Content based on whether we have news or not */}
      {uniqueNews.length > 0 ? (
        /* Highlighted News from Variants and CMS */
        <div className="space-y-3">
          {uniqueNews.slice(0, 2).map((item, index) => (
            <div key={`${item.uid}_${index}`} className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
              <div className="flex items-start space-x-3">
                {item.file?.url && (
                  <img 
                    src={item.file.url} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.news?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${
                      personalizedNews.some(p => p.title === item.title && p.news?.description === item.news?.description)
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {personalizedNews.some(p => p.title === item.title && p.news?.description === item.news?.description)
                        ? (locale === 'hi' ? 'व्यक्तिगत' : 'Personalized')
                        : (locale === 'hi' ? 'हाइलाइटेड' : 'Highlighted')
                      }
                    </span>
                    {item.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No News Message */
        <div className="text-center py-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
            <p className="text-sm text-gray-600 mb-2">
              {locale === 'hi' 
                ? 'इस क्षेत्र के लिए कोई हाइलाइटेड समाचार नहीं मिला।'
                : 'No highlighted news found for this region.'
              }
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-xs">
                <strong>{locale === 'hi' ? 'टिप:' : 'Tip:'}</strong> 
                {locale === 'hi' 
                  ? ' ContentStack Personalize में अनुभव बनाएं या CMS में कीवर्ड जोड़ें।'
                  : ' Create experiences in ContentStack Personalize or add keywords in CMS.'
                }
              </p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
} 
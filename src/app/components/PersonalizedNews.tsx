'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalize } from '@/lib/use-personalize';
import { getAllVariantsWithFallback, fetchUSNewsEntry, fetchUSNewsEntryHindi, fetchMaharashtraNewsEntry, fetchMaharashtraNewsEntryHindi } from '@/lib/personalize-service';
import { translateToHindi } from '@/lib/contentstack-helpers';

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

interface PersonalizedNewsProps {
  locale?: string;
  newsChannelEntries?: any[];
}

export default function PersonalizedNews({ locale = 'en', newsChannelEntries = [] }: PersonalizedNewsProps) {
  const [personalizedNews, setPersonalizedNews] = useState<NewsItem[]>([]);
  const [isLoadingPersonalize, setIsLoadingPersonalize] = useState(true);
  
  // Use the proper VPN detection from usePersonalize hook
  const personalizeData = usePersonalize();
  const { city, region, isLoading, error } = personalizeData || {};
  
  // TEMPORARY: Force US region for testing if URL parameter is present
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const forceUSParam = urlParams?.get('forceUS');
  const effectiveRegion = forceUSParam === 'true' ? 'us' : region;
  
  // Fetch personalized content based on VPN status
  useEffect(() => {
    const fetchPersonalizedContent = async () => {
      setIsLoadingPersonalize(true);
      
      try {
        // If effective region is null, use fallback to regular news (Pune news)
        if (!effectiveRegion) {
          const fallbackNews = newsChannelEntries.map(entry => ({
            uid: entry.uid,
            title: entry.title,
            news: entry.news,
            date: entry.date,
            file: entry.file
          }));
          setPersonalizedNews(fallbackNews);
          setIsLoadingPersonalize(false);
          return;
        }
        
        if (effectiveRegion === 'us') {
          // Fetch US news from Personalize variants
          let usNewsVariant;
          if (locale === 'hi') {
            usNewsVariant = await fetchUSNewsEntryHindi();
          } else {
            usNewsVariant = await fetchUSNewsEntry();
          }
          
          if (usNewsVariant) {
            setPersonalizedNews([{
              uid: usNewsVariant.id,
              title: usNewsVariant.content.title,
              news: {
                description: usNewsVariant.content.description,
                link: usNewsVariant.content.link
              },
              date: new Date().toISOString(),
              file: usNewsVariant.content.image ? {
                url: usNewsVariant.content.image
              } : undefined
            }]);
          } else {
            // No US news found from SDK, show fallback US news with Hindi translation
            setPersonalizedNews([{
              uid: 'us-news-fallback',
              title: "New York congresswoman's ICE guidance may have broken federal law",
              news: {
                description: 'Breaking news: New York congresswoman\'s ICE guidance may have broken federal law. This content is shown when accessing from US location via VPN.',
                link: `/en/read-more/us-news-fallback`
              },
              date: new Date().toISOString()
            }]);
          }
        } else {
          // Fetch Maharashtra news from Personalize variants
          let maharashtraNewsVariant;
          if (locale === 'hi') {
            maharashtraNewsVariant = await fetchMaharashtraNewsEntryHindi();
          } else {
            maharashtraNewsVariant = await fetchMaharashtraNewsEntry();
          }
          
          if (maharashtraNewsVariant) {
            setPersonalizedNews([{
              uid: maharashtraNewsVariant.id,
              title: maharashtraNewsVariant.content.title,
              news: {
                description: maharashtraNewsVariant.content.description,
                link: maharashtraNewsVariant.content.link
              },
              date: new Date().toISOString(),
              file: maharashtraNewsVariant.content.image ? {
                url: maharashtraNewsVariant.content.image
              } : undefined
            }]);
          } else {
            // Fallback to regular news channel entries (Pune news)
            const puneNews = newsChannelEntries.map(entry => ({
              uid: entry.uid,
              title: entry.title,
              news: entry.news,
              date: entry.date,
              file: entry.file
            }));
            
            setPersonalizedNews(puneNews);
          }
        }
      } catch (error) {
        // Fallback to regular news
        setPersonalizedNews(newsChannelEntries.map(entry => ({
          uid: entry.uid,
          title: entry.title,
          news: entry.news,
          date: entry.date,
          file: entry.file
        })));
      } finally {
        setIsLoadingPersonalize(false);
      }
    };

    if (!isLoading && effectiveRegion !== undefined) {
      fetchPersonalizedContent();
    } else if (!isLoading && effectiveRegion === null) {
      // If region is null and not loading, use fallback
      const fallbackNews = newsChannelEntries.map(entry => ({
        uid: entry.uid,
        title: entry.title,
        news: entry.news,
        date: entry.date,
        file: entry.file
      }));
      setPersonalizedNews(fallbackNews);
      setIsLoadingPersonalize(false);
    }
  }, [effectiveRegion, city, isLoading, locale, newsChannelEntries]);

  const getLocationTitle = () => {
    if (effectiveRegion === 'us') {
      return locale === 'hi' ? '🇺🇸 अमेरिका के लिए हाइलाइटेड समाचार (VPN ON)' : '🇺🇸 Highlighted News for US (VPN ON)';
    } else {
      return locale === 'hi' ? '📍 पुणे के लिए हाइलाइटेड समाचार (VPN OFF)' : '📍 Highlighted News for Pune (VPN OFF)';
    }
  };

  if (isLoading || isLoadingPersonalize) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 text-sm">
            {locale === 'hi' ? 'VPN स्थिति जांच रहे हैं...' : 'Checking VPN status...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
      {/* Content based on whether we have news or not */}
      {personalizedNews.length > 0 ? (
        /* Highlighted News from Personalize Variants */
        <div className="space-y-3">
          {personalizedNews.slice(0, 2).map((item, index) => (
            <div key={`${item.uid}_${index}`} className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
              <div className="flex items-start space-x-3">
                {/* Image removed - showing only text content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {translateToHindi(item.title, locale)}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {translateToHindi(item.news?.description?.replace(/<p>/g, '').replace(/<\/p>/g, '') || '', locale)}
                  </p>
                  <div className="flex items-center justify-between">
                    {item.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
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
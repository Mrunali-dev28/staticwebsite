'use client';

import React, { useState, useEffect } from 'react';
import { usePersonalize } from '@/lib/use-personalize';
import { getAllVariantsWithFallback, fetchUSNewsEntry, fetchUSNewsEntryHindi, fetchMaharashtraNewsEntry, fetchMaharashtraNewsEntryHindi } from '@/lib/personalize-service';
import { fetchUSNews, fetchHindiUSNews, fetchSpecificUSNewsEntry } from '@/lib/contentstack-helpers';
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
  
  // Debug logging
  console.log('🔍 PersonalizedNews Component Debug:');
  console.log('  - Locale:', locale);
  console.log('  - News Channel Entries Count:', newsChannelEntries?.length || 0);
  console.log('  - First Entry Title:', newsChannelEntries?.[0]?.title || 'No entries');
  console.log('  - First Entry Description:', newsChannelEntries?.[0]?.news?.description || 'No description');
  
  // Test translation function
  if (locale === 'hi' && newsChannelEntries?.[0]?.title) {
    const translatedTitle = translateToHindi(newsChannelEntries[0].title, locale);
    console.log('  - Original Title:', newsChannelEntries[0].title);
    console.log('  - Translated Title:', translatedTitle);
    console.log('  - Translation Working:', translatedTitle !== newsChannelEntries[0].title);
  }
  
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
      console.log('🔍 PersonalizedNews: Starting to fetch personalized content...');
      console.log('🔍 PersonalizedNews: Current state:', { city, region, effectiveRegion, isLoading, error, locale });
      console.log('🔍 PersonalizedNews: Force US param:', forceUSParam);
      
      setIsLoadingPersonalize(true);
      
      try {
        // Check if Personalize service is configured
        const projectUid = process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;
        if (!projectUid || projectUid === '6891ff716f1a09b09e904b21') {
          console.log('⚠️ Personalize service not properly configured, fetching US news directly from CMS');
          
          // If US region is detected, fetch real US news from CMS
          if (effectiveRegion === 'us') {
            console.log('🔍 US region detected, fetching US news from CMS');
            try {
              // Try to fetch the specific US news entry first
              const specificEntryId = 'blte933ca60d09a6b6c';
              const specificVariantId = 'csd7cbbc175c7a995f';
              
              console.log('🎯 Attempting to fetch specific US news entry...');
              const specificEntry = await fetchSpecificUSNewsEntry(specificEntryId, specificVariantId);
              
              if (specificEntry) {
                console.log('✅ Specific US news entry found, using it');
                setPersonalizedNews([{
                  uid: specificEntry.uid,
                  title: specificEntry.title,
                  news: {
                    description: specificEntry.description || specificEntry.news?.description || '',
                    link: specificEntry.link || specificEntry.news?.link || ''
                  },
                  date: specificEntry.date || specificEntry.created_at || new Date().toISOString(),
                  file: specificEntry.file || specificEntry.featured_image ? {
                    url: specificEntry.file?.url || specificEntry.featured_image?.url || ''
                  } : undefined
                }]);
              } else {
                console.log('⚠️ Specific entry not found, falling back to general US news');
                // Fallback to general US news if specific entry not found
                let usNewsEntries: any[] = [];
                if (locale === 'hi') {
                  usNewsEntries = await fetchHindiUSNews();
                } else {
                  usNewsEntries = await fetchUSNews();
                }
                
                if (usNewsEntries && usNewsEntries.length > 0) {
                  console.log('✅ US news found in CMS:', usNewsEntries.length, 'entries');
                  const formattedNews = usNewsEntries.map(entry => ({
                    uid: entry.uid,
                    title: entry.title,
                    news: {
                      description: entry.description || entry.news?.description || '',
                      link: entry.link || entry.news?.link || ''
                    },
                    date: entry.date || entry.created_at || new Date().toISOString(),
                    file: entry.file || entry.featured_image ? {
                      url: entry.file?.url || entry.featured_image?.url || ''
                    } : undefined
                  }));
                  setPersonalizedNews(formattedNews);
                } else {
                  console.log('❌ No US news found in CMS, showing empty state');
                  setPersonalizedNews([]);
                }
              }
            } catch (cmsError) {
              console.log('❌ Error fetching US news from CMS:', cmsError);
              setPersonalizedNews([]);
            }
          } else {
            // Use fallback to regular news when Personalize is not configured and not US region
            let fallbackNews: any[] = [];
            
            // Use news channel entries for both locales (no hardcoded content)
            fallbackNews = newsChannelEntries.map(entry => ({
              uid: entry.uid,
              title: entry.title,
              news: entry.news,
              date: entry.date,
              file: entry.file
            }));
            
            setPersonalizedNews(fallbackNews);
          }
          setIsLoadingPersonalize(false);
          return;
        }
        
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
          // Fetch US news from Personalize variants with timeout
          let usNewsVariant: any = null;
          try {
            if (locale === 'hi') {
              usNewsVariant = await Promise.race([
                fetchUSNewsEntryHindi(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Timeout')), 10000)
                )
              ]) as any;
            } else {
              usNewsVariant = await Promise.race([
                fetchUSNewsEntry(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Timeout')), 10000)
                )
              ]) as any;
            }
          } catch (timeoutError) {
            console.log('⏰ Personalize API timeout, using fallback');
            usNewsVariant = null;
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
            // No US news found from CMS - show empty state
            setPersonalizedNews([]);
          }
        } else {
          // Fetch Maharashtra news from Personalize variants with timeout
          let maharashtraNewsVariant: any = null;
          try {
            if (locale === 'hi') {
              maharashtraNewsVariant = await Promise.race([
                fetchMaharashtraNewsEntryHindi(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Timeout')), 10000)
                )
              ]) as any;
            } else {
              maharashtraNewsVariant = await Promise.race([
                fetchMaharashtraNewsEntry(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Timeout')), 10000)
                )
              ]) as any;
            }
          } catch (timeoutError) {
            console.log('⏰ Personalize API timeout, using fallback');
            maharashtraNewsVariant = null;
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
            // No Maharashtra news found from CMS - show empty state
            setPersonalizedNews([]);
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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4 min-h-[200px]">
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4 min-h-[200px]">
      
      {/* Content based on whether we have news or not */}
      {personalizedNews.length > 0 ? (
        /* Highlighted News from Personalize Variants */
        <div className="space-y-3">
          {personalizedNews.slice(0, 2).map((item, index) => (
            <div 
              key={`${item.uid}_${index}`} 
              className="!bg-red-500 !rounded-lg !p-4 !shadow-md !border-l-4 !border-blue-500 hover:!shadow-lg !transition-shadow !duration-200 !border-0 !border-r-0 !border-t-0 !border-b-0"
              style={{
                backgroundColor: 'red',
                borderRadius: '0.5rem',
                padding: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderLeft: '4px solid #3b82f6',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                transition: 'box-shadow 0.2s ease-in-out'
              }}
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-yellow-400 mb-2 line-clamp-2 leading-tight" style={{ color: 'yellow', fontSize: '18px' }}>
                  {locale === 'hi' ? translateToHindi(item.title, locale) : item.title}
                </h4>
                {item.news?.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {locale === 'hi' ? translateToHindi(item.news.description.replace(/<p>/g, '').replace(/<\/p>/g, '') || '', locale) : item.news.description.replace(/<p>/g, '').replace(/<\/p>/g, '') || ''}
                  </p>
                )}
                {item.date && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
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
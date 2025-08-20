// Personalize Service for fetching variant content - Dynamic Version
const PERSONALIZE_BASE_URL = process.env.NEXT_PUBLIC_PERSONALISE_EDGE || 'https://personalize.contentstack.com';
const PROJECT_UID = process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;

// Check if Personalize service is properly configured
const isPersonalizeConfigured = () => {
  return PROJECT_UID && PROJECT_UID !== '6891ff716f1a09b09e904b21'; // Check if it's not the default/placeholder value
};

export interface PersonalizeVariant {
  id: string;
  content: any;
  experienceId: string;
  variantId: string;
}

export interface PersonalizeExperience {
  shortUid: string;
  activeVariantShortUid: string | null;
}

export interface PersonalizeManifest {
  activeVariants: Record<string, string | null>;
  experiences: PersonalizeExperience[];
}

// Fetch manifest to get available experiences and variants
export async function fetchPersonalizeManifest(): Promise<PersonalizeManifest | null> {
  try {
    console.log('🔍 Fetching Personalize manifest...');
    console.log('🔍 Using Personalize URL:', PERSONALIZE_BASE_URL);
    console.log('🔍 Project UID:', PROJECT_UID);
    console.log('🔍 User UID:', currentUserUid);
    
    // Check if Personalize service is properly configured
    if (!isPersonalizeConfigured()) {
      console.log('⚠️ Personalize service not properly configured, skipping manifest fetch');
      return null;
    }
    
    // Try different manifest endpoints with proper error handling
    const manifestEndpoints = [
      `${PERSONALIZE_BASE_URL}/manifest`,
      `${PERSONALIZE_BASE_URL}/experiences`,
      `${PERSONALIZE_BASE_URL}/manifest/${PROJECT_UID}`,
    ];

    for (const endpoint of manifestEndpoints) {
      try {
        console.log(`🔍 Trying manifest endpoint: ${endpoint}`);
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        // Add project UID if available
        if (PROJECT_UID) {
          headers['x-project-uid'] = PROJECT_UID;
        }

        // Add user UID if available
        if (currentUserUid) {
          headers['x-cs-personalize-user-uid'] = currentUserUid;
        }

        const response = await fetch(endpoint, { 
          headers,
          // Add timeout to prevent hanging requests
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (response.ok) {
          const manifest = await response.json();
          console.log(`✅ Manifest fetched successfully from ${endpoint}:`, manifest);
          return manifest;
        } else {
          console.log(`❌ Failed with endpoint ${endpoint}:`, response.status, response.statusText);
          // Don't try to read error body for 400/404 errors to avoid additional requests
          if (response.status !== 400 && response.status !== 404) {
            try {
              const errorBody = await response.text();
              console.error(`❌ Error response body from ${endpoint}:`, errorBody);
            } catch (e) {
              console.error(`❌ Could not read error response body from ${endpoint}`);
            }
          }
        }
      } catch (error: any) {
        // Handle network errors gracefully
        if (error.name === 'AbortError') {
          console.log(`⏰ Timeout with endpoint ${endpoint}`);
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.log(`🌐 Network error with endpoint ${endpoint}:`, error.message);
        } else {
          console.log(`❌ Error with endpoint ${endpoint}:`, error.message);
        }
      }
    }

    console.log('❌ All manifest endpoints failed, Personalize service may not be configured');
    return null;
  } catch (error) {
    console.error('❌ Error fetching manifest:', error);
    return null;
  }
}

// Fetch variant content by experience and variant IDs
export async function fetchVariantContent(
  experienceId: string, 
  variantId: string
): Promise<PersonalizeVariant | null> {
  try {
    console.log(`🔍 Fetching variant content for experience ${experienceId}, variant ${variantId}...`);
    
    // Check if required environment variables are set
    if (!PROJECT_UID) {
      console.log('⚠️ Project UID not configured, skipping variant content fetch');
      return null;
    }
    
    // Try different endpoints for variant content based on Personalize Edge API
    const endpoints = [
      `${PERSONALIZE_BASE_URL}/experiences/${experienceId}/variants/${variantId}`,
      `${PERSONALIZE_BASE_URL}/experience/${experienceId}/variant/${variantId}`,
      `${PERSONALIZE_BASE_URL}/content/${experienceId}/${variantId}`,
      `${PERSONALIZE_BASE_URL}/variant/${variantId}`,
      `${PERSONALIZE_BASE_URL}/content/${variantId}`
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            'x-project-uid': PROJECT_UID || '',
          },
          // Add timeout to prevent hanging requests
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Success with endpoint: ${endpoint}`);
          return {
            id: variantId,
            content: data,
            experienceId,
            variantId
          };
        } else {
          console.log(`❌ Failed with endpoint ${endpoint}:`, response.status);
          // Don't try to read error body for 400/404 errors
          if (response.status !== 400 && response.status !== 404) {
            try {
              const errorBody = await response.text();
              console.error(`❌ Error response body from ${endpoint}:`, errorBody);
            } catch (e) {
              console.error(`❌ Could not read error response body from ${endpoint}`);
            }
          }
        }
      } catch (error: any) {
        // Handle network errors gracefully
        if (error.name === 'AbortError') {
          console.log(`⏰ Timeout with endpoint ${endpoint}`);
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.log(`🌐 Network error with endpoint ${endpoint}:`, error.message);
        } else {
          console.log(`❌ Error with endpoint ${endpoint}:`, error.message);
        }
      }
    }

    console.log('❌ All endpoints failed for variant content, Personalize service may not be configured');
    return null;
  } catch (error) {
    console.error('❌ Error fetching variant content:', error);
    return null;
  }
}

// User management functions
let currentUserUid: string | null = null;

// Set user's city and get personalized content
export async function setUserCity(city: string | null | undefined): Promise<PersonalizeManifest | null> {
  try {
    console.log('🔍 setUserCity: Setting city to:', city);
    
    // Handle null/undefined city
    if (!city) {
      console.log('⚠️ setUserCity: City is null/undefined, using default');
      city = 'pune'; // Default fallback
    }
    
    // Generate a user UID based on city (for demo purposes)
    currentUserUid = `user_${city.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
    console.log('🔍 setUserCity: Generated user UID:', currentUserUid);
    
    // Fetch manifest for this user/city
    const manifest = await fetchPersonalizeManifest();
    console.log('🔍 setUserCity: Manifest fetched:', manifest);
    
    // If manifest fetch fails, return null
    if (!manifest) {
      console.log('⚠️ Personalize manifest fetch failed, returning null');
      return null;
    }
    
    return manifest;
  } catch (error) {
    console.error('❌ setUserCity: Error:', error);
    // Return null instead of hardcoded fallback
    return null;
  }
}

// Get current user UID
export function getCurrentUserUid(): string | null {
  return currentUserUid;
}

// Track impression using Personalize Edge API
export async function trackImpression(experienceShortUid: string, variantShortUid: string): Promise<void> {
  try {
    console.log('🔍 trackImpression: Tracking impression for', experienceShortUid, variantShortUid);
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-project-uid': PROJECT_UID || '',
        'x-cs-personalize-user-uid': currentUserUid || '',
      },
      body: JSON.stringify({
        experienceShortUid,
        variantShortUid,
        type: 'IMPRESSION'
      }),
    });

    if (response.ok) {
      console.log('✅ Impression tracked successfully');
    } else {
      console.log('⚠️ Failed to track impression:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ trackImpression: Error:', error);
  }
}

// Track conversion using Personalize Edge API
export async function trackConversion(eventKey: string): Promise<void> {
  try {
    console.log('🔍 trackConversion: Tracking conversion for', eventKey);
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-project-uid': PROJECT_UID || '',
        'x-cs-personalize-user-uid': currentUserUid || '',
      },
      body: JSON.stringify({
        eventKey,
        type: 'EVENT'
      }),
    });

    if (response.ok) {
      console.log('✅ Conversion tracked successfully');
    } else {
      console.log('⚠️ Failed to track conversion:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ trackConversion: Error:', error);
  }
}

// Set and update user attributes using Personalize Edge API
export async function setUserAttributes(attributes: Record<string, any>): Promise<void> {
  try {
    console.log('🔍 setUserAttributes: Setting attributes:', attributes);
    console.log('🔍 User UID:', currentUserUid);
    
    // For now, skip the user attributes API call to avoid 400/405 errors
    // The Personalize manifest and variant fetching should still work
    console.log('⚠️ Skipping user attributes API call to avoid errors');
    console.log('✅ User attributes would be:', attributes);
    
    // TODO: Implement proper user attributes when Personalize Edge API is stable
    // The current Personalize Edge API seems to have issues with user attributes endpoint
    
  } catch (error) {
    console.error('❌ setUserAttributes: Error:', error);
    // Don't throw error, just log it and continue
  }
}

// Fetch specific entry from Contentstack dynamically
export async function fetchVariantFromContentstack(entryId: string): Promise<PersonalizeVariant | null> {
  try {
    console.log(`🔍 Fetching entry ${entryId} from Contentstack...`);
    
    const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
    const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
    
    if (!apiKey || !deliveryToken) {
      console.error('❌ Contentstack API credentials not configured');
      return null;
    }

    // Try to fetch the entry from live_update content type
    const response = await fetch(`https://api.contentstack.io/v3/content_types/live_update/entries/${entryId}?environment=production`, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
      },
    });

    if (!response.ok) {
      console.log(`⚠️ Failed to fetch entry ${entryId}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log('✅ Successfully fetched entry from Contentstack:', data);

    // Create a variant object from the Contentstack entry
    const variant: PersonalizeVariant = {
      id: entryId,
      content: {
        title: data.entry.title,
        uid: data.entry.uid,
        locale: data.entry.locale,
        publish_details: data.entry.publish_details,
        // Add any other fields from the entry
        ...data.entry
      },
      experienceId: 'dynamic', // Dynamic experience ID
      variantId: entryId
    };

    return variant;
  } catch (error) {
    console.error('❌ Error fetching variant from Contentstack:', error);
    return null;
  }
}

// Get variant content with dynamic fallback to Contentstack
export async function getVariantContentWithFallback(experienceId: string, variantId: string): Promise<PersonalizeVariant | null> {
  try {
    // First try to get from Personalize API
    const personalizeVariant = await fetchVariantContent(experienceId, variantId);
    if (personalizeVariant) {
      return personalizeVariant;
    }

    // If Personalize API fails, try to get from Contentstack dynamically
    console.log('🔍 Personalize API failed, trying Contentstack fallback...');
    
    // Try to fetch the variant from Contentstack using the variant ID as entry ID
    const contentstackVariant = await fetchVariantFromContentstack(variantId);
    if (contentstackVariant) {
      console.log('✅ Successfully fetched variant from Contentstack fallback');
      return contentstackVariant;
    }

    console.log('❌ Both Personalize API and Contentstack fallback failed');
    return null;
  } catch (error) {
    console.error('❌ Error in getVariantContentWithFallback:', error);
    return null;
  }
}

// Get all variants with dynamic Contentstack fallback
export async function getAllVariantsWithFallback(): Promise<PersonalizeVariant[]> {
  try {
    const manifest = await fetchPersonalizeManifest();
    if (!manifest) {
      console.log('❌ No manifest available');
      return [];
    }

    const variants: PersonalizeVariant[] = [];
    
    // Process each experience dynamically
    for (const experience of manifest.experiences) {
      const experienceId = experience.shortUid;
      const activeVariantId = experience.activeVariantShortUid;
      
      if (activeVariantId) {
        console.log(`🔍 Processing experience ${experienceId} with active variant ${activeVariantId}`);
        
        // Try Personalize API first, then Contentstack fallback
        const variantContent = await getVariantContentWithFallback(experienceId, activeVariantId);
        if (variantContent) {
          variants.push(variantContent);
        }
      }
    }

    // If no variants found from Personalize, try to discover Contentstack entries dynamically
    if (variants.length === 0) {
      console.log('🔍 No variants from Personalize, trying to discover Contentstack entries...');
      
      // Try to fetch recent entries from Contentstack dynamically
      try {
        const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
        const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
        
        if (apiKey && deliveryToken) {
          const response = await fetch(`https://api.contentstack.io/v3/content_types/live_update/entries?environment=production&limit=5`, {
            headers: {
              'api_key': apiKey,
              'access_token': deliveryToken,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('✅ Discovered Contentstack entries:', data.entries?.length || 0);
            
            for (const entry of data.entries || []) {
              try {
                const variant = await fetchVariantFromContentstack(entry.uid);
                if (variant) {
                  variants.push(variant);
                  console.log(`✅ Added variant from discovered Contentstack entry: ${entry.uid}`);
                }
              } catch (error) {
                console.log(`❌ Failed to fetch discovered entry ${entry.uid}:`, error);
              }
            }
          }
        }
      } catch (error) {
        console.log('❌ Failed to discover Contentstack entries:', error);
      }
    }

    console.log(`✅ Found ${variants.length} variants with dynamic fallback`);
    return variants;
  } catch (error) {
    console.error('❌ Error getting all variants with fallback:', error);
    return [];
  }
}

// Get all available variants from manifest
export async function getAllVariants(): Promise<PersonalizeVariant[]> {
  try {
    const manifest = await fetchPersonalizeManifest();
    if (!manifest) {
      console.log('❌ No manifest available');
      return [];
    }

    const variants: PersonalizeVariant[] = [];
    
    // Process each experience
    for (const experience of manifest.experiences) {
      const experienceId = experience.shortUid;
      const activeVariantId = experience.activeVariantShortUid;
      
      if (activeVariantId) {
        console.log(`🔍 Processing experience ${experienceId} with active variant ${activeVariantId}`);
        const variantContent = await fetchVariantContent(experienceId, activeVariantId);
        if (variantContent) {
          variants.push(variantContent);
        }
      }
    }

    console.log(`✅ Found ${variants.length} variants`);
    return variants;
  } catch (error) {
    console.error('❌ Error getting all variants:', error);
    return [];
  }
}

// Get specific variant by experience ID
export async function getVariantByExperience(experienceId: string): Promise<PersonalizeVariant | null> {
  try {
    const manifest = await fetchPersonalizeManifest();
    if (!manifest) {
      return null;
    }

    const experience = manifest.experiences.find(exp => exp.shortUid === experienceId);
    if (!experience || !experience.activeVariantShortUid) {
      console.log(`❌ No active variant for experience ${experienceId}`);
      return null;
    }

    return await fetchVariantContent(experienceId, experience.activeVariantShortUid);
  } catch (error) {
    console.error('❌ Error getting variant by experience:', error);
    return null;
  }
}

// Get first available variant (for testing)
export async function getFirstAvailableVariant(): Promise<PersonalizeVariant | null> {
  try {
    const variants = await getAllVariants();
    return variants.length > 0 ? variants[0] : null;
  } catch (error) {
    console.error('❌ Error getting first variant:', error);
    return null;
  }
} 

// Fetch specific US news entry
export async function fetchUSNewsEntry(): Promise<PersonalizeVariant | null> {
  try {
    console.log('🔍 Fetching US news entries from us_news content type...');
    
    // Import the Contentstack helpers
    const { fetchUSNews } = await import('@/lib/contentstack-helpers');
    
    // Try to fetch all US news entries
    const usNewsEntries = await fetchUSNews();
    
    console.log('✅ US news entries fetched successfully:', usNewsEntries.length, 'entries');
    
    if (usNewsEntries && usNewsEntries.length > 0) {
      // Use the first US news entry
      const firstEntry = usNewsEntries[0];
      console.log('✅ Using US news entry:', firstEntry.title);
      
      return {
        id: firstEntry.uid || 'us_news_default',
        content: {
          title: firstEntry.title || 'US News',
          description: firstEntry.news?.description || firstEntry.description || 'Latest US news and updates',
          link: firstEntry.url || '#',
          image: firstEntry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=US+News'
        },
        experienceId: 'us_news',
        variantId: firstEntry.uid || 'us_news_default'
      };
    } else {
      console.log('⚠️ No US news entries found in CMS');
      return null; // Return null instead of hardcoded fallback
    }
  } catch (error) {
    console.error('❌ Error fetching US news entry:', error);
    return null; // Return null instead of hardcoded fallback
  }
}

// Fetch US news entry with Hindi locale
export async function fetchUSNewsEntryHindi(): Promise<PersonalizeVariant | null> {
  try {
    console.log('🔍 Fetching US news entries (Hindi) from us_news content type...');
    
    // Import the Contentstack helpers
    const { fetchHindiUSNews } = await import('@/lib/contentstack-helpers');
    
    // Try to fetch all US news entries with Hindi locale support
    const usNewsEntries = await fetchHindiUSNews();
    
    console.log('✅ US news entries (Hindi) fetched successfully:', usNewsEntries.length, 'entries');
    
    if (usNewsEntries && usNewsEntries.length > 0) {
      // Use the first US news entry
      const firstEntry = usNewsEntries[0];
      console.log('✅ Using US news entry (Hindi):', firstEntry.title);
      
      return {
        id: firstEntry.uid || 'us_news_default',
        content: {
          title: firstEntry.title || 'US News',
          description: firstEntry.news?.description || firstEntry.description || 'Latest US news and updates',
          link: firstEntry.url || '#',
          image: firstEntry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=US+News'
        },
        experienceId: 'us_news',
        variantId: firstEntry.uid || 'us_news_default'
      };
    } else {
      console.log('⚠️ No US news entries found in CMS (Hindi)');
      return null; // Return null instead of hardcoded fallback
    }
  } catch (error) {
    console.error('❌ Error fetching US news entry (Hindi):', error);
    return null; // Return null instead of hardcoded fallback
  }
} 

// Fetch Maharashtra news entry from Personalize variants
export async function fetchMaharashtraNewsEntry(): Promise<PersonalizeVariant | null> {
  try {
    console.log('🔍 Fetching Maharashtra news entry from Personalize variants...');
    
    // First try to get from Personalize manifest
    const manifest = await fetchPersonalizeManifest();
    if (manifest && manifest.experiences) {
      // Look for Maharashtra experience
      const maharashtraExperience = manifest.experiences.find(exp => 
        exp.shortUid.toLowerCase().includes('maharashtra') || 
        exp.shortUid.toLowerCase().includes('pune') ||
        exp.shortUid.toLowerCase().includes('news_channel')
      );
      
      if (maharashtraExperience && maharashtraExperience.activeVariantShortUid) {
        console.log('✅ Found Maharashtra experience:', maharashtraExperience.shortUid);
        const variantContent = await fetchVariantContent(
          maharashtraExperience.shortUid, 
          maharashtraExperience.activeVariantShortUid
        );
        
        if (variantContent) {
          console.log('✅ Maharashtra variant content fetched:', variantContent);
          return variantContent;
        }
      }
    }
    
    // Fallback: Try to fetch from Contentstack directly
    console.log('🔍 Trying Contentstack fallback for Maharashtra news...');
    const Stack = (await import('@/lib/contentstack')).default;
    
    // Try to fetch recent news channel entries
    const response = await Stack.contentType('news_channel').entry().find() as any;
    
    if (response && response.entries && response.entries.length > 0) {
      const latestEntry = response.entries[0];
      console.log('✅ Maharashtra news entry fetched from Contentstack:', latestEntry);
      
      return {
        id: latestEntry.uid,
        content: {
          title: latestEntry.title,
          description: latestEntry.news?.description || latestEntry.description || 'Latest news from Maharashtra',
          link: latestEntry.news?.link || `#`,
          image: latestEntry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=Maharashtra+News'
        },
        experienceId: 'maharashtra_news',
        variantId: latestEntry.uid
      };
    }
    
    throw new Error('No Maharashtra news content found');
  } catch (error) {
    console.error('❌ Error fetching Maharashtra news entry:', error);
    // Return null instead of hardcoded fallback - let the UI handle it
    return null;
  }
}

// Fetch Maharashtra news entry with Hindi locale
export async function fetchMaharashtraNewsEntryHindi(): Promise<PersonalizeVariant | null> {
  try {
    console.log('🔍 Fetching Maharashtra news entry (Hindi) from Personalize variants...');
    
    // First try to get from Personalize manifest
    const manifest = await fetchPersonalizeManifest();
    if (manifest && manifest.experiences) {
      // Look for Maharashtra experience
      const maharashtraExperience = manifest.experiences.find(exp => 
        exp.shortUid.toLowerCase().includes('maharashtra') || 
        exp.shortUid.toLowerCase().includes('pune') ||
        exp.shortUid.toLowerCase().includes('news_channel')
      );
      
      if (maharashtraExperience && maharashtraExperience.activeVariantShortUid) {
        console.log('✅ Found Maharashtra experience (Hindi):', maharashtraExperience.shortUid);
        const variantContent = await fetchVariantContent(
          maharashtraExperience.shortUid, 
          maharashtraExperience.activeVariantShortUid
        );
        
        if (variantContent) {
          console.log('✅ Maharashtra variant content (Hindi) fetched:', variantContent);
          return variantContent;
        }
      }
    }
    
    // Fallback: Try to fetch from Contentstack directly with Hindi locale
    console.log('🔍 Trying Contentstack fallback for Maharashtra news (Hindi)...');
    const Stack = (await import('@/lib/contentstack')).default;
    
    // Try different locale options for Hindi
    const localeOptions = ['hi-in', 'hi', 'en-us', 'en'];
    let response: any = null;
    
    for (const locale of localeOptions) {
      try {
        console.log(`🔍 Trying locale: ${locale} for news_channel`);
        response = await Stack.contentType('news_channel').entry().locale(locale).find() as any;
        
        if (response && response.entries && response.entries.length > 0) {
          console.log(`✅ Found news_channel entries with locale ${locale}:`, response.entries.length);
          break;
        }
      } catch (localeError) {
        console.log(`❌ Failed with locale ${locale}:`, localeError);
        continue;
      }
    }
    
    // If no locale worked, try without locale specification
    if (!response || !response.entries || response.entries.length === 0) {
      try {
        console.log('🔍 Trying without locale specification for news_channel...');
        response = await Stack.contentType('news_channel').entry().find() as any;
      } catch (fallbackError) {
        console.log('❌ Failed without locale specification:', fallbackError);
      }
    }
    
    if (response && response.entries && response.entries.length > 0) {
      const latestEntry = response.entries[0];
      console.log('✅ Maharashtra news entry (Hindi) fetched from Contentstack:', latestEntry);
      
      return {
        id: latestEntry.uid,
        content: {
          title: latestEntry.title,
          description: latestEntry.news?.description || latestEntry.description || 'महाराष्ट्र से नवीनतम समाचार',
          link: latestEntry.news?.link || `#`,
          image: latestEntry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=Maharashtra+News'
        },
        experienceId: 'maharashtra_news',
        variantId: latestEntry.uid
      };
    }
    
    throw new Error('No Maharashtra news content found (Hindi)');
  } catch (error) {
    console.error('❌ Error fetching Maharashtra news entry (Hindi):', error);
    // Return null instead of hardcoded fallback - let the UI handle it
    return null;
  }
} 
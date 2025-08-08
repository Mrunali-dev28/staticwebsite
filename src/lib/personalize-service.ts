// Personalize Service for fetching variant content - Dynamic Version
const PERSONALIZE_BASE_URL = 'https://personalize-edge.contentstack.com';
const PROJECT_UID = process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;

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
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}/manifest`, {
      headers: {
        'Content-Type': 'application/json',
        'x-project-uid': PROJECT_UID || '',
      },
    });

    if (!response.ok) {
      console.error('❌ Failed to fetch manifest:', response.status, response.statusText);
      return null;
    }

    const manifest = await response.json();
    console.log('✅ Manifest fetched successfully:', manifest);
    return manifest;
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
        }
      } catch (error) {
        console.log(`❌ Error with endpoint ${endpoint}:`, error);
      }
    }

    console.log('❌ All endpoints failed for variant content');
    return null;
  } catch (error) {
    console.error('❌ Error fetching variant content:', error);
    return null;
  }
}

// User management functions
let currentUserUid: string | null = null;

// Set user's city and get personalized content
export async function setUserCity(city: string): Promise<PersonalizeManifest | null> {
  try {
    console.log('🔍 setUserCity: Setting city to:', city);
    
    // Generate a user UID based on city (for demo purposes)
    currentUserUid = `user_${city.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
    console.log('🔍 setUserCity: Generated user UID:', currentUserUid);
    
    // Fetch manifest for this user/city
    const manifest = await fetchPersonalizeManifest();
    console.log('🔍 setUserCity: Manifest fetched:', manifest);
    
    return manifest;
  } catch (error) {
    console.error('❌ setUserCity: Error:', error);
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
      console.log('⚠️ Failed to track impression:', response.status);
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
      console.log('⚠️ Failed to track conversion:', response.status);
    }
  } catch (error) {
    console.error('❌ trackConversion: Error:', error);
  }
}

// Set and update user attributes using Personalize Edge API
export async function setUserAttributes(attributes: Record<string, any>): Promise<void> {
  try {
    console.log('🔍 setUserAttributes: Setting attributes:', attributes);
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}/user-attributes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-project-uid': PROJECT_UID || '',
        'x-cs-personalize-user-uid': currentUserUid || '',
      },
      body: JSON.stringify(attributes),
    });

    if (response.ok) {
      console.log('✅ User attributes set successfully');
    } else {
      console.log('⚠️ Failed to set user attributes:', response.status);
    }
  } catch (error) {
    console.error('❌ setUserAttributes: Error:', error);
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
    console.log('🔍 Fetching US news entry: blte933ca60d09a6b6c');
    
    const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
    const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
    
    if (!apiKey || !deliveryToken) {
      console.error('❌ Missing Contentstack credentials');
      return null;
    }

    // Fetch the specific US news entry
    const response = await fetch(
      `https://api.contentstack.io/v3/content_types/us_news/entries/blte933ca60d09a6b6c?environment=production`,
      {
        headers: {
          'api_key': apiKey,
          'access_token': deliveryToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ US news entry fetched successfully:', data);
      
      return {
        id: 'blte933ca60d09a6b6c',
        content: {
          title: data.entry.title,
          description: data.entry.description || data.entry.news?.description,
          link: data.entry.news?.link || '#',
          image: data.entry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=US+News'
        },
        experienceId: 'us_news',
        variantId: 'csd7cbbc175c7a995f'
      };
    } else {
      console.log('❌ Failed to fetch US news entry:', response.status);
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching US news entry:', error);
    return null;
  }
}

// Fetch US news entry with Hindi locale
export async function fetchUSNewsEntryHindi(): Promise<PersonalizeVariant | null> {
  try {
    console.log('🔍 Fetching US news entry (Hindi): blte933ca60d09a6b6c');
    
    const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
    const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
    
    if (!apiKey || !deliveryToken) {
      console.error('❌ Missing Contentstack credentials');
      return null;
    }

    // Fetch the specific US news entry with Hindi locale
    const response = await fetch(
      `https://api.contentstack.io/v3/content_types/us_news/entries/blte933ca60d09a6b6c?environment=production&locale=hi-in`,
      {
        headers: {
          'api_key': apiKey,
          'access_token': deliveryToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✅ US news entry (Hindi) fetched successfully:', data);
      
      return {
        id: 'blte933ca60d09a6b6c',
        content: {
          title: data.entry.title,
          description: data.entry.description || data.entry.news?.description,
          link: data.entry.news?.link || '#',
          image: data.entry.file?.url || 'https://via.placeholder.com/300x200/0066cc/ffffff?text=US+News'
        },
        experienceId: 'us_news',
        variantId: 'csd7cbbc175c7a995f'
      };
    } else {
      console.log('❌ Failed to fetch US news entry (Hindi):', response.status);
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching US news entry (Hindi):', error);
    return null;
  }
} 
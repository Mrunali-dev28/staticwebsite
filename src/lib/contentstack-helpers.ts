import deliverySDK, { 
  GlobalSetting, 
  SidebarNews, 
  BreakingAlert,
  Contact,
  Trending,
  LanguageSwitchButton
} from './contentstack';

// Helper functions for Contentstack SDK usage
// Updated to include new content types: Global Setting, Sidebar News, News Category, News Author, Breaking Alert

export async function fetchAuthors() {
  try {
    const response = await deliverySDK
      .contentType('author')
      .entry()
      .includeReference(['profile_image'])
      .includeEmbeddedItems()
      .find();
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
    const response = await deliverySDK
      .contentType('kasjmir_news')
      .entry()
      .includeReference(['author', 'category', 'featured_image'])
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    return response.entries || [];
  } catch {
    console.log('News items not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchCategories() {
  try {
    const response = await deliverySDK
      .contentType('category')
      .entry()
      .includeReference(['icon_image'])
      .includeEmbeddedItems()
      .find();
    return response.entries || [];
  } catch {
    console.log('Categories not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchTaxonomies() {
  try {
    const response = await deliverySDK
      .contentType('live_weather')
      .entry()
      .includeEmbeddedItems()
      .find();
    return response.entries || [];
  } catch {
    console.log('Taxonomies not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchAllNewsChannelEntries() {
  try {
    const response = await deliverySDK
      .contentType('news_channel')
      .entry()
      .includeReference(['reference'])
      .includeEmbeddedItems()
      .includeFallback()
      .find();
    return response.entries || [];
  } catch {
    console.log('News channel entries not found in CMS, using fallback data');
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
    const response = await deliverySDK
      .contentType('news_category')
      .entry()
      .includeEmbeddedItems()
      .find();
    return response.entries || [];
  } catch {
    console.log('News categories not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchNewsAuthors() {
  try {
    const response = await deliverySDK
      .contentType('news_author')
      .entry()
      .includeEmbeddedItems()
      .find();
    return response.entries || [];
  } catch {
    console.log('News authors not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchBreakingAlerts(): Promise<BreakingAlert[]> {
  try {
    const response = await deliverySDK
      .contentType('breaking_alert')
      .entry()
      .includeEmbeddedItems()
      .find();
    return (response.entries || []) as BreakingAlert[];
  } catch {
    console.log('Breaking alerts not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchNewsCategory(uid: string) {
  try {
    const response = await deliverySDK
      .contentType('news_category')
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
    const response = await deliverySDK
      .contentType('contact')
      .entry()
      .includeEmbeddedItems()
      .find();
    return (response.entries || []) as Contact[];
  } catch {
    console.log('Contact data not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchTrending(): Promise<Trending[]> {
  try {
    const response = await deliverySDK
      .contentType('trending')
      .entry()
      .includeEmbeddedItems()
      .find();
    return (response.entries || []) as Trending[];
  } catch {
    console.log('Trending data not found in CMS, using fallback data');
    return [];
  }
}

export async function fetchGlobalSettings(): Promise<GlobalSetting[]> {
  try {
    const response = await deliverySDK
      .contentType('global_setting')
      .entry()
      .includeReference(['file'])
      .includeEmbeddedItems()
      .find();
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
    const response = await deliverySDK
      .contentType('sidebar_news')
      .entry()
      .includeEmbeddedItems()
      .find();
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
    const response = await deliverySDK
      .contentType('live_update')
      .entry()
      .includeEmbeddedItems()
      .find();
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
  return fetchContentForLocale('news_channel', 'hi-in', {
    includeReference: ['reference'],
    includeEmbeddedItems: true,
    includeFallback: true
  });
}

export async function fetchHindiSidebarNews(): Promise<SidebarNews[]> {
  return fetchContentForLocale<SidebarNews>('sidebar_news', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiBreakingAlerts(): Promise<BreakingAlert[]> {
  return fetchContentForLocale<BreakingAlert>('breaking_alert', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiNewsCategories() {
  try {
    // First try to fetch Hindi news categories
    const hindiCategories = await fetchContentForLocale('news_category', 'hi-in', {
      includeEmbeddedItems: true
    });
    
    // If no Hindi categories found, try with fallback to English
    if (!hindiCategories || hindiCategories.length === 0) {
      console.log('No Hindi news categories found, trying with fallback to English');
      try {
        const response = await deliverySDK
          .contentType('news_category')
          .entry()
          .locale('hi-in')
          .includeEmbeddedItems()
          .includeFallback()
          .find();
        return response.entries || [];
      } catch {
        console.log('Fallback also failed, returning empty array');
        return [];
      }
    }
    
    return hindiCategories;
  } catch {
    console.log('Error fetching Hindi news categories');
    return [];
  }
}

export async function fetchHindiNewsAuthors() {
  return fetchContentForLocale('news_author', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiLiveUpdates() {
  return fetchContentForLocale('live_update', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiContact(): Promise<Contact[]> {
  return fetchContentForLocale<Contact>('contact', 'hi-in', {
    includeEmbeddedItems: true
  });
}

export async function fetchHindiTrending(): Promise<Trending[]> {
  return fetchContentForLocale<Trending>('trending', 'hi-in', {
    includeEmbeddedItems: true
  });
}

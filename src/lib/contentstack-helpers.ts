import deliverySDK from './contentstack';

// Helper functions for Contentstack SDK usage

export async function fetchAuthors() {
  try {
    const response = await deliverySDK
      .contentType('author')
      .entry()
      .includeReference(['profile_image'])
      .includeEmbeddedItems()
      .find();
    return response.entries || [];
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    console.log('News channel entries not found in CMS, using fallback data');
    return [];
  }
}

// New function to fetch entry with complete modular blocks
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
  } catch (error) {
    console.log('News channel with modular blocks not found, using fallback');
    return null;
  }
}

// Function to fetch assets
export async function fetchAssets() {
  try {
    const response = await deliverySDK
      .asset()
      .find();
    return response.entries || [];
  } catch (error) {
    console.log('Assets not found in CMS');
    return [];
  }
}

// Function to fetch specific asset
export async function fetchAsset(uid: string) {
  try {
    const response = await deliverySDK
      .asset(uid)
      .fetch();
    return response;
  } catch (error) {
    console.log(`Asset ${uid} not found in CMS`);
    return null;
  }
} 
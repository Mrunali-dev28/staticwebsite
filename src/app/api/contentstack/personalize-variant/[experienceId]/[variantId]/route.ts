import { NextRequest, NextResponse } from 'next/server';
import deliverySDK from '@/lib/contentstack';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ experienceId: string; variantId: string }> }
) {
  try {
    const { experienceId, variantId } = await params;
    
    console.log('🔍 Fetching personalized variant from CMS:', { experienceId, variantId });
    
    // Try to fetch from different content types that might contain personalized content
    const contentTypes = ['news_channel', 'trending_bar', 'news_catogory', 'personalized_content'];
    
    for (const contentType of contentTypes) {
      try {
        console.log(`🔍 Trying content type: ${contentType}`);
        
        // Query for entries that might be related to this experience/variant
        const response = await deliverySDK
          .contentType(contentType)
          .entries()
          .includeEmbeddedItems()
          .includeFallback()
          .fetch();
        
        if (response && response.entries && response.entries.length > 0) {
          console.log(`✅ Found ${response.entries.length} entries in ${contentType}`);
          
          // Look for entries that might match our experience/variant
          for (const entry of response.entries) {
            console.log(`🔍 Checking entry: ${entry.uid} - ${entry.title}`);
            
            // Check if this entry is related to our experience/variant
            // This is a heuristic - you might need to adjust based on your CMS structure
            if (entry.title && entry.title.toLowerCase().includes('pune') || 
                entry.title && entry.title.toLowerCase().includes('maharashtra') ||
                entry.news && entry.news.description && entry.news.description.toLowerCase().includes('pune')) {
              
              console.log(`✅ Found matching entry: ${entry.uid}`);
              return NextResponse.json({
                success: true,
                contentType,
                data: {
                  title: entry.title,
                  description: entry.news?.description || '',
                  link: entry.news?.link?.href || entry.url || '#',
                  image: entry.file?.url || ''
                }
              });
            }
          }
        }
      } catch (error) {
        console.log(`❌ Error with content type ${contentType}:`, error);
        continue;
      }
    }
    
    console.log('❌ No matching personalized content found in CMS');
    return NextResponse.json(
      { 
        success: false, 
        error: 'No personalized content found',
        message: `No content found for experience ${experienceId}, variant ${variantId}`
      },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('❌ Error fetching personalized variant:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch personalized variant',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
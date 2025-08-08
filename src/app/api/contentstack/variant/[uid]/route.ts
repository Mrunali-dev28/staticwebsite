import { NextRequest, NextResponse } from 'next/server';
import deliverySDK from '@/lib/contentstack';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;

    console.log('🔍 Fetching entry from CMS with UID:', uid);
    
    // Try to fetch from different content types that might contain the variant
    const contentTypes = ['news_channel', 'trending_bar', 'news_catogory'];
    
    for (const contentType of contentTypes) {
      try {
        console.log(`🔍 Trying content type: ${contentType}`);
        const response = await deliverySDK
          .contentType(contentType)
          .entry(uid)
          .includeEmbeddedItems()
          .includeFallback()
          .fetch();
        
        if (response) {
                     console.log(`✅ Found entry in ${contentType}:`, response);
           return NextResponse.json({
             success: true,
             contentType,
             data: response
           });
        }
      } catch (error) {
        console.log(`❌ Not found in ${contentType}:`, error);
        continue;
      }
    }
    
    // If not found in specific content types, try to search across all
    try {
      console.log('🔍 Searching across all content types...');
      const response = await deliverySDK
        .contentType('news_channel')
        .entry(uid)
        .includeEmbeddedItems()
        .includeFallback()
        .fetch();
      
      if (response) {
        console.log('✅ Found variant in general search:', response);
        return NextResponse.json({
          success: true,
          contentType: 'general',
          data: response
        });
      }
    } catch (error) {
      console.log('❌ Not found in general search:', error);
    }
    
               console.log('❌ Entry not found in any content type');
           return NextResponse.json(
             {
               success: false,
               error: 'Entry not found',
               message: `No entry found with UID: ${uid}`
             },
             { status: 404 }
           );
    
  } catch (error) {
             console.error('❌ Error fetching entry:', error);
         return NextResponse.json(
           {
             success: false,
             error: 'Failed to fetch entry',
             message: error instanceof Error ? error.message : 'Unknown error'
           },
           { status: 500 }
         );
  }
} 
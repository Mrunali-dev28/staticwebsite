import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ variantId: string }> }
) {
  try {
    const { variantId } = await params;
    
    console.log('🔍 Fetching variant from Personalize API with ID:', variantId);
    
    // Get the project UID from environment
    const projectUid = process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;
    
    if (!projectUid) {
      console.log('❌ No Personalize Project UID configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Personalize Project UID not configured'
        },
        { status: 400 }
      );
    }
    
    // Make request to Personalize API to get variant details
    // Try different possible endpoints for variant content
    const endpoints = [
      `https://personalize-edge.contentstack.com/variants/${variantId}`,
      `https://personalize-edge.contentstack.com/variant/${variantId}`,
      `https://personalize-edge.contentstack.com/content/${variantId}`,
      `https://personalize-edge.contentstack.com/experiences/${variantId}`
    ];
    
    let variantData = null;
    let success = false;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Trying endpoint: ${endpoint}`);
        const personalizeResponse = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-project-uid': projectUid,
          },
        });
        
        console.log(`🔍 Response status for ${endpoint}:`, personalizeResponse.status);
        
        if (personalizeResponse.ok) {
          variantData = await personalizeResponse.json();
          console.log(`✅ Success with endpoint: ${endpoint}`);
          success = true;
          break;
        } else {
          const errorText = await personalizeResponse.text();
          console.log(`❌ Failed with endpoint ${endpoint}:`, errorText);
        }
      } catch (error) {
        console.log(`❌ Error with endpoint ${endpoint}:`, error);
      }
    }
    
    if (success && variantData) {
      console.log('✅ Variant data from Personalize API:', variantData);
      
      return NextResponse.json({
        success: true,
        data: variantData
      });
    } else {
      console.log('❌ All Personalize API endpoints failed for variant:', variantId);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch variant from Personalize API',
          details: 'All endpoints returned errors'
        },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('❌ Error fetching variant from Personalize API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch variant',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
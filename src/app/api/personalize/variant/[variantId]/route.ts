import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ variantId: string }> }
) {
  try {
    const { variantId } = await params;
    
    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 API: Getting personalize variant with ID: ${variantId}`);
    
    // Placeholder response - implement actual logic here
    return NextResponse.json({
      success: true,
      message: `Personalize variant ${variantId} retrieved successfully`,
      data: { variantId }
    });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { variantId: string } }
) {
  // Personalize API is disabled to prevent 400 errors
  console.log('⚠️ Personalize variant API is disabled to prevent 400 errors');
  return NextResponse.json(
    { 
      error: 'Personalize API is disabled',
      message: 'Personalize service is not properly configured. Using fallback content instead.'
    },
    { status: 503 }
  );
} 
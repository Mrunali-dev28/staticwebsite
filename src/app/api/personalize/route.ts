import { NextRequest, NextResponse } from 'next/server';

// Contentstack Personalize Edge API proxy
// This handles server-side requests to avoid CORS issues

// Use the correct Personalize Edge base URL
const PERSONALIZE_BASE_URL = 'https://personalize-edge.contentstack.com';

export async function GET(request: NextRequest) {
  // Personalize API is disabled to prevent 400 errors
  console.log('⚠️ Personalize API is disabled to prevent 400 errors');
  return NextResponse.json(
    { 
      error: 'Personalize API is disabled',
      message: 'Personalize service is not properly configured. Using fallback content instead.'
    },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  // Personalize API is disabled to prevent 400 errors
  console.log('⚠️ Personalize API is disabled to prevent 400 errors');
  return NextResponse.json(
    { 
      error: 'Personalize API is disabled',
      message: 'Personalize service is not properly configured. Using fallback content instead.'
    },
    { status: 503 }
  );
} 
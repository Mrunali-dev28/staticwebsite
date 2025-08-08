import { NextRequest, NextResponse } from 'next/server';

// Contentstack Personalize Edge API proxy
// This handles server-side requests to avoid CORS issues

// Use the correct Personalize Edge base URL
const PERSONALIZE_BASE_URL = 'https://personalize-edge.contentstack.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userUid = searchParams.get('userUid');
    const projectUid = searchParams.get('projectUid') || process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;

    console.log('🔍 Personalize API GET request:', { userUid, projectUid });
    console.log('🔍 Environment variables:', {
      PERSONALISE_EDGE_PROJECT_UID: process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID,
      PERSONALISE_EDGE: process.env.NEXT_PUBLIC_PERSONALISE_EDGE
    });
    console.log('🔍 Using Personalize Base URL:', PERSONALIZE_BASE_URL);
    console.log('🔍 Note: Using correct Personalize Edge URL');
    console.log('🔍 Full request URL will be:', `${PERSONALIZE_BASE_URL}/manifest`);

    if (!projectUid || projectUid === '') {
      console.log('Project UID is missing or empty');
      return NextResponse.json(
        { 
          error: 'Project UID is required',
          message: 'Please set NEXT_PUBLIC_PERSONALIZE_PROJECT_UID environment variable or pass it as a parameter'
        },
        { status: 400 }
      );
    }

    // Build headers for Personalize API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-project-uid': projectUid,
    };

    if (userUid) {
      headers['x-cs-personalize-user-uid'] = userUid;
    }

    // Make request to Personalize API
    console.log('🚀 Making request to:', `${PERSONALIZE_BASE_URL}/manifest`);
    console.log('🚀 Request headers:', headers);
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}/manifest`, {
      method: 'GET',
      headers,
    });

    console.log('✅ Response status:', response.status);
    console.log('✅ Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('✅ Response OK?', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Personalize API error response:', errorText);
      console.error('❌ Error status:', response.status);
      console.error('❌ Error status text:', response.statusText);
      throw new Error(`Personalize API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Response data:', JSON.stringify(data, null, 2));
    
    // Extract user UID from response headers if not provided
    const responseUserUid = response.headers.get('x-cs-personalize-user-uid');
    console.log('✅ Response User UID:', responseUserUid);

    return NextResponse.json({
      data,
      userUid: responseUserUid || userUid,
    });
  } catch (error) {
    console.error('Personalize API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Personalize API' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, userUid, projectUid: bodyProjectUid, data } = body;
    const projectUid = bodyProjectUid || process.env.NEXT_PUBLIC_PERSONALISE_EDGE_PROJECT_UID;

    console.log('Personalize API POST request:', { endpoint, userUid, projectUid });

    if (!projectUid || projectUid === '') {
      console.log('Project UID is missing or empty in POST request');
      return NextResponse.json(
        { 
          error: 'Project UID is required',
          message: 'Please set NEXT_PUBLIC_PERSONALIZE_PROJECT_UID environment variable or pass it in the request body'
        },
        { status: 400 }
      );
    }

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    // Build headers for Personalize API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-project-uid': projectUid,
    };

    if (userUid) {
      headers['x-cs-personalize-user-uid'] = userUid;
    }

    // Make request to Personalize API
    console.log('Making request to:', `${PERSONALIZE_BASE_URL}${endpoint}`);
    console.log('Headers:', headers);
    console.log('Body:', JSON.stringify(data));
    
    const response = await fetch(`${PERSONALIZE_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    console.log('🚀 Response status:', response.status);
    console.log('🚀 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Personalize API error response:', errorText);
      console.error('❌ Error status:', response.status);
      console.error('❌ Error status text:', response.statusText);
      throw new Error(`Personalize API error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    
    // Extract user UID from response headers if not provided
    const responseUserUid = response.headers.get('x-cs-personalize-user-uid');

    return NextResponse.json({
      data: responseData,
      userUid: responseUserUid || userUid,
    });
  } catch (error) {
    console.error('Personalize API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Personalize API' },
      { status: 500 }
    );
  }
} 
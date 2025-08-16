import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'pathfora_modal' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('📧 Newsletter subscription from Pathfora:', { email, source });

    // Call Contentstack automation API (same as existing EmailSubscription component)
    const contentstackResponse = await fetch('https://app.contentstack.com/automations-api/run/85bcaf66ce3244c88fa225fbc8ce2738', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ah-http-key': 'H9@envpjeh',
      },
      body: JSON.stringify({ 
        email: email,
        timestamp: new Date().toISOString(),
        action: 'newsletter_subscription',
        source: source
      }),
    });

    if (!contentstackResponse.ok) {
      const errorText = await contentstackResponse.text();
      console.error('❌ Contentstack API error:', errorText);
      throw new Error(`Contentstack API error: ${contentstackResponse.status} - ${errorText}`);
    }

    const responseText = await contentstackResponse.text();
    console.log('📧 Contentstack API response:', responseText);

    return NextResponse.json({
      success: true,
      message: 'Subscription successful! Check your email.',
      messageId: responseText
    });

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
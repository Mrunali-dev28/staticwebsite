import { NextRequest, NextResponse } from 'next/server';
import { checkSidebarNewsEntry } from '@/lib/contentstack-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: { entryId: string } }
) {
  try {
    const { entryId } = params;
    
    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 API: Checking sidebar_news entry with ID: ${entryId}`);
    
    const exists = await checkSidebarNewsEntry(entryId);
    
    if (exists) {
      return NextResponse.json({
        success: true,
        message: `Entry ${entryId} exists in sidebar_news content type`,
        exists: true
      });
    } else {
      return NextResponse.json({
        success: true,
        message: `Entry ${entryId} does not exist in sidebar_news content type`,
        exists: false
      });
    }
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

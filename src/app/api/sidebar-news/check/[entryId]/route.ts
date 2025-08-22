import { NextRequest, NextResponse } from 'next/server';
import { checkSpecificEntry } from '@/lib/contentstack-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entryId: string }> }
) {
  try {
    const { entryId } = await params;
    
    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 API: Checking sidebar news entry with ID: ${entryId}`);
    
    const result = await checkSpecificEntry(entryId);
    
    if (result.found) {
      return NextResponse.json({
        success: true,
        message: `Sidebar news entry found in content type: ${result.contentType}`,
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Sidebar news entry with ID ${entryId} not found in any content type`,
        error: result.error
      }, { status: 404 });
    }
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

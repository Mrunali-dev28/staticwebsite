import { NextRequest, NextResponse } from 'next/server';
import { checkSpecificEntry } from '@/lib/contentstack-helpers';

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params;
    
    if (!uid) {
      return NextResponse.json(
        { error: 'UID parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 API: Checking entry with UID: ${uid}`);
    
    const result = await checkSpecificEntry(uid);
    
    if (result.found) {
      return NextResponse.json({
        success: true,
        message: `Entry found in content type: ${result.contentType}`,
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Entry with UID ${uid} not found in any content type`,
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

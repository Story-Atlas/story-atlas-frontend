import { NextResponse } from 'next/server';

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8001';

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${FASTAPI_URL}/api/bookmark/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.detail || data.error || '책갈피 생성에 실패했습니다.',
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling FastAPI bookmark service:', error);
    return NextResponse.json(
      {
        success: false,
        error: '책갈피 생성 서비스에 연결할 수 없습니다.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}





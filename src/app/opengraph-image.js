// opengraph-image.js - Open Graph 이미지 생성 (Next.js 13+)
import { ImageResponse } from 'next/og';

export const alt = 'Story Atlas | 파주 출판단지 아카이브';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          📚 Story Atlas
        </div>
        <div style={{ fontSize: 40 }}>
          파주 출판단지 아카이브
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}








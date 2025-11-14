// src/app/spots/[id]/page.js

import { Header } from '@/components/Header';
import { SpotTabs } from '@/components/SpotTabs';
import { SpotImage } from '@/components/SpotImage';
import Link from 'next/link';

// 아이콘 컴포넌트
function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

async function getSpotData(id) {
  // 서버 컴포넌트에서는 절대 URL 필요
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  try {
    const res = await fetch(`${API_BASE}/spots/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const spot = await res.json();
    
    // description JSON 파싱
    try {
      if (spot.description && typeof spot.description === 'string' && spot.description.trim() !== "") {
        spot.description = JSON.parse(spot.description);
      } else if (!spot.description) {
        spot.description = {};
      }
    } catch (parseError) {
      console.error(`JSON Parse Error for spot ${id}:`, parseError);
      spot.description = { headline: '설명 정보 오류', paragraph1: '스팟 설명 데이터를 불러오는 데 실패했습니다.' };
    }
    
    // description 구조 정리
    spot.description = {
      headline: spot.description?.headline || '',
      paragraph1: spot.description?.paragraph1 || '',
      paragraph2: spot.description?.paragraph2 || '',
      paragraph3: spot.description?.paragraph3 || '',
    };
    
    return spot;
  } catch (error) {
    console.error('Failed to fetch spot data:', error);
    return null;
  }
}

export default async function SpotDetailPage({ params }) {
  
  const resolvedParams = await params;
  const { id } = resolvedParams; 
  const spot = await getSpotData(id);

  if (!spot) {
    return (
      <main className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">오류</h1>
        <p className="text-lg">
          '<strong className="text-red-600">{id}</strong>'번 스팟을 찾을 수 없거나
          가져오는 데 실패했습니다.
        </p>
      </main>
    );
  }

  return (
    <>
      <Header sticky={false} />
      <main className="max-w-4xl mx-auto">
        {/* 이미지 영역 */}
        <SpotImage spot={spot} />
      
      <article className="p-6 md:p-10">
        
        {/* 제목 */}
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight font-title">
          {spot.name}
        </h1>
        
        {/* 탭 컴포넌트 */}
        <SpotTabs spot={spot} />
        
        {/* 네이버 지도 링크 박스 */}
        {spot.naver_map_url && (
          <Link
            href={spot.naver_map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-8"
          >
            <div className="bg-gradient-to-br from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown))]/80 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2 font-semibold">
                      찾아오시는 길
                      <ExternalLinkIcon className="w-4 h-4 opacity-70" />
                    </h3>
                    {spot.address && (
                      <p className="text-white/90 mb-2">{spot.address}</p>
                    )}
                    <p className="text-white/70 text-sm">
                      네이버 지도에서 위치 확인하기
                    </p>
                  </div>
                </div>
                <div className="ml-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-white text-xl">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </article>
    </main>
    </>
  );
}


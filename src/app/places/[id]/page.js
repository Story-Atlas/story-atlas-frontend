// src/app/places/[id]/page.js

import { Header } from '@/components/Header';
// import { ViewCounter } from '@/components/ViewCounter';
import { NaverMapLink } from '@/components/NaverMapLink';

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


// 1. [수정] localFont 임포트 *제거*
// (폰트는 layout.js에서 전역으로 로드됩니다)
// import localFont from 'next/font/local'; // <- 이 줄이 없어야 합니다.

// 2. [수정] 폰트 로드 코드 *제거*
// const netmarbleFont = localFont({ ... }); // <- 이 부분이 없어야 합니다.

// --- (데이터 가져오는 getPlaceData 함수는 동일합니다) ---
async function getPlaceData(id) {
  // 서버 컴포넌트에서는 절대 URL 필요
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  try {
    const res = await fetch(`${API_BASE}/places/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const place = await res.json();
    try {
      if (place.description_ai_summary && place.description_ai_summary.trim() !== "") {
        place.summary = JSON.parse(place.description_ai_summary);
      } else {
        place.summary = {}; 
      }
    } catch (parseError) {
      console.error(`JSON Parse Error for place ${id}:`, parseError);
      place.summary = { headline: '요약 정보 오류', paragraph1: 'AI 요약 데이터를 불러오는 데 실패했습니다.' };
    }
    place.summary = {
      headline: place.summary.headline || '',
      paragraph1: place.summary.paragraph1 || '',
      paragraph2: place.summary.paragraph2 || '',
      paragraph3: place.summary.paragraph3 || '',
    };
    return place;
  } catch (error) {
    console.error('Failed to fetch place data:', error);
    return null;
  }
}

// --- (페이지 컴포넌트) ---
export default async function PlaceDetailPage({ params }) {
  
  const resolvedParams = await params;
  const { id } = resolvedParams; 
  const place = await getPlaceData(id);

  if (!place) {
    return (
      <main className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">오류</h1>
        <p className="text-lg">
          '<strong className="text-red-600">{id}</strong>'번 장소를 찾을 수 없거나
          가져오는 데 실패했습니다.
        </p>
      </main>
    );
  }

  // --- (렌더링 UI) ---
  return (
    <>
      <Header sticky={false} />
      <main className="max-w-4xl mx-auto">
        <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gray-200">
        <img 
          src={place.main_photo_url || 'https://via.placeholder.com/1000x500.png?text=No+Image'} 
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>
      <article className="p-6 md:p-10">
        
        {/* 3. [수정] .font-title 클래스 적용 */}
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight font-title">
          {place.name}
        </h1>
        
        {/* 4. [수정] netmarbleFont.className 대신 .font-title 클래스 적용 */}
        {place.summary.headline && (
          <p className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4 font-title">
            {place.summary.headline}
          </p>
        )}

        {/* 5. [수정] 본문은 자동으로 NanumSquareNeo가 적용됩니다 */}
        {place.summary.paragraph1 && (
          <p className="text-lg text-gray-900 leading-relaxed">
            {place.summary.paragraph1}
          </p>
        )}
        {place.summary.paragraph2 && (
          <p className="text-lg text-gray-900 leading-relaxed mt-6">
            {place.summary.paragraph2}
          </p>
        )}
        {place.summary.paragraph3 && (
          <p className="text-lg text-gray-900 leading-relaxed mt-6">
            {place.summary.paragraph3}
          </p>
        )}

        {/* 네이버 지도 링크 박스 */}
        {place.naver_map_url && (
          <NaverMapLink type="place" id={place.id} url={place.naver_map_url} address={place.address}>
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
                    {place.address && (
                      <p className="text-white/90 mb-2">{place.address}</p>
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
          </NaverMapLink>
        )}
      </article>
    </main>
    </>
  );
}
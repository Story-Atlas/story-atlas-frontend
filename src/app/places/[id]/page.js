// src/app/places/[id]/page.js

// 1. [수정] localFont 임포트 *제거*
// (폰트는 layout.js에서 전역으로 로드됩니다)
// import localFont from 'next/font/local'; // <- 이 줄이 없어야 합니다.

// 2. [수정] 폰트 로드 코드 *제거*
// const netmarbleFont = localFont({ ... }); // <- 이 부분이 없어야 합니다.

// --- (데이터 가져오는 getPlaceData 함수는 동일합니다) ---
async function getPlaceData(id) {
  const API_BASE = 'http://localhost:8000/api';
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
          <p className="text-lg text-gray-700 leading-relaxed">
            {place.summary.paragraph1}
          </p>
        )}
        {place.summary.paragraph2 && (
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            {place.summary.paragraph2}
          </p>
        )}
        {place.summary.paragraph3 && (
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            {place.summary.paragraph3}
          </p>
        )}
      </article>
    </main>
  );
}
// src/app/events/[id]/page.js

import { Header } from '@/components/Header';

async function getEventData(id) {
  // 서버 컴포넌트에서는 절대 URL 필요
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const event = await res.json();
    
    // description JSON 파싱
    try {
      if (event.description && typeof event.description === 'string' && event.description.trim() !== "") {
        event.description = JSON.parse(event.description);
      } else if (!event.description) {
        event.description = {};
      }
    } catch (parseError) {
      console.error(`JSON Parse Error for event ${id}:`, parseError);
      event.description = { headline: '설명 정보 오류', paragraph1: '이벤트 설명 데이터를 불러오는 데 실패했습니다.' };
    }
    
    // description 구조 정리
    event.description = {
      headline: event.description?.headline || '',
      paragraph1: event.description?.paragraph1 || '',
      paragraph2: event.description?.paragraph2 || '',
      paragraph3: event.description?.paragraph3 || '',
    };
    
    return event;
  } catch (error) {
    console.error('Failed to fetch event data:', error);
    return null;
  }
}

// 날짜 포맷팅
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  } catch (e) {
    return dateString;
  }
}

// 이미지 URL 처리
function getImageUrl(imageUrl) {
  if (!imageUrl) return 'https://via.placeholder.com/1000x500.png?text=No+Image';
  
  if (imageUrl.startsWith('/home/workspace/story-atlas-backend/media/')) {
    const relativePath = imageUrl.replace('/home/workspace/story-atlas-backend/media/', '');
    return `/${relativePath}`;
  } else if (imageUrl.startsWith('/media/')) {
    // 서버 사이드에서는 상대 경로 유지, 클라이언트에서는 절대 경로로 변환
    return imageUrl;
  } else if (!imageUrl.startsWith('http')) {
    return `/media/event_poster/${imageUrl}`;
  }
  
  return imageUrl;
}

export default async function EventDetailPage({ params }) {
  
  const resolvedParams = await params;
  const { id } = resolvedParams; 
  const event = await getEventData(id);

  if (!event) {
    return (
      <main className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">오류</h1>
        <p className="text-lg">
          '<strong className="text-red-600">{id}</strong>'번 이벤트를 찾을 수 없거나
          가져오는 데 실패했습니다.
        </p>
      </main>
    );
  }

  const imageUrl = getImageUrl(event.main_image_url);
  const startDate = formatDate(event.start_datetime);
  const endDate = formatDate(event.end_datetime);
  const isEnded = event.status === -1;

  return (
    <>
      <Header sticky={false} />
      <main className="max-w-4xl mx-auto">
        <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gray-200 relative">
        <img 
          src={imageUrl} 
          alt={event.title}
          className="w-full h-full object-contain bg-gray-100"
        />
        {isEnded && (
          <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg border border-white/20">
            종료
          </div>
        )}
      </div>
      <article className="p-6 md:p-10">
        
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight font-title">
          {event.title}
        </h1>
        
        {/* 날짜 정보 */}
        <div className="mb-6 text-lg text-gray-600">
          {startDate && endDate && startDate === endDate ? (
            <p>{startDate}</p>
          ) : (
            <p>{startDate} ~ {endDate}</p>
          )}
          {event.place_id && (
            <p className="mt-2 text-base">📍 {event.place_id}</p>
          )}
          {event.host && (
            <p className="mt-1 text-base">주최: {event.host}</p>
          )}
        </div>
        
        {/* 헤드라인 */}
        {event.description.headline && (
          <p className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4 font-title">
            {event.description.headline}
          </p>
        )}

        {/* 본문 */}
        {event.description.paragraph1 && (
          <p className="text-lg text-gray-900 leading-relaxed">
            {event.description.paragraph1}
          </p>
        )}
        {event.description.paragraph2 && (
          <p className="text-lg text-gray-900 leading-relaxed mt-6">
            {event.description.paragraph2}
          </p>
        )}
        {event.description.paragraph3 && (
          <p className="text-lg text-gray-900 leading-relaxed mt-6">
            {event.description.paragraph3}
          </p>
        )}
      </article>
    </main>
    </>
  );
}


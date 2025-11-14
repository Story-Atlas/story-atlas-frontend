// src/app/events/page.js

import { Header } from '@/components/Header';
import { EventsTabContent } from '@/components/EventsTabContent';
import { EventCalendar } from '@/components/EventCalendar';

// 백엔드 API 주소
// 서버 컴포넌트에서는 절대 URL 필요
const API_BASE = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

// 행사 데이터 가져오기
async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch events: ${res.status}`);
      return [];
    }

    const events = await res.json();
    
    // description JSON 파싱
    const parsedEvents = events.map(event => {
      let description = null;
      try {
        if (event.description && event.description.trim() !== "") {
          description = JSON.parse(event.description);
        }
      } catch (e) {
        console.error(`JSON Parse Error for event ${event.id}:`, e);
        description = null;
      }
      
      return {
        ...event,
        description: description
      };
    });
    
    return parsedEvents;

  } catch (error) {
    console.error(`[fetchEvents] Error:`, error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <>
      <Header sticky={false} />
      <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
        {/* 캘린더 섹션 */}
        <div className="bg-gradient-to-r from-white via-amber-200/50 to-white text-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl mb-3 font-pretendard-bold">행사</h1>
            <p className="text-gray-700 text-lg font-pretendard-medium leading-relaxed">
              파주 출판단지에서 열리는 다양한 문화 행사를 만나보세요
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {events && events.length > 0 && (
            <div className="mb-16">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">행사 캘린더</h2>
                <p className="text-gray-600">날짜별로 확인하는 행사 일정</p>
              </div>
              <EventCalendar events={events} />
            </div>
          )}
        </div>
        
        {/* 기존 탭 콘텐츠 */}
        <EventsTabContent events={events} />
      </div>
    </>
  );
}


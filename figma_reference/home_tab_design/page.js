// src/app/page.js

import { CategoryCarousel } from '@/components/CategoryCarousel';

// 1. 백엔드 API 주소 (서버 컴포넌트에서는 직접 호출)
const API_BASE = 'http://localhost:8000/api';

// 2. categoriesConfig (description 문구 포함)
const categoriesConfig = [
  { 
    title: '행사', 
    slug: 'events', 
    description: '어, 이번 주말에 뭐 한다고?', 
    type: 'events', // events 타입 추가
    // data 없음 - API에서 가져옴
  },
  { 
    title: '북카페', 
    slug: 'book-cafe',
    description: '커피는 핑계일 뿐, 활자에 중독되고 싶어',
    type: 'places',
    link: 'https://naver.me/FaO571eH' 
  },
  { 
    title: '브런치', 
    slug: 'brunch',
    description: '아침과 점심 사이, 그 완벽한 행복의 순간',
    type: 'places',
    link: 'https://naver.me/FK092L9B' 
  },
  { 
    title: '야외카페', 
    slug: 'outdoor-cafe',
    description: '일단 나와! 커피는 맑은 공기 마시면서',
    type: 'places',
    link: 'https://naver.me/G8hMA8V1' 
  },
  { 
    title: '대형카페', 
    slug: 'large-cafe',
    description: '넓은 공간에서 펼치는 나만의 시간',
    type: 'places',
    link: 'https://naver.me/xjUC3m51'
  },
  {   
    title: '주변 관광지', 
    slug: 'tourist-spots',
    description: '커피 배 채웠으면, 이제 감성 배 채울 시간',
    type: 'places',
    data: [] // 데이터 없음
  },
];

// 3. [수정됨] fetchPlaces 함수가 AI 요약을 파싱하도록 변경
async function fetchPlaces(slug) {
  if (!slug) return []; 
  try {
    const res = await fetch(`${API_BASE}/places/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch ${slug}: ${res.status}`);
      return [];
    }

    const places = await res.json();

    // 각 장소의 summary(AI 요약)를 파싱합니다.
    return places.map(place => {
      let summary = {};
      try {
        if (place.description_ai_summary && place.description_ai_summary.trim() !== "") {
          summary = JSON.parse(place.description_ai_summary);
        }
      } catch (e) {
        console.error(`JSON Parse Error for place ${place.id} in list:`, e);
        summary = { headline: '요약 정보를 불러올 수 없습니다.' };
      }
      
      // 원본 place 데이터에 파싱된 summary 객체를 추가하여 반환
      return {
        ...place, // (id, name, main_photo_url 등)
        summary: { 
          headline: summary.headline || '' // headline이 없는 경우 대비
        } 
      };
    });

  } catch (error) {
    console.error(`Error fetching ${slug}:`, error);
    return [];
  }
}

// 3-1. fetchEvents 함수 추가 (places와 동일한 방식)
async function fetchEvents() {
  try {
    console.log(`[fetchEvents] Fetching from: ${API_BASE}/events`);
    const res = await fetch(`${API_BASE}/events`, {
      cache: 'no-store',
    });
    
    console.log(`[fetchEvents] Response status: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      console.warn(`Failed to fetch events: ${res.status}`);
      return [];
    }

    const events = await res.json();
    console.log(`[fetchEvents] Received ${events.length} events`);
    
    // 최신 이벤트가 카루셀 오른쪽 끝에 오도록 역순으로 정렬
    const reversedEvents = [...events].reverse();
    
    // description JSON 파싱 (places의 summary 파싱과 유사)
    const parsedEvents = reversedEvents.map(event => {
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
    
    console.log(`[fetchEvents] Returning ${parsedEvents.length} parsed events`);
    return parsedEvents;

  } catch (error) {
    console.error(`[fetchEvents] Error:`, error);
    return [];
  }
}

// 4. HomePage 컴포넌트 (Carousel을 렌더링하는 원래 버전)
export default async function HomePage() {
  
  const allDataPromises = categoriesConfig.map(async (category) => {
    let places = null;
    let events = null;
    
    if (category.type === 'events') {
      // events 타입인 경우 - data가 있고 길이가 0보다 크면 사용, 아니면 API 호출
      events = (category.data && category.data.length > 0) ? category.data : await fetchEvents();
    } else if (category.type === 'places') {
      // places 타입인 경우 - data가 있고 길이가 0보다 크면 사용, 아니면 API 호출
      places = (category.data && category.data.length > 0) ? category.data : await fetchPlaces(category.slug);
    }
      
    return {
      title: category.title,
      description: category.description,
      places: places,
      events: events,
      link: category.link,
    };
  });

  const categoriesWithData = await Promise.all(allDataPromises);

  // 디버깅: 모든 카테고리 데이터 확인
  console.log('=== All Categories Data ===');
  categoriesWithData.forEach(cat => {
    console.log(`${cat.title}:`, {
      places: cat.places?.length || 0,
      events: cat.events?.length || 0,
      hasPlaces: !!cat.places,
      hasEvents: !!cat.events,
      placesType: Array.isArray(cat.places) ? 'array' : typeof cat.places,
      eventsType: Array.isArray(cat.events) ? 'array' : typeof cat.events,
    });
  });

  return (
    <>
      {/* 상단 여백 공간 - 문구와 구분선 */}
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-8">
        {/* 문구 */}
        <p className="!text-black text-lg mb-6">장소와 취향이 발견되는 공간</p>
        {/* 구분선 */}
        <div className="h-0.5 bg-gray-400"></div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-8 pt-15 pb-8">
        {categoriesWithData.map((category) => {
          // places 또는 events가 있고 길이가 0보다 크면 렌더링
          const hasData = (category.places && category.places.length > 0) || 
                         (category.events && category.events.length > 0);
          
          // 디버깅 로그
          if (category.title === '행사') {
            console.log('행사 카테고리 데이터:', {
              events: category.events,
              eventsLength: category.events?.length,
              hasData
            });
          }
          
          return hasData && (
            <CategoryCarousel
              key={category.title}
              title={category.title}
              description={category.description}
              places={category.places}
              events={category.events}
              link={category.link}
            />
          );
        })}
      </main>
    </>
  );
}
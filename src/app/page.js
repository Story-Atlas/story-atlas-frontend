// src/app/page.js

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryCarousel } from '@/components/CategoryCarousel';

// 1. 백엔드 API 주소
// 서버 컴포넌트에서는 절대 URL 필요 (서버 내부 통신이므로 localhost 사용)
// 클라이언트 컴포넌트에서는 상대 경로 사용 (Nginx가 프록시)
const API_BASE = typeof window === 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

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
  { 
    title: '관광지', 
    slug: 'spots', 
    description: '파주 출판도시의 특별한 장소들', 
    type: 'spots', // spots 타입 추가
    link: 'https://naver.me/5SSJFKvw', // 더보기 링크
    // data 없음 - API에서 가져옴
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
    
    // 최신 이벤트가 카루셀 왼쪽에 오도록 정렬 (역순 제거)
    // 백엔드에서 이미 최신순으로 정렬되어 오므로 그대로 사용
    
    // description JSON 파싱 (places의 summary 파싱과 유사)
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
    
    console.log(`[fetchEvents] Returning ${parsedEvents.length} parsed events`);
    return parsedEvents;

  } catch (error) {
    console.error(`[fetchEvents] Error:`, error);
    return [];
  }
}

// 3-2. fetchSpots 함수 추가 (places와 동일한 방식)
async function fetchSpots() {
  try {
    console.log(`[fetchSpots] Fetching from: ${API_BASE}/spots`);
    const res = await fetch(`${API_BASE}/spots`, {
      cache: 'no-store',
    });
    
    console.log(`[fetchSpots] Response status: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      console.warn(`Failed to fetch spots: ${res.status}`);
      return [];
    }

    const spots = await res.json();
    console.log(`[fetchSpots] Received ${spots.length} spots`);
    
    // description JSON 파싱 (events의 description 파싱과 유사)
    const parsedSpots = spots.map(spot => {
      let description = null;
      try {
        if (spot.description && spot.description.trim() !== "") {
          description = JSON.parse(spot.description);
        }
      } catch (e) {
        console.error(`JSON Parse Error for spot ${spot.id}:`, e);
        description = null;
      }
      
      return {
        ...spot,
        description: description
      };
    });
    
    console.log(`[fetchSpots] Returning ${parsedSpots.length} parsed spots`);
    return parsedSpots;

  } catch (error) {
    console.error(`[fetchSpots] Error:`, error);
    return [];
  }
}

// 4. HomePage 컴포넌트 (Carousel을 렌더링하는 원래 버전)
export default async function HomePage() {
  
  const allDataPromises = categoriesConfig.map(async (category) => {
    let places = null;
    let events = null;
    let spots = null;
    
    if (category.type === 'events') {
      // events 타입인 경우 - data가 있고 길이가 0보다 크면 사용, 아니면 API 호출
      events = (category.data && category.data.length > 0) ? category.data : await fetchEvents();
    } else if (category.type === 'places') {
      // places 타입인 경우 - data가 있고 길이가 0보다 크면 사용, 아니면 API 호출
      places = (category.data && category.data.length > 0) ? category.data : await fetchPlaces(category.slug);
    } else if (category.type === 'spots') {
      // spots 타입인 경우 - data가 있고 길이가 0보다 크면 사용, 아니면 API 호출
      spots = (category.data && category.data.length > 0) ? category.data : await fetchSpots();
    }
      
    return {
      title: category.title,
      description: category.description,
      places: places,
      events: events,
      spots: spots,
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
      spots: cat.spots?.length || 0,
      hasPlaces: !!cat.places,
      hasEvents: !!cat.events,
      hasSpots: !!cat.spots,
      placesType: Array.isArray(cat.places) ? 'array' : typeof cat.places,
      eventsType: Array.isArray(cat.events) ? 'array' : typeof cat.events,
      spotsType: Array.isArray(cat.spots) ? 'array' : typeof cat.spots,
    });
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      <Header />
      <HeroSection />
      
      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {categoriesWithData.map((category) => {
          // 모든 카테고리는 캐러셀로 표시
          const hasData = (category.places && category.places.length > 0) || 
                         (category.events && category.events.length > 0) ||
                         (category.spots && category.spots.length > 0);
          
          return hasData && (
            <CategoryCarousel
              key={category.title}
              title={category.title}
              description={category.description}
              places={category.places}
              events={category.events}
              spots={category.spots}
              link={category.link}
            />
          );
        })}
      </main>
    </div>
  );
}
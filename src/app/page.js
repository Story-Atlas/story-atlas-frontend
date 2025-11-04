// src/app/page.js

import { CategoryCarousel } from '@/components/CategoryCarousel';

// 1. 백엔드 API 주소
const API_BASE = 'http://localhost:8000/api';

// 2. categoriesConfig (description 문구 포함)
const categoriesConfig = [
  { 
    title: '행사', 
    slug: 'events', 
    description: '어, 이번 주말에 뭐 한다고?', 
    data: [] // 데이터 없음
  },
  { 
    title: '북카페', 
    slug: 'book-cafe',
    description: '커피는 핑계일 뿐, 활자에 중독되고 싶어'
  },
  { 
    title: '브런치', 
    slug: 'brunch',
    description: '아침과 점심 사이, 그 완벽한 행복의 순간'
  },
  { 
    title: '야외카페', 
    slug: 'outdoor-cafe',
    description: '일단 나와! 커피는 맑은 공기 마시면서'
  },
  { 
    title: '대형카페', 
    slug: 'large-cafe',
    description: '자리 맡을 걱정 없이, 일단 눕고(?) 시작하는 여유'
  },
  { 
    title: '주변 관광지', 
    slug: 'tourist-spots',
    description: '커피 배 채웠으면, 이제 감성 배 채울 시간',
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

// 4. HomePage 컴포넌트 (Carousel을 렌더링하는 원래 버전)
export default async function HomePage() {
  
  const allDataPromises = categoriesConfig.map(async (category) => {
    const places = category.data 
      ? category.data 
      : await fetchPlaces(category.slug);
      
    return {
      title: category.title,
      description: category.description,
      places: places,
    };
  });

  const categoriesWithData = await Promise.all(allDataPromises);

  return (
    // max-w-6xl (여백 조절됨)
    <main className="max-w-6xl mx-auto p-8">
      {categoriesWithData.map((category) => (
        // (데이터가 없으면 렌더링 안 함 - 야외카페는 이제 렌더링됩니다)
        category.places.length > 0 && (
          <CategoryCarousel
            key={category.title}
            title={category.title}
            description={category.description}
            places={category.places}
          />
        )
      ))}
    </main>
  );
}
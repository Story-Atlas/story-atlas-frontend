// src/app/page.js

import { CategoryCarousel } from '@/components/CategoryCarousel';

// 1. 백엔드 API 주소
const API_BASE = 'http://localhost:8000/api';

// 2. [수정] categoriesConfig에 'description' 키와 문구를 추가합니다.
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

// ... (fetchPlaces 함수는 동일)
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
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${slug}:`, error);
    return [];
  }
}

// ... (HomePage 컴포넌트)
export default async function HomePage() {
  
  const allDataPromises = categoriesConfig.map(async (category) => {
    const places = category.data 
      ? category.data 
      : await fetchPlaces(category.slug);
      
    // 3. [수정] return 객체에 description을 추가합니다.
    return {
      title: category.title,
      description: category.description, // 👈 이 줄 추가
      places: places,
    };
  });

  const categoriesWithData = await Promise.all(allDataPromises);

  return (
    // 여백 조정한 (max-w-6xl) main 태그
    <main className="max-w-6xl mx-auto p-8">
      {categoriesWithData.map((category) => (
        category.places.length > 0 && (
          // 4. [수정] CategoryCarousel에 description prop을 전달합니다.
          <CategoryCarousel
            key={category.title}
            title={category.title}
            description={category.description} // 👈 이 줄 추가
            places={category.places}
          />
        )
      ))}
    </main>
  );
}
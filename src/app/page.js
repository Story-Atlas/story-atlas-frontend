// src/app/page.js

import { CategoryCarousel } from '@/components/CategoryCarousel';

// 👇 주신 정보를 '관광지'와 '카페'에 추가하고, 주소 형식을 통일했습니다.
const allData = {
  행사: [
    { id: 'e1', name: '파주북소리 축제', location: '지혜의숲', color: '#B3E5FC' },
    { id: 'e2', name: '작가와의 만남 A', location: '문발리', color: '#C8E6C9' },
    { id: 'e3', name: '어린이 책 놀이터', location: '나비나라', color: '#FFCCBC' },
    { id: 'e4', name: '낭독 공연', location: '가람도서관', color: '#D1C4E9' },
  ],
  카페: [
    // --- 기존 임시 데이터 ---
    { id: 'c1', name: '카페 헤세', location: '헤세', color: '#FFCDD2' },
    { id: 'c2', name: '밀크북', location: '이채', color: '#FFF9C4' },
    { id: 'c3', name: '문발리 701', location: '문발리', color: '#E1BEE7' },
    // --- 회원님이 추가한 데이터 ---
    { id: 'c4', name: '문발리헌책방골목 북카페 블루박스', location: '경기 파주시 문발로 240-21', color: '#F8BBD0' },
    { id: 'c5', name: '카페뮤지엄', location: '경기 파주시 회동길 445-4 혜지원 1층', color: '#DCEDC8' },
    { id: 'c6', name: '아르디움 카페', location: '경기 파주시 회동길 337-20 아르디움', color: '#BBDEFB' },
    { id: 'c7', name: '메디테리움 북카페', location: '경기 파주시 회동길 338 1층 메디테리움', color: '#D7CCC8' },
    { id: 'c8', name: '목공 북카페 목요일', location: '경기 파주시 회동길 363-15 101호', color: '#CFD8DC' },
    { id: 'c9', name: '북카페 눈', location: '경기 파주시 회동길 125-11 효형출판 1층', color: '#B3E5FC' },
    { id: 'c10', name: '카페 모음', location: '경기 파주시 회동길 530-20 명필름 아트센터 1층', color: '#C8E6C9' },
    { id: 'c11', name: '갤러리 카페 종이와 나무', location: '경기 파주시 회동길 445-1 A동 101호', color: '#FFCCBC' },
    { id: 'c12', name: '북카페 파랑', location: '경기 파주시 회동길 337-16', color: '#D1C4E9' },
  ],
  식당: [
    { id: 'r1', name: '이탈리안 레스토랑', location: '지노', color: '#F8BBD0' },
    { id: 'r2', name: '한정식 맛집', location: '심학산', color: '#DCEDC8' },
  ],
  관광지: [
    // --- 기존 임시 데이터 ---
    { id: 't1', name: '지혜의 숲', location: '아시아출판문화정보센터', color: '#BBDEFB' },
    { id: 't2', name: '롯데 프리미엄 아울렛', location: '문발IC', color: '#D7CCC8' },
    { id: 't3', name: '헤이리 예술마을', location: '헤이리', color: '#CFD8DC' },
    // --- 회원님이 추가한 데이터 ---
    { id: 't4', name: '열화당 책박물관', location: '경기 파주시 광인사길 25 열화당', color: '#B3E5FC' },
    { id: 't5', name: '명필름 아트센터', location: '경기 파주시 회동길 530-20', color: '#C8E6C9' },
    { id: 't6', name: '미메시스 아트 뮤지엄', location: '경기 파주시 문발로 253', color: '#FFCCBC' },
    { id: 't7', name: '보리책놀이터', location: '경기 파주시 직지길 492 도서출판보리', color: '#D1C4E9' },
    { id: 't8', name: '이가고서점', location: '경기 파주시 광인사길 189 서강출판사 1층,2층', color: '#FFCDD2' },
    { id: 't9', name: '출판도시 활판공방', location: '경기 파주시 문발로 203', color: '#FFF9C4' },
  ]
};

const categories = ['행사', '카페', '식당', '관광지'];

export default function HomePage() {
  return (
    <main className="p-8">
      {categories.map((categoryTitle) => (
        <CategoryCarousel
          key={categoryTitle}
          title={categoryTitle}
          places={allData[categoryTitle]}
        />
      ))}
    </main>
  );
}
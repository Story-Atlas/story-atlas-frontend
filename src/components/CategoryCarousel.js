// src/components/CategoryCarousel.js

"use client";

import { useRef } from 'react';
import {PlaceCard} from '@/components/PlaceCard'; // PlaceCard import 방식 확인 (default/named)

export function CategoryCarousel({ title, places }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260; // 카드 너비 + 여백
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12 relative"> {/* relative 추가 */}

      {/* 캐러셀 제목 */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* 화살표 버튼은 스크롤 컨테이너 바깥, but section 안에 */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10"> {/* 왼쪽 화살표 */}
        <button 
          onClick={() => scroll('left')} 
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none" // 스타일 변경
          aria-label="스크롤 왼쪽으로"
        >
          <ChevronLeftIcon />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-10"> {/* 오른쪽 화살표 */}
        <button 
          onClick={() => scroll('right')} 
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none" // 스타일 변경
          aria-label="스크롤 오른쪽으로"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* 가로 스크롤이 될 카드 목록 컨테이너 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 p-4 scroll-smooth -mx-4" // 좌우 패딩을 만회하기 위한 -mx-4
      >
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}

// 아이콘 SVG는 그대로 사용
function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}
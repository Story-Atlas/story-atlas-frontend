// src/components/CategoryCarousel.js
"use client";

import { useRef } from 'react';
import { PlaceCard } from '@/components/PlaceCard';

export function CategoryCarousel({ title, description, places }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // 카드 너비(w-72 = 288px) + 카드 간격(space-x-4 = 16px) = 304px
      const scrollAmount = direction === 'left' ? -304 : 304;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12"> 

      {/* 제목과 설명 (이것들이 기준 너비가 됩니다) */}
      <h2 className="text-2xl font-bold mb-4 font-title">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 mb-4 -mt-2">
          {description}
        </p>
      )}

      {/* 👇 [수정] flex 컨테이너에 음수 마진(-mx-10)을 추가합니다. */}
      {/* (버튼 너비만큼(w-10) 양쪽으로 당겨서 스크롤 영역 너비를 확보합니다) */}
      <div className="flex items-center -mx-10">
        
        {/* 1. 왼쪽 화살표 (w-10 너비를 가진 래퍼로 감싸기) */}
        <div className="w-10 text-center">
          <button 
            onClick={() => scroll('left')} 
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="스크롤 왼쪽으로"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        {/* 2. [수정] 스크롤 영역 (flex-1 유지) */}
        {/* (모든 스크롤바 숨기기 코드 제거 -> 스크롤바가 다시 보입니다) */}
        <div
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto space-x-4 p-4 scroll-smooth"
        >
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>

        {/* 3. 오른쪽 화살표 (w-10 너비를 가진 래퍼로 감싸기) */}
        <div className="w-10 text-center">
          <button 
            onClick={() => scroll('right')} 
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="스크롤 오른쪽으로"
          >
            <ChevronRightIcon />
          </button>
        </div>

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
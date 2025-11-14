// src/components/CategoryCarousel.js
"use client";

// 1. [수정] 'useState'를 import 합니다.
import { useRef, useState } from 'react';
import { PlaceCard } from '@/components/PlaceCard';
import { EventCard } from '@/components/EventCard';

export function CategoryCarousel({ title, description, places, events, link }) {
  const scrollRef = useRef(null);
  
  // 디버깅 로그
  console.log(`[CategoryCarousel] ${title}:`, {
    places: places?.length || 0,
    events: events?.length || 0,
    placesType: Array.isArray(places) ? 'array' : typeof places,
    eventsType: Array.isArray(events) ? 'array' : typeof events,
  });
  
  // places 또는 events 중 하나를 items로 통합 (길이 확인)
  const items = (places && places.length > 0) ? places : (events && events.length > 0) ? events : [];
  
  // 렌더링할 카드 타입 결정
  const cardType = (places && places.length > 0) ? 'place' : (events && events.length > 0) ? 'event' : null;
  
  console.log(`[CategoryCarousel] ${title} items:`, items.length, 'cardType:', cardType);
  
  // 2. [추가] 마우스 드래그 상태 관리를 위한 State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 3. [추가] 마우스 이벤트 핸들러
  const onMouseDown = (e) => {
    setIsDragging(true);
    // (e.pageX) - (scrollRef.current.offsetLeft)
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    // 드래그 시 커서 변경 및 텍스트 선택 방지
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.userSelect = 'auto';
  };

  const onMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.userSelect = 'auto';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 (2배)
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 화살표 버튼 스크롤 (기존 로직)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -304 : 304;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12"> 
      {/* 제목/설명 + 별 아이콘 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold font-title">{title}</h2>
          {description && (
            <p className="text-lg !text-black -mt-2">
              {description}
            </p>
          )}
        </div>
        {/* 별 아이콘 - 오른쪽 끝 */}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
            <StarIcon />
          </a>
        )}
      </div>

      {/* [수정] -mx-10 (화살표 너비 보정) */}
      <div className="flex items-center -mx-10">
        
        {/* 왼쪽 화살표 (동일) */}
        <div className="w-10 text-center">
          <button 
            onClick={() => scroll('left')} 
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="스크롤 왼쪽으로"
          >
            <ChevronLeftIcon />
          </button>
        </div>

        {/* 4. [수정] 스크롤 컨테이너 */}
        <div
          ref={scrollRef}
          // (가) 마우스 이벤트 핸들러 추가
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          // (나) 스크롤바 숨김 클래스 'carousel-scroll-container' 추가
          // (다) 'grab' 커서 기본 적용
          style={{ cursor: 'grab' }}
          className="flex-1 flex overflow-x-auto space-x-4 p-4 scroll-smooth carousel-scroll-container"
        >
          {items.map((item) => {
            // cardType에 따라 PlaceCard 또는 EventCard 렌더링
            if (cardType === 'place') {
              return <PlaceCard key={item.id} place={item} />;
            } else if (cardType === 'event') {
              return <EventCard key={item.id} event={item} />;
            }
            return null;
          })}
        </div>

        {/* 오른쪽 화살표 (동일) */}
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

      {/* 5. [추가] 스크롤바 숨김 CSS (컴포넌트 내부에 직접 주입) */}
      <style jsx global>{`
        .carousel-scroll-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .carousel-scroll-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

    </section>
  );
}

// 아이콘 SVG (동일)
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

// 별 아이콘 (outline 스타일)
function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}
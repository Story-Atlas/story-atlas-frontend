// src/components/CategoryCarousel.js
"use client";

import { useRef, useState, useEffect } from 'react';
import { PlaceCard } from '@/components/PlaceCard';
import { EventCard } from '@/components/EventCard';
import { SpotCard } from '@/components/SpotCard';

// 아이콘 SVG
function ChevronLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25m5.25 0v5.25" />
    </svg>
  );
}

export function CategoryCarousel({ title, description, places, events, spots, link }) {
  const scrollRef = useRef(null);
  
  // places, events, 또는 spots 중 하나를 items로 통합
  const items = (places && places.length > 0) ? places 
    : (events && events.length > 0) ? events 
    : (spots && spots.length > 0) ? spots 
    : [];
  
  // 렌더링할 카드 타입 결정
  const cardType = (places && places.length > 0) ? 'place' 
    : (events && events.length > 0) ? 'event' 
    : (spots && spots.length > 0) ? 'spot' 
    : null;
  
  // 스크롤 가능 여부 확인
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };
    
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, [items]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 마우스 드래그 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-12"> 
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[hsl(var(--accent-brown))] hover:underline"
              >
                <span>더보기</span>
                <ExternalLinkIcon />
              </a>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full border bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full border bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{ cursor: 'grab' }}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
      >
        {items.map((item) => {
          if (cardType === 'place') {
            return <PlaceCard key={item.id} place={item} />;
          } else if (cardType === 'event') {
            return <EventCard key={item.id} event={item} />;
          } else if (cardType === 'spot') {
            return <SpotCard key={item.id} spot={item} />;
          }
          return null;
        })}
      </div>
    </section>
  );
}

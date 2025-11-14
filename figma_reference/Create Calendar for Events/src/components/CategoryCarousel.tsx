"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Place {
  id: number;
  name: string;
  headline?: string;
  image_url: string;
}

interface CategoryCarouselProps {
  title: string;
  description: string;
  items: Place[];
  type?: 'places' | 'events';
}

export function CategoryCarousel({ 
  title, 
  description, 
  items,
  type = 'places'
}: CategoryCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // 카드 너비 + 간격
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 300);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      {/* 헤더 */}
      <div className="mb-6">
        <h2 className="mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* 캐러셀 */}
      <div className="relative group">
        {/* 좌측 버튼 */}
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}

        {/* 스크롤 컨테이너 */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div 
              key={item.id}
              className="flex-shrink-0 w-72 group/card cursor-pointer"
            >
              <div className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* 이미지 */}
                <div className="relative w-72 h-48 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* 내용 */}
                <div className="p-4 bg-white">
                  <h4 className="mb-2 line-clamp-1">
                    {item.name}
                  </h4>
                  {item.headline && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.headline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 우측 버튼 */}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

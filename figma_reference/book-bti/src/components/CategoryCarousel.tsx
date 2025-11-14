import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useRef, useState } from 'react';
import { PlaceCard } from './PlaceCard';
import { EventCard } from './EventCard';
import { Button } from './ui/button';

interface CategoryCarouselProps {
  title: string;
  description: string;
  items: any[];
  type: 'places' | 'events' | 'spots';
  externalLink?: string;
}

export function CategoryCarousel({ title, description, items, type, externalLink }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        {externalLink && (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[hsl(var(--accent-brown))] hover:underline"
          >
            더보기
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.length > 0 ? (
            items.map((item) => {
              if (type === 'events') {
                return (
                  <EventCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    headline={item.headline}
                    imageUrl={item.imageUrl}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    status={item.status}
                  />
                );
              } else {
                return (
                  <PlaceCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    headline={item.headline}
                    imageUrl={item.imageUrl}
                    type={type}
                  />
                );
              }
            })
          ) : (
            <div className="w-full text-center py-12 text-gray-500">
              아직 등록된 {type === 'events' ? '행사' : '장소'}가 없습니다.
            </div>
          )}
        </div>

        {showRightArrow && items.length > 0 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}

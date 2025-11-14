import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: string;
  name: string;
  headline: string;
  image: string;
  date: string;
  status: number;
}

interface Place {
  id: string;
  name: string;
  headline: string;
  image: string;
}

interface CategoryCarouselProps {
  title: string;
  description: string;
  items: (Event | Place)[];
  type: 'events' | 'places';
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="relative flex-shrink-0 w-72 group cursor-pointer">
      <div className="relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
        <ImageWithFallback
          src={event.image}
          alt={event.name}
          className="w-72 h-80 object-cover"
        />
        {event.status === -1 && (
          <div className="absolute inset-0 bg-black/50">
            <Badge className="absolute top-4 right-4 bg-red-500 text-white">
              Ended
            </Badge>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-pretendard-bold">{event.name}</h3>
        <p className="text-gray-600">{event.headline}</p>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="flex-shrink-0 w-72 group cursor-pointer">
      <div className="relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
        <ImageWithFallback
          src={place.image}
          alt={place.name}
          className="w-72 h-48 object-cover"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-pretendard-bold">{place.name}</h3>
        <p className="text-gray-600">{place.headline}</p>
      </div>
    </div>
  );
}

function CategoryCarousel({ title, description, items, type }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="font-pretendard-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div key={item.id}>
              {type === 'events' ? (
                <EventCard event={item as Event} />
              ) : (
                <PlaceCard place={item as Place} />
              )}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export function HomePage() {
  // Mock data
  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'Book Festival 2024',
      headline: 'A celebration of literature and culture',
      image: 'https://images.unsplash.com/photo-1648707238917-257f7a7aa52b?w=288&h=320&fit=crop',
      date: '2024-11-15 ~ 2024-11-20',
      status: 1,
    },
    {
      id: '2',
      name: 'Author Meet & Greet',
      headline: 'Meet your favorite authors in person',
      image: 'https://images.unsplash.com/photo-1648707238917-257f7a7aa52b?w=288&h=320&fit=crop',
      date: '2024-11-22',
      status: 1,
    },
  ];

  const mockPlaces: Place[] = [
    {
      id: '1',
      name: 'The Reading Room',
      headline: 'A cozy corner for book lovers',
      image: 'https://images.unsplash.com/photo-1605787050388-845c63b60920?w=288&h=192&fit=crop',
    },
    {
      id: '2',
      name: 'Literary Cafe',
      headline: 'Coffee and books in perfect harmony',
      image: 'https://images.unsplash.com/photo-1605787050388-845c63b60920?w=288&h=192&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--warm-bg))] to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-[hsl(var(--accent-brown))]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="mb-6 bg-white shadow-md">
            Paju Book City Archive
          </Badge>
          <h1 className="mb-6">
            A Space Where <span className="text-[hsl(var(--accent-brown))]">Precious Moments</span> Are Recorded
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the special places of Paju Book City, where books and culture are alive, and create your own story.
          </p>
        </div>
      </div>

      {/* Category Carousels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryCarousel
          title="Events"
          description="Oh, what's happening this weekend?"
          items={mockEvents}
          type="events"
        />

        <CategoryCarousel
          title="Book Cafe"
          description="Coffee is just an excuse, I want to get addicted to print."
          items={mockPlaces}
          type="places"
        />

        <CategoryCarousel
          title="Brunch"
          description="Between breakfast and lunch, that perfect moment of happiness."
          items={mockPlaces}
          type="places"
        />

        <CategoryCarousel
          title="Outdoor Cafe"
          description="Just come outside! Let's have coffee with fresh air."
          items={mockPlaces}
          type="places"
        />
      </div>
    </div>
  );
}

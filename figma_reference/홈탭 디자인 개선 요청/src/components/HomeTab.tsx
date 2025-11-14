"use client";

import { HeroSection } from "./HeroSection";
import { CategoryCarousel } from "./CategoryCarousel";
import { PlaceCard } from "./PlaceCard";
import { EventCard } from "./EventCard";

interface HomeTabProps {
  mockData: any;
  onPlaceClick: (place: any) => void;
  onEventClick: (event: any) => void;
}

export function HomeTab({ mockData, onPlaceClick, onEventClick }: HomeTabProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))] pb-24">
      <HeroSection />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Events Section */}
        <CategoryCarousel
          title="진행 중인 행사"
          description="파주 출판단지에서 열리는 다채로운 문화 행사를 만나보세요"
          externalLink="#"
        >
          {mockData.events.map((event: any) => (
            <EventCard
              key={event.id}
              image={event.image}
              name={event.name}
              headline={event.headline}
              period={event.period}
              isEnded={event.isEnded}
              onClick={() => onEventClick(event)}
            />
          ))}
        </CategoryCarousel>

        {/* Book Cafes Section */}
        <CategoryCarousel
          title="북카페"
          description="책과 커피를 함께 즐길 수 있는 특별한 공간"
          externalLink="#"
        >
          {mockData.bookCafes.map((cafe: any) => (
            <PlaceCard
              key={cafe.id}
              image={cafe.image}
              name={cafe.name}
              headline={cafe.headline}
              category={cafe.category}
              onClick={() => onPlaceClick(cafe)}
            />
          ))}
        </CategoryCarousel>

        {/* Brunch Cafes Section */}
        <CategoryCarousel
          title="브런치 카페"
          description="여유로운 오전을 완성하는 맛있는 브런치"
          externalLink="#"
        >
          {mockData.brunchCafes.map((cafe: any) => (
            <PlaceCard
              key={cafe.id}
              image={cafe.image}
              name={cafe.name}
              headline={cafe.headline}
              category={cafe.category}
              onClick={() => onPlaceClick(cafe)}
            />
          ))}
        </CategoryCarousel>

        {/* Outdoor Cafes Section */}
        <CategoryCarousel
          title="야외 카페"
          description="탁 트인 전망과 함께하는 카페 타임"
          externalLink="#"
        >
          {mockData.outdoorCafes.map((cafe: any) => (
            <PlaceCard
              key={cafe.id}
              image={cafe.image}
              name={cafe.name}
              headline={cafe.headline}
              category={cafe.category}
              onClick={() => onPlaceClick(cafe)}
            />
          ))}
        </CategoryCarousel>

        {/* Attractions Section */}
        <CategoryCarousel
          title="관광지"
          description="파주 출판단지의 랜드마크와 문화 공간"
          externalLink="#"
        >
          {mockData.attractions.map((place: any) => (
            <PlaceCard
              key={place.id}
              image={place.image}
              name={place.name}
              headline={place.headline}
              category={place.category}
              onClick={() => onPlaceClick(place)}
            />
          ))}
        </CategoryCarousel>
      </main>
    </div>
  );
}

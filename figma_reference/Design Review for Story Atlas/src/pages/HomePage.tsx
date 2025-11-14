import { useEffect, useState } from 'react';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { Badge } from '../components/ui/badge';

export function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for events (would be API call in real app)
    const mockEvents = [
      {
        id: '1',
        name: '파주 북 페스티벌 2025',
        headline: '책과 문화가 어우러지는 축제',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
        startDate: '2025-05-15',
        endDate: '2025-05-17',
        status: 1,
      },
      {
        id: '2',
        name: '작가와의 만남',
        headline: '베스트셀러 작가와 함께하는 특별한 시간',
        imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
        startDate: '2025-06-10',
        endDate: '2025-06-10',
        status: 1,
      },
      {
        id: '3',
        name: '독립출판 전시회',
        headline: '독립 출판의 다양한 세계를 경험하세요',
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        status: -1,
      },
    ];
    
    setEvents(mockEvents as any);
    setLoading(false);
  }, []);

  const bookCafes = [
    {
      id: '1',
      name: '북카페 지혜의숲',
      headline: '책과 커피가 만나는 아늑한 공간',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    },
    {
      id: '2',
      name: '카페 페이지터너',
      headline: '한 페이지 한 페이지, 시간이 멈추는 곳',
      imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600',
    },
  ];

  const spots = [
    {
      id: '1',
      name: '열화당 책박물관',
      headline: '책의 역사와 문화를 만나는 특별한 장소',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
    },
    {
      id: '2',
      name: '미메시스 아트 뮤지엄',
      headline: '건축과 예술이 어우러진 문화공간',
      imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[hsl(var(--warm-bg))] to-white pt-20 pb-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 bg-white shadow-md">
            파주 출판단지 아카이브
          </Badge>
          
          <h1 className="mb-6">
            <span className="text-[hsl(var(--accent-brown))]">소중한 순간</span>이
            <br />
            기록되는 공간
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-600">
            책과 문화가 살아 숨 쉬는 파주 출판단지의 특별한 장소들을 발견하고,
            당신만의 이야기를 만들어보세요.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-16">
        <CategoryCarousel
          title="행사"
          description="어, 이번 주말에 뭐 한다고?"
          items={events}
          type="events"
        />

        <CategoryCarousel
          title="북카페"
          description="커피는 핑계일 뿐, 활자에 중독되고 싶어"
          items={bookCafes}
          type="places"
          externalLink="https://map.naver.com"
        />

        <CategoryCarousel
          title="브런치"
          description="아침과 점심 사이, 그 완벽한 행복의 순간"
          items={[]}
          type="places"
          externalLink="https://map.naver.com"
        />

        <CategoryCarousel
          title="야외카페"
          description="일단 나와! 커피는 맑은 공기 마시면서"
          items={[]}
          type="places"
          externalLink="https://map.naver.com"
        />

        <CategoryCarousel
          title="대형카페"
          description="넓은 공간에서 펼치는 나만의 시간"
          items={[]}
          type="places"
          externalLink="https://map.naver.com"
        />

        <CategoryCarousel
          title="주변 관광지"
          description="커피 배 채웠으면, 이제 감성 배 채울 시간"
          items={[]}
          type="places"
        />

        <CategoryCarousel
          title="관광지"
          description="파주 출판도시의 특별한 장소들"
          items={spots}
          type="spots"
          externalLink="https://map.naver.com"
        />
      </div>
    </div>
  );
}

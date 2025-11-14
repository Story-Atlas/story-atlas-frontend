"use client";

import * as React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { EventCalendar } from "./components/EventCalendar";
import { CategoryCarousel } from "./components/CategoryCarousel";

// 샘플 행사 데이터
const sampleEvents = [
  {
    id: 1,
    name: "파주 북 페스티벌 2025",
    headline: "책과 문화가 만나는 특별한 주말",
    start_date: "2025-11-15",
    end_date: "2025-11-17",
    place_id: "파주 출판도시 광장",
    host: "파주출판도시문화재단",
    status: 1,
    image_url: "https://images.unsplash.com/photo-1668573407049-c9e6d6e9488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHVibGlzaGluZyUyMGN1bHR1cmUlMjBldmVudHxlbnwxfHx8fDE3NjI3NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "작가와의 대화",
    headline: "올해의 작가를 만나는 시간",
    start_date: "2025-11-20",
    end_date: "2025-11-20",
    place_id: "지혜의숲",
    host: "열화당",
    status: 1,
    image_url: "https://images.unsplash.com/photo-1668573407049-c9e6d6e9488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHVibGlzaGluZyUyMGN1bHR1cmUlMjBldmVudHxlbnwxfHx8fDE3NjI3NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "책과 함께하는 겨울",
    headline: "따뜻한 차와 함께 읽는 겨울 독서",
    start_date: "2025-12-01",
    end_date: "2025-12-31",
    place_id: "파주 북카페 투어",
    host: "파주시",
    status: 1,
    image_url: "https://images.unsplash.com/photo-1668573407049-c9e6d6e9488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHVibGlzaGluZyUyMGN1bHR1cmUlMjBldmVudHxlbnwxfHx8fDE3NjI3NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: "북아트 워크샵",
    headline: "나만의 책을 만드는 특별한 경험",
    start_date: "2025-11-10",
    end_date: "2025-11-10",
    place_id: "아시아출판문화정보센터",
    host: "북아트협회",
    status: -1,
    image_url: "https://images.unsplash.com/photo-1668573407049-c9e6d6e9488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHVibGlzaGluZyUyMGN1bHR1cmUlMjBldmVudHxlbnwxfHx8fDE3NjI3NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    name: "출판 산업 컨퍼런스",
    headline: "미래의 출판을 논하다",
    start_date: "2025-11-25",
    end_date: "2025-11-26",
    place_id: "파주출판도시 컨벤션홀",
    host: "한국출판협회",
    status: 1,
    image_url: "https://images.unsplash.com/photo-1668573407049-c9e6d6e9488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHVibGlzaGluZyUyMGN1bHR1cmUlMjBldmVudHxlbnwxfHx8fDE3NjI3NDg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

// 샘플 장소 데이터
const sampleBookCafes = [
  {
    id: 1,
    name: "지혜의숲",
    headline: "5만 권의 책이 기다리는 공간",
    image_url: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI3MTk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "북코스모스",
    headline: "책과 커피가 어우러지는 아늑한 공간",
    image_url: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI3MTk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "열화당 책박물관",
    headline: "책의 역사와 만나다",
    image_url: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI3MTk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    name: "더 리딩룸",
    headline: "조용한 독서를 위한 특별한 공간",
    image_url: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI3MTk1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const sampleOutdoorCafes = [
  {
    id: 5,
    name: "가든 카페 봄",
    headline: "자연 속에서 즐기는 여유",
    image_url: "https://images.unsplash.com/photo-1755568600209-c73d6584a044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjI3NDg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    name: "테라스 북 카페",
    headline: "햇살 가득한 야외 독서 공간",
    image_url: "https://images.unsplash.com/photo-1755568600209-c73d6584a044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjI3NDg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 7,
    name: "숲속의 책방",
    headline: "나무 그늘 아래서 펼치는 책",
    image_url: "https://images.unsplash.com/photo-1755568600209-c73d6584a044?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2FmZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjI3NDg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      <Header />
      
      <main>
        {/* 히어로 섹션 */}
        <HeroSection />

        {/* 메인 콘텐츠 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 행사 캘린더 섹션 */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="mb-2">행사</h2>
              <p className="text-gray-600">
                어, 이번 주말에 뭐 한다고?
              </p>
            </div>
            <EventCalendar events={sampleEvents} />
          </section>

          {/* 북카페 섹션 */}
          <CategoryCarousel
            title="북카페"
            description="커피는 핑계일 뿐, 활자에 중독되고 싶어"
            items={sampleBookCafes}
          />

          {/* 야외카페 섹션 */}
          <CategoryCarousel
            title="야외카페"
            description="일단 나와! 커피는 맑은 공기 마시면서"
            items={sampleOutdoorCafes}
          />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">© 2025 Story Atlas. All rights reserved.</p>
            <p>파주 출판단지의 장소와 행사를 아카이브하는 서비스</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

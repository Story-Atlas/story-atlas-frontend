import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--warm-bg))] to-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-[hsl(var(--accent-beige))] opacity-30 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-[hsl(var(--warm-secondary))] opacity-40 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-[hsl(var(--accent-brown))]" />
            <span className="text-sm text-gray-600">파주 출판단지 아카이브</span>
          </div>
          
          <h1 className="max-w-3xl mb-6">
            장소와 취향이
            <br />
            <span className="text-[hsl(var(--accent-brown))]">발견되는 공간</span>
          </h1>
          
          <p className="max-w-2xl text-lg text-gray-600 mb-8">
            책과 문화가 살아 숨 쉬는 파주 출판단지의 특별한 장소들을 발견하고,
            당신만의 이야기를 만들어보세요.
          </p>
        </div>
      </div>
    </section>
  );
}

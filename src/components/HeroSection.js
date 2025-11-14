"use client";

// 간단한 아이콘 컴포넌트
function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--warm-bg))] to-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-6">
            <SparklesIcon className="h-4 w-4 text-[hsl(var(--accent-brown))]" />
            <span className="text-sm text-gray-600">파주 출판단지 아카이브</span>
          </div>
          
          <h1 className="max-w-3xl mb-6 text-4xl md:text-5xl font-bold">
            <span className="text-[hsl(var(--accent-brown))]">소중한 순간</span>이
            <br />
            기록되는 공간
          </h1>
          
          <p className="max-w-2xl text-lg text-gray-600 mb-8">
            책과 문화가 살아 숨 쉬는 파주 출판단지의 특별한 장소들을 발견하고,
            <br className="hidden sm:block" />
            당신만의 이야기를 만들어보세요.
          </p>
        </div>
      </div>
    </section>
  );
}


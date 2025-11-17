"use client";

import Link from 'next/link';

// Sparkles 아이콘
function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

// ArrowRight 아이콘
function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function BookBTIPromotion() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
      <Link href="/book-bti">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 p-8 md:p-12 cursor-pointer hover:shadow-2xl transition-all duration-300 group">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Icon */}
            <div className="flex-shrink-0 animate-pulse">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none">
                  NEW
                </span>
                <span className="text-sm text-gray-600">AI 성격 테스트</span>
              </div>
              <h2 className="text-3xl mb-2 text-gray-800 font-bold">
                나의 Book-BTI는?
              </h2>
              <p className="text-gray-600">
                AI가 분석하는 나만을 위한 파주 출판단지 맞춤 장소 추천
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 text-amber-700 group-hover:text-amber-800 transition-colors">
                <span className="font-semibold">테스트 시작</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


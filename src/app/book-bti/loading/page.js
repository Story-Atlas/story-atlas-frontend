"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';

function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function BookBTILoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'INFP';
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 텍스트를 0.3초 후에 표시
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    // 3초 후 결과 페이지로 이동
    const redirectTimer = setTimeout(() => {
      router.push(`/book-bti/result?type=${type}`);
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(redirectTimer);
    };
  }, [router, type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center px-4 w-full max-w-2xl">
          {/* Animated Icons */}
          <div className="relative mb-12 flex items-center justify-center" style={{ height: '120px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin" style={{ animationDuration: '2s' }}>
                <SparklesIcon className="w-16 h-16 text-amber-400" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="animate-pulse">
                <BookOpenIcon className="w-24 h-24 text-orange-500 mx-auto" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className={`transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl mb-4 text-gray-800 font-bold">
              당신의 취향을 분석하고 있어요...
            </h2>
            <p className="text-lg text-gray-600">
              완벽한 장소를 찾는 중입니다
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1.5s' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookBTILoading() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <BookBTILoadingContent />
    </Suspense>
  );
}


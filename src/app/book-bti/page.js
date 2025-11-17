"use client";

import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

// 간단한 아이콘 컴포넌트
function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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

export default function BookBTIIntro() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 pt-8">
        <div className="max-w-2xl mx-auto">
          {/* Decorative Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
              <BookOpenIcon className="w-12 h-12 text-amber-600" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }}>
              <HeartIcon className="w-12 h-12 text-rose-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>
              <SparklesIcon className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl text-center mb-4 text-gray-800 font-bold">
            나의 'Book-BTI'는?
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-center mb-8 text-gray-600">
            파주 출판단지에서 나만의 완벽한 장소 찾기
          </p>

          {/* Description Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-lg">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                AI가 당신의 답변을 분석하여 당신의 'Book-BTI'를 진단하고, 
                파주 출판단지에서의 완벽한 하루를 위한 맞춤 장소를 추천해드립니다.
              </p>
            </div>
          </div>

          {/* Disclaimer Card */}
          <div className="bg-amber-100/50 rounded-2xl p-6 mb-8 border border-amber-200/50">
            <p className="text-sm text-amber-900">
              <span className="inline-block mr-1">💡</span>
              잠깐! 'Book-BTI'는 독서 및 공간 취향을 기반으로 하기 때문에, 
              실제 MBTI와 다를 수 있어요.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <Button
              onClick={() => router.push('/book-bti/quiz')}
              className="w-full py-6 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              테스트 시작하기
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            약 3분 소요 · 총 8개의 질문
          </p>
        </div>
      </div>
    </div>
  );
}


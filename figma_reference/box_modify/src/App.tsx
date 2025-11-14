"use client";

import { useState } from 'react';
import { Button } from './components/ui/button';

export default function App() {
  const [mbtiMatch, setMbtiMatch] = useState<boolean | null>(null);

  const handleMbtiMatch = (isMatch: boolean) => {
    setMbtiMatch(isMatch);
  };

  const type = "INFP";
  const typeData = {
    bti_name: '몽상적인 숲속의 낭만가',
    bti_description: '자신만의 상상과 감성의 세계에 빠져들길 원하며, 우연히 발견한 아름다움 속에서 위로를 받는 낭만가입니다.',
    backgroundColor: 'bg-gradient-to-br from-purple-100 via-lavender-100 to-pink-100',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Type Card */}
        <div className="mb-12 relative">
          {/* 우측 플로팅 카드 - 박스 밖에 배치 */}
          <div className="absolute -top-4 right-0 z-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border-2 border-white/80 min-w-[200px]">
              {mbtiMatch === null ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-gray-600">실제 MBTI</p>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMbtiMatch(true)}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white text-sm shadow-md hover:shadow-lg transition-all hover:scale-105"
                    >
                      ✓ 맞아요
                    </button>
                    <button
                      onClick={() => handleMbtiMatch(false)}
                      className="w-full px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm border-2 border-gray-200 hover:border-gray-300 transition-all"
                    >
                      다른 유형이에요
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-2">
                  {mbtiMatch ? (
                    <>
                      <div className="text-3xl mb-2">🎉</div>
                      <p className="text-sm text-purple-600">정확도가 높네요!</p>
                      <p className="text-xs text-gray-500 mt-1">북BTI 분석 완료</p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">💭</div>
                      <p className="text-sm text-gray-700">조금 다를 수 있어요</p>
                      <p className="text-xs text-gray-500 mt-1">응답 감사합니다</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={`relative rounded-3xl p-8 ${typeData.backgroundColor} overflow-hidden shadow-lg min-h-[320px]`}>
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-5xl mb-4 tracking-wider text-gray-800">
                {type}
              </div>
              <h2 className="text-2xl mb-4 text-gray-800 max-w-md">
                {typeData.bti_name}
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-xl">
                {typeData.bti_description}
              </p>
              <div className="mt-6 text-sm text-gray-500">
                나의 Book-BTI는?
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => alert('다시하기 클릭!')}
            variant="outline"
            className="rounded-full border-gray-300 hover:bg-white/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            다시하기
          </Button>
        </div>
      </div>
    </div>
  );
}
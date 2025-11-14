"use client";

import { BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--warm-bg))] to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* 배경 장식 요소 */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[hsl(var(--accent-beige))] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-[hsl(var(--accent-brown))]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-[hsl(var(--warm-secondary))] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* 배지 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
          <BookOpen className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
          <span className="text-sm">파주 출판단지 아카이브</span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="mb-6 max-w-4xl mx-auto">
          소중한 순간이{" "}
          <span className="text-[hsl(var(--accent-brown))]">기록되는</span>{" "}
          공간
        </h1>

        {/* 서브 타이틀 */}
        <p className="max-w-2xl mx-auto text-gray-600">
          책과 문화가 살아 숨 쉬는 파주 출판단지의 특별한 장소들을 발견하고, 
          당신만의 이야기를 만들어보세요.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

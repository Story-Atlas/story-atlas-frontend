// src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
// 1. 페이지 이동을 위한 Link 컴포넌트를 import 합니다.
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Story Atlas", // 회원님 프로젝트 이름
  description: "출판단지 아카이브",
};

export default function RootLayout({ children }) {
  return (
    // 2. lang="ko"로 변경 (한국어 서비스)
    <html lang="ko">
      <body className={inter.className}>

        {/* 3. 모든 페이지 상단에 보일 헤더(네비게이션)를 추가합니다. */}
        <header className="w-full bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
          <nav className="max-w-5xl mx-auto p-4 flex gap-6">
            <Link href="/" className="font-bold text-gray-800 hover:text-blue-600">
              홈 (장소/행사)
            </Link>
            <Link href="/bookmark" className="font-bold text-gray-800 hover:text-blue-600">
              책갈피 만들기
            </Link>
            {/* 나중에 3번째 탭(커뮤니티)을 만들면 여기에 Link를 추가하면 됩니다.
              <Link href="/gallery" className="font-bold text-gray-800 hover:text-blue-600">
                책갈피 갤러리
              </Link> 
            */}
          </nav>
        </header>

        {/* 4. {children}은 현재 페이지의 내용을 의미합니다. */}
        {children}
      </body>
    </html>
  );
}
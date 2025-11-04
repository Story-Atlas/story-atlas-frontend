// src/app/layout.js

import localFont from 'next/font/local';
import Link from 'next/link';
import "./globals.css"; // 전역 CSS

// 1. [수정] BR Firma Black 로드 (경로에 띄어쓰기 포함)
const brFirmaBlack = localFont({
  src: '../../public/fonts/BR Firma Black.otf',
  weight: '900', // Black
  style: 'normal',
  display: 'swap',
  variable: '--font-br-firma', // CSS 변수
});

// 2. [수정] NanumSquareNeo Regular 로드 (경로 수정)
const nanumSquareNeo = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Rg.otf',
  weight: '400', // Regular
  style: 'normal',
  display: 'swap',
  variable: '--font-nanum-square', // CSS 변수
});

export const metadata = {
  title: "Story Atlas",
  description: "출판단지 아카이브",
};

export default function RootLayout({ children }) {
  return (
    // 3. [수정] html 태그에 두 폰트 변수를 모두 적용
    <html lang="ko" className={`${brFirmaBlack.variable} ${nanumSquareNeo.variable}`}>
      <body>
        <header className="w-full bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
          {/* [수정] 여백 max-w-6xl 적용, items-center로 수직 중앙 정렬 */}
          <nav className="max-w-6xl mx-auto p-4 flex items-center gap-6">
            
            {/* 4. [추가] Story Atlas 로고 (font-title 클래스 사용 예정) */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-title text-2xl font-extrabold text-blue-600">
                Story Atlas
              </span>
            </Link>

            {/* 5. 기존 링크들 */}
            <Link href="/" className="font-bold text-gray-800 hover:text-blue-600">
              홈 (장소/행사)
            </Link>
            <Link href="/bookmark" className="font-bold text-gray-800 hover:text-blue-600">
              책갈피 만들기
            </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
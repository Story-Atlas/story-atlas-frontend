// src/app/layout.js

import localFont from 'next/font/local';
import { Dancing_Script } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import "./globals.css"; // 전역 CSS

// 1. BR Firma Black 폰트 (파일이 없으면 Pretendard로 대체)
// const brFirmaBlack = localFont({
//   src: '../../public/fonts/BR Firma Black.otf',
//   weight: '900',
//   style: 'normal',
//   display: 'swap',
//   variable: '--font-br-firma',
// });

// 2. NanumSquareNeo Regular 폰트 (파일이 없으면 Pretendard로 대체)
// const nanumSquareNeo = localFont({
//   src: '../../public/fonts/NanumSquareNeoOTF-Rg.otf',
//   weight: '400',
//   style: 'normal',
//   display: 'swap',
//   variable: '--font-nanum-square',
// });

// 3. 필기체 폰트 (Dancing Script) 로드
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dancing-script', // CSS 변수
});

// 4. Pretendard 가변 폰트 로드
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920', // 가변 폰트 weight 범위
  variable: '--font-pretendard', // CSS 변수
});

// 5. KoPub 바탕체 폰트 로드
const kopubBatang = localFont({
  src: [
    {
      path: '../../public/fonts/kopub-batang/KoPubWorld Batang_Pro Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kopub-batang/KoPubWorld Batang_Pro Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kopub-batang/KoPubWorld Batang_Pro Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-kopub-batang',
  fallback: ['serif'],
});

// 6. 미생체 폰트 로드
const misengchae = localFont({
  src: [
    {
      path: '../../public/fonts/misengchae/SDMiSaeng.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-misengchae',
  fallback: ['cursive'],
});

// 7. BM 을지로체 폰트 로드
const bmEuljiro = localFont({
  src: [
    {
      path: '../../public/fonts/bm-euljiro/BMEULJIRO.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bm-euljiro',
  fallback: ['sans-serif'],
});

export const metadata = {
  title: "Story Atlas",
  description: "파주 출판단지 아카이브",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    // 3. [수정] html 태그에 폰트 변수들을 모두 적용
    <html lang="ko" className={`${dancingScript.variable} ${pretendard.variable} ${kopubBatang.variable} ${misengchae.variable} ${bmEuljiro.variable}`}>
      <body>
        <header className="w-full bg-white sticky top-0 z-10">
          {/* [수정] 여백 max-w-6xl 적용, 텍스트는 상단 정렬, 좌우 대칭 */}
          <nav className="max-w-6xl mx-auto px-8 pt-6 pb-6 flex items-start justify-between relative">
            
            {/* 4. [추가] Story Atlas 로고 - 굵은 산세리프체, 소문자 */}
            <Link href="/" className="flex items-center gap-0">
              <Image
                src="/favi3.png"
                alt="Story Atlas Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-pretendard text-4xl font-extrabold text-black lowercase">
                story atlas
              </span>
            </Link>

            {/* 5. 기존 링크들 - 오른쪽 배치 */}
            <div className="flex items-center gap-8">
              <Link href="/" className="font-bold text-lg text-gray-800 hover:text-blue-600">
                탐색
              </Link>
              <Link href="/bookmark" className="font-bold text-lg text-gray-800 hover:text-blue-600">
                책갈피 만들기
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
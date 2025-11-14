// src/app/layout.js

import localFont from 'next/font/local';
import { Dancing_Script } from 'next/font/google';
import "./globals.css"; // 전역 CSS
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/StructuredData';

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
  title: {
    default: "Story Atlas | 파주 출판단지 아카이브",
    template: "%s | Story Atlas",
  },
  description: "파주 출판단지의 행사, 북카페, 관광지를 한눈에. Book BTI로 나에게 맞는 장소를 찾아보세요.",
  keywords: ["파주 출판단지", "북카페", "파주 관광", "출판도시", "Book BTI", "파주 행사", "파주 카페"],
  authors: [{ name: "Story Atlas" }],
  creator: "Story Atlas",
  publisher: "Story Atlas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://storyatlas.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://storyatlas.site',
    siteName: 'Story Atlas',
    title: 'Story Atlas | 파주 출판단지 아카이브',
    description: '파주 출판단지의 행사, 북카페, 관광지를 한눈에. Book BTI로 나에게 맞는 장소를 찾아보세요.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Story Atlas 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story Atlas | 파주 출판단지 아카이브',
    description: '파주 출판단지의 행사, 북카페, 관광지를 한눈에.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.png',
  },
  verification: {
    // Google Search Console, Naver Webmaster 등에서 발급받은 인증 코드 추가
    // google: 'your-google-verification-code',
    // naver: 'your-naver-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    // 3. [수정] html 태그에 폰트 변수들을 모두 적용
    <html lang="ko" className={`${dancingScript.variable} ${pretendard.variable} ${kopubBatang.variable} ${misengchae.variable} ${bmEuljiro.variable}`}>
      <head>
        <WebsiteStructuredData />
        <OrganizationStructuredData />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
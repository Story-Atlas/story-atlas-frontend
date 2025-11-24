# Story Atlas Frontend

Next.js 기반 독서 문화 공간 큐레이션 플랫폼 프론트엔드

## 기술 스택

- **Next.js 14** - React 프레임워크 (App Router)
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Pretendard** - 한글 최적화 폰트
- **Google Gemini AI** - 책갈피 이미지 생성

## 주요 기능

- 📍 장소 탐색 (북카페, 브런치 카페, 야외 공간 등)
- 🎭 문화 행사 정보
- 🗺️ 관광지 추천
- 🎨 AI 책갈피 생성
- 📖 북BTI (독서 성향 테스트)
- ❤️ 찜하기 및 마이 아틀라스

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일에 백엔드 API URL을 설정하세요:

```env
# Backend API URL (Express)
NEXT_PUBLIC_API_URL=http://localhost:8000

# FastAPI URL
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8001
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3001 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.js            # 홈 페이지
│   │   ├── explore/           # 탐색 페이지
│   │   ├── atlas/             # 행사 페이지
│   │   ├── bookmark/          # 책갈피 생성
│   │   ├── myatlas/           # 마이 아틀라스
│   │   └── bookbti/           # 북BTI
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── Card.js           # 카드 컴포넌트
│   │   ├── Navigation.js     # 네비게이션
│   │   └── ...
│   └── styles/               # 스타일 파일
│       └── globals.css
├── public/                    # 정적 파일
│   ├── images/
│   └── ...
├── next.config.mjs           # Next.js 설정
├── tailwind.config.mjs       # Tailwind CSS 설정
└── package.json
```

## API 연동

백엔드 API와의 통신은 `fetch`를 사용합니다:

```javascript
// 장소 목록 가져오기
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/places/book-cafe`);
const places = await response.json();

// AI 책갈피 생성
const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/bookmark/create`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: '책갈피 문구', style: 'modern' })
});
```

## 배포

### Vercel (권장)

1. GitHub 리포지토리 연결
2. Vercel 대시보드에서 환경 변수 설정
3. 자동 배포

### 수동 배포

```bash
npm run build
# build 폴더를 호스팅 서버에 배포
```

## 개발 가이드

### 새로운 페이지 추가

`src/app/` 폴더에 새 폴더와 `page.js` 파일 생성:

```javascript
// src/app/newpage/page.js
export default function NewPage() {
  return <div>새 페이지</div>;
}
```

### 컴포넌트 작성

```javascript
// src/components/MyComponent.js
export default function MyComponent({ title }) {
  return <div>{title}</div>;
}
```

## 스타일 가이드

- Tailwind CSS 유틸리티 클래스 사용
- 커스텀 스타일은 `globals.css`에 추가
- 반응형 디자인 우선 (모바일 퍼스트)

## 트러블슈팅

### 백엔드 연결 오류

- `.env.local` 파일의 API URL 확인
- 백엔드 서버가 실행 중인지 확인
- CORS 설정 확인

### 빌드 오류

```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

## 라이선스

ISC

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

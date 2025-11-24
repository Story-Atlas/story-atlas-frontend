// 1. tailwind-scrollbar-hide 플러그인을 import 합니다.
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
const config = {
  // 2. Tailwind가 스타일을 스캔할 파일 경로를 지정합니다.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 3. (선택 사항) layout.js에서 로드한 폰트를 Tailwind 클래스로 등록합니다.
      //    이제 globals.css의 .font-title 대신 'font-title' 클래스를 쓸 수 있습니다.
      fontFamily: {
        title: ['var(--font-pretendard)'],
        sans: ['var(--font-pretendard)'], // 'font-sans'는 기본 폰트가 됩니다.
      },
    },
  },
  // 4. (필수) plugins 배열에 scrollbarHide를 추가합니다.
  plugins: [
    scrollbarHide,
  ],
};

export default config;
// src/app/bookmark/page.js  <-- (책갈피 만들기 탭)

// BookmarkForm을 가져옵니다. (중괄호 { } 여부는 본인 코드에 맞게)
import { BookmarkForm } from '@/components/BookmarkForm';

export default function BookmarkPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">나만의 책갈피 만들기</h1>
      <p className="text-center text-gray-600 mb-8">
        책 이름, 장르, 그리고 기억에 남는 구절을 입력하여 특별한 책갈피를 만들어보세요.
      </p>

      {/* 여기에 폼 컴포넌트가 렌더링됩니다. */}
      <BookmarkForm />

    </main>
  );
}
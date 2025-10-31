// src/components/BookmarkForm.js

// 1. useState를 사용하므로 "use client" 선언이 필수입니다.
"use client";

import { useState } from 'react';

// 2. named export 방식으로 컴포넌트를 만듭니다.
export function BookmarkForm() {
  // 3. 3개의 입력값을 관리할 state 변수를 만듭니다.
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [quote, setQuote] = useState('');

  // 4. '생성하기' 버튼을 눌렀을 때 실행될 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지

    // 5. 나중에 여기에 nano banana API 연동 코드가 들어갑니다.
    // 지금은 겉모습만 구현하므로, 입력된 값을 콘솔에 출력만 해봅니다.
    console.log({
      bookTitle,
      bookGenre,
      quote
    });
  };

  return (
    // 6. 폼 UI (Tailwind CSS로 스타일링)
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">

      {/* 책 이름 입력란 */}
      <div className="mb-4">
        <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
          책 이름
        </label>
        <input
          type="text"
          id="bookTitle"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="예) 어린 왕자"
          required
        />
      </div>

      {/* 책 장르 입력란 */}
      <div className="mb-4">
        <label htmlFor="bookGenre" className="block text-sm font-medium text-gray-700 mb-1">
          책 장르
        </label>
        <input
          type="text"
          id="bookGenre"
          value={bookGenre}
          onChange={(e) => setBookGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="예) 소설, 철학"
          required
        />
      </div>

      {/* 기억에 남는 구절 입력란 */}
      <div className="mb-6">
        <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">
          기억에 남는 구절
        </label>
        <textarea
          id="quote"
          rows="4"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="네가 4시에 온다면, 나는 3시부터 행복할 거야."
          required
        />
      </div>

      {/* 생성하기 버튼 */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        책갈피 생성하기
      </button>
    </form>
  );
}
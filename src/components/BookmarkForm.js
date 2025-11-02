// src/components/BookmarkForm.js

"use client";

import { useState } from 'react';

export function BookmarkForm() {
  // 1. 기존 state
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [quote, setQuote] = useState('');

  // 2. API 통신을 위한 state 추가
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // API 결과(텍스트 묘사)를 저장

  // 3. '생성하기' 버튼 클릭 시 실행될 함수 (API 연동 버전)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 새로고침 방지
    
    console.log("handleSubmit 함수 실행됨!"); // 디버깅용 로그

    setIsLoading(true); // 로딩 시작
    setError(null);
    setResult(null);

    try {
      // 4. Flask 백엔드 API(/api/create-bookmark)에 데이터를 보냅니다.
      const response = await fetch('http://localhost:8000/api/create-bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookTitle, bookGenre, quote }),
      });

      if (!response.ok) {
        // 서버가 500 에러 등을 보냈을 때
        throw new Error('서버에서 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // 5. 성공! 백엔드가 보낸 텍스트 묘사를 state에 저장
      setResult(data.description);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    // 6. 폼 UI (form 태그에 onSubmit 연결)
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      
      {/* 책 이름 입력란 */}
      <div className="mb-4">
        <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">책 이름</label>
        <input 
          type="text" 
          id="bookTitle" 
          value={bookTitle} 
          onChange={(e) => setBookTitle(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md" 
          placeholder="예) 어린 왕자" 
          required 
          disabled={isLoading} 
        />
      </div>
      
      {/* 책 장르 입력란 */}
      <div className="mb-4">
        <label htmlFor="bookGenre" className="block text-sm font-medium text-gray-700 mb-1">책 장르</label>
        <input 
          type="text" 
          id="bookGenre" 
          value={bookGenre} 
          onChange={(e) => setBookGenre(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md" 
          placeholder="예) 소설, 철학" 
          required 
          disabled={isLoading} 
        />
      </div>

      {/* 기억에 남는 구절 입력란 */}
      <div className="mb-6">
        <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">기억에 남는 구절</label>
        <textarea 
          id="quote" 
          rows="4" 
          value={quote} 
          onChange={(e) => setQuote(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md" 
          placeholder="가장 중요한 것은 눈에 보이지 않아..." 
          required 
          disabled={isLoading} 
        />
      </div>

      {/* 생성하기 버튼 (로딩 중일 때 비활성화) */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? '생성 중...' : '책갈피 생성하기'}
      </button>

      {/* 7. API 호출 결과 표시 */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <p><strong>오류:</strong> {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border">
          <h3 className="font-bold mb-2">Gemini가 묘사한 책갈피:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </form>
  );
}
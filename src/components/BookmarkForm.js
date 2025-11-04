// src/components/BookmarkForm.js
"use client";

import { useState } from "react";

export function BookmarkForm() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [quote, setQuote] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDescription(null);
    setImageUrl(null);

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      const res = await fetch(`${base}/api/create-bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookTitle, bookGenre, quote }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setDescription(data.description ?? "");
      setImageUrl(data.imageUrl ?? null);
    } catch (err) {
      setError(err.message || "요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      {/* 책 이름 */}
      <div className="mb-4">
        <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
          책 이름
        </label>
        <input
          id="bookTitle"
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="예) 어린 왕자"
          required
        />
      </div>

      {/* 장르 */}
      <div className="mb-4">
        <label htmlFor="bookGenre" className="block text-sm font-medium text-gray-700 mb-1">
          장르
        </label>
        <input
          id="bookGenre"
          type="text"
          value={bookGenre}
          onChange={(e) => setBookGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="예) 동화, 철학, 성장물"
        />
      </div>

      {/* 기억에 남는 구절 */}
      <div className="mb-6">
        <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">
          기억에 남는 구절
        </label>
        <textarea
          id="quote"
          rows={3}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="예) 네가 4시에 온다면, 나는 3시부터 행복할 거야."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "생성 중..." : "책갈피 이미지 생성"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <strong>오류:</strong> {error}
        </div>
      )}

      {description && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border">
          <h3 className="font-bold mb-2">생성 의도(모델 설명):</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-4 p-4 bg-white rounded-md border">
          <h3 className="font-bold mb-3">생성 이미지 미리보기</h3>

          {/* 1:3 프레임로 보이게: 내부 이미지는 cover 크롭 */}
          <div
            className="w-full max-w-xs mx-auto border rounded-md overflow-hidden"
            style={{ aspectRatio: "1 / 3" }}
          >
            <img src={imageUrl} alt="bookmark" className="w-full h-full object-cover" />
          </div>

          <div className="mt-3 flex gap-2">
            <a
              href={imageUrl}
              download="bookmark.png"
              className="px-3 py-2 bg-blue-600 text-white rounded-md"
            >
              다운로드
            </a>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(imageUrl)}
              className="px-3 py-2 border rounded-md"
            >
              이미지 데이터 URL 복사
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

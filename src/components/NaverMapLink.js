"use client";

import Link from 'next/link';
import { useCallback } from 'react';

export function NaverMapLink({ type, id, url, address, children }) {
  const handleClick = useCallback(async () => {
    if (!id || !type) return;

    try {
      const apiBase = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '/api') : '/api';
      const apiPath = type === 'place' ? 'places' : 'spots';
      
      // 비동기로 API 호출 (응답을 기다리지 않고 링크 이동)
      fetch(`${apiBase}/${apiPath}/${id}/naver-map-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).catch(err => {
        console.error('네이버 지도 클릭 횟수 증가 실패:', err);
      });
    } catch (err) {
      console.error('네이버 지도 클릭 횟수 증가 오류:', err);
    }
  }, [type, id]);

  if (!url) return null;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block mt-8"
    >
      {children}
    </Link>
  );
}







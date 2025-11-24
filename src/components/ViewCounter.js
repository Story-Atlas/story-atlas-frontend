// src/components/ViewCounter.js
"use client";

import { useEffect, useState } from 'react';

/**
 * 조회수 증가 및 표시 컴포넌트
 * @param {string} type - 'place', 'event', 'spot'
 * @param {number} id - 항목 ID
 * @param {number} initialViewCount - 초기 조회수 (서버에서 받은 값)
 * @param {boolean} showLabel - 조회수 라벨 표시 여부
 */
export function ViewCounter({ type, id, initialViewCount = 0, showLabel = false }) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 한 번만 조회수 증가
    if (!hasIncremented && id) {
      const apiBase = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '/api') : '/api';
      
      // type에 따라 올바른 API 경로 설정
      const apiPath = type === 'place' ? 'places' : type === 'event' ? 'events' : 'spots';
      
      fetch(`${apiBase}/${apiPath}/${id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(async (res) => {
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            return;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.success && data.view_count !== undefined) {
            setViewCount(data.view_count);
            setHasIncremented(true);
          }
        })
        .catch(err => {
          console.error('조회수 증가 실패:', err);
          // 실패해도 초기값 유지
        });
    }
  }, [type, id, hasIncremented]);

  // 조회수 포맷팅 (1000 이상이면 K로 표시)
  const formatViewCount = (count) => {
    // 안전한 숫자 변환
    const num = typeof count === 'number' && !isNaN(count) && count >= 0 ? count : 0;
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{formatViewCount(viewCount)}</span>
      {showLabel && <span className="ml-1">조회</span>}
    </div>
  );
}







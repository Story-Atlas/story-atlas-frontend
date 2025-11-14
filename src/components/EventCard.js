// src/components/EventCard.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { getGuestUserId } from '@/utils/guestUser';

function CalendarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

// 행사 상태 판단 함수 (날짜 기준)
function getEventStatus(event) {
  if (event.status === -1) {
    return 'ended'; // 종료
  }
  
  if (!event.start_datetime || !event.end_datetime) {
    return 'ongoing'; // 날짜 정보가 없으면 기본값으로 진행 중
  }
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const startDate = new Date(event.start_datetime);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(event.end_datetime);
  endDate.setHours(0, 0, 0, 0);
  
  if (now < startDate) {
    return 'upcoming'; // 진행 예정
  } else if (now >= startDate && now <= endDate) {
    return 'ongoing'; // 진행 중
  } else {
    return 'ended'; // 종료
  }
}

function HeartIcon({ className, filled = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

export function EventCard({ event }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  // 찜 상태 확인
  useEffect(() => {
    const guestUserId = getGuestUserId();
    if (guestUserId) {
      fetch(`${typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '/api') : '/api'}/event-favorite/check?guest_user_id=${guestUserId}&event_id=${event.id}`)
        .then(async (res) => {
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('예상치 못한 응답 형식:', text.substring(0, 100));
            return;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.success) {
            setIsFavorited(data.is_favorited);
          }
        })
        .catch(err => console.error('찜 상태 확인 실패:', err));
    }
  }, [event.id]);

  // 찜 토글
  async function handleFavoriteToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const guestUserId = getGuestUserId();
    if (!guestUserId) {
      alert('익명 사용자 ID를 가져올 수 없습니다.');
      return;
    }

    setIsToggling(true);
    try {
      const apiBase = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '/api') : '/api';
      const res = await fetch(`${apiBase}/event-favorite/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_user_id: guestUserId,
          event_id: event.id
        })
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('예상치 못한 응답 형식:', text.substring(0, 100));
        alert('서버 응답 오류가 발생했습니다.');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setIsFavorited(!isFavorited);
      } else {
        console.error('찜 토글 실패:', data.error);
        alert(data.error || '찜 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('찜 토글 오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsToggling(false);
    }
  }

  // 이미지 URL 처리 (서버와 클라이언트에서 동일한 경로 사용)
  let imageUrl = event.main_image_url || 'https://via.placeholder.com/288x192.png?text=No+Image';
  
  if (imageUrl.startsWith('/home/workspace/story-atlas-backend/media/')) {
    const relativePath = imageUrl.replace('/home/workspace/story-atlas-backend/media/', '');
    imageUrl = `/${relativePath}`;
  } else if (imageUrl.startsWith('/media/')) {
    // 상대 경로 그대로 사용 (서버와 클라이언트 모두 동일)
    imageUrl = imageUrl;
  } else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    // 파일명만 있는 경우 상대 경로로 변환
    imageUrl = `/media/event_poster/${imageUrl}`;
  }
  
  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', { 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const startDate = formatDate(event.start_datetime);
  const endDate = formatDate(event.end_datetime);
  const period = startDate && endDate 
    ? (startDate === endDate ? startDate : `${startDate} ~ ${endDate}`)
    : (startDate || endDate || '');
  
  const headline = event.description?.headline || event.title;
  const eventStatus = getEventStatus(event);
  
  return (
    <div className="group flex-shrink-0 w-72 cursor-pointer">
      <Link
        href={`/events/${event.id}`}
        className="block relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            className="object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
            quality={85}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/288x384.png?text=No+Image';
            }}
          />
          {eventStatus === 'ended' && (
            <>
              {/* 회색 레이어 오버레이 - 색감을 살리면서 회색 톤 추가 */}
              <div className="absolute inset-0 bg-gray-600/50 mix-blend-multiply z-0" />
              {/* 종료 배지 */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
                  종료된 행사
                </Badge>
              </div>
            </>
          )}
          {eventStatus === 'ongoing' && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-[hsl(var(--accent-brown))] text-white px-3 py-1 text-xs shadow-lg">
                진행 중
              </Badge>
            </div>
          )}
          {eventStatus === 'upcoming' && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-blue-500 text-white px-3 py-1 text-xs shadow-lg">
                진행 예정
              </Badge>
            </div>
          )}
          {/* 찜 버튼 */}
          <button
            onClick={handleFavoriteToggle}
            disabled={isToggling}
            className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors disabled:opacity-50"
            title={isFavorited ? "찜 취소" : "찜하기"}
          >
            <HeartIcon className={`w-5 h-5 ${isFavorited ? 'text-rose-500' : 'text-gray-400'}`} filled={isFavorited} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h4 className="mb-2 group-hover:text-[hsl(var(--accent-brown))] transition-colors font-pretendard-bold">
            {event.title}
          </h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {headline}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{period}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}


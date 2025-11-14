// src/components/PlaceCard.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGuestUserId } from '@/utils/guestUser';

function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function HeartIcon({ className, filled = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function ArrowUpIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

export function PlaceCard({ place }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  // places/spots 테이블의 카운트 컬럼 사용 (초기값)
  const [recommendationCount, setRecommendationCount] = useState(place.recommendation_count || 0);
  const [canRecommend, setCanRecommend] = useState(true);
  const [isRecommending, setIsRecommending] = useState(false);
  
  // place 타입 결정 (place.type이 있으면 사용, 없으면 'place'로 가정)
  const placeType = place.type === 'spot' ? 'spot' : 'place';
  const placeId = place.id;

  // 찜 상태 및 공개 추천 상태 확인
  useEffect(() => {
    const guestUserId = getGuestUserId();
    if (guestUserId && placeId) {
      // 찜 상태 확인
      const apiBase = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '/api') : '/api';
      fetch(`${apiBase}/place-favorite/check?guest_user_id=${guestUserId}&place_id=${placeId}&place_type=${placeType}`)
        .then(async (res) => {
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
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
      
      // 공개 추천 상태 확인 (오늘 추천 가능 여부만 확인, 카운트는 places/spots 테이블에서 가져옴)
      fetch(`${apiBase}/place-recommendation/check?guest_user_id=${guestUserId}&place_id=${placeId}&place_type=${placeType}`)
        .then(async (res) => {
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            return;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.success) {
            setCanRecommend(data.can_recommend);
          }
        })
        .catch(err => console.error('공개 추천 상태 확인 실패:', err));
    }
    
    // places/spots 테이블의 recommendation_count가 있으면 사용 (이미 초기값으로 설정됨)
    if (place.recommendation_count !== undefined) {
      setRecommendationCount(place.recommendation_count || 0);
    }
  }, [placeId, placeType]);

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
      const res = await fetch(`${apiBase}/place-favorite/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_user_id: guestUserId,
          place_id: placeId,
          place_type: placeType
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

  // 공개 추천 추가
  async function handleRecommendation(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canRecommend) {
      alert('오늘 이미 추천하셨습니다. 하루에 한 번만 추천할 수 있습니다.');
      return;
    }
    
    const guestUserId = getGuestUserId();
    if (!guestUserId) {
      alert('익명 사용자 ID를 가져올 수 없습니다.');
      return;
    }

    setIsRecommending(true);
    try {
      const res = await fetch(`${apiBase}/place-recommendation/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_user_id: guestUserId,
          place_id: placeId,
          place_type: placeType
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
        // 성공 시 카운트 증가 (places/spots 테이블이 자동 업데이트되므로 +1)
        setRecommendationCount(prev => prev + 1);
        setCanRecommend(false);
      } else {
        console.error('공개 추천 실패:', data.error);
        alert(data.error || '공개 추천에 실패했습니다.');
        if (data.can_recommend === false) {
          setCanRecommend(false);
        }
      }
    } catch (err) {
      console.error('공개 추천 오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsRecommending(false);
    }
  }

  const imageUrl = place.main_photo_url || 'https://via.placeholder.com/288x192.png?text=No+Image';
  const headline = place.summary?.headline || '';
  // 관광지(spot)인 경우 /spots로, 일반 장소(place)인 경우 /places로 링크
  const detailUrl = placeType === 'spot' ? `/spots/${placeId}` : `/places/${placeId}`;

  return (
    <div className="group flex-shrink-0 w-72 cursor-pointer">
      <Link
        href={detailUrl}
        className="block relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            quality={85}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/288x192.png?text=No+Image';
            }}
          />
          {/* 공개 추천 버튼 (왼쪽) */}
          <button
            onClick={handleRecommendation}
            disabled={isRecommending || !canRecommend}
            className="absolute bottom-3 left-3 z-10 flex items-center gap-2 group"
            title={canRecommend ? "공개 추천하기 (하루 한 번)" : "오늘 이미 추천하셨습니다"}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors disabled:opacity-50">
              <ArrowUpIcon className={`w-5 h-5 ${canRecommend ? 'text-blue-500 group-hover:text-blue-600' : 'text-gray-400'}`} />
            </div>
            {recommendationCount > 0 && (
              <span className={`text-sm font-semibold ${canRecommend ? 'text-white drop-shadow-lg' : 'text-white/70'}`}>
                {recommendationCount}
              </span>
            )}
          </button>
          {/* 찜 버튼 (오른쪽) */}
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
          <div className="flex items-start gap-2 mb-2">
            <MapPinIcon className="h-4 w-4 text-[hsl(var(--accent-brown))] mt-1 flex-shrink-0" />
            <h4 className="group-hover:text-[hsl(var(--accent-brown))] transition-colors font-pretendard-bold">
              {place.name}
            </h4>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {headline}
          </p>
        </div>
      </Link>
    </div>
  );
}
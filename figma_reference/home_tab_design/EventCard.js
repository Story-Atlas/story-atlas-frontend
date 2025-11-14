// src/components/EventCard.js
import Link from 'next/link';
import Image from 'next/image';

export function EventCard({ event }) {
  // 이미지 URL 처리 (프론트엔드 public 폴더에서 로드)
  let imageUrl = event.main_image_url || 'https://via.placeholder.com/288x192.png?text=No+Image';
  
  // 서버 파일 경로를 프론트엔드 public 폴더 경로로 변환
  if (imageUrl.startsWith('/home/workspace/story-atlas-backend/media/')) {
    // 절대 경로를 프론트엔드 public 경로로 변환
    const relativePath = imageUrl.replace('/home/workspace/story-atlas-backend/media/', '');
    // Next.js public 폴더는 /로 시작하는 경로로 접근
    imageUrl = `/${relativePath}`;
  } else if (imageUrl.startsWith('/media/')) {
    // 이미 /media/로 시작하는 경우 그대로 사용 (Next.js public 폴더)
    imageUrl = imageUrl;
  } else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    // 파일명만 있는 경우
    imageUrl = `/media/event_poster/${imageUrl}`;
  }
  
  // 날짜 포맷팅 (연도 제거, 더 짧은 형식)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // 연도 없이 월/일만 표시
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
  
  // description에서 headline 추출
  const headline = event.description?.headline || event.title;
  
  // 종료된 이벤트 확인 (status === -1)
  const isEnded = event.status === -1;
  
  return (
    <Link
      href={`/events/${event.id}`}
      className={`block w-72 overflow-hidden shadow-lg transition-transform hover:scale-105 shrink-0 ${isEnded ? 'opacity-75' : ''}`}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative w-full h-80 bg-gray-200">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className={`object-contain ${isEnded ? 'brightness-75' : ''}`}
          loading="lazy"
          quality={85}
        />
        {/* 종료 배지 (우측 상단) */}
        {isEnded && (
          <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg border border-white/20">
            종료
          </div>
        )}
      </div>

      <div className="p-4 select-none">
        <h3 className="font-bold text-lg mb-1 truncate">{event.title}</h3>
        <p className="text-gray-600 text-sm truncate h-6 mb-2">
          {headline}
        </p>
        <div className="text-sm text-gray-600 flex items-center gap-2 font-medium whitespace-nowrap overflow-hidden">
          {startDate && endDate && startDate === endDate ? (
            <span className="truncate">{startDate}</span>
          ) : (
            <span className="truncate">{startDate} ~ {endDate}</span>
          )}
          {isEnded && (
            <span className="text-gray-400 text-xs flex-shrink-0">• 종료</span>
          )}
        </div>
      </div>
    </Link>
  );
}


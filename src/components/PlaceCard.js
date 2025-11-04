// src/components/PlaceCard.js
import Link from 'next/link';

export function PlaceCard({ place }) {
  const imageUrl = place.main_photo_url || 'https://via.placeholder.com/288x192.png?text=No+Image';

  return (
    <Link
      href={`/places/${place.id}`}
      className="block w-72 overflow-hidden shadow-lg transition-transform hover:scale-105 shrink-0"
      
      // 👇 [수정] 이 한 줄을 추가하여 '링크 주소 끌기'를 방지합니다.
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover"
          draggable="false" // 이미지 드래그 방지 (유지)
        />
      </div>

      <div className="p-4 select-none"> {/* 텍스트 선택 방지 (유지) */}
        <h3 className="font-bold text-lg mb-1 truncate">{place.name}</h3>
        <p className="text-gray-600 text-sm truncate h-6">
          {place.summary?.headline || ' '}
        </p>
      </div>
    </Link>
  );
}
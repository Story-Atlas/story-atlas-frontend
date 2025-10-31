// src/components/PlaceCard.js

// "use client"; // useState나 이벤트 핸들러가 없다면 필요 없을 수 있습니다.
// import Image from 'next/image'; // Image 컴포넌트 더 이상 사용 안 함
import Link from 'next/link';

export function PlaceCard({ place }) {
  return (
    <Link 
      href={`/places/${place.id}`} 
      className="block w-60 rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform hover:scale-105 shrink-0"
    >
      {/* 이미지 대신 배경색 div */}
      <div 
        className="relative w-full h-40 flex items-center justify-center text-white text-xl font-bold"
        style={{ backgroundColor: place.color || '#cccccc' }} // place.color가 없으면 회색
      >
        {/* 임시로 카드 내용을 중앙에 표시 */}
        <span className="p-2 bg-black bg-opacity-30 rounded-md">{place.name}</span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{place.name}</h3>
        <p className="text-gray-600 text-sm truncate">{place.location}</p>
      </div>
    </Link>
  );
}
// src/components/PlaceCard.js
import Link from 'next/link';

export function PlaceCard({ place }) {
  // DB에 main_photo_url이 없거나 비어있을 경우를 대비한 기본 이미지
  const imageUrl = place.main_photo_url || 'https://via.placeholder.com/240x160.png?text=No+Image';

  return (
    <Link
      href={`/places/${place.id}`}
      className="block w-60 overflow-hidden shadow-lg  transition-transform hover:scale-105 shrink-0"
    >
      {/* DB의 main_photo_url을 사용하도록 <img> 태그로 변경 */}
      <div className="relative w-full h-40 bg-gray-200">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover" // 이미지가 꽉 차도록
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{place.name}</h3>
        {/* DB의 address를 사용하도록 변경 */}
        <p className="text-gray-600 text-sm truncate">{place.address}</p>
      </div>
    </Link>
  );
}
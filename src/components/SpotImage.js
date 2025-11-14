"use client";

// 백엔드에서 제공하는 image_url 사용, 없으면 기본값 반환
function getSpotImageUrl(spot) {
  if (spot?.image_url) {
    return spot.image_url;
  }
  return 'https://via.placeholder.com/1000x500.png?text=No+Image';
}

export function SpotImage({ spot }) {
  const imageUrl = getSpotImageUrl(spot);

  return (
    <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gray-200 relative">
      <img 
        src={imageUrl} 
        alt={spot?.name || 'Spot image'}
        className="w-full h-full object-cover"
        onError={(e) => {
          // 이미지 로드 실패 시 placeholder 표시
          e.target.src = 'https://via.placeholder.com/1000x500.png?text=No+Image';
        }}
      />
    </div>
  );
}


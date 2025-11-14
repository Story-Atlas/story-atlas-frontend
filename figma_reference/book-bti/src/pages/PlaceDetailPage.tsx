import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    // Mock data - would be API call in real app
    const mockPlaces: any = {
      '1': {
        id: '1',
        name: '북카페 지혜의숲',
        headline: '책과 커피가 만나는 아늑한 공간',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
        address: '경기도 파주시 회동길 125',
        naverMapUrl: 'https://map.naver.com/p/search/파주%20출판단지',
        paragraph1: '북카페 지혜의숲은 파주 출판단지 중심부에 위치한 아늑한 북카페입니다. 천장까지 닿는 높은 책장에는 다양한 장르의 책들이 빼곡히 꽂혀 있어, 마치 작은 도서관에 온 듯한 느낌을 받으실 수 있습니다.',
        paragraph2: '신선한 원두로 내린 커피와 함께 책을 읽는 시간은 그 자체로 힐링이 됩니다. 창가 자리에 앉아 햇살을 받으며 책장을 넘기는 여유로운 오후를 경험해보세요.',
        paragraph3: '주말에는 작은 북토크 이벤트도 진행되며, 책을 사랑하는 사람들이 모여 이야기를 나누는 공간으로도 활용됩니다.',
      },
      '2': {
        id: '2',
        name: '카페 페이지터너',
        headline: '한 페이지 한 페이지, 시간이 멈추는 곳',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800',
        address: '경기도 파주시 회동길 145-15',
        naverMapUrl: 'https://map.naver.com/p/search/파주%20출판단지',
        paragraph1: '카페 페이지터너는 독특한 인테리어로 유명한 북카페입니다. 빈티지한 가구와 따뜻한 조명이 어우러져 책에 집중할 수 있는 완벽한 분위기를 자아냅니다.',
        paragraph2: '엄선된 수제 디저트와 음료 메뉴는 책 읽기에 최적화되어 있습니다. 특히 시그니처 메뉴인 "페이지터너 라떼"는 부드러운 맛으로 많은 사랑을 받고 있습니다.',
        paragraph3: '2층에는 개인 독서실 공간도 마련되어 있어, 조용히 집중하여 책을 읽고 싶은 분들께 추천합니다.',
      },
      '3': {
        id: '3',
        name: '브런치 하우스',
        headline: '여유로운 브런치를 즐기세요',
        imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
        address: '경기도 파주시 문발로 200',
        naverMapUrl: 'https://map.naver.com/p/search/파주%20출판단지',
        paragraph1: '브런치 하우스는 주말 아침을 특별하게 만들어주는 곳입니다. 신선한 재료로 만든 다양한 브런치 메뉴를 제공합니다.',
        paragraph2: '넓은 창을 통해 들어오는 햇살과 함께 즐기는 브런치는 하루를 기분 좋게 시작하게 해줍니다.',
        paragraph3: '주말에는 사전 예약을 권장하며, 평일 오전에는 비교적 여유롭게 방문하실 수 있습니다.',
      },
      '4': {
        id: '4',
        name: '가든 카페',
        headline: '자연 속에서 즐기는 커피',
        imageUrl: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800',
        address: '경기도 파주시 회동길 330',
        naverMapUrl: 'https://map.naver.com/p/search/파주%20출판단지',
        paragraph1: '가든 카페는 넓은 정원을 갖춘 야외 카페입니다. 봄에는 꽃이 만발하고, 여름에는 시원한 그늘을 제공합니다.',
        paragraph2: '반려동물과 함께 방문할 수 있어 가족 단위 방문객들에게 인기가 많습니다.',
        paragraph3: '날씨 좋은 날에는 야외 테라스에서 여유로운 시간을 보내보세요.',
      },
    };

    setPlace(mockPlaces[id || '1']);
  }, [id]);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/places')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Button>

        {/* Image */}
        <div className="relative mb-8 h-80 sm:h-96 md:h-[500px] bg-gray-200 overflow-hidden">
          <ImageWithFallback
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="font-extrabold font-title">{place.name}</h1>

          {/* Headline */}
          {place.headline && (
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="font-title">{place.headline}</h2>
            </div>
          )}

          {/* Paragraphs */}
          {place.paragraph1 && (
            <p className="leading-relaxed">{place.paragraph1}</p>
          )}
          {place.paragraph2 && (
            <p className="leading-relaxed mt-6">{place.paragraph2}</p>
          )}
          {place.paragraph3 && (
            <p className="leading-relaxed mt-6">{place.paragraph3}</p>
          )}

          {/* Naver Map Link Card */}
          {(place.address || place.naverMapUrl) && (
            <a
              href={place.naverMapUrl || 'https://map.naver.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-8"
            >
              <div className="bg-gradient-to-br from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown))]/80 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-2 flex items-center gap-2">
                        찾아오시는 길
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </h3>
                      {place.address && (
                        <p className="text-white/90">{place.address}</p>
                      )}
                      <p className="text-white/70 mt-2">
                        네이버 지도에서 위치 확인하기
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <span className="text-white">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function SpotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<any>(null);

  useEffect(() => {
    // Mock data - would be API call in real app
    const mockSpots: any = {
      '1': {
        id: '1',
        name: '열화당 책박물관',
        imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
        description: '열화당 책박물관은 책의 역사와 문화를 깊이 있게 경험할 수 있는 특별한 공간입니다. 1970년대부터 현재까지의 출판 역사를 한눈에 볼 수 있는 전시물들이 가득합니다.',
        info: {
          address: '경기도 파주시 회동길 145',
          hours: '평일 10:00 - 18:00, 주말 10:00 - 17:00',
          closed: '매주 월요일',
          admission: '무료',
          parking: '주차 가능',
        },
        naverMapUrl: 'https://map.naver.com/p/search/열화당%20책박물관',
        paragraph1: '한국 출판의 산 역사를 담고 있는 열화당 책박물관은 1976년 설립된 이래 한국 예술 출판의 중심에 서 있었습니다.',
        paragraph2: '박물관 내부에는 희귀 도서와 고서적, 그리고 출판 관련 각종 도구와 자료들이 전시되어 있습니다.',
        paragraph3: '정기적으로 특별 전시와 강연도 진행되니 홈페이지를 확인하시고 방문하시기 바랍니다.',
      },
      '2': {
        id: '2',
        name: '미메시스 아트 뮤지엄',
        imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800',
        description: '건축과 예술이 어우러진 문화공간으로, 알바루 시자가 설계한 독특한 건축물로 유명합니다.',
        info: {
          address: '경기도 파주시 문발로 253',
          hours: '10:00 - 18:00',
          closed: '매주 월요일',
          admission: '성인 5,000원, 학생 3,000원',
          parking: '주차 가능',
        },
        naverMapUrl: 'https://map.naver.com/p/search/미메시스%20아트%20뮤지엄',
        paragraph1: '포르투갈의 건축 거장 알바루 시자가 설계한 미메시스 아트 뮤지엄은 건축물 자체가 하나의 예술작품입니다.',
        paragraph2: '현대미술 전시를 중심으로 다양한 문화 프로그램을 운영하고 있으며, 특히 건축에 관심 있는 분들에게 큰 영감을 줍니다.',
        paragraph3: '1층 서점과 카페도 운영하고 있어, 전시 관람 후 여유로운 시간을 보낼 수 있습니다.',
      },
    };

    setSpot(mockSpots[id || '1']);
  }, [id]);

  if (!spot) {
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
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Button>

        {/* Image */}
        <div className="relative mb-8 h-80 sm:h-96 md:h-[500px] bg-gray-200 overflow-hidden">
          <ImageWithFallback
            src={spot.imageUrl}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="font-extrabold font-title mb-8">{spot.name}</h1>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="description">설명</TabsTrigger>
            <TabsTrigger value="info">정보</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            {spot.description && (
              <p className="leading-relaxed">{spot.description}</p>
            )}
            {spot.paragraph1 && (
              <p className="leading-relaxed">{spot.paragraph1}</p>
            )}
            {spot.paragraph2 && (
              <p className="leading-relaxed mt-6">{spot.paragraph2}</p>
            )}
            {spot.paragraph3 && (
              <p className="leading-relaxed mt-6">{spot.paragraph3}</p>
            )}
          </TabsContent>

          <TabsContent value="info">
            {spot.info && (
              <>
                <div className="space-y-4 mb-6">
                  {spot.info.address && (
                    <div>
                      <h3 className="mb-2">📍 주소</h3>
                      <p className="text-gray-600">{spot.info.address}</p>
                    </div>
                  )}
                  {spot.info.hours && (
                    <div>
                      <h3 className="mb-2">🕐 운영시간</h3>
                      <p className="text-gray-600">{spot.info.hours}</p>
                    </div>
                  )}
                  {spot.info.closed && (
                    <div>
                      <h3 className="mb-2">🚫 휴무일</h3>
                      <p className="text-gray-600">{spot.info.closed}</p>
                    </div>
                  )}
                  {spot.info.admission && (
                    <div>
                      <h3 className="mb-2">💳 입장료</h3>
                      <p className="text-gray-600">{spot.info.admission}</p>
                    </div>
                  )}
                  {spot.info.parking && (
                    <div>
                      <h3 className="mb-2">🚗 주차</h3>
                      <p className="text-gray-600">{spot.info.parking}</p>
                    </div>
                  )}
                </div>

                {/* Naver Map Link Card */}
                {spot.naverMapUrl && (
                  <a
                    href={spot.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
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
                            {spot.info.address && (
                              <p className="text-white/90">{spot.info.address}</p>
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
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

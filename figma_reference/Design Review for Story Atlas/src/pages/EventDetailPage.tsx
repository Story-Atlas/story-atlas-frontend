import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    // Mock data - would be API call in real app
    const mockEvents: any = {
      '1': {
        id: '1',
        name: '파주 북 페스티벌 2025',
        headline: '책과 문화가 어우러지는 축제',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
        startDate: '2025-05-15',
        endDate: '2025-05-17',
        status: 1,
        place: '파주 출판단지 중앙광장',
        host: '파주시청 문화과',
        paragraph1: '파주 북 페스티벌은 매년 봄 파주 출판단지에서 열리는 대한민국 최대 규모의 책 축제입니다. 수많은 출판사와 작가들이 참여하여 독자들과 직접 소통하는 특별한 자리를 마련합니다.',
        paragraph2: '다양한 프로그램이 준비되어 있습니다. 작가 사인회, 북토크, 어린이 독서 프로그램, 독립 출판 부스 등 책을 사랑하는 모든 이들을 위한 프로그램이 가득합니다.',
        paragraph3: '가족, 연인, 친구와 함께 책의 향기 가득한 파주 출판단지에서 특별한 추억을 만들어보세요. 입장료는 무료이며, 주차장도 무료로 이용하실 수 있습니다.',
      },
      '2': {
        id: '2',
        name: '작가와의 만남',
        headline: '베스트셀러 작가와 함께하는 특별한 시간',
        imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
        startDate: '2025-06-10',
        endDate: '2025-06-10',
        status: 1,
        place: '열화당 책박물관',
        host: '열화당',
        paragraph1: '이번 달의 작가와의 만남에서는 베스트셀러 작가 김작가를 모시고 특별한 북토크를 진행합니다.',
        paragraph2: '작가의 창작 과정, 영감의 원천, 그리고 독자들과의 소통에 대한 이야기를 들어보실 수 있습니다.',
        paragraph3: '사전 예약제로 운영되며, 선착순 50명에게 작가의 친필 사인본을 증정합니다.',
      },
      '3': {
        id: '3',
        name: '독립출판 전시회',
        headline: '독립 출판의 다양한 세계를 경험하세요',
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        status: -1,
        place: '파주 출판단지 갤러리',
        host: '독립출판협회',
        paragraph1: '독립출판의 새로운 물결을 경험할 수 있는 특별한 전시회가 한 달간 진행되었습니다.',
        paragraph2: '50여 개의 독립출판사가 참여하여 각자의 독특한 작품들을 선보였습니다.',
        paragraph3: '전시는 성황리에 종료되었으며, 많은 관람객들의 사랑을 받았습니다.',
      },
      '4': {
        id: '4',
        name: '어린이 책 축제',
        headline: '아이들과 함께하는 특별한 문화 행사',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        startDate: '2025-07-20',
        endDate: '2025-07-22',
        status: 1,
        place: '파주 어린이 도서관',
        host: '파주시 교육청',
        paragraph1: '여름방학을 맞이하여 어린이들을 위한 특별한 책 축제를 준비했습니다.',
        paragraph2: '동화 구연, 그림책 만들기, 작가와의 만남 등 다양한 프로그램이 준비되어 있습니다.',
        paragraph3: '아이들의 상상력과 창의력을 키울 수 있는 즐거운 시간이 될 것입니다.',
      },
    };

    setEvent(mockEvents[id || '1']);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  const isEnded = event.status === -1;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/events')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Button>

        {/* Image */}
        <div className="relative mb-8 h-80 sm:h-96 md:h-[500px] bg-gray-100 overflow-hidden">
          <ImageWithFallback
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-contain"
          />
          {isEnded && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white">종료</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="font-extrabold font-title">{event.name}</h1>

          {/* Date and Info */}
          <div className="space-y-2 text-gray-600">
            <p>
              📅 {event.startDate === event.endDate 
                ? event.startDate 
                : `${event.startDate} ~ ${event.endDate}`}
            </p>
            {event.place && <p>📍 {event.place}</p>}
            {event.host && <p>🏢 {event.host}</p>}
          </div>

          {/* Headline */}
          {event.headline && (
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="font-title">{event.headline}</h2>
            </div>
          )}

          {/* Paragraphs */}
          {event.paragraph1 && (
            <p className="leading-relaxed">{event.paragraph1}</p>
          )}
          {event.paragraph2 && (
            <p className="leading-relaxed mt-6">{event.paragraph2}</p>
          )}
          {event.paragraph3 && (
            <p className="leading-relaxed mt-6">{event.paragraph3}</p>
          )}
        </div>
      </div>
    </div>
  );
}

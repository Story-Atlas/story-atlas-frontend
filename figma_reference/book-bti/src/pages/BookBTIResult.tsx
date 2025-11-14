import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, RotateCcw } from 'lucide-react';
import { BookBTITypeCard } from '../components/BookBTITypeCard';
import { BookBTIPlaceCard } from '../components/BookBTIPlaceCard';
import { Button } from '../components/ui/button';

interface TypeData {
  catchphrase: string;
  description: string;
  backgroundColor: string;
  places: {
    name: string;
    image: string;
    reason: string;
    tags: string[];
  }[];
}

const typeDataMap: Record<string, TypeData> = {
  ISTJ: {
    catchphrase: '조용한 도서관의 사색가',
    description: '조용한 곳에서 지식을 탐구할 때 가장 큰 에너지를 얻습니다. 화려함보다 실속을 중시하는 당신에게 파주 출판단지는 지적 호기심을 채울 완벽한 놀이터입니다.',
    backgroundColor: 'bg-gradient-to-br from-slate-100 to-stone-200',
    places: [
      {
        name: '지혜의숲 3관',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
        reason: '실용적 지식을 체계적으로 탐구할 수 있는 당신만의 조용한 공간',
        tags: ['#조용함', '#실용서', '#깊은사색'],
      },
      {
        name: '활판공방',
        image: 'https://images.unsplash.com/photo-1577699261926-3c6c7f0b3c3e?w=800&q=80',
        reason: '전통적 가치와 장인정신이 살아있는 역사적 공간',
        tags: ['#전통', '#체험', '#역사'],
      },
    ],
  },
  ISFJ: {
    catchphrase: '아늑한 서재의 수호자',
    description: '조용하고 따뜻한 공간에서 감성적 위로를 찾습니다. 세심하고 배려심 깊은 당신을 위한 아늑한 장소들이 준비되어 있습니다.',
    backgroundColor: 'bg-gradient-to-br from-rose-100 to-pink-200',
    places: [
      {
        name: '숲속작은책방',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
        reason: '따뜻한 감성과 위로가 가득한 아늑한 독립서점',
        tags: ['#아늑함', '#감성', '#위로'],
      },
      {
        name: '북카페 시간여행',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
        reason: '조용히 책을 읽으며 마음의 안식을 얻을 수 있는 공간',
        tags: ['#카페', '#휴식', '#평온'],
      },
    ],
  },
  INFJ: {
    catchphrase: '상상의 갤러리 큐레이터',
    description: '깊은 사색과 예술적 영감이 만나는 곳을 찾습니다. 이상적이고 창의적인 당신을 위한 특별한 공간들입니다.',
    backgroundColor: 'bg-gradient-to-br from-purple-100 to-indigo-200',
    places: [
      {
        name: '아트북 갤러리',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80',
        reason: '예술과 인문학이 어우러진 영감의 공간',
        tags: ['#예술', '#감성', '#영감'],
      },
      {
        name: '시인의 서재',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
        reason: '깊은 사색과 창작의 영감을 주는 조용한 공간',
        tags: ['#문학', '#사색', '#창작'],
      },
    ],
  },
  INTJ: {
    catchphrase: '지식의 건축가',
    description: '체계적이고 전문적인 지식을 추구합니다. 독립적이고 전략적인 사고를 즐기는 당신을 위한 완벽한 학습 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-indigo-100 to-blue-200',
    places: [
      {
        name: '지혜의숲 1관',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
        reason: '전문 서적과 학술 자료가 가득한 지적 탐구의 성지',
        tags: ['#전문서적', '#연구', '#학술'],
      },
      {
        name: '건축도서관',
        image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        reason: '체계적 사고와 전략적 학습을 위한 전문 공간',
        tags: ['#건축', '#디자인', '#전문성'],
      },
    ],
  },
  ISTP: {
    catchphrase: '실용의 탐험가',
    description: '실제적이고 즉각적인 경험을 중시합니다. 손으로 직접 만지고 체험할 수 있는 공간을 선호하는 당신을 위한 장소입니다.',
    backgroundColor: 'bg-gradient-to-br from-teal-100 to-cyan-200',
    places: [
      {
        name: '공예 북스토어',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
        reason: '실용적 기술서와 DIY 자료가 가득한 실험적 공간',
        tags: ['#실용', '#공예', '#DIY'],
      },
      {
        name: '메이커스페이스',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
        reason: '직접 만들고 실험하며 배울 수 있는 창작 공간',
        tags: ['#메이커', '#체험', '#창작'],
      },
    ],
  },
  ISFP: {
    catchphrase: '감성의 예술가',
    description: '아름다움과 감성을 추구하며 자유로운 탐험을 즐깁니다. 예술적 영감과 평화로운 휴식이 공존하는 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-rose-200',
    places: [
      {
        name: '일러스트 북카페',
        image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80',
        reason: '예술적 감성과 따뜻한 위로를 동시에 느낄 수 있는 공간',
        tags: ['#일러스트', '#감성', '#예술'],
      },
      {
        name: '정원 도서관',
        image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=80',
        reason: '자연과 책이 어우러진 평화로운 휴식 공간',
        tags: ['#자연', '#힐링', '#평화'],
      },
    ],
  },
  INFP: {
    catchphrase: '몽환적 이야기꾼',
    description: '상상력이 풍부하고 이상적인 세계를 꿈꿉니다. 감성적이고 창의적인 당신을 위한 판타지 같은 공간들입니다.',
    backgroundColor: 'bg-gradient-to-br from-lavender-100 to-purple-200',
    places: [
      {
        name: '판타지 서점',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
        reason: '상상력을 자극하는 판타지와 문학의 세계',
        tags: ['#판타지', '#문학', '#상상력'],
      },
      {
        name: '비밀의 독서실',
        image: 'https://images.unsplash.com/photo-1521587765099-8835e7201186?w=800&q=80',
        reason: '혼자만의 사색과 몽상에 잠길 수 있는 아늑한 공간',
        tags: ['#사색', '#몽상', '#고요'],
      },
    ],
  },
  INTP: {
    catchphrase: '논리의 탐구자',
    description: '복잡한 이론과 새로운 아이디어를 탐구하는 것을 즐깁니다. 분석적이고 창의적인 사고를 위한 지적 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-indigo-200',
    places: [
      {
        name: '과학도서관',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
        reason: '이론과 논리를 탐구할 수 있는 전문 학술 공간',
        tags: ['#과학', '#논리', '#이론'],
      },
      {
        name: '철학 서점',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80',
        reason: '깊은 사고와 창의적 아이디어를 위한 사색의 공간',
        tags: ['#철학', '#사고', '#탐구'],
      },
    ],
  },
  ESTP: {
    catchphrase: '활동적인 모험가',
    description: '활기차고 즉흥적인 경험을 추구합니다. 역동적이고 다양한 자극이 있는 생동감 넘치는 공간을 선호합니다.',
    backgroundColor: 'bg-gradient-to-br from-orange-100 to-amber-200',
    places: [
      {
        name: '팝업 북스토어',
        image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=800&q=80',
        reason: '트렌디하고 역동적인 새로운 경험의 공간',
        tags: ['#트렌드', '#활기', '#새로움'],
      },
      {
        name: '북 페스티벌 광장',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        reason: '다양한 이벤트와 사람들로 북적이는 활기찬 공간',
        tags: ['#축제', '#이벤트', '#사교'],
      },
    ],
  },
  ESFP: {
    catchphrase: '즐거운 엔터테이너',
    description: '즐겁고 따뜻한 분위기를 사랑합니다. 사람들과 교류하며 감성적 경험을 즐기는 당신을 위한 활기찬 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-yellow-100 to-orange-200',
    places: [
      {
        name: '북 카페 라운지',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        reason: '사람들과 어울리며 즐거운 시간을 보낼 수 있는 활기찬 공간',
        tags: ['#사교', '#즐거움', '#활기'],
      },
      {
        name: '토크 콘서트홀',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
        reason: '작가와의 만남, 북토크 등 생동감 넘치는 문화 이벤트 공간',
        tags: ['#북토크', '#만남', '#문화'],
      },
    ],
  },
  ENFP: {
    catchphrase: '열정적인 꿈꾸는 자',
    description: '창의적이고 열정적으로 새로운 가능성을 탐색합니다. 영감과 자유로움이 가득한 역동적인 공간을 좋아합니다.',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-yellow-200',
    places: [
      {
        name: '크리에이터 북샵',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
        reason: '창의성과 영감이 폭발하는 독립 출판물의 세계',
        tags: ['#창작', '#영감', '#독립출판'],
      },
      {
        name: '복합문화공간',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
        reason: '다양한 문화와 아이디어가 교류하는 열린 공간',
        tags: ['#다양성', '#교류', '#문화'],
      },
    ],
  },
  ENTP: {
    catchphrase: '논쟁적인 혁신가',
    description: '새로운 아이디어와 지적 토론을 즐깁니다. 창의적 사고와 혁신적 발상을 위한 자극적인 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-violet-100 to-blue-200',
    places: [
      {
        name: '디베이트 라운지',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
        reason: '지적 토론과 아이디어 교환이 활발한 역동적 공간',
        tags: ['#토론', '#아이디어', '#혁신'],
      },
      {
        name: '이노베이션 허브',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        reason: '최신 트렌드와 혁신적 사고가 만나는 공간',
        tags: ['#혁신', '#트렌드', '#창의'],
      },
    ],
  },
  ESTJ: {
    catchphrase: '체계적인 지휘자',
    description: '효율적이고 조직적인 환경을 선호합니다. 실용적 지식을 체계적으로 습득할 수 있는 완벽한 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-slate-200',
    places: [
      {
        name: '비즈니스 서점',
        image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=800&q=80',
        reason: '실용적이고 체계적인 경영/자기계발 도서 전문관',
        tags: ['#경영', '#실용', '#체계'],
      },
      {
        name: '세미나실',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        reason: '효율적인 학습과 네트워킹을 위한 전문 공간',
        tags: ['#세미나', '#학습', '#네트워킹'],
      },
    ],
  },
  ESFJ: {
    catchphrase: '따뜻한 커뮤니티 리더',
    description: '사람들과 함께하며 따뜻한 분위기를 만듭니다. 소통과 교류가 활발한 아늑한 공간을 선호합니다.',
    backgroundColor: 'bg-gradient-to-br from-rose-100 to-amber-200',
    places: [
      {
        name: '커뮤니티 북카페',
        image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80',
        reason: '따뜻한 교류와 소통이 있는 친근한 공간',
        tags: ['#커뮤니티', '#소통', '#친근'],
      },
      {
        name: '북클럽 라운지',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
        reason: '독서 모임과 함께 나누는 감성적 경험의 공간',
        tags: ['#독서모임', '#나눔', '#감성'],
      },
    ],
  },
  ENFJ: {
    catchphrase: '영감을 주는 멘토',
    description: '타인에게 영감을 주고 함께 성장하기를 원합니다. 소통과 교육이 이루어지는 따뜻하고 의미 있는 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-emerald-100 to-teal-200',
    places: [
      {
        name: '인문학 강연장',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
        reason: '의미 있는 지식을 나누고 영감을 전하는 공간',
        tags: ['#강연', '#영감', '#인문학'],
      },
      {
        name: '멘토링 카페',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
        reason: '따뜻한 대화와 성장이 이루어지는 소통의 공간',
        tags: ['#멘토링', '#성장', '#소통'],
      },
    ],
  },
  ENTJ: {
    catchphrase: '전략적인 리더',
    description: '목표 지향적이고 효율적인 학습을 추구합니다. 리더십과 전문성을 키울 수 있는 체계적인 공간입니다.',
    backgroundColor: 'bg-gradient-to-br from-amber-100 to-red-200',
    places: [
      {
        name: '리더십 도서관',
        image: 'https://images.unsplash.com/photo-1510531704581-5b2870972060?w=800&q=80',
        reason: '전략적 사고와 리더십을 키우는 전문 서적 공간',
        tags: ['#리더십', '#전략', '#경영'],
      },
      {
        name: '컨퍼런스홀',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        reason: '글로벌 트렌드와 비즈니스 인사이트를 얻는 공간',
        tags: ['#컨퍼런스', '#비즈니스', '#글로벌'],
      },
    ],
  },
};

export function BookBTIResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState<string>('');

  useEffect(() => {
    const resultType = location.state?.type;
    if (!resultType) {
      navigate('/book-bti');
      return;
    }
    setType(resultType);
  }, [location.state, navigate]);

  if (!type) return null;

  const data = typeDataMap[type] || typeDataMap['INFP'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `나의 Book-BTI: ${type}`,
        text: `나는 ${data.catchphrase}입니다!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Type Card */}
          <div className="mb-12">
            <BookBTITypeCard
              type={type}
              catchphrase={data.catchphrase}
              description={data.description}
              backgroundColor={data.backgroundColor}
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <Button
              onClick={handleShare}
              variant="outline"
              className="rounded-full border-gray-300 hover:bg-white/80"
            >
              <Share2 className="w-4 h-4 mr-2" />
              공유하기
            </Button>
            <Button
              onClick={() => navigate('/book-bti/quiz')}
              variant="outline"
              className="rounded-full border-gray-300 hover:bg-white/80"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              다시하기
            </Button>
          </div>

          {/* Recommended Places */}
          <div>
            <h2 className="text-3xl text-center mb-8 text-gray-800">
              이런 장소는 어떠세요?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.places.map((place, index) => (
                <BookBTIPlaceCard
                  key={index}
                  name={place.name}
                  image={place.image}
                  reason={place.reason}
                  tags={place.tags}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => navigate('/places')}
              className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              모든 장소 둘러보기
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

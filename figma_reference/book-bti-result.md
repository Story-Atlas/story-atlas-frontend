# 북BTI 결과 화면 페이지 코드

## 파일 위치
`/home/story-atlas/frontend/src/app/book-bti/result/page.js`

## 전체 코드

```jsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { PlaceCard } from '@/components/PlaceCard';
import { SpotCard } from '@/components/SpotCard';
import Link from 'next/link';

const API_BASE = 'http://localhost:8000/api';

// 임시 데이터 (API 연동 전)
const typeDataMap = {
  INTJ: {
    bti_name: '전략적인 서재의 설계자',
    bti_description: '명확한 지적 목적을 가지고 독립적인 공간에서 깊이 있는 영감을 찾는 완벽주의 전략가입니다.',
    backgroundColor: 'bg-gradient-to-br from-indigo-100 to-blue-200',
  },
  INTP: {
    bti_name: '호기심 많은 아이디어 탐험가',
    bti_description: '논리적인 사색과 우연한 발견을 즐기며, 자신만의 속도로 지적 유희를 탐구하는 아이디어 수집가입니다.',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-indigo-200',
  },
  ENTJ: {
    bti_name: '효율적인 지식의 지휘자',
    bti_description: '명확한 목표를 가지고 사람들과의 교류 속에서 지식과 성과를 얻어 가는 효율적인 리더입니다.',
    backgroundColor: 'bg-gradient-to-br from-amber-100 to-red-200',
  },
  ENTP: {
    bti_name: '재치 있는 아이디어 토론가',
    bti_description: '새로운 가능성과 지적 논쟁을 찾아다니며, 활기찬 토론 속에서 영감을 얻는 탐험가입니다.',
    backgroundColor: 'bg-gradient-to-br from-violet-100 to-blue-200',
  },
  INFJ: {
    bti_name: '깊이 있는 서재의 예언자',
    bti_description: '조용한 공간에서 책 속의 인물과 교감하며, 깊이 있는 통찰과 따뜻한 위로를 얻는 이상주의자입니다.',
    backgroundColor: 'bg-gradient-to-br from-purple-100 to-indigo-200',
  },
  INFP: {
    bti_name: '몽상적인 숲속의 낭만가',
    bti_description: '자신만의 상상과 감성의 세계에 빠져들길 원하며, 우연히 발견한 아름다움 속에서 위로를 받는 낭만가입니다.',
    backgroundColor: 'bg-gradient-to-br from-lavender-100 to-purple-200',
  },
  ENFJ: {
    bti_name: '따뜻한 광장의 연설가',
    bti_description: '사람들과의 긍정적인 교류를 통해 감성적인 공간에서 의미 있는 대화를 계획하는 리더입니다.',
    backgroundColor: 'bg-gradient-to-br from-emerald-100 to-teal-200',
  },
  ENFP: {
    bti_name: '호기심 많은 골목의 탐험가',
    bti_description: '새로운 사람과 장소에서 만나는 \'뜻밖의 즐거움\'을 사랑하며, 감성적인 영감을 찾아 자유롭게 떠도는 활동가입니다.',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-yellow-200',
  },
  ISTJ: {
    bti_name: '꼼꼼한 서고의 사서',
    bti_description: '조용한 공간에서 실용적인 지식과 검증된 역사를 계획적으로 탐구하는 현실주의자입니다.',
    backgroundColor: 'bg-gradient-to-br from-slate-100 to-stone-200',
  },
  ISFJ: {
    bti_name: '따뜻한 책방의 보호자',
    bti_description: '조용한 공간에서 과거의 따뜻한 추억과 감성을 느끼길 원하며, 안정감을 찾는 헌신적인 관리자입니다.',
    backgroundColor: 'bg-gradient-to-br from-rose-100 to-pink-200',
  },
  ESTJ: {
    bti_name: '실용적인 서점의 경영자',
    bti_description: '활기찬 공간에서 검증된 지식과 실용적인 성과를 명확한 계획하에 얻고자 하는 경영자입니다.',
    backgroundColor: 'bg-gradient-to-br from-blue-100 to-slate-200',
  },
  ESFJ: {
    bti_name: '친절한 북클럽의 주최자',
    bti_description: '활기찬 공간에서 현실적인 즐거움과 감성을 나누기를 좋아하는 사교적인 주최자입니다.',
    backgroundColor: 'bg-gradient-to-br from-rose-100 to-amber-200',
  },
  ISTP: {
    bti_name: '냉철한 공방의 장인',
    bti_description: '조용한 공간에서 도구와 기술을 다루며 현실적인 문제를 해결하고 자유롭게 탐구하는 것을 즐기는 장인입니다.',
    backgroundColor: 'bg-gradient-to-br from-teal-100 to-cyan-200',
  },
  ISFP: {
    bti_name: '감각적인 골목의 예술가',
    bti_description: '조용하고 감각적인 공간에서, 오감을 만족시키는 아름다움을 찾아 자유롭게 거니는 예술가입니다.',
    backgroundColor: 'bg-gradient-to-br from-pink-100 to-rose-200',
  },
  ESTP: {
    bti_name: '대담한 광장의 해결사',
    bti_description: '활기찬 현장의 중심에서, 직접 부딪히고 경험하며 실용적인 해결책을 찾는 것을 즐기는 활동가입니다.',
    backgroundColor: 'bg-gradient-to-br from-orange-100 to-amber-200',
  },
  ESFP: {
    bti_name: '자유로운 무대의 이야기꾼',
    bti_description: '활기차고 감각적인 공간에서 사람들과 어울리며 \'지금, 여기\'의 즐거움을 만끽하는 엔터테이너입니다.',
    backgroundColor: 'bg-gradient-to-br from-yellow-100 to-orange-200',
  },
};

export default function BookBTIResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState('');
  const [typeData, setTypeData] = useState(null);
  const [recommendations, setRecommendations] = useState({ places: [], spots: [] });
  const [loading, setLoading] = useState(true);
  const [mbtiMatch, setMbtiMatch] = useState(null); // null: 미응답, true: 예, false: 아니요

  useEffect(() => {
    const resultType = searchParams.get('type');
    if (!resultType) {
      router.push('/book-bti');
      return;
    }
    setType(resultType);
    
    // API에서 북BTI 유형 정보 및 추천 장소 가져오기
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${API_BASE}/bookbti/recommendations/${resultType}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `서버 오류 (${response.status})`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // 유형 정보 설정
          const btiType = data.bti_type;
          const fallbackData = typeDataMap[resultType] || typeDataMap['INFP'];
          
          setTypeData({
            bti_name: btiType.bti_name,
            bti_description: btiType.bti_description,
            backgroundColor: fallbackData.backgroundColor, // 배경색은 임시 데이터 사용
          });
          
          // 추천 장소 설정 (중복 제거)
          const uniquePlaces = [];
          const placeIdSet = new Set();
          (data.places || []).forEach(place => {
            if (!placeIdSet.has(place.id)) {
              placeIdSet.add(place.id);
              uniquePlaces.push(place);
            }
          });
          
          const uniqueSpots = [];
          const spotIdSet = new Set();
          (data.spots || []).forEach(spot => {
            if (!spotIdSet.has(spot.id)) {
              spotIdSet.add(spot.id);
              uniqueSpots.push(spot);
            }
          });
          
          setRecommendations({
            places: uniquePlaces,
            spots: uniqueSpots,
          });
        } else {
          throw new Error(data.error || '추천 장소를 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.error('추천 장소 조회 실패:', error);
        // 에러 발생 시 임시 데이터 사용
        const data = typeDataMap[resultType] || typeDataMap['INFP'];
        setTypeData(data);
        setRecommendations({ places: [], spots: [] });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [searchParams, router]);

  const handleMbtiMatch = (isMatch) => {
    setMbtiMatch(isMatch);
    // TODO: 서버에 응답 저장 (필요한 경우)
  };

  if (loading || !type || !typeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Type Card */}
          <div className="mb-12">
            <div className={`relative rounded-3xl p-8 ${typeData.backgroundColor} overflow-hidden shadow-lg`} style={{ minHeight: '280px' }}>
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Type Label */}
                <div className="text-5xl mb-4 tracking-wider text-gray-800 font-bold">
                  {type}
                </div>

                {/* MBTI 일치 여부 질문 */}
                {mbtiMatch === null && (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-3">
                      나의 진짜 MBTI와 맞나요?
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => handleMbtiMatch(true)}
                        className="px-6 py-2 bg-white/80 hover:bg-white rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all text-gray-700 font-medium shadow-sm"
                      >
                        예
                      </button>
                      <button
                        onClick={() => handleMbtiMatch(false)}
                        className="px-6 py-2 bg-white/80 hover:bg-white rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all text-gray-700 font-medium shadow-sm"
                      >
                        아니요
                      </button>
                    </div>
                  </div>
                )}

                {/* Catchphrase */}
                <h2 className="text-2xl mb-4 text-gray-800 font-bold">
                  {typeData.bti_name}
                </h2>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed max-w-2xl">
                  {typeData.bti_description}
                </p>

                {/* Bottom Logo Text */}
                <div className="mt-6 text-sm text-gray-500">
                  나의 Book-BTI는?
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => router.push('/book-bti/quiz')}
              variant="outline"
              className="rounded-full border-gray-300 hover:bg-white/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              다시하기
            </Button>
          </div>

          {/* Recommended Places */}
          {(recommendations.places.length > 0 || recommendations.spots.length > 0) && (
            <div>
              <h2 className="text-3xl text-center mb-8 text-gray-800 font-bold">
                이런 장소는 어떠세요?
              </h2>
              
              {/* Places */}
              {recommendations.places.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">카페 & 식당</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.places.map((place, index) => (
                      <PlaceCard key={`place-${place.id}-${index}`} place={place} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Spots */}
              {recommendations.spots.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">관광지 & 체험</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.spots.map((spot, index) => (
                      <SpotCard key={`spot-${spot.id}-${index}`} spot={spot} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* 추천 장소가 없는 경우 */}
          {recommendations.places.length === 0 && recommendations.spots.length === 0 && !loading && (
            <div>
              <h2 className="text-3xl text-center mb-8 text-gray-800 font-bold">
                이런 장소는 어떠세요?
              </h2>
              <div className="text-center text-gray-600 mb-6">
                <p>아직 추천 장소가 준비되지 않았습니다.</p>
                <p className="text-sm mt-2">곧 추가될 예정입니다.</p>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                모든 장소 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 주요 컴포넌트 구조

### 1. Type Card (유형 카드)
- **위치**: 페이지 상단 중앙
- **내용**:
  - 북BTI 알파벳 (예: INTJ) - 큰 글씨로 표시
  - MBTI 일치 여부 질문 ("나의 진짜 MBTI와 맞나요?") - 예/아니요 버튼
  - 유형 이름 (예: "전략적인 서재의 설계자")
  - 유형 설명
  - "나의 Book-BTI는?" 텍스트
- **스타일**: 유형별 그라데이션 배경색, 둥근 모서리, 그림자 효과

### 2. Action Buttons (액션 버튼)
- **다시하기 버튼**: 퀴즈를 다시 시작할 수 있는 버튼

### 3. Recommended Places (추천 장소)
- **카페 & 식당**: PlaceCard 컴포넌트로 표시
- **관광지 & 체험**: SpotCard 컴포넌트로 표시
- 그리드 레이아웃 (모바일: 1열, 태블릿: 2열, 데스크톱: 3열)

### 4. Bottom CTA
- "모든 장소 둘러보기" 버튼

## 주요 기능

1. **URL 파라미터로 북BTI 유형 받기**: `?type=INTJ` 형식
2. **API에서 유형 정보 및 추천 장소 가져오기**
3. **MBTI 일치 여부 질문**: 응답 전에만 표시
4. **중복 제거**: 같은 장소가 여러 번 추천되지 않도록 처리

## 스타일 가이드

- **배경**: `bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50`
- **유형별 배경색**: 16가지 유형마다 다른 그라데이션 색상
- **버튼 스타일**: 둥근 모서리 (`rounded-full`), 그림자 효과
- **반응형**: 모바일, 태블릿, 데스크톱 대응

## API 엔드포인트

- `GET /api/bookbti/recommendations/:bti_code`
  - 북BTI 유형 코드를 받아서 유형 정보와 추천 장소(Place, Spot) 반환


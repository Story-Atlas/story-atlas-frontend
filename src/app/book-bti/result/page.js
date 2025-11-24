"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { PlaceCard } from '@/components/PlaceCard';
import { SpotCard } from '@/components/SpotCard';
import Link from 'next/link';
import { getGuestUserId } from '@/utils/guestUser';

// 서버 컴포넌트에서는 절대 URL 필요
const API_BASE = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

// Express 서버의 getSpotImageUrl 함수와 동일한 로직
function getSpotImageUrl(spotName) {
  if (!spotName) return '/media/spots/default.jpg';
  
  const nameMapping = {
    '열화당 책박물관': '열화당_책박물관.jpg',
    '명필름 아트센터': '명필름_아트센터.jpg',
    '미메시스 아트 뮤지엄': '미메시스_아트_뮤지엄.jpg',
    '미소플레테 아틀리': '미소플레테_아틀리에.jpg',
    '미소플레테 아틀리에': '미소플레테_아틀리에.jpg',
    '미 소플레테 아틀리에': '미소플레테_아틀리에.jpg',
    '도미넌트 인더스트': '도미넌트_인더스트리.jpg',
    '도미넌트 인더스트리': '도미넌트_인더스트리.jpg',
    '출판도시 활판공방': '출판도시_활판공방.jpg',
    '지혜의숲': '지혜의숲.jpg',
    '파주나비나라박물관': '파주나비나라박물관.jpg',
    '활판인쇄박물관': '활판인쇄박물관.jpg',
    '메디테리움 의학박물관': '메디테리움 의학박물관.jpg',
  };
  
  let fileName;
  if (spotName.includes('미소플레테') || spotName.includes('미 소플레테')) {
    fileName = '미소플레테_아틀리에.jpg';
  } else if (spotName.includes('도미넌트')) {
    fileName = '도미넌트_인더스트리.jpg';
  } else {
    fileName = nameMapping[spotName] || spotName.replace(/\s+/g, '_') + '.jpg';
  }
  
  // 상대 경로로 반환 (normalizeSpot에서 절대 경로로 변환)
  return `/media/spots/${fileName}`;
}

// spot 데이터를 정규화하는 함수 (Express 서버처럼 처리)
// 탐색탭과 동일하게 spot.name을 기반으로 image_url을 항상 생성
function normalizeSpot(spot) {
  if (!spot || !spot.name) return spot;
  
  // Express 서버의 getSpotImageUrl 로직과 동일하게 처리
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000');
  
  // spot.name을 기반으로 image_url 생성 (Express 서버와 동일한 로직)
  // 항상 spot.name을 기반으로 생성하여 탐색탭과 동일하게 처리
  const relativeUrl = getSpotImageUrl(spot.name);
  const imageUrl = `${baseUrl}${relativeUrl}`;
  
  // description이 JSON 문자열이면 파싱
  let parsedDescription = spot.description;
  if (typeof spot.description === 'string' && spot.description.trim() !== '') {
    try {
      parsedDescription = JSON.parse(spot.description);
    } catch (e) {
      // JSON 파싱 실패 시 원본 유지
      parsedDescription = spot.description;
    }
  }
  
  return {
    ...spot,
    image_url: imageUrl,
    description: parsedDescription
  };
}

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

function BookBTIResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState('');
  const [typeData, setTypeData] = useState(null);
  const [aiReasoning, setAiReasoning] = useState(null); // AI 추론 문장
  const [recommendations, setRecommendations] = useState({ places: [], spots: [] });
  const [loading, setLoading] = useState(true);
  const [mbtiMatch, setMbtiMatch] = useState(null); // null: 미응답, true: 예, false: 아니요
  const [actualMbti, setActualMbti] = useState(''); // 실제 MBTI 입력 값
  const [isSaving, setIsSaving] = useState(false); // 저장 중 상태
  const [guestUserId, setGuestUserId] = useState(null); // 익명 사용자 ID

  useEffect(() => {
    // 익명 사용자 ID 가져오기
    const userId = getGuestUserId();
    setGuestUserId(userId);
    
    const resultKey = searchParams.get('key');
    const resultType = searchParams.get('type');
    
    // 새로운 방식: key 파라미터가 있으면 sessionStorage에서 AI 분석 결과 가져오기
    if (resultKey) {
      try {
        const analysisDataJson = sessionStorage.getItem(resultKey);
        if (!analysisDataJson) {
          console.error('분석 결과를 찾을 수 없습니다');
          router.push('/book-bti');
          return;
        }

        const analysisData = JSON.parse(analysisDataJson);
        
        setType(analysisData.inferred_type);
        setAiReasoning(analysisData.ai_reasoning);
        
        // 유형 정보 설정
        const fallbackData = typeDataMap[analysisData.inferred_type] || typeDataMap['INFP'];
        setTypeData({
          bti_name: analysisData.type_description.name,
          bti_description: analysisData.type_description.description,
          backgroundColor: fallbackData.backgroundColor,
        });
        
        // 추천 장소 설정
        // spots를 Express 서버처럼 정규화
        const rawSpots = analysisData.recommendations?.spots || [];
        const processedSpots = rawSpots.map(normalizeSpot);
        
        console.log('북BTI 분석 결과 - spots:', {
          rawCount: rawSpots.length,
          processedCount: processedSpots.length,
          rawSpots: rawSpots,
          processedSpots: processedSpots
        });
        
        setRecommendations({
          places: analysisData.recommendations?.places || [],
          spots: processedSpots,
        });
        
        setLoading(false);
        return;
      } catch (error) {
        console.error('분석 데이터 파싱 오류:', error);
        router.push('/book-bti');
        return;
      }
    }
    
    // 기존 방식: type 파라미터로 유형 조회
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
              uniqueSpots.push(normalizeSpot(spot)); // Express 서버처럼 정규화
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
    // "맞아요"를 선택한 경우 바로 저장
    if (isMatch) {
      saveResponse(true, null);
    }
    // "다른 유형이에요"를 선택한 경우 입력 필드만 표시 (저장은 나중에)
  };

  const saveResponse = async (isMatch, actualMbtiValue = null) => {
    if (!guestUserId || !type) {
      console.error('저장에 필요한 정보가 없습니다:', { guestUserId, type });
      alert('저장에 필요한 정보가 없습니다. 페이지를 새로고침 후 다시 시도해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      // actual_mbti 값 결정: 파라미터가 있으면 우선 사용, 없으면 state 값 사용
      const actualMbtiToSend = actualMbtiValue !== null ? actualMbtiValue : (actualMbti || null);
      
      // 디버깅용 로그
      console.log('응답 저장 요청:', {
        guest_user_id: guestUserId,
        bti_code: type,
        is_match: isMatch,
        actual_mbti: actualMbtiToSend
      });

      const response = await fetch(`${API_BASE}/bookbti/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_user_id: guestUserId,
          bti_code: type,
          is_match: isMatch,
          actual_mbti: actualMbtiToSend,
        }),
      });

      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const errorMessage = responseData.detail || responseData.error || `응답 저장 실패 (${response.status})`;
        console.error('응답 저장 실패:', errorMessage, responseData);
        throw new Error(errorMessage);
      }

      if (responseData.success) {
        // 저장 성공 - 상태 업데이트
        console.log('응답 저장 성공:', responseData);
        // 저장 성공 시 mbtiMatch를 설정하여 UI가 업데이트되도록 함
        if (isMatch) {
          setMbtiMatch(true);
        } else {
          // "다른 유형이에요"를 선택한 경우, 저장 성공 후 완료 상태로 변경
          setMbtiMatch(true); // 완료 상태로 표시하기 위해 true로 설정
        }
      } else {
        throw new Error(responseData.error || '응답 저장 실패');
      }
    } catch (error) {
      console.error('응답 저장 오류:', error);
      alert(error.message || '응답을 저장하는 중 오류가 발생했습니다.');
      // 오류 발생 시 상태 롤백 (isMatch가 false일 때만)
      if (!isMatch) {
        setMbtiMatch(null);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleActualMbtiSubmit = () => {
    if (!actualMbti || actualMbti.trim().length !== 4) {
      alert('MBTI 유형을 4자리로 입력해주세요 (예: INTJ, ENFP)');
      return;
    }

    const mbtiUpper = actualMbti.trim().toUpperCase();
    const validMbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
                           'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
    
    if (!validMbtiTypes.includes(mbtiUpper)) {
      alert('올바른 MBTI 유형을 입력해주세요 (예: INTJ, ENFP)');
      return;
    }

    saveResponse(false, mbtiUpper);
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
          <div className="mb-12 relative">
            {/* 우측 플로팅 카드 - 박스 밖에 배치 */}
            <div className="absolute top-60 right-0 z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border-2 border-white/80 min-w-[200px]">
                {mbtiMatch === null ? (
                  <div className="transition-opacity duration-300 ease-in-out">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-gray-600">실제 MBTI</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMbtiMatch(true)}
                        disabled={isSaving}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ✓ 맞아요
                      </button>
                      <button
                        onClick={() => handleMbtiMatch(false)}
                        disabled={isSaving}
                        className="w-full px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm border-2 border-gray-200 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        다른 유형이에요
                      </button>
                    </div>
                  </div>
                ) : mbtiMatch === false ? (
                  <div className="transition-opacity duration-300 ease-in-out space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-xs text-gray-600">실제 MBTI를 알려주세요</p>
                    </div>
                    <input
                      type="text"
                      value={actualMbti}
                      onChange={(e) => setActualMbti(e.target.value.toUpperCase())}
                      placeholder="예: INTJ"
                      maxLength={4}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 text-center font-semibold tracking-wider"
                      disabled={isSaving}
                    />
                    <button
                      onClick={handleActualMbtiSubmit}
                      disabled={isSaving || !actualMbti || actualMbti.length !== 4}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? '저장 중...' : '저장하기'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="text-3xl mb-2 animate-[zoomIn_0.4s_ease-out_0.1s_both]">✓</div>
                    <p className="text-sm font-medium text-gray-700 animate-[fadeInUp_0.5s_ease-out_0.2s_both]">응답 감사합니다</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`relative rounded-3xl p-8 ${typeData.backgroundColor} overflow-hidden shadow-lg`} style={{ minHeight: '320px' }}>
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

                {/* Catchphrase */}
                <h2 className="text-2xl mb-4 text-gray-800 font-bold max-w-md">
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

export default function BookBTIResult() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    }>
      <BookBTIResultContent />
    </Suspense>
  );
}


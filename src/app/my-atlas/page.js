"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { getGuestUserId } from '@/utils/guestUser';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

// API_BASE는 환경 변수 또는 상대 경로 사용
const API_BASE = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || '/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

function HeartIcon({ className, filled = false }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function BookmarkIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

// 책갈피 상세 다이얼로그 컴포넌트
function BookmarkDetailDialog({ bookmark, open, onClose }) {
  if (!bookmark) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>책갈피 상세</DialogTitle>
        </DialogHeader>
        <DialogClose onClose={onClose} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* 책갈피 이미지 */}
          <div className="space-y-4 flex flex-col items-center">
            <h3 className="font-pretendard-bold self-start">책갈피</h3>
            <p className="text-gray-500 self-start text-sm">
              표준 크기: 50mm × 150mm (1:3 비율)
            </p>
            <div className="relative w-full max-w-xs" style={{ aspectRatio: '1 / 3' }}>
              {bookmark.image_url ? (
                <Image
                  src={bookmark.image_url}
                  alt={bookmark.quote || bookmark.book_title}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400">이미지 없음</p>
                </div>
              )}
            </div>
          </div>

          {/* 책 정보 */}
          <div className="space-y-4">
            <h3 className="font-pretendard-bold">책 정보</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-pretendard-bold mb-1 text-xl">{bookmark.book_title || '책 제목 없음'}</h4>
                {bookmark.author && (
                  <p className="text-gray-600 mb-2">작가: {bookmark.author}</p>
                )}
                {bookmark.book_genre && (
                  <Badge variant="outline">{bookmark.book_genre}</Badge>
                )}
              </div>
              
              {/* 기억에 남는 구절 */}
              {bookmark.quote && (
                <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-sm font-semibold text-amber-800 mb-2">기억에 남는 구절</p>
                  <p className="text-gray-700 italic leading-relaxed">"{bookmark.quote}"</p>
                </div>
              )}
              
              {/* AI 생성 책 요약 */}
              {bookmark.book_description && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-[hsl(var(--accent-brown))]">
                  <div className="flex items-start gap-2 mb-3">
                    <svg className="w-5 h-5 text-[hsl(var(--accent-brown))] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-sm font-semibold text-[hsl(var(--accent-brown))]">AI 책 요약</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {bookmark.book_description}
                  </p>
                </div>
              )}
              
              {/* 생성일 */}
              <p className="text-sm text-gray-500">
                생성일: {new Date(bookmark.created_at).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MyAtlasPage() {
  const [guestUserId, setGuestUserId] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [favoritePlaces, setFavoritePlaces] = useState([]);
  const [summary, setSummary] = useState({ bookmark_count: 0, favorite_event_count: 0, favorite_place_count: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // 익명 사용자 ID 가져오기
    const userId = getGuestUserId();
    console.log('🔑 My Atlas - Guest User ID:', userId);
    setGuestUserId(userId);

    if (userId) {
      loadMyAtlasData(userId);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadMyAtlasData(userId) {
    try {
      setLoading(true);
      
      // 타임아웃 설정 (10초)
      const timeout = 10000;
      
      // 각 요청에 대해 타임아웃 적용
      const fetchWithTimeout = (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        return fetch(url, { signal: controller.signal })
          .finally(() => clearTimeout(timeoutId))
          .catch(err => {
            if (err.name === 'AbortError') {
              throw new Error(`요청 타임아웃: ${url}`);
            }
            throw err;
          });
      };
      
      try {
        // 병렬로 데이터 로드 (타임아웃 적용)
        const [bookmarksRes, eventsRes, placesRes, summaryRes] = await Promise.allSettled([
          fetchWithTimeout(`${API_BASE}/my-atlas/bookmarks?guest_user_id=${userId}`),
          fetchWithTimeout(`${API_BASE}/my-atlas/favorite-events?guest_user_id=${userId}`),
          fetchWithTimeout(`${API_BASE}/my-atlas/favorite-places?guest_user_id=${userId}`),
          fetchWithTimeout(`${API_BASE}/my-atlas/summary?guest_user_id=${userId}`)
        ]);

        // 각 응답 처리 (실패해도 다른 데이터는 표시)
        if (bookmarksRes.status === 'fulfilled' && bookmarksRes.value.ok) {
          try {
            const bookmarksData = await bookmarksRes.value.json();
            console.log('📚 책갈피 데이터:', bookmarksData);
            console.log('📚 책갈피 개수:', bookmarksData.bookmarks?.length || 0);
            setBookmarks(bookmarksData.bookmarks || []);
          } catch (e) {
            console.error('책갈피 데이터 파싱 실패:', e);
          }
        } else {
          console.error('책갈피 로드 실패:', bookmarksRes.reason);
        }

        if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
          try {
            const eventsData = await eventsRes.value.json();
            setFavoriteEvents(eventsData.events || []);
          } catch (e) {
            console.error('행사 데이터 파싱 실패:', e);
          }
        } else {
          console.error('행사 로드 실패:', eventsRes.reason);
        }

        if (placesRes.status === 'fulfilled' && placesRes.value.ok) {
          try {
            const placesData = await placesRes.value.json();
            setFavoritePlaces(placesData.places || []);
          } catch (e) {
            console.error('장소 데이터 파싱 실패:', e);
          }
        } else {
          console.error('장소 로드 실패:', placesRes.reason);
        }

        if (summaryRes.status === 'fulfilled' && summaryRes.value.ok) {
          try {
            const summaryData = await summaryRes.value.json();
            setSummary({
              bookmark_count: summaryData.bookmark_count || 0,
              favorite_event_count: summaryData.favorite_event_count || 0,
              favorite_place_count: summaryData.favorite_place_count || 0
            });
          } catch (e) {
            console.error('요약 데이터 파싱 실패:', e);
          }
        } else {
          console.error('요약 로드 실패:', summaryRes.reason);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('요청 타임아웃:', error);
        } else {
          console.error('My Atlas 데이터 로드 실패:', error);
        }
      }
    } catch (error) {
      console.error('My Atlas 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header sticky={false} />
        <div className="min-h-screen bg-[hsl(var(--warm-bg))] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--accent-brown))] mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header sticky={false} />
      <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
        {/* Header */}
        <div className="bg-gradient-to-r from-white via-amber-200/50 to-white text-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-pretendard-bold mb-4 text-4xl text-gray-800">My Atlas</h1>
            <p className="text-lg text-gray-700">나만의 책갈피와 찜한 행사, 찜한 장소를 모아보세요</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 요약 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 rounded-full p-4">
                  <BookmarkIcon className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">내 책갈피</p>
                  <p className="text-3xl font-bold text-gray-800">{summary.bookmark_count}개</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="bg-rose-100 rounded-full p-4">
                  <HeartIcon className="w-8 h-8 text-rose-600" filled={true} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">찜한 행사</p>
                  <p className="text-3xl font-bold text-gray-800">{summary.favorite_event_count}개</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">찜한 장소</p>
                  <p className="text-3xl font-bold text-gray-800">{summary.favorite_place_count}개</p>
                </div>
              </div>
            </div>
          </div>

          {/* 책갈피 섹션 */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">내 책갈피</h2>
              <Link href="/bookmark" className="text-[hsl(var(--accent-brown))] hover:underline text-sm">
                + 새 책갈피 만들기
              </Link>
            </div>
            
            {bookmarks.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">아직 만든 책갈피가 없습니다</p>
                <Link href="/bookmark" className="inline-block px-6 py-2 bg-[hsl(var(--accent-brown))] text-white rounded-lg hover:opacity-90 transition-opacity">
                  첫 책갈피 만들기
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {bookmarks.map((bookmark) => (
                    <div 
                      key={bookmark.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => {
                        setSelectedBookmark(bookmark);
                        setDialogOpen(true);
                      }}
                    >
                      {/* 책갈피 이미지만 표시 */}
                      <div className="relative aspect-[1/1.75] bg-gradient-to-br from-gray-50 to-gray-100">
                        {bookmark.image_url ? (
                          <Image
                            src={bookmark.image_url.startsWith('http') 
                              ? bookmark.image_url 
                              : bookmark.image_url}
                            alt={bookmark.book_title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* 간단한 정보만 표시 */}
                      <div className="p-3 space-y-1">
                        <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{bookmark.book_title}</h3>
                        {bookmark.author && (
                          <p className="text-xs text-gray-500 line-clamp-1">{bookmark.author}</p>
                        )}
                        <p className="text-xs text-gray-400 pt-1">
                          {new Date(bookmark.created_at).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 책갈피 상세 다이얼로그 */}
                <BookmarkDetailDialog
                  bookmark={selectedBookmark}
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                />
              </>
            )}
          </div>

          {/* 찜한 행사 섹션 */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">찜한 행사</h2>
              <Link href="/events" className="text-[hsl(var(--accent-brown))] hover:underline text-sm">
                행사 둘러보기 →
              </Link>
            </div>
            
            {favoriteEvents.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">아직 찜한 행사가 없습니다</p>
                <Link href="/events" className="inline-block px-6 py-2 bg-[hsl(var(--accent-brown))] text-white rounded-lg hover:opacity-90 transition-opacity">
                  행사 둘러보기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                      {event.main_image_url && (
                        <div className="relative aspect-video bg-gray-100">
                          <Image
                            src={event.main_image_url}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
                        {event.start_datetime && (
                          <p className="text-sm text-gray-600">
                            {new Date(event.start_datetime).toLocaleDateString('ko-KR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 찜한 장소 섹션 */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">찜한 장소</h2>
              <Link href="/" className="text-[hsl(var(--accent-brown))] hover:underline text-sm">
                장소 둘러보기 →
              </Link>
            </div>
            
            {favoritePlaces.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-gray-500 mb-4">아직 찜한 장소가 없습니다</p>
                <Link href="/" className="inline-block px-6 py-2 bg-[hsl(var(--accent-brown))] text-white rounded-lg hover:opacity-90 transition-opacity">
                  장소 둘러보기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoritePlaces.map((place) => {
                  const detailUrl = place.place_type === 'spot' ? `/spots/${place.id}` : `/places/${place.id}`;
                  const imageUrl = place.main_photo_url || place.image_url || 'https://via.placeholder.com/288x192.png?text=No+Image';
                  const headline = place.summary?.headline || place.description?.headline || place.name;
                  
                  return (
                    <Link key={`${place.place_type}-${place.id}`} href={detailUrl}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="relative aspect-[4/3] bg-gray-100">
                          <Image
                            src={imageUrl.startsWith('http') ? imageUrl : imageUrl}
                            alt={place.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{place.name}</h3>
                          {headline && (
                            <p className="text-sm text-gray-600 line-clamp-2">{headline}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


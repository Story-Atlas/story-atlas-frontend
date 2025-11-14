"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

// 아이콘 컴포넌트
function SearchIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function BookmarkCard({ bookmark, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col"
    >
      {/* Bookmark Display - 1:3 aspect ratio */}
      <div className="flex justify-center p-4 bg-gray-50">
        <div
          className="relative w-full max-w-[200px] rounded-lg flex items-center justify-center p-4 shadow-md"
          style={{
            aspectRatio: '1 / 3',
            background: bookmark.imageUrl 
              ? `url(${bookmark.imageUrl}) center/cover`
              : `linear-gradient(135deg, ${bookmark.color || '#8B4513'}15, ${bookmark.color || '#8B4513'}05)`,
          }}
        >
          <div className="absolute top-0 left-2 w-6 h-10 bg-gradient-to-b from-amber-600 to-amber-700" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 70%, 0 85%)' }}
          />
          {bookmark.imageUrl ? (
            <img 
              src={bookmark.imageUrl} 
              alt={bookmark.quote}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p
              className="text-center relative z-10 px-2"
              style={{
                fontFamily: bookmark.font || 'Pretendard, sans-serif',
                color: bookmark.color || '#8B4513',
                fontSize: '0.75rem',
                lineHeight: '1.6',
              }}
            >
              "{bookmark.quote}"
            </p>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent-brown))]/20 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
            </div>
            <span className="text-gray-700">{bookmark.author || '익명'}</span>
          </div>
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
            <HeartIcon className="w-4 h-4" />
            <span>{bookmark.likes || 0}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <BookOpenIcon className="w-4 h-4" />
          <span className="truncate">{bookmark.bookTitle || '책 제목 없음'}</span>
        </div>
      </div>
    </div>
  );
}

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
          {/* Bookmark Display */}
          <div className="space-y-4 flex flex-col items-center">
            <h3 className="font-pretendard-bold self-start">책갈피</h3>
            <p className="text-gray-500 self-start text-sm">
              표준 크기: 50mm × 150mm (1:3 비율)
            </p>
            <div
              className="relative w-full max-w-xs rounded-xl flex items-center justify-center p-6 shadow-lg overflow-hidden"
              style={{
                aspectRatio: '1 / 3',
                background: bookmark.imageUrl 
                  ? `url(${bookmark.imageUrl}) center/cover`
                  : `linear-gradient(135deg, ${bookmark.color || '#8B4513'}15, ${bookmark.color || '#8B4513'}05)`,
              }}
            >
              <div className="absolute top-0 left-4 w-10 h-14 bg-gradient-to-b from-amber-600 to-amber-700" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 70%, 0 85%)' }}
              />
              {bookmark.imageUrl ? (
                <img 
                  src={bookmark.imageUrl} 
                  alt={bookmark.quote}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p
                  className="text-center relative z-10 px-4"
                  style={{
                    fontFamily: bookmark.font || 'Pretendard, sans-serif',
                    color: bookmark.color || '#8B4513',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                  }}
                >
                  "{bookmark.quote}"
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">작성자: {bookmark.author || '익명'}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{bookmark.likes || 0} 좋아요</span>
              </div>
              <p className="text-gray-500 text-sm">{bookmark.createdAt || '날짜 정보 없음'}</p>
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-4">
            <h3 className="font-pretendard-bold">책 정보</h3>
            <div className="space-y-4">
              {bookmark.bookCover && (
                <img
                  src={bookmark.bookCover}
                  alt={bookmark.bookTitle}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div>
                <h4 className="font-pretendard-bold mb-1 text-xl">{bookmark.bookTitle || '책 제목 없음'}</h4>
                {bookmark.bookAuthor && (
                  <p className="text-gray-600 mb-2">작가: {bookmark.bookAuthor}</p>
                )}
                {bookmark.bookGenre && (
                  <Badge variant="outline">{bookmark.bookGenre}</Badge>
                )}
              </div>
              {bookmark.bookDescription && (
                <p className="text-gray-700 leading-relaxed">
                  {bookmark.bookDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HarmonyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 백엔드 API에서 책갈피 목록 가져오기
    // 현재는 빈 배열로 시작
    const fetchBookmarks = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || '/api';
        // TODO: 백엔드에 /api/bookmarks 엔드포인트가 추가되면 사용
        // const res = await fetch(`${API_BASE}/api/bookmarks`);
        // const data = await res.json();
        // setBookmarks(data);
        
        // 임시로 빈 배열 설정
        setBookmarks([]);
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmarkClick = (bookmark) => {
    setSelectedBookmark(bookmark);
    setDialogOpen(true);
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.quote?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header sticky={false} />
      <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
        {/* Header */}
        <div className="bg-gradient-to-r from-white via-orange-200/50 to-white text-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-pretendard-bold mb-4 text-4xl text-gray-800">화합의 장</h1>
            <p className="text-lg text-gray-700">많은 사람들이 아름다운 책갈피를 만들고 공유하는 공간</p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="relative max-w-xl">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="책갈피 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>

          {/* Bookmarks Grid */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredBookmarks.length}개의 책갈피가 공유되었습니다
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500">로딩 중...</p>
            </div>
          ) : filteredBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">아직 공유된 책갈피가 없습니다.</p>
              <p className="text-gray-400 text-sm">책갈피를 만들어서 공유해보세요!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onClick={() => handleBookmarkClick(bookmark)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bookmark Detail Dialog */}
        <BookmarkDetailDialog
          bookmark={selectedBookmark}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </>
  );
}



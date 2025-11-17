'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { getGuestUserId } from '@/utils/guestUser';

export default function BookmarkForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('소설');
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  
  // 공유 기능 상태
  const [isPublic, setIsPublic] = useState(false);
  const [nickname, setNickname] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 기억에 남는 구절 필수 검증
    if (!quote || !quote.trim()) {
      setError('기억에 남는 구절을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    // 기기별 고유 guest user ID 가져오기 (localStorage에서)
    const guestUserId = getGuestUserId();
    console.log('🔑 BookmarkForm - Guest User ID:', guestUserId);

    const payload = {
      bookTitle,
      bookGenre,
      author,
      quote: quote.trim(),
      guestUserId,
    };
    console.log('📤 전송할 책갈피 데이터:', payload);

    try {
      const response = await fetch('/api/bookmark/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '책갈피 생성에 실패했습니다.');
      }

      console.log('✅ 생성된 책갈피:', data);
      setImageUrl(data.imageUrl);

      // 생성된 책갈피를 화합의 장에 자동으로 저장
      try {
        const savePayload = {
          guest_user_id: guestUserId,
          book_title: bookTitle,
          author: author || null,
          quote: quote || '책갈피 이미지로 생성',
          book_genre: bookGenre,
          image_url: data.imageUrl,
          description: data.description || '',
          is_public: isPublic,
          nickname: isPublic && nickname ? nickname : null,
        };
        console.log('💾 저장할 책갈피 데이터:', savePayload);
        
        const saveResponse = await fetch('/api/bookmark/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(savePayload),
        });

        const saveData = await saveResponse.json();

        if (saveData.success) {
          console.log('✅ 책갈피가 DB에 저장되었습니다!');
          console.log('   - Bookmark ID:', saveData.bookmark_id);
          console.log('   - Guest User ID:', guestUserId);
        } else {
          console.warn('❌ 책갈피 저장 실패:', saveData.error);
        }
      } catch (saveErr) {
        // 저장 실패해도 이미지는 표시
        console.error('책갈피 저장 오류:', saveErr);
      }

    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700">책 제목 *</label>
          <Input
            id="bookTitle"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="예: 어린왕자"
            required
          />
        </div>
        
        <div>
          <label htmlFor="bookGenre" className="block text-sm font-medium text-gray-700 mb-2">장르 *</label>
          <Select value={bookGenre} onValueChange={setBookGenre}>
            <SelectTrigger id="bookGenre" className="w-full">
              <SelectValue placeholder="장르를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="소설">소설</SelectItem>
              <SelectItem value="문학">문학</SelectItem>
              <SelectItem value="시">시</SelectItem>
              <SelectItem value="자기계발">자기계발</SelectItem>
              <SelectItem value="철학">철학</SelectItem>
              <SelectItem value="판타지">판타지</SelectItem>
              <SelectItem value="SF">SF</SelectItem>
              <SelectItem value="로맨스">로맨스</SelectItem>
              <SelectItem value="추리">추리</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">작가 (선택)</label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="예: 생텍쥐페리"
          />
        </div>

        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-gray-700">기억에 남는 구절 *</label>
          <Input
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="예: 가장 중요한 것은 눈에 보이지 않아"
            required
          />
          <p className="text-xs text-gray-600 mt-2">
            기억에 남는 구절은 책갈피의 디자인 분위기와 감성을 결정하는 핵심 요소입니다.
          </p>
        </div>

        {/* 공유 기능 */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="isPublic" className="text-sm font-medium text-gray-700 cursor-pointer">
              화합의 장에 공유하기
            </label>
          </div>
          
          {isPublic && (
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                닉네임 (화합의 장에 표시)
              </label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 책읽는사람"
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">
                공유 시 익명 대신 닉네임으로 표시됩니다.
              </p>
            </div>
          )}
          
          <p className="text-xs text-gray-600">
            {isPublic 
              ? "✅ 이 책갈피는 화합의 장에 공개되며, My Atlas에도 저장됩니다." 
              : "📁 이 책갈피는 My Atlas에만 저장됩니다."}
          </p>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
        >
          {isLoading ? '생성 중...' : '책갈피 생성'}
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            <p><strong>오류:</strong> {error}</p>
          </div>
        )}
        </form>
      </div>

      {/* --- 이미지 미리보기 --- */}
      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">생성된 책갈피:</h3>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white/20">
            <div className="border rounded-lg p-2 mb-4">
              <img 
                src={imageUrl} 
                alt="Generated Bookmark" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  try {
                    // 이미지 URL이 상대 경로일 수 있으므로 절대 URL로 변환
                    const fullImageUrl = imageUrl.startsWith('http') 
                      ? imageUrl 
                      : `${window.location.origin}${imageUrl}`;
                    
                    // 이미지를 fetch하여 blob으로 다운로드
                    const response = await fetch(fullImageUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `bookmark_${bookTitle || 'bookmark'}_${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // 메모리 정리
                    window.URL.revokeObjectURL(url);
                  } catch (err) {
                    console.error('다운로드 실패:', err);
                    alert('다운로드에 실패했습니다. 이미지를 우클릭하여 저장해주세요.');
                  }
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                다운로드
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              이미지 URL: {imageUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
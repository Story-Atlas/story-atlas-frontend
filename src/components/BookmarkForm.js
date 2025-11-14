'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BookmarkForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [quote, setQuote] = useState('');
  const [font, setFont] = useState('');
  const [mood, setMood] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [author, setAuthor] = useState(''); // 작가 상태 추가

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // 미리보기 이미지 URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setImageUrl(null); // 이전 이미지 숨기기

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('book_title', bookTitle);
    formData.append('book_genre', bookGenre);
    formData.append('quote', quote);
    
    // 선택적 필드 추가
    if (font) formData.append('font', font);
    if (mood) formData.append('mood', mood);
    if (colorScheme) formData.append('color_scheme', colorScheme);
    if (author) formData.append('author', author); // 작가 추가

    try {
      // 1. 프론트엔드 API 라우트(/api/create-bookmark) 호출
      const response = await fetch('/api/create-bookmark', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // 서버가 4xx, 5xx 응답을 반환한 경우
        throw new Error(data.error || '책갈피 생성에 실패했습니다.');
      }

      // 5. 성공 시, 백엔드로부터 받은 이미지 URL을 상태에 저장
      console.log('Generated Data:', data);
      setImageUrl(data.relative_url); // 'relative_url'이 백엔드 응답 키라고 가정

    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
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
          <label htmlFor="bookGenre" className="block text-sm font-medium text-gray-700">장르 *</label>
          <Input
            id="bookGenre"
            value={bookGenre}
            onChange={(e) => setBookGenre(e.target.value)}
            placeholder="예: 소설, 철학"
            required
          />
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
          <label htmlFor="quote" className="block text-sm font-medium text-gray-700">기억에 남는 구절 *</labe>
          <Input
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="예: 가장 중요한 것은 눈에 보이지 않아"
            required
          />
        </div>

        {/* --- 선택 사항 --- */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="font" className="block text-sm font-medium text-gray-700">글꼴 (선택)</label>
            <Select onValueChange={setFont} value={font}>
              <SelectTrigger>
                <SelectValue placeholder="기본" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="serif">명조체</SelectItem>
                <SelectItem value="sans-serif">고딕체</SelectItem>
                <SelectItem value="handwriting">손글씨</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-700">분위기 (선택)</label>
            <Select onValueChange={setMood} value={mood}>
              <SelectTrigger>
                <SelectValue placeholder="기본" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calm">차분한</SelectItem>
                <SelectItem value="dreamy">몽환적인</SelectItem>
                <SelectItem value="minimalist">미니멀</SelectItem>
                <SelectItem value="dark">어두운</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">색상 (선택)</label>
            <Select onValueChange={setColorScheme} value={colorScheme}>
              <SelectTrigger>
                <SelectValue placeholder="기본" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">푸른색</SelectItem>
                <SelectItem value="pastel">파스텔</SelectItem>
                <SelectItem value="warm">따뜻한</SelectItem>
                <SelectItem value="monochrome">흑백</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? '생성 중...' : '책갈피 생성'}
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            <p><strong>오류:</strong> {error}</p>
          </div>
        )}
      </form>

      {/* --- 이미지 미리보기 --- */}
      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">생성된 책갈피:</h3>
          <div className="border rounded-lg p-2">
            <img 
              src={imageUrl} 
              alt="Generated Bookmark" 
              className="w-full h-auto rounded"
            />
            <p className="text-xs text-gray-500 mt-2">
              이미지 URL: {imageUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
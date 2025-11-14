import { useState } from 'react';
import { BookmarkForm } from './BookmarkForm';

export interface BookmarkData {
  title: string;
  quote: string;
  author: string;
  font: string;
  genre: string;
  mood: string;
  colorScheme: string;
}

export function BookmarkGenerator() {
  const [bookmarkData, setBookmarkData] = useState<BookmarkData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: BookmarkData) => {
    setIsGenerating(true);
    // AI 생성 시뮬레이션 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setBookmarkData(data);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BookmarkForm onGenerate={handleGenerate} isGenerating={isGenerating} />
    </div>
  );
}

import { BookmarkGenerator } from './components/BookmarkGenerator';
import { Toaster } from './components/ui/sonner';
import { BookOpen, Book, BookMarked } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 떠다니는 책 아이콘들 */}
        <div className="absolute top-20 left-[10%] opacity-10 animate-float">
          <BookOpen className="w-32 h-32 text-amber-600" />
        </div>
        <div className="absolute top-40 right-[15%] opacity-10 animate-float-delayed">
          <Book className="w-24 h-24 text-orange-600" />
        </div>
        <div className="absolute bottom-32 left-[20%] opacity-10 animate-float-slow">
          <BookMarked className="w-28 h-28 text-rose-600" />
        </div>
        <div className="absolute bottom-20 right-[25%] opacity-10 animate-float">
          <BookOpen className="w-20 h-20 text-amber-500" />
        </div>
        <div className="absolute top-[60%] left-[5%] opacity-10 animate-float-delayed">
          <Book className="w-24 h-24 text-orange-500" />
        </div>
        
        {/* 그라디언트 원형 블러 효과 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookMarked className="w-8 h-8 text-orange-600" />
            <h1 className="mb-0">나만의 책갈피 만들기</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            좋아하는 책 구절로 세상에 하나뿐인 책갈피를 만들어보세요
          </p>
        </header>
        
        <BookmarkGenerator />
      </div>
      <Toaster />
    </div>
  );
}

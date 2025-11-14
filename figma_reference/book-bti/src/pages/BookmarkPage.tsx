import { BookmarkIcon } from 'lucide-react';
import { BookmarkForm } from '../components/BookmarkForm';

export function BookmarkPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Floating Book Icons */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <BookmarkIcon className="w-12 h-12 text-orange-400" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed opacity-20">
        <BookmarkIcon className="w-16 h-16 text-amber-400" />
      </div>
      <div className="absolute bottom-40 left-1/4 animate-float-slow opacity-20">
        <BookmarkIcon className="w-10 h-10 text-rose-400" />
      </div>
      <div className="absolute bottom-20 right-1/3 animate-float opacity-20">
        <BookmarkIcon className="w-14 h-14 text-orange-300" />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-300/20 to-rose-300/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-rose-300/25 to-amber-300/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-6">
            <BookmarkIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4">나만의 책갈피 만들기</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            좋아하는 책 구절로 세상에 하나뿐인 책갈피를 만들어보세요
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BookmarkForm />
        </div>
      </div>
    </div>
  );
}

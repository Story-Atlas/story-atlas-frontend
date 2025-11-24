"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

// 간단한 아이콘 컴포넌트 (lucide-react 대체)
function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
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

export function Header({ sticky = true }) {
  const pathname = usePathname();
  
  return (
    <header className={`${sticky ? 'sticky top-0' : ''} z-50 w-full border-b bg-white/80 backdrop-blur-md`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex md:grid md:grid-cols-3 h-16 items-center justify-between md:justify-normal">
          {/* Logo - 왼쪽 */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-[hsl(var(--accent-brown))]" />
              <span className="font-pretendard font-extrabold text-xl hidden md:block">Story Atlas</span>
            </Link>
          </div>

          {/* Navigation - 중앙 정렬 (3개만) */}
          <nav className="flex items-center justify-center gap-1 md:gap-2">
            <Link 
              href="/" 
              className={`font-bold transition-all px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
                pathname === '/' 
                  ? 'text-[hsl(var(--accent-brown))] bg-[hsl(var(--accent-brown))]/10' 
                  : 'text-gray-700 hover:text-[hsl(var(--accent-brown))] hover:bg-gray-100'
              }`}
            >
              탐색
            </Link>
            <Link 
              href="/events" 
              className={`font-bold transition-all px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
                pathname === '/events' || pathname?.startsWith('/events/')
                  ? 'text-[hsl(var(--accent-brown))] bg-[hsl(var(--accent-brown))]/10' 
                  : 'text-gray-700 hover:text-[hsl(var(--accent-brown))] hover:bg-gray-100'
              }`}
            >
              행사
            </Link>
            <Link 
              href="/book-bti" 
              className={`font-bold transition-all px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base ${
                pathname === '/book-bti' || pathname?.startsWith('/book-bti/')
                  ? 'text-[hsl(var(--accent-brown))] bg-[hsl(var(--accent-brown))]/10' 
                  : 'text-gray-700 hover:text-[hsl(var(--accent-brown))] hover:bg-gray-100'
              }`}
            >
              AI 맞춤 추천
            </Link>
          </nav>

          {/* Actions - 오른쪽 (My Atlas + 책갈피 만들기) */}
          <div className="flex items-center justify-end gap-3">
            <Link 
              href="/my-atlas" 
              className={`font-bold transition-all px-4 py-2 rounded-full hidden md:block ${
                pathname === '/my-atlas'
                  ? 'text-[hsl(var(--accent-brown))] bg-[hsl(var(--accent-brown))]/10' 
                  : 'text-gray-700 hover:text-[hsl(var(--accent-brown))] hover:bg-gray-100'
              }`}
            >
              My Atlas
            </Link>
            <Link href="/bookmark" className="cursor-pointer">
              <Button variant="outline" className="gap-2 cursor-pointer bg-black text-white border-black hover:bg-gray-800 hover:text-white font-bold">
                <BookmarkIcon className="h-4 w-4 text-white stroke-[2]" />
                <span className="hidden sm:inline font-bold">책갈피 만들기</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


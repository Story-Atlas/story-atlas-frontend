"use client";

import { BookOpen, Bookmark } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[hsl(var(--accent-brown))]" />
            <span className="lowercase tracking-tight">
              Story Atlas
            </span>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:text-[hsl(var(--accent-brown))] transition-colors">
              탐색
            </a>
            <a href="#" className="text-sm hover:text-[hsl(var(--accent-brown))] transition-colors">
              행사
            </a>
            <a href="#" className="text-sm hover:text-[hsl(var(--accent-brown))] transition-colors">
              장소
            </a>
          </nav>

          {/* 액션 버튼 */}
          <Button 
            variant="outline" 
            className="gap-2 border-[hsl(var(--accent-brown))] text-[hsl(var(--accent-brown))] hover:bg-[hsl(var(--accent-brown))] hover:text-white"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">책갈피 만들기</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

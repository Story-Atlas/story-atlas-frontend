import { BookOpen, Bookmark, Search } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[hsl(var(--accent-brown))]" />
            <span className="font-pretendard font-extrabold text-xl">story atlas</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#explore" className="transition-colors hover:text-[hsl(var(--accent-brown))]">
              탐색
            </a>
            <a href="#events" className="transition-colors hover:text-[hsl(var(--accent-brown))]">
              행사
            </a>
            <a href="#places" className="transition-colors hover:text-[hsl(var(--accent-brown))]">
              장소
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">책갈피 만들기</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

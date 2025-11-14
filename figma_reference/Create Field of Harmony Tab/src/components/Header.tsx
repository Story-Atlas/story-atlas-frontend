import { BookOpen, Bookmark } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isSticky?: boolean;
}

export function Header({ currentPage, onNavigate, isSticky = false }: HeaderProps) {
  return (
    <header 
      className={`${isSticky ? 'sticky top-0' : ''} z-50 bg-white/80 backdrop-blur-md border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="w-6 h-6 text-[hsl(var(--accent-brown))]" />
            <span className="font-pretendard-bold lowercase">story atlas</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors ${
                currentPage === 'home'
                  ? 'text-[hsl(var(--accent-brown))]'
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => onNavigate('events')}
              className={`transition-colors ${
                currentPage === 'events'
                  ? 'text-[hsl(var(--accent-brown))]'
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => onNavigate('harmony')}
              className={`transition-colors ${
                currentPage === 'harmony'
                  ? 'text-[hsl(var(--accent-brown))]'
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              Field of Harmony
            </button>
          </nav>

          {/* Create Bookmark Button */}
          <Button
            onClick={() => onNavigate('bookmark')}
            variant="outline"
            className="border-[hsl(var(--accent-brown))] text-[hsl(var(--accent-brown))] hover:bg-[hsl(var(--accent-brown))] hover:text-white"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Create Bookmark
          </Button>
        </div>
      </div>
    </header>
  );
}

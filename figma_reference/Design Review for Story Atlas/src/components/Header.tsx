import { BookOpen, Bookmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`${isHome ? 'sticky' : ''} top-0 z-50 bg-white/80 backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[hsl(var(--accent-brown))]" />
            <span className="font-extrabold lowercase">Story Atlas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/' 
                  ? 'text-[hsl(var(--accent-brown))]' 
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              탐색
            </Link>
            <Link 
              to="/events" 
              className={`transition-colors ${
                location.pathname.startsWith('/events') 
                  ? 'text-[hsl(var(--accent-brown))]' 
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              행사
            </Link>
            <Link 
              to="/places" 
              className={`transition-colors ${
                location.pathname.startsWith('/places') 
                  ? 'text-[hsl(var(--accent-brown))]' 
                  : 'text-gray-600 hover:text-[hsl(var(--accent-brown))]'
              }`}
            >
              장소
            </Link>
          </nav>

          {/* Action Button */}
          <Link to="/bookmark">
            <Button className="gap-2">
              <Bookmark className="w-4 h-4" />
              책갈피 만들기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

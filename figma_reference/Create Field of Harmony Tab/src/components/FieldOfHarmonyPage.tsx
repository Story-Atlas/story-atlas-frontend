import { useState } from 'react';
import { Search, Heart, User, BookOpen, X } from 'lucide-react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Bookmark {
  id: string;
  quote: string;
  font: string;
  color: string;
  author: string;
  createdAt: string;
  likes: number;
  book: {
    title: string;
    author: string;
    cover: string;
    description: string;
    publishedYear: number;
  };
}

function BookmarkCard({ bookmark, onClick }: { bookmark: Bookmark; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col"
    >
      {/* Bookmark Display - 1:3 aspect ratio */}
      <div className="flex justify-center p-4 bg-gray-50">
        <div
          className="relative w-full max-w-[200px] rounded-lg flex items-center justify-center p-4 shadow-md"
          style={{
            aspectRatio: '1 / 3',
            background: `linear-gradient(135deg, ${bookmark.color}15, ${bookmark.color}05)`,
          }}
        >
          <div className="absolute top-0 left-2 w-6 h-10 bg-gradient-to-b from-amber-600 to-amber-700" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 70%, 0 85%)' }}
          />
          <p
            className="text-center relative z-10 px-2"
            style={{
              fontFamily: bookmark.font,
              color: bookmark.color,
              fontSize: '0.75rem',
              lineHeight: '1.6',
            }}
          >
            "{bookmark.quote}"
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--accent-brown))]/20 flex items-center justify-center">
              <User className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
            </div>
            <span className="text-gray-700">{bookmark.author}</span>
          </div>
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{bookmark.likes}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <BookOpen className="w-4 h-4" />
          <span className="truncate">{bookmark.book.title}</span>
        </div>
      </div>
    </div>
  );
}

function BookmarkDetailDialog({ bookmark, open, onClose }: { 
  bookmark: Bookmark | null; 
  open: boolean; 
  onClose: () => void;
}) {
  if (!bookmark) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bookmark Details</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bookmark Display */}
          <div className="space-y-4 flex flex-col items-center">
            <h3 className="font-pretendard-bold self-start">Bookmark</h3>
            <p className="text-gray-500 self-start">
              Standard size: 50mm × 150mm (1:3 ratio)
            </p>
            <div
              className="relative w-full max-w-xs rounded-xl flex items-center justify-center p-6 shadow-lg"
              style={{
                aspectRatio: '1 / 3',
                background: `linear-gradient(135deg, ${bookmark.color}15, ${bookmark.color}05)`,
              }}
            >
              <div className="absolute top-0 left-4 w-10 h-14 bg-gradient-to-b from-amber-600 to-amber-700" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 70%, 0 85%)' }}
              />
              <p
                className="text-center relative z-10 px-4"
                style={{
                  fontFamily: bookmark.font,
                  color: bookmark.color,
                  fontSize: '1rem',
                  lineHeight: '1.7',
                }}
              >
                "{bookmark.quote}"
              </p>
            </div>

            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Created by {bookmark.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{bookmark.likes} likes</span>
              </div>
              <p className="text-gray-500">{bookmark.createdAt}</p>
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-4">
            <h3 className="font-pretendard-bold">Book Information</h3>
            <div className="space-y-4">
              <ImageWithFallback
                src={bookmark.book.cover}
                alt={bookmark.book.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-pretendard-bold mb-1">{bookmark.book.title}</h4>
                <p className="text-gray-600 mb-2">by {bookmark.book.author}</p>
                <Badge variant="outline">{bookmark.book.publishedYear}</Badge>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {bookmark.book.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FieldOfHarmonyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock bookmarks data
  const mockBookmarks: Bookmark[] = [
    {
      id: '1',
      quote: 'In the end, we only regret the chances we didn\'t take.',
      font: 'Dancing Script, cursive',
      color: '#8B4513',
      author: 'Sarah Kim',
      createdAt: '2024-11-10',
      likes: 24,
      book: {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'A magical fable about following your dreams. Santiago, an Andalusian shepherd boy, travels from his homeland in Spain to the Egyptian desert in search of treasure buried near the Pyramids.',
        publishedYear: 1988,
      },
    },
    {
      id: '2',
      quote: 'It is our choices that show what we truly are, far more than our abilities.',
      font: 'Pretendard, sans-serif',
      color: '#2C1810',
      author: 'James Park',
      createdAt: '2024-11-09',
      likes: 18,
      book: {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'The second installment in the Harry Potter series finds young wizard Harry Potter and his friends, Ron and Hermione, facing new challenges during their second year at Hogwarts School of Witchcraft and Wizardry.',
        publishedYear: 1998,
      },
    },
    {
      id: '3',
      quote: 'Not all those who wander are lost.',
      font: 'Dancing Script, cursive',
      color: '#654321',
      author: 'Emily Chen',
      createdAt: '2024-11-08',
      likes: 32,
      book: {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'An epic high fantasy novel that follows the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, and thus ensure the destruction of its maker, the Dark Lord Sauron.',
        publishedYear: 1954,
      },
    },
    {
      id: '4',
      quote: 'The only way out of the labyrinth of suffering is to forgive.',
      font: 'Pretendard, sans-serif',
      color: '#8B6914',
      author: 'Michael Lee',
      createdAt: '2024-11-07',
      likes: 15,
      book: {
        title: 'Looking for Alaska',
        author: 'John Green',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'A coming-of-age novel about Miles "Pudge" Halter, who enrolls in boarding school to seek a "Great Perhaps." There, he falls in love with Alaska Young and finds a great perhaps he never dreamed of.',
        publishedYear: 2005,
      },
    },
    {
      id: '5',
      quote: 'Whatever our souls are made of, his and mine are the same.',
      font: 'Dancing Script, cursive',
      color: '#6B4423',
      author: 'Lisa Wang',
      createdAt: '2024-11-06',
      likes: 28,
      book: {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'A tale of passion and revenge that unfolds on the Yorkshire moors. The story of Heathcliff and Catherine Earnshaw\'s tumultuous love affair is considered one of the greatest romances in English literature.',
        publishedYear: 1847,
      },
    },
    {
      id: '6',
      quote: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
      font: 'Pretendard, sans-serif',
      color: '#8B7355',
      author: 'David Kim',
      createdAt: '2024-11-05',
      likes: 21,
      book: {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover: 'https://images.unsplash.com/photo-1657550650205-a351418bbf89?w=400&h=600&fit=crop',
        description: 'A portrait of the Jazz Age in all of its decadence and excess. The novel chronicles the mysterious Jay Gatsby and his passion for the beautiful Daisy Buchanan.',
        publishedYear: 1925,
      },
    },
  ];

  const handleBookmarkClick = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--accent-brown))] to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-pretendard-bold mb-4">Field of Harmony</h1>
          <p>A space where many people create and share beautiful bookmarks</p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Bookmarks Grid */}
        <div className="mb-6">
          <p className="text-gray-600">
            {mockBookmarks.length} bookmarks shared
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
          {mockBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onClick={() => handleBookmarkClick(bookmark)}
            />
          ))}
        </div>
      </div>

      {/* Bookmark Detail Dialog */}
      <BookmarkDetailDialog
        bookmark={selectedBookmark}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}

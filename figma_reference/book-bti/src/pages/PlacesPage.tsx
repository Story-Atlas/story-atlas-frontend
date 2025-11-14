import { useState, useEffect } from 'react';
import { Search, Grid3x3, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { PlaceCard } from '../components/PlaceCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'book-cafe', label: '북카페' },
  { id: 'brunch', label: '브런치' },
  { id: 'outdoor', label: '야외카페' },
  { id: 'large', label: '대형카페' },
  { id: 'tourist', label: '관광지' },
];

export function PlacesPage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Mock data
    const mockPlaces = [
      {
        id: '1',
        name: '북카페 지혜의숲',
        headline: '책과 커피가 만나는 아늑한 공간',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
        category: 'book-cafe',
      },
      {
        id: '2',
        name: '카페 페이지터너',
        headline: '한 페이지 한 페이지, 시간이 멈추는 곳',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600',
        category: 'book-cafe',
      },
      {
        id: '3',
        name: '브런치 하우스',
        headline: '여유로운 브런치를 즐기세요',
        imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600',
        category: 'brunch',
      },
      {
        id: '4',
        name: '가든 카페',
        headline: '자연 속에서 즐기는 커피',
        imageUrl: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=600',
        category: 'outdoor',
      },
    ];
    
    setPlaces(mockPlaces);
  }, []);

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.headline?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown))]/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">장소</h1>
          <p>파주 출판단지의 특별한 장소들을 탐색해보세요</p>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="장소 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-[hsl(var(--accent-brown))] hover:bg-[hsl(var(--accent-brown))]/90' 
                  : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredPlaces.length}개의 장소</p>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value: any) => value && setViewMode(value)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3x3 className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                headline={place.headline}
                imageUrl={place.imageUrl}
              />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredPlaces.map((place) => (
              <Link
                key={place.id}
                to={`/places/${place.id}`}
                className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{place.name}</h3>
                    {place.headline && (
                      <p className="text-gray-600">{place.headline}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

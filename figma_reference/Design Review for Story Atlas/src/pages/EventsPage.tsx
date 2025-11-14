import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { EventCard } from '../components/EventCard';

export function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('ongoing');

  useEffect(() => {
    // Mock data
    const mockEvents = [
      {
        id: '1',
        name: '파주 북 페스티벌 2025',
        headline: '책과 문화가 어우러지는 축제',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
        startDate: '2025-05-15',
        endDate: '2025-05-17',
        status: 1,
      },
      {
        id: '2',
        name: '작가와의 만남',
        headline: '베스트셀러 작가와 함께하는 특별한 시간',
        imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
        startDate: '2025-06-10',
        endDate: '2025-06-10',
        status: 1,
      },
      {
        id: '3',
        name: '독립출판 전시회',
        headline: '독립 출판의 다양한 세계를 경험하세요',
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        status: -1,
      },
      {
        id: '4',
        name: '어린이 책 축제',
        headline: '아이들과 함께하는 특별한 문화 행사',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
        startDate: '2025-07-20',
        endDate: '2025-07-22',
        status: 1,
      },
    ];
    
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.headline?.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'ongoing') return matchesSearch && event.status !== -1;
      if (activeTab === 'ended') return matchesSearch && event.status === -1;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const ongoingCount = events.filter(e => e.status !== -1).length;
  const endedCount = events.filter(e => e.status === -1).length;

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown))]/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">행사</h1>
          <p>파주 출판단지에서 열리는 다양한 문화 행사를 만나보세요</p>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="행사 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">날짜순</SelectItem>
              <SelectItem value="name">이름순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="ongoing">진행 중 ({ongoingCount})</TabsTrigger>
            <TabsTrigger value="ended">종료됨 ({endedCount})</TabsTrigger>
            <TabsTrigger value="all">전체 ({events.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  headline={event.headline}
                  imageUrl={event.imageUrl}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  status={event.status}
                />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

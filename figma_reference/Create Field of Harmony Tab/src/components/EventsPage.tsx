import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: string;
  name: string;
  headline: string;
  image: string;
  date: string;
  status: number;
}

function EventCard({ event }: { event: Event }) {
  const isEnded = event.status === -1;

  return (
    <div className="relative group cursor-pointer">
      <div className="relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
        <ImageWithFallback
          src={event.image}
          alt={event.name}
          className="w-full h-80 object-cover"
        />
        {isEnded && (
          <div className="absolute inset-0 bg-black/50">
            <Badge className="absolute top-4 right-4 bg-red-500 text-white">
              Ended
            </Badge>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-pretendard-bold">{event.name}</h3>
        <p className="text-gray-600">{event.headline}</p>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
      </div>
    </div>
  );
}

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Mock data
  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'Book Festival 2024',
      headline: 'A celebration of literature and culture',
      image: 'https://images.unsplash.com/photo-1648707238917-257f7a7aa52b?w=400&h=500&fit=crop',
      date: '2024-11-15 ~ 2024-11-20',
      status: 1,
    },
    {
      id: '2',
      name: 'Author Meet & Greet',
      headline: 'Meet your favorite authors in person',
      image: 'https://images.unsplash.com/photo-1648707238917-257f7a7aa52b?w=400&h=500&fit=crop',
      date: '2024-11-22',
      status: 1,
    },
    {
      id: '3',
      name: 'Poetry Reading Night',
      headline: 'An evening of spoken word and poetry',
      image: 'https://images.unsplash.com/photo-1648707238917-257f7a7aa52b?w=400&h=500&fit=crop',
      date: '2024-10-15',
      status: -1,
    },
  ];

  const ongoingEvents = mockEvents.filter((e) => e.status !== -1);
  const endedEvents = mockEvents.filter((e) => e.status === -1);

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--accent-brown))] to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-pretendard-bold mb-4">Events</h1>
          <p>Discover various cultural events held in Paju Book City</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by date</SelectItem>
              <SelectItem value="name">Sort by name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ongoing">
          <TabsList className="mb-8">
            <TabsTrigger value="ongoing">
              Ongoing ({ongoingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="ended">
              Ended ({endedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({mockEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ongoingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ended">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {endedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

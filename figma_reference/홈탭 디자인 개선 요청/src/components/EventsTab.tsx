"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Event {
  id: number;
  image: string;
  images?: string[];
  name: string;
  headline: string;
  period: string;
  isEnded: boolean;
  description?: string;
  location?: string;
  time?: string;
  price?: string;
  organizer?: string;
  capacity?: string;
  website?: string;
  tags?: string[];
  relatedEvents?: any[];
}

interface EventsTabProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function EventsTab({ events, onEventClick }: EventsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const ongoingEvents = events.filter((event) => !event.isEnded);
  const endedEvents = events.filter((event) => event.isEnded);

  const filterEvents = (eventsList: Event[]) => {
    return eventsList.filter(
      (event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.headline.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))] pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[hsl(var(--accent-brown))] to-[hsl(var(--accent-brown-dark))] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl mb-3">행사</h1>
          <p className="text-white/80">
            파주 출판단지에서 열리는 다양한 문화 행사를 만나보세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="행사 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">날짜순</SelectItem>
                <SelectItem value="name">이름순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="ongoing" className="flex-1 sm:flex-none">
              진행 중 ({ongoingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="ended" className="flex-1 sm:flex-none">
              종료됨 ({endedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              전체 ({events.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(ongoingEvents).map((event) => (
                <EventCard
                  key={event.id}
                  image={event.image}
                  name={event.name}
                  headline={event.headline}
                  period={event.period}
                  isEnded={event.isEnded}
                  onClick={() => onEventClick(event)}
                />
              ))}
            </div>
            {filterEvents(ongoingEvents).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ended">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(endedEvents).map((event) => (
                <EventCard
                  key={event.id}
                  image={event.image}
                  name={event.name}
                  headline={event.headline}
                  period={event.period}
                  isEnded={event.isEnded}
                  onClick={() => onEventClick(event)}
                />
              ))}
            </div>
            {filterEvents(endedEvents).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">종료된 행사가 없습니다.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(events).map((event) => (
                <EventCard
                  key={event.id}
                  image={event.image}
                  name={event.name}
                  headline={event.headline}
                  period={event.period}
                  isEnded={event.isEnded}
                  onClick={() => onEventClick(event)}
                />
              ))}
            </div>
            {filterEvents(events).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

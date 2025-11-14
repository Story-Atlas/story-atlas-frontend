"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SearchIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function SlidersHorizontalIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

// 행사 상태 판단 함수 (날짜 기준)
function getEventStatus(event) {
  if (event.status === -1) {
    return 'ended'; // 종료
  }
  
  if (!event.start_datetime || !event.end_datetime) {
    return 'ongoing'; // 날짜 정보가 없으면 기본값으로 진행 중
  }
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const startDate = new Date(event.start_datetime);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(event.end_datetime);
  endDate.setHours(0, 0, 0, 0);
  
  if (now < startDate) {
    return 'upcoming'; // 진행 예정
  } else if (now >= startDate && now <= endDate) {
    return 'ongoing'; // 진행 중
  } else {
    return 'ended'; // 종료
  }
}

export function EventsTabContent({ events }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const upcomingEvents = events.filter((event) => getEventStatus(event) === 'upcoming');
  const ongoingEvents = events.filter((event) => getEventStatus(event) === 'ongoing');
  const endedEvents = events.filter((event) => getEventStatus(event) === 'ended');

  const filterEvents = (eventsList) => {
    let filtered = eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description?.headline || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 정렬
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.start_datetime || 0);
        const dateB = new Date(b.start_datetime || 0);
        return dateB - dateA; // 최신순
      });
    }

    return filtered;
  };

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
                <SelectValue placeholder="정렬 선택">
                  {sortBy === "date" ? "날짜순" : sortBy === "name" ? "이름순" : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">날짜순</SelectItem>
                <SelectItem value="name">이름순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">
              진행 예정 ({upcomingEvents.length})
            </TabsTrigger>
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

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(upcomingEvents).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {filterEvents(upcomingEvents).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">진행 예정인 행사가 없습니다.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(ongoingEvents).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {filterEvents(ongoingEvents).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">진행 중인 행사가 없습니다.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ended">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterEvents(endedEvents).map((event) => (
                <EventCard key={event.id} event={event} />
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
                <EventCard key={event.id} event={event} />
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


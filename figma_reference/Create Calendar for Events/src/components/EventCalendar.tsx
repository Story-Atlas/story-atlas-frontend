"use client";

import * as React from "react";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";

interface Event {
  id: number;
  name: string;
  headline: string;
  start_date: string;
  end_date: string;
  place_id?: string;
  host?: string;
  status: number;
  image_url: string;
}

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = React.useState<Event[]>([]);

  // 이번 달 첫날과 마지막 날
  const currentMonth = React.useMemo(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
  }, []);

  // 이번 달 행사만 필터링
  const currentMonthEvents = React.useMemo(() => {
    return events.filter((event) => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      // 행사 기간이 이번 달과 겹치는지 확인
      return eventEnd >= currentMonth.firstDay && eventStart <= currentMonth.lastDay;
    });
  }, [events, currentMonth]);

  // 행사가 있는 날짜들을 계산
  const eventDates = React.useMemo(() => {
    const dates = new Set<string>();
    currentMonthEvents.forEach((event) => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      
      // 시작일부터 종료일까지 모든 날짜 추가
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.add(d.toISOString().split('T')[0]);
      }
    });
    return dates;
  }, [currentMonthEvents]);

  // 날짜 선택 시 해당 날짜의 행사들을 필터링
  React.useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const eventsOnDate = currentMonthEvents.filter((event) => {
        const start = new Date(event.start_date).toISOString().split('T')[0];
        const end = new Date(event.end_date).toISOString().split('T')[0];
        return dateStr >= start && dateStr <= end;
      });
      setSelectedEvents(eventsOnDate);
    }
  }, [selectedDate, currentMonthEvents]);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // 행사 기간 포맷팅
  const formatEventPeriod = (start: string, end: string) => {
    if (start === end) {
      return formatDate(start);
    }
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 캘린더 영역 */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card className="p-6 bg-white border-0 shadow-xl overflow-hidden relative">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--accent-brown))]/5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-[hsl(var(--accent-brown))]/10 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">이번 달</h3>
                  <p className="font-semibold text-[hsl(var(--accent-brown))]">
                    {currentMonth.firstDay.getMonth() + 1}월 행사
                  </p>
                </div>
              </div>

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth.firstDay}
                className="rounded-lg w-full"
                disabled={(date) => {
                  return date < currentMonth.firstDay || date > currentMonth.lastDay;
                }}
                modifiers={{
                  hasEvent: (date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return eventDates.has(dateStr);
                  },
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--accent-brown))',
                    color: 'white',
                    borderRadius: '0.5rem',
                  },
                }}
              />
              
              <div className="mt-6 p-4 bg-gradient-to-r from-[hsl(var(--warm-bg))] to-[hsl(var(--accent-beige))]/30 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-[hsl(var(--accent-brown))] rounded-full"></span>
                    <span className="text-gray-700">행사 있는 날</span>
                  </div>
                  <Badge variant="outline" className="bg-white border-[hsl(var(--accent-brown))]/20">
                    {currentMonthEvents.length}개
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 선택된 날짜의 행사 목록 */}
      <div className="lg:col-span-2">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-[hsl(var(--accent-brown))] rounded-full"></div>
            <div>
              <h3 className="leading-tight">
                {selectedDate ? formatDate(selectedDate.toISOString().split('T')[0]) : '날짜를 선택하세요'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedEvents.length > 0 
                  ? `${selectedEvents.length}개의 행사가 열립니다` 
                  : '이 날짜에는 행사가 없습니다'}
              </p>
            </div>
          </div>
        </div>

        {selectedEvents.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-to-br from-[hsl(var(--warm-bg))] to-white border-0 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[hsl(var(--accent-brown))]/10 rounded-2xl mb-4">
              <CalendarIcon className="w-8 h-8 text-[hsl(var(--accent-brown))]/40" />
            </div>
            <p className="text-gray-500">
              선택하신 날짜에는 예정된 행사가 없습니다
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {selectedEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  event.status === -1 ? 'opacity-50' : ''
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* 이미지 */}
                  <div className="relative w-full sm:w-56 h-56 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img 
                      src={event.image_url} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {event.status === -1 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-white/90 text-gray-800 px-4 py-2">
                          종료된 행사
                        </Badge>
                      </div>
                    )}
                    {event.status !== -1 && (
                      <div className="absolute top-3 right-3">
                        <div className="px-3 py-1 bg-[hsl(var(--accent-brown))] text-white rounded-full text-xs shadow-lg">
                          진행중
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 p-6">
                    <h4 className="mb-3 line-clamp-2 group-hover:text-[hsl(var(--accent-brown))] transition-colors">
                      {event.name}
                    </h4>
                    
                    {event.headline && (
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {event.headline}
                      </p>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <div className="p-1.5 bg-[hsl(var(--warm-bg))] rounded-lg mt-0.5">
                          <Clock className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-0.5">기간</p>
                          <p className="text-gray-700">{formatEventPeriod(event.start_date, event.end_date)}</p>
                        </div>
                      </div>
                      
                      {event.place_id && (
                        <div className="flex items-start gap-3 text-sm">
                          <div className="p-1.5 bg-[hsl(var(--warm-bg))] rounded-lg mt-0.5">
                            <MapPin className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">장소</p>
                            <p className="text-gray-700">{event.place_id}</p>
                          </div>
                        </div>
                      )}

                      {event.host && (
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">주최</p>
                          <p className="text-sm text-gray-700 mt-1">{event.host}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

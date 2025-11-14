"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

// 아이콘 컴포넌트
function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function ChevronLeftIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

// 간단한 캘린더 컴포넌트
function SimpleCalendar({ selectedDate, onDateSelect, eventDates, currentMonth, onMonthChange, viewingMonth }) {
  const [currentMonthView, setCurrentMonthView] = useState(viewingMonth || currentMonth.firstDay);
  
  // viewingMonth가 변경되면 currentMonthView도 업데이트
  useEffect(() => {
    if (viewingMonth) {
      setCurrentMonthView(viewingMonth);
    }
  }, [viewingMonth]);
  
  const year = currentMonthView.getFullYear();
  const month = currentMonthView.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  
  const days = [];
  // 빈 칸 추가 (첫 날 전)
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  // 날짜 추가
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  const isEventDate = (day) => {
    if (!day) return false;
    // 로컬 날짜 기준으로 문자열 생성 (eventDates와 동일한 형식)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventDates.has(dateStr);
  };
  
  // 연속된 행사 날짜인지 확인하는 함수들 (주간 경계 고려)
  const getDayOfWeek = (day) => {
    const date = new Date(year, month, day);
    return date.getDay();
  };
  
  const isFirstInSequence = (day) => {
    if (!day || !isEventDate(day)) return false;
    const prevDay = day - 1;
    if (prevDay < 1) return true; // 월의 첫 날이면 첫 번째
    if (!isEventDate(prevDay)) return true; // 이전 날짜가 행사 날짜가 아니면 첫 번째
    
    // 이전 날짜가 행사 날짜인데 주간 경계를 넘어가는 경우도 첫 번째로 처리
    const currentDayOfWeek = getDayOfWeek(day);
    const prevDayOfWeek = getDayOfWeek(prevDay);
    
    // 주간 경계 확인: 일요일(0)은 이전 주의 토요일(6)과 연결되지 않음
    // 같은 주 내에서 연속된 경우만 연결
    if (currentDayOfWeek === 0) {
      return true; // 일요일은 항상 주의 시작이므로 첫 번째
    }
    if (prevDayOfWeek === 6 && currentDayOfWeek === 0) {
      return true; // 토요일에서 일요일로 넘어가는 경우는 주간 경계
    }
    // 같은 주 내에서 연속된 경우
    if (currentDayOfWeek === prevDayOfWeek + 1) {
      return false; // 연속됨
    }
    return true; // 주간 경계를 넘어가는 경우 첫 번째
  };
  
  const isLastInSequence = (day) => {
    if (!day || !isEventDate(day)) return false;
    const nextDay = day + 1;
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    if (nextDay > lastDayOfMonth) return true; // 월의 마지막 날이면 마지막
    if (!isEventDate(nextDay)) return true; // 다음 날짜가 행사 날짜가 아니면 마지막
    
    // 다음 날짜가 행사 날짜인데 주간 경계를 넘어가는 경우도 마지막으로 처리
    const currentDayOfWeek = getDayOfWeek(day);
    const nextDayOfWeek = getDayOfWeek(nextDay);
    
    // 주간 경계 확인: 토요일(6)은 다음 주의 일요일(0)과 연결되지 않음
    if (currentDayOfWeek === 6) {
      return true; // 토요일은 항상 주의 끝이므로 마지막
    }
    if (currentDayOfWeek === 6 && nextDayOfWeek === 0) {
      return true; // 토요일에서 일요일로 넘어가는 경우는 주간 경계
    }
    // 같은 주 내에서 연속된 경우
    if (nextDayOfWeek === currentDayOfWeek + 1) {
      return false; // 연속됨
    }
    return true; // 주간 경계를 넘어가는 경우 마지막
  };
  
  const isMiddleInSequence = (day) => {
    if (!day || !isEventDate(day)) return false;
    return !isFirstInSequence(day) && !isLastInSequence(day);
  };
  
  const isSelected = (day) => {
    if (!day || !selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === month && 
           selectedDate.getFullYear() === year;
  };
  
  const handleDateClick = (day) => {
    if (!day) return;
    const date = new Date(year, month, day);
    onDateSelect(date);
  };
  
  const handlePrevMonth = () => {
    const newMonth = new Date(year, month - 1, 1);
    setCurrentMonthView(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };
  
  const handleNextMonth = () => {
    const newMonth = new Date(year, month + 1, 1);
    setCurrentMonthView(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };
  
  return (
    <div className="w-full">
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <h3 className="font-semibold">{year}년 {month + 1}월</h3>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }
          
          const hasEvent = isEventDate(day);
          const isSelectedDay = isSelected(day);
          
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square rounded-lg text-sm transition-all
                ${isSelectedDay 
                  ? 'bg-[hsl(var(--accent-brown))] text-white font-bold' 
                  : hasEvent 
                    ? 'bg-[hsl(var(--accent-brown))]/20 text-[hsl(var(--accent-brown))] font-semibold hover:bg-[hsl(var(--accent-brown))]/30' 
                    : 'hover:bg-gray-100'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function EventCalendar({ events }) {
  // 디버깅: 받은 이벤트 데이터 확인
  useEffect(() => {
    console.log('[EventCalendar] Received events:', events?.length || 0);
    if (events && events.length > 0) {
      console.log('[EventCalendar] First event sample:', {
        id: events[0].id,
        title: events[0].title,
        start_datetime: events[0].start_datetime,
        end_datetime: events[0].end_datetime,
      });
    }
  }, [events]);
  
  // 현재 보고 있는 달 (초기값: 이번 달)
  const [viewingMonth, setViewingMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  
  // 이번 달 첫날과 마지막 날 (초기값)
  const currentMonth = useMemo(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
  }, []);
  
  // 현재 보고 있는 달의 첫날과 마지막 날
  const viewingMonthRange = useMemo(() => {
    const year = viewingMonth.getFullYear();
    const month = viewingMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
  }, [viewingMonth]);
  
  // 현재 보고 있는 달의 행사만 필터링
  const currentMonthEvents = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    return events.filter((event) => {
      if (!event.start_datetime || !event.end_datetime) return false;
      
      const eventStart = new Date(event.start_datetime);
      const eventEnd = new Date(event.end_datetime);
      
      // 날짜만 비교 (시간 제거)
      const eventStartDate = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
      const eventEndDate = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
      
      // 행사 기간이 현재 보고 있는 달과 겹치는지 확인
      return eventEndDate >= viewingMonthRange.firstDay && eventStartDate <= viewingMonthRange.lastDay;
    });
  }, [events, viewingMonthRange]);
  
  // 행사가 있는 날짜들을 계산 (로컬 날짜 기준으로 통일, 현재 보고 있는 달만)
  const eventDates = useMemo(() => {
    const dates = new Set();
    const currentYear = viewingMonthRange.firstDay.getFullYear();
    const currentMonthNum = viewingMonthRange.firstDay.getMonth();
    
    currentMonthEvents.forEach((event) => {
      if (!event.start_datetime || !event.end_datetime) return;
      
      const start = new Date(event.start_datetime);
      const end = new Date(event.end_datetime);
      
      // 로컬 날짜 기준으로 변환 (타임존 문제 방지)
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      
      // 현재 보고 있는 달 범위로 제한
      const monthStart = new Date(currentYear, currentMonthNum, 1);
      const monthEnd = new Date(currentYear, currentMonthNum + 1, 0);
      
      // 행사 기간과 현재 보고 있는 달의 교집합 계산
      const actualStart = startDate > monthStart ? startDate : monthStart;
      const actualEnd = endDate < monthEnd ? endDate : monthEnd;
      
      // 날짜 문자열 생성 함수 (로컬 날짜 기준)
      const formatDateStr = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      // 현재 보고 있는 달 범위 내의 날짜만 추가
      const currentDate = new Date(actualStart);
      while (currentDate <= actualEnd) {
        // 현재 보고 있는 달인지 다시 한 번 확인
        if (currentDate.getFullYear() === currentYear && currentDate.getMonth() === currentMonthNum) {
          dates.add(formatDateStr(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return dates;
  }, [currentMonthEvents, viewingMonthRange]);
  
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [selectedEvents, setSelectedEvents] = useState([]);
  
  // 초기 날짜 설정: 오늘 날짜에 행사가 있으면 오늘, 없으면 첫 행사 날짜
  useEffect(() => {
    if (eventDates.size > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // 로컬 날짜 기준으로 문자열 생성
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      // 오늘 날짜에 행사가 있으면 오늘 유지
      if (eventDates.has(todayStr)) {
        return;
      }
      
      // 첫 행사 날짜로 설정
      const sortedDates = Array.from(eventDates).sort();
      if (sortedDates.length > 0) {
        const [year, month, day] = sortedDates[0].split('-').map(Number);
        const firstEventDate = new Date(year, month - 1, day);
        setSelectedDate(firstEventDate);
      }
    }
  }, [eventDates]);
  
  // 날짜 선택 시 해당 날짜의 행사들을 필터링 (모든 행사에서 검색)
  useEffect(() => {
    if (selectedDate && events && events.length > 0) {
      // 로컬 날짜 기준으로 문자열 생성
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      
      const eventsOnDate = events.filter((event) => {
        if (!event.start_datetime || !event.end_datetime) return false;
        
        const start = new Date(event.start_datetime);
        const end = new Date(event.end_datetime);
        
        // 로컬 날짜 기준으로 비교 (시간 제거)
        const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        const selectedDateOnly = new Date(selectedYear, selectedMonth, selectedDay);
        
        return selectedDateOnly >= startDate && selectedDateOnly <= endDate;
      });
      
      console.log('[EventCalendar] Selected date:', dateStr, 'Events found:', eventsOnDate.length);
      setSelectedEvents(eventsOnDate);
    } else {
      setSelectedEvents([]);
    }
  }, [selectedDate, events]);
  
  // 날짜 포맷팅 함수 (문자열 또는 Date 객체 모두 처리)
  const formatDate = (dateInput) => {
    let date;
    if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      date = new Date(dateInput);
    }
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // 선택된 날짜를 로컬 날짜 기준으로 포맷팅하는 함수
  const formatSelectedDate = (date) => {
    if (!date) return '날짜를 선택하세요';
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // 행사 기간 포맷팅
  const formatEventPeriod = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate.toDateString() === endDate.toDateString()) {
      return formatDate(start);
    }
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };
  
  // 행사 상태 판단 함수 (날짜 기준)
  const getEventStatus = (event) => {
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
  };
  
  // 이미지 URL 처리 (서버와 클라이언트에서 동일한 경로 사용)
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300.png?text=No+Image';
    
    // 절대 경로 처리
    if (imageUrl.startsWith('/home/workspace/story-atlas-backend/media/')) {
      const relativePath = imageUrl.replace('/home/workspace/story-atlas-backend/media/', '');
      return `/${relativePath}`;
    } 
    // 상대 경로 처리 - 서버와 클라이언트 모두 동일하게 상대 경로 사용
    else if (imageUrl.startsWith('/media/')) {
      return imageUrl;
    } 
    // 파일명만 있는 경우
    else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      return `/media/event_poster/${imageUrl}`;
    }
    // HTTP URL인 경우 그대로 반환
    else if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // 기본값
    return imageUrl;
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
                  <h3 className="text-sm text-gray-500">
                    {viewingMonth.getFullYear() === new Date().getFullYear() && 
                     viewingMonth.getMonth() === new Date().getMonth() 
                      ? '이번 달' 
                      : `${viewingMonth.getFullYear()}년 ${viewingMonth.getMonth() + 1}월`}
                  </h3>
                  <p className="font-semibold text-[hsl(var(--accent-brown))]">
                    {viewingMonth.getMonth() + 1}월 행사
                  </p>
                </div>
              </div>

              <SimpleCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                eventDates={eventDates}
                currentMonth={currentMonth}
                onMonthChange={setViewingMonth}
                viewingMonth={viewingMonth}
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
              <h3 className="leading-tight text-2xl font-bold">
                {formatSelectedDate(selectedDate)}
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
            {selectedEvents.map((event, index) => {
              const eventStatus = getEventStatus(event);
              
              return (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card 
                    className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                      eventStatus === 'ended' ? 'opacity-50' : ''
                    }`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* 이미지 */}
                      <div className="relative w-full sm:w-64 h-64 flex-shrink-0 overflow-hidden bg-gray-100">
                        <img 
                          src={getImageUrl(event.main_image_url)} 
                          alt={event.title || '행사 이미지'}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300.png?text=No+Image';
                          }}
                        />
                        {eventStatus === 'ended' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-white/90 text-gray-800 px-4 py-2">
                              종료된 행사
                            </Badge>
                          </div>
                        )}
                        {eventStatus === 'ongoing' && (
                          <div className="absolute top-3 right-3">
                            <div className="px-3 py-1 bg-[hsl(var(--accent-brown))] text-white rounded-full text-xs shadow-lg">
                              진행 중
                            </div>
                          </div>
                        )}
                        {eventStatus === 'upcoming' && (
                          <div className="absolute top-3 right-3">
                            <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs shadow-lg">
                              진행 예정
                            </div>
                          </div>
                        )}
                      </div>

                    {/* 내용 */}
                    <div className="flex-1 p-6">
                      <h4 className="mb-3 line-clamp-2 group-hover:text-[hsl(var(--accent-brown))] transition-colors text-xl font-bold">
                        {event.title || '행사 제목 없음'}
                      </h4>
                      
                      {(event.description?.headline || (typeof event.description === 'string' && event.description)) && (
                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {event.description?.headline || (typeof event.description === 'string' ? event.description.substring(0, 100) : '')}
                        </p>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                          <div className="p-1.5 bg-[hsl(var(--warm-bg))] rounded-lg mt-0.5">
                            <ClockIcon className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-0.5">기간</p>
                            <p className="text-gray-700">
                              {event.start_datetime && event.end_datetime 
                                ? formatEventPeriod(event.start_datetime, event.end_datetime)
                                : '날짜 정보 없음'}
                            </p>
                          </div>
                        </div>
                        
                        {(event.place_id || event.place_name) && (
                          <div className="flex items-start gap-3 text-sm">
                            <div className="p-1.5 bg-[hsl(var(--warm-bg))] rounded-lg mt-0.5">
                              <MapPinIcon className="w-4 h-4 text-[hsl(var(--accent-brown))]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">장소</p>
                              <p className="text-gray-700">{event.place_id || event.place_name || '장소 정보 없음'}</p>
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
              </Link>
            );
            })}
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


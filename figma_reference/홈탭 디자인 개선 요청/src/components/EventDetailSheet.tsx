"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Bookmark,
  Share2,
  Users,
  Ticket,
  Navigation,
} from "lucide-react";
import { EventCard } from "./EventCard";

interface EventDetail {
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
  relatedEvents?: Array<{
    id: number;
    image: string;
    name: string;
    headline: string;
    period: string;
    isEnded: boolean;
  }>;
}

interface EventDetailSheetProps {
  event: EventDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailSheet({
  event,
  open,
  onOpenChange,
}: EventDetailSheetProps) {
  if (!event) return null;

  const allImages = event.images || [event.image];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        {/* Image Gallery */}
        <div className="relative aspect-[3/4] sm:aspect-[16/10] w-full overflow-hidden">
          <ImageWithFallback
            src={allImages[0]}
            alt={event.name}
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge
              className={
                event.isEnded
                  ? "bg-gray-500/90 backdrop-blur-sm text-white"
                  : "bg-green-500/90 backdrop-blur-sm text-white"
              }
            >
              {event.isEnded ? "종료된 행사" : "진행 중"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-3xl mb-3">{event.name}</SheetTitle>
            <SheetDescription className="text-base text-gray-600">
              {event.headline}
            </SheetDescription>
          </SheetHeader>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="mb-6" />

          {/* Event Info Cards */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                <Calendar className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">행사 기간</p>
                <p className="font-medium">{event.period}</p>
              </div>
            </div>

            {event.time && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <Clock className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">시간</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <MapPin className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">장소</p>
                  <p className="font-medium">{event.location}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  길찾기
                </Button>
              </div>
            )}

            {event.price && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <Ticket className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">참가비</p>
                  <p className="font-medium">{event.price}</p>
                </div>
              </div>
            )}

            {event.organizer && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <Users className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">주최</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>
            )}

            {event.website && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <ExternalLink className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">웹사이트</p>
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[hsl(var(--accent-brown))] hover:underline"
                  >
                    자세히 보기
                  </a>
                </div>
              </div>
            )}
          </div>

          <Separator className="mb-6" />

          {/* Tabs for Details */}
          <Tabs defaultValue="about" className="mb-8">
            <TabsList className="w-full">
              <TabsTrigger value="about" className="flex-1">
                행사 소개
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">
                사진
              </TabsTrigger>
              <TabsTrigger value="program" className="flex-1">
                프로그램
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {event.description ||
                    `${event.name}은(는) ${event.period} 기간 동안 진행되는 특별한 문화 행사입니다. ${event.headline}`}
                </p>
                
                {event.capacity && (
                  <div className="mt-4 p-4 bg-[hsl(var(--warm-secondary))] rounded-lg">
                    <p className="text-sm">
                      <strong>정원:</strong> {event.capacity}
                    </p>
                    {!event.isEnded && (
                      <p className="text-xs text-gray-600 mt-2">
                        사전 예약이 필요할 수 있습니다.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${event.name} ${index + 1}`}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="program" className="mt-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent-brown))] text-white text-sm font-semibold">
                      1
                    </div>
                    <div className="w-0.5 flex-1 bg-gray-200 my-2" />
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="mb-1">오프닝 세션</h4>
                    <p className="text-sm text-gray-600">
                      행사 소개 및 주요 연사 인사
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent-brown))] text-white text-sm font-semibold">
                      2
                    </div>
                    <div className="w-0.5 flex-1 bg-gray-200 my-2" />
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="mb-1">메인 프로그램</h4>
                    <p className="text-sm text-gray-600">
                      북토크, 전시, 체험 프로그램
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent-brown))] text-white text-sm font-semibold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">네트워킹 타임</h4>
                    <p className="text-sm text-gray-600">
                      참가자들과 자유로운 대화 및 교류
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Events */}
          {event.relatedEvents && event.relatedEvents.length > 0 && (
            <>
              <Separator className="mb-6" />
              <div className="mb-6">
                <h3 className="mb-4">다른 행사도 둘러보세요</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {event.relatedEvents.map((relatedEvent) => (
                    <EventCard
                      key={relatedEvent.id}
                      image={relatedEvent.image}
                      name={relatedEvent.name}
                      headline={relatedEvent.headline}
                      period={relatedEvent.period}
                      isEnded={relatedEvent.isEnded}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-6 px-6 border-t">
            {event.isEnded ? (
              <Button className="w-full" size="lg" variant="outline" disabled>
                종료된 행사입니다
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <Bookmark className="h-5 w-5 mr-2" />
                  책갈피에 저장
                </Button>
                <Button className="flex-1" size="lg" variant="outline">
                  <Ticket className="h-5 w-5 mr-2" />
                  참가 신청
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

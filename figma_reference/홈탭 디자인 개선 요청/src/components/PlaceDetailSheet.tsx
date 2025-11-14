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
  MapPin,
  Clock,
  Phone,
  ExternalLink,
  Bookmark,
  Share2,
  Navigation,
  Star,
} from "lucide-react";
import { PlaceCard } from "./PlaceCard";

interface PlaceDetail {
  id: number;
  image: string;
  images?: string[]; // 추가 이미지들
  name: string;
  headline: string;
  category: string;
  description?: string;
  address?: string;
  hours?: string;
  phone?: string;
  website?: string;
  tags?: string[];
  rating?: number;
  relatedPlaces?: Array<{
    id: number;
    image: string;
    name: string;
    headline: string;
    category: string;
  }>;
}

interface PlaceDetailSheetProps {
  place: PlaceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlaceDetailSheet({
  place,
  open,
  onOpenChange,
}: PlaceDetailSheetProps) {
  if (!place) return null;

  const allImages = place.images || [place.image];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        {/* Image Gallery */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ImageWithFallback
            src={allImages[0]}
            alt={place.name}
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

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
              {place.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <SheetHeader className="text-left mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <SheetTitle className="text-3xl">{place.name}</SheetTitle>
              {place.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{place.rating}</span>
                </div>
              )}
            </div>
            <SheetDescription className="text-base text-gray-600">
              {place.headline}
            </SheetDescription>
          </SheetHeader>

          {/* Tags */}
          {place.tags && place.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {place.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator className="mb-6" />

          {/* Info Cards */}
          <div className="space-y-4 mb-6">
            {place.address && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <MapPin className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">주소</p>
                  <p className="font-medium">{place.address}</p>
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

            {place.hours && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <Clock className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">운영시간</p>
                  <p className="font-medium">{place.hours}</p>
                </div>
              </div>
            )}

            {place.phone && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <Phone className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">전화번호</p>
                  <p className="font-medium">{place.phone}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                  asChild
                >
                  <a href={`tel:${place.phone}`}>전화하기</a>
                </Button>
              </div>
            )}

            {place.website && (
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--warm-secondary))]">
                  <ExternalLink className="h-5 w-5 text-[hsl(var(--accent-brown))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">웹사이트</p>
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[hsl(var(--accent-brown))] hover:underline"
                  >
                    {place.website}
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
                소개
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">
                사진
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                리뷰
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {place.description ||
                    `${place.name}은(는) 파주 출판단지에 위치한 ${place.category}입니다. ${place.headline}`}
                </p>
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
                      alt={`${place.name} ${index + 1}`}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="text-center py-8 text-gray-500">
                <p>아직 등록된 리뷰가 없습니다.</p>
                <Button variant="outline" className="mt-4">
                  첫 리뷰 작성하기
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Places */}
          {place.relatedPlaces && place.relatedPlaces.length > 0 && (
            <>
              <Separator className="mb-6" />
              <div className="mb-6">
                <h3 className="mb-4">이런 곳은 어때요?</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {place.relatedPlaces.map((relatedPlace) => (
                    <PlaceCard
                      key={relatedPlace.id}
                      image={relatedPlace.image}
                      name={relatedPlace.name}
                      headline={relatedPlace.headline}
                      category={relatedPlace.category}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-6 px-6 border-t">
            <Button className="w-full" size="lg">
              <Bookmark className="h-5 w-5 mr-2" />
              책갈피에 저장하기
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

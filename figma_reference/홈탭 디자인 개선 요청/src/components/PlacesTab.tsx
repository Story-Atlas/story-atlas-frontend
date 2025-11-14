"use client";

import { useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { Input } from "./ui/input";
import { Search, Grid3x3, List } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface Place {
  id: number;
  image: string;
  images?: string[];
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
  relatedPlaces?: any[];
}

interface PlacesTabProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

export function PlacesTab({ places, onPlaceClick }: PlacesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories
  const categories = ["all", ...new Set(places.map((place) => place.category))];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.headline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels: Record<string, string> = {
    all: "전체",
    북카페: "북카페",
    브런치: "브런치",
    야외카페: "야외카페",
    관광지: "관광지",
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))] pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[hsl(var(--accent-terracotta))] to-[hsl(var(--accent-brown))] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl mb-3">장소</h1>
          <p className="text-white/80">
            파주 출판단지의 특별한 장소들을 탐색해보세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="장소 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Category Filter and View Toggle */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-[hsl(var(--accent-brown))] hover:bg-[hsl(var(--accent-brown-dark))]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category] || category}
              </Badge>
            ))}
          </div>

          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
            className="flex-shrink-0"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3x3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredPlaces.length}개의 장소
          </p>
        </div>

        {/* Places Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                image={place.image}
                name={place.name}
                headline={place.headline}
                category={place.category}
                onClick={() => onPlaceClick(place)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => onPlaceClick(place)}
                className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="group-hover:text-[hsl(var(--accent-brown))] transition-colors">
                        {place.name}
                      </h3>
                      <Badge variant="outline" className="flex-shrink-0">
                        {place.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {place.headline}
                    </p>
                    {place.tags && (
                      <div className="flex flex-wrap gap-1">
                        {place.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPlaces.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">검색 결과가 없습니다.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              필터 초기화
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

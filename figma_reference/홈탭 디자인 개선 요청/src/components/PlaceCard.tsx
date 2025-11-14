import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin } from "lucide-react";

interface PlaceCardProps {
  image: string;
  name: string;
  headline: string;
  category?: string;
  onClick?: () => void;
}

export function PlaceCard({ image, name, headline, category, onClick }: PlaceCardProps) {
  return (
    <div className="group flex-shrink-0 w-72 cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1">
              <span className="text-xs font-medium text-gray-700">{category}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="h-4 w-4 text-[hsl(var(--accent-brown))] mt-1 flex-shrink-0" />
            <h4 className="group-hover:text-[hsl(var(--accent-brown))] transition-colors">
              {name}
            </h4>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {headline}
          </p>
        </div>
      </div>
    </div>
  );
}
